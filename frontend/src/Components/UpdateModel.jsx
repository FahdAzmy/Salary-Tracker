import { useState } from "react";
import { updateTransaction } from "../api/api";

export default function UpdateModel({
  isOpen,
  onClose,
  id,
  transaction,
  setTransactions,
  transactions,
}) {
  const [name, setName] = useState(transaction.name);
  const [description, setDescription] = useState(transaction.description || "");
  // Store the absolute amount for display; type determines the sign
  const [amount, setAmount] = useState(Math.abs(transaction.price));
  const [date, setDate] = useState(
    transaction.date ? transaction.date.split("T")[0] : ""
  );
  // Pre-select type based on existing price sign
  // positive price = expense, negative price = income
  const [type, setType] = useState(transaction.price >= 0 ? "expense" : "income");

  if (!isOpen) return null;

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      // Expense: positive price, Income: negative price
      const finalPrice = type === "income" ? -Math.abs(Number(amount)) : Math.abs(Number(amount));

      await updateTransaction(id, {
        name,
        description,
        price: finalPrice,
        date,
      });

      const updatedTransactions = transactions.map((t) =>
        t._id === id
          ? { ...t, name, description, price: finalPrice, date }
          : t
      );
      setTransactions(updatedTransactions);
      onClose();
    } catch (error) {
      console.error("Failed to update transaction:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-11/12 md:w-2/3 lg:w-[480px] border border-gray-200 dark:border-gray-700 animate-fade-in">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Edit Transaction
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px] text-gray-500">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Type Toggle */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm">
              Transaction Type
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setType("expense")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                  type === "expense"
                    ? "bg-red-500/10 border-red-400 text-red-500 dark:text-red-400 shadow-sm"
                    : "bg-transparent border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                Expense
              </button>
              <button
                type="button"
                onClick={() => setType("income")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                  type === "income"
                    ? "bg-emerald-500/10 border-emerald-400 text-emerald-600 dark:text-emerald-400 shadow-sm"
                    : "bg-transparent border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">account_balance</span>
                Income
              </button>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              placeholder="Transaction Name"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm">
              Description
            </label>
            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              placeholder="Description"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="flex gap-3">
            {/* Amount */}
            <div className="flex-1">
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm">
                Amount ($)
              </label>
              <input
                type="number"
                value={amount}
                min="0"
                onChange={(ev) => setAmount(ev.target.value)}
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Date */}
            <div className="flex-1">
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(ev) => setDate(ev.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-5 py-2 text-white rounded-lg transition-colors text-sm font-medium ${
                type === "income"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
}
