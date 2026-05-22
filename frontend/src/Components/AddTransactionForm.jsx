import { useState } from "react";
import PropTypes from "prop-types";
import { addTransaction } from "../api/api";

export default function AddTransactionForm({ setTransactions }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("expense"); // "expense" | "income"

  function AddnewTransaction(ev) {
    ev.preventDefault();

    if (!name || !price) {
      alert("Please set Name and Price");
      return;
    }

    // Expense: positive price (salary -= price)
    // Income:  negative price (salary -= negative = salary += amount)
    const finalPrice = type === "income" ? -Math.abs(Number(price)) : Math.abs(Number(price));

    const newTransaction = { name, description, price: finalPrice, date };

    addTransaction(newTransaction).then((json) => {
      setName("");
      setDate("");
      setPrice("");
      setDescription("");
      setType("expense");

      setTransactions((prevTransactions) => [
        ...prevTransactions,
        json.transaction,
      ]);
    });
  }

  return (
    <div className="md:col-span-4 bg-surface-container-lowest dark:bg-gray-800 border border-outline-variant dark:border-gray-700 rounded-xl p-lg shadow-sm flex flex-col h-full">
      <h3 className="font-headline-sm text-headline-sm text-on-surface dark:text-white mb-md">
        New Transaction
      </h3>
      <form
        onSubmit={AddnewTransaction}
        className="flex flex-col gap-md flex-grow justify-between"
      >
        <div className="space-y-md">

          {/* Type Toggle — Expense / Income */}
          <div className="flex gap-sm">
            <button
              type="button"
              onClick={() => setType("expense")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all border ${
                type === "expense"
                  ? "bg-red-500/10 border-red-400 text-red-500 dark:text-red-400 shadow-sm"
                  : "bg-transparent border-outline-variant dark:border-gray-700 text-secondary dark:text-gray-400 hover:bg-surface-container-low dark:hover:bg-gray-700"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">shopping_cart</span>
              Expense
            </button>
            <button
              type="button"
              onClick={() => setType("income")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all border ${
                type === "income"
                  ? "bg-emerald-500/10 border-emerald-400 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "bg-transparent border-outline-variant dark:border-gray-700 text-secondary dark:text-gray-400 hover:bg-surface-container-low dark:hover:bg-gray-700"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">account_balance</span>
              Income
            </button>
          </div>

          {/* Name Input */}
          <div className="flex flex-col gap-xs">
            <label className="font-label-sm text-label-sm text-secondary dark:text-gray-400">
              Item Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              className="bg-surface dark:bg-gray-900 border border-outline-variant dark:border-gray-700 rounded-lg px-md py-2 font-body-sm text-body-sm text-on-surface dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all w-full placeholder:text-outline/50"
              placeholder={type === "income" ? "e.g., Freelance, Salary" : "e.g., Coffee, Rent"}
            />
          </div>

          {/* Description Input */}
          <div className="flex flex-col gap-xs">
            <label className="font-label-sm text-label-sm text-secondary dark:text-gray-400">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              className="bg-surface dark:bg-gray-900 border border-outline-variant dark:border-gray-700 rounded-lg px-md py-2 font-body-sm text-body-sm text-on-surface dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all w-full placeholder:text-outline/50"
              placeholder="Optional details"
            />
          </div>

          <div className="flex gap-md">
            {/* Date Input */}
            <div className="flex flex-col gap-xs w-1/2">
              <label className="font-label-sm text-label-sm text-secondary dark:text-gray-400">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(ev) =>
                  setDate(
                    ev.target.value.length === 0
                      ? new Date().toISOString().split("T")[0]
                      : ev.target.value
                  )
                }
                className="bg-surface dark:bg-gray-900 border border-outline-variant dark:border-gray-700 rounded-lg px-sm py-2 font-body-sm text-body-sm text-on-surface dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all w-full"
              />
            </div>

            {/* Price Input */}
            <div className="flex flex-col gap-xs w-1/2">
              <label className="font-label-sm text-label-sm text-secondary dark:text-gray-400">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-md top-1/2 -translate-y-1/2 text-outline font-body-sm">
                  $
                </span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={price}
                  min="0"
                  onChange={(ev) => setPrice(ev.target.value)}
                  className="bg-surface dark:bg-gray-900 border border-outline-variant dark:border-gray-700 rounded-lg pl-[32px] pr-md py-2 font-body-sm text-body-sm text-on-surface dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all w-full placeholder:text-outline/50"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={`mt-lg font-label-lg text-label-lg py-2 px-md rounded-lg w-full transition-colors active:scale-[0.98] shadow-sm flex items-center justify-center gap-sm text-white ${
            type === "income"
              ? "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700"
              : "bg-primary hover:bg-surface-tint dark:bg-blue-600 dark:hover:bg-blue-700"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {type === "income" ? "add_circle" : "remove_circle"}
          </span>
          {type === "income" ? "Add Income" : "Add Expense"}
        </button>
      </form>
    </div>
  );
}

AddTransactionForm.propTypes = {
  setTransactions: PropTypes.func.isRequired,
};
