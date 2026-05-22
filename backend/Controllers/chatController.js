const asyncHandler = require("../middlewares/asyncHandler");
const Transaction = require("../Models/TransactionModel");
const User = require("../Models/userModel");
const AppError = require("../utils/AppError");

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

/**
 * @desc Process a chat message — add, edit, or delete transactions via AI
 * @route POST /api/salarytracker/chat
 * @access Private
 */
exports.chatWithAI = asyncHandler(async (req, res, next) => {
  const { message, conversationHistory = [] } = req.body;
  const userId = req.user.userId;

  if (!message) return next(new AppError("Message is required", 400));

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return next(new AppError("OpenRouter API key is not configured", 500));

  // Get user for salary context
  const user = await User.findById(userId);
  if (!user) return next(new AppError("User Not Found", 401));

  // Get ALL user transactions so AI can reference them by name/id
  const allTransactions = await Transaction.find({ user: userId }).sort({ date: -1 });

  const txList = allTransactions.length
    ? allTransactions
        .map(
          (t) =>
            `  ID:${t._id} | Name:"${t.name}" | Amount:$${Math.abs(t.price).toFixed(2)} | Type:${t.price >= 0 ? "expense" : "income"} | Date:${t.date ? new Date(t.date).toISOString().split("T")[0] : "N/A"} | Desc:"${t.description || ""}"`
        )
        .join("\n")
    : "  (no transactions yet)";

  const systemPrompt = `You are a smart financial assistant for a Salary Tracker app. You can ADD, EDIT, and DELETE transactions using natural language.

CURRENT USER CONTEXT:
- Current balance: $${user.salary || 0}
- All transactions (use exact IDs for edit/delete):
${txList}

PRICE SIGN RULES:
- EXPENSE (spent money): POSITIVE price → balance decreases
- INCOME (received money): NEGATIVE price → balance increases

════════════════════════════════════
RESPOND ONLY WITH VALID JSON. One of:

1) ADD transaction(s):
{
  "action": "add",
  "transactions": [
    { "name": "...", "description": "...", "price": 25.00, "date": "YYYY-MM-DD" }
  ],
  "reply": "Friendly confirmation message"
}

2) EDIT a transaction:
{
  "action": "edit",
  "id": "<exact transaction ID from the list above>",
  "updates": { "name": "...", "description": "...", "price": 30.00, "date": "YYYY-MM-DD" },
  "reply": "Friendly confirmation message"
}

3) DELETE a transaction:
{
  "action": "delete",
  "id": "<exact transaction ID from the list above>",
  "reply": "Friendly confirmation message"
}

4) CHAT (no transaction action needed):
{
  "action": "chat",
  "reply": "Your helpful response"
}
════════════════════════════════════

EXAMPLES:
- "I bought coffee $5"                → action="add", price=5 (expense)
- "Got paid $300 freelance"           → action="add", price=-300 (income)
- "Change coffee to $7"               → action="edit" (find coffee in list, update price)
- "Update groceries description to weekly shopping" → action="edit"
- "Delete the coffee transaction"     → action="delete" (find coffee ID)
- "Remove my last transaction"        → action="delete" (use first in list, it's sorted newest first)
- "What's my balance?"                → action="chat"

TODAY: ${new Date().toISOString().split("T")[0]}
NO markdown. NO code blocks. Raw JSON only.`;

  const messages = [
    { role: "system", content: systemPrompt },
    ...conversationHistory.slice(-10).map((m) => ({ role: m.role, content: m.content })),
    { role: "user", content: message },
  ];

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.CORS_ORIGIN || "http://localhost:5173",
        "X-Title": "Salary Tracker AI",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        messages,
        temperature: 0.2,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("OpenRouter Error:", errorData);
      return next(new AppError("AI service error. Please try again.", 502));
    }

    const data = await response.json();
    const aiContent = data.choices?.[0]?.message?.content;
    if (!aiContent) return next(new AppError("No response from AI", 502));

    // Parse AI JSON response
    let parsed;
    try {
      const clean = aiContent.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(clean);
    } catch {
      return res.status(200).json({ Success: true, action: "chat", reply: aiContent, result: null });
    }

    const action = parsed.action || "chat";

    // ── ADD ──────────────────────────────────────────────────
    if (action === "add" && parsed.transactions?.length > 0) {
      const created = [];
      for (const tx of parsed.transactions) {
        const transaction = await Transaction.create({
          name: tx.name,
          description: tx.description || "",
          price: tx.price,
          date: tx.date ? new Date(tx.date) : new Date(),
          user: userId,
        });
        user.salary -= tx.price;
        created.push(transaction);
      }
      await user.save();

      return res.status(200).json({
        Success: true,
        action: "add",
        reply: parsed.reply,
        result: { transactions: created, updatedSalary: user.salary },
      });
    }

    // ── EDIT ─────────────────────────────────────────────────
    if (action === "edit" && parsed.id) {
      const existing = await Transaction.findOne({ _id: parsed.id, user: userId });
      if (!existing) {
        return res.status(200).json({
          Success: true,
          action: "chat",
          reply: "❌ I couldn't find that transaction to edit. Please try again with more details.",
          result: null,
        });
      }

      const updates = parsed.updates || {};
      const oldPrice = existing.price;
      const newPrice = updates.price !== undefined ? Number(updates.price) : existing.price;

      const updated = await Transaction.findByIdAndUpdate(
        parsed.id,
        {
          name: updates.name || existing.name,
          description: updates.description !== undefined ? updates.description : existing.description,
          price: newPrice,
          date: updates.date ? new Date(updates.date) : existing.date,
        },
        { new: true }
      );

      // Adjust salary: undo old price, apply new price
      user.salary += oldPrice;   // undo old
      user.salary -= newPrice;   // apply new
      await user.save();

      return res.status(200).json({
        Success: true,
        action: "edit",
        reply: parsed.reply,
        result: { transaction: updated, updatedSalary: user.salary },
      });
    }

    // ── DELETE ───────────────────────────────────────────────
    if (action === "delete" && parsed.id) {
      const existing = await Transaction.findOne({ _id: parsed.id, user: userId });
      if (!existing) {
        return res.status(200).json({
          Success: true,
          action: "chat",
          reply: "❌ I couldn't find that transaction to delete. Please try again with more details.",
          result: null,
        });
      }

      await Transaction.findByIdAndDelete(parsed.id);

      // Restore salary (undo the original price effect)
      user.salary += existing.price;
      await user.save();

      return res.status(200).json({
        Success: true,
        action: "delete",
        reply: parsed.reply,
        result: { deletedId: parsed.id, updatedSalary: user.salary },
      });
    }

    // ── CHAT ─────────────────────────────────────────────────
    return res.status(200).json({
      Success: true,
      action: "chat",
      reply: parsed.reply || "How can I help you?",
      result: null,
    });
  } catch (error) {
    console.error("Chat AI Error:", error);
    return next(new AppError("Failed to process your message", 500));
  }
});
