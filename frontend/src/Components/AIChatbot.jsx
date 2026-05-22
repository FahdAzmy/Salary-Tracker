import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { chatWithAI } from "../api/api";

export default function AIChatbot({ transactions, setTransactions, onSalaryUpdate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hey! 👋 I'm your AI financial assistant. I can add, edit, and delete your transactions!\n\nTry saying:\n• \"Bought coffee for $5\"\n• \"Got paid $300 freelance\"\n• \"Change coffee to $7\"\n• \"Delete the groceries transaction\"\n• \"Remove my last transaction\"",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setPulseAnimation(false);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");

    const updatedMessages = [
      ...messages,
      { role: "user", content: userMessage },
    ];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const conversationHistory = updatedMessages
        .filter((m) => m.role !== "system")
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await chatWithAI(userMessage, conversationHistory);
      let replyContent = response.reply || "Done!";

      // ── Handle ADD ──────────────────────────────────────────
      if (response.action === "add" && response.result?.transactions?.length > 0) {
        const added = response.result.transactions;
        const details = added
          .map(
            (tx) =>
              `  ✅ ${tx.name}: $${Math.abs(tx.price).toFixed(2)} (${tx.price >= 0 ? "expense" : "income"})`
          )
          .join("\n");
        replyContent += `\n\n📝 Added:\n${details}`;

        setTransactions?.((prev) => [...prev, ...added]);
        if (response.result.updatedSalary !== undefined) {
          onSalaryUpdate?.(response.result.updatedSalary);
        }
      }

      // ── Handle EDIT ─────────────────────────────────────────
      if (response.action === "edit" && response.result?.transaction) {
        const updated = response.result.transaction;
        replyContent += `\n\n✏️ Updated: "${updated.name}" → $${Math.abs(updated.price).toFixed(2)} (${updated.price >= 0 ? "expense" : "income"})`;

        setTransactions?.((prev) =>
          prev.map((t) => (t._id === updated._id ? updated : t))
        );
        if (response.result.updatedSalary !== undefined) {
          onSalaryUpdate?.(response.result.updatedSalary);
        }
      }

      // ── Handle DELETE ────────────────────────────────────────
      if (response.action === "delete" && response.result?.deletedId) {
        const deletedId = response.result.deletedId;
        const deletedTx = transactions?.find((t) => t._id === deletedId);
        replyContent += `\n\n🗑️ Deleted: "${deletedTx?.name || "transaction"}"`;

        setTransactions?.((prev) => prev.filter((t) => t._id !== deletedId));
        if (response.result.updatedSalary !== undefined) {
          onSalaryUpdate?.(response.result.updatedSalary);
        }
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: replyContent },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Sorry, I couldn't process that. Please try again or check your connection.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        id="ai-chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
          isOpen
            ? "bg-red-500 hover:bg-red-600"
            : "bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
        }`}
        title={isOpen ? "Close AI Chat" : "Open AI Assistant"}
      >
        {pulseAnimation && !isOpen && (
          <>
            <span className="absolute inset-0 rounded-full bg-violet-500 opacity-30 animate-ping" />
            <span className="absolute inset-0 rounded-full bg-violet-400 opacity-20 animate-pulse" />
          </>
        )}
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[390px] max-w-[calc(100vw-2rem)] transition-all duration-300 ease-out ${
          isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700/50 backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 flex flex-col h-[540px]">

          {/* Header */}
          <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 px-5 py-4 flex items-center gap-3 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1 left-8 w-2 h-2 bg-white rounded-full animate-pulse" />
              <div className="absolute top-3 right-12 w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
              <div className="absolute bottom-2 left-24 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
            </div>
            <div className="relative w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <div className="relative flex-1">
              <h3 className="text-white font-semibold text-[15px] tracking-tight">AI Transaction Assistant</h3>
              <p className="text-violet-200 text-xs mt-0.5">Add • Edit • Delete • Ask anything</p>
            </div>
            {/* Transaction count badge */}
            {transactions?.length > 0 && (
              <div className="relative bg-white/20 rounded-lg px-2.5 py-1 text-center">
                <div className="text-white text-xs font-bold">{transactions.length}</div>
                <div className="text-violet-200 text-[9px]">transactions</div>
              </div>
            )}
          </div>

          {/* Quick action chips */}
          <div className="px-3 pt-2.5 pb-1 flex gap-2 overflow-x-auto scrollbar-none">
            {[
              { label: "➕ Add expense", text: "I bought " },
              { label: "💰 Add income", text: "I received " },
              { label: "✏️ Edit", text: "Change " },
              { label: "🗑️ Delete", text: "Delete " },
            ].map((chip) => (
              <button
                key={chip.label}
                onClick={() => setInput(chip.text)}
                className="flex-shrink-0 text-[11px] px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-900/40 hover:text-violet-700 dark:hover:text-violet-300 border border-gray-200 dark:border-gray-700 transition-colors whitespace-nowrap"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap shadow-sm ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-br-md"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-md border border-gray-200/50 dark:border-gray-700/50"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-md px-5 py-3 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 pb-4 pt-2 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl px-3 py-1.5 border border-gray-200 dark:border-gray-700 focus-within:border-violet-400 dark:focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all">
              <input
                ref={inputRef}
                id="ai-chat-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add, edit, or delete transactions..."
                disabled={isLoading}
                className="flex-1 bg-transparent text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none py-2 disabled:opacity-50"
              />
              <button
                id="ai-chat-send"
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-white flex items-center justify-center hover:from-violet-500 hover:to-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90 shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
            <p className="text-[10.5px] text-gray-400 dark:text-gray-500 mt-2 text-center">
              Powered by AI • Add, edit & delete with natural language
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.25s ease-out forwards; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(139,92,246,0.3); border-radius: 20px; }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover { background: rgba(139,92,246,0.5); }
      `}</style>
    </>
  );
}

AIChatbot.propTypes = {
  transactions: PropTypes.array,
  setTransactions: PropTypes.func,
  onSalaryUpdate: PropTypes.func,
};
