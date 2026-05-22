import { deleteTransaction } from "../api/api";
import { useState } from "react";
import UpdateModel from "./UpdateModel";

function TransactionsList({ transactions, setTransactions, filter, handleFilterChange }) {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);

  // Handles the deletion of a transaction and updates the state
  async function handleDelete(id) {
    try {
      await deleteTransaction(id);
      // Remove the deleted transaction from the list by filtering it out
      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  }

  // Opens the update modal and sets the transaction ID to be updated
  function handleUpdate(id) {
    setSelectedTransactionId(id);
    setIsModelOpen(true);
  }

  return (
    <div className="md:col-span-12 bg-surface-container-lowest dark:bg-gray-800 border border-outline-variant dark:border-gray-700 rounded-xl shadow-sm overflow-hidden mt-sm">
      {/* Table Header Area */}
      <div className="px-lg py-md border-b border-outline-variant dark:border-gray-700 flex justify-between items-center bg-surface-bright/50 dark:bg-gray-900/50">
        <h3 className="font-headline-sm text-headline-sm text-on-surface dark:text-white">
          Recent Transactions
        </h3>
        
        {/* Filter Dropdown */}
        <div className="relative">
          <select
            className="appearance-none bg-surface dark:bg-gray-900 border border-outline-variant dark:border-gray-700 rounded-lg px-md py-1.5 flex items-center gap-sm hover:bg-surface-container-low dark:hover:bg-gray-700 transition-colors text-on-surface dark:text-white font-label-sm text-label-sm pr-8 cursor-pointer outline-none focus:ring-1 focus:ring-primary"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="all">All Transactions</option>
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
          </select>
          <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[16px] text-outline pointer-events-none">
            arrow_drop_down
          </span>
        </div>
      </div>

      {/* Transaction List */}
      <div className="flex flex-col">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div
              key={transaction._id}
              className="flex items-center justify-between px-lg py-md border-b border-outline-variant dark:border-gray-700 last:border-0 hover:bg-surface-container-low dark:hover:bg-gray-700 transition-colors group cursor-default"
            >
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-variant dark:bg-gray-900 text-on-surface-variant dark:text-gray-400 group-hover:bg-surface-container-highest dark:group-hover:bg-gray-600 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">
                    {transaction.price > 0 ? "shopping_cart" : "account_balance"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface dark:text-white">
                    {transaction.name}
                  </span>
                  <span className="font-body-sm text-body-sm text-secondary dark:text-gray-400">
                    {transaction.date
                      ? new Date(transaction.date).toLocaleDateString()
                      : new Date().toLocaleDateString()}
                    {transaction.description && ` · ${transaction.description}`}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-lg">
                <span
                  className={`font-label-sm text-label-sm px-2 py-0.5 rounded-sm uppercase tracking-wider hidden sm:block ${
                    transaction.price > 0
                      ? "bg-error-container/30 text-error dark:text-red-400"
                      : "bg-tertiary-fixed/30 text-tertiary dark:text-emerald-400"
                  }`}
                >
                  {transaction.price > 0 ? "Expense" : "Income"}
                </span>
                <span
                  className={`font-headline-sm text-headline-sm ${
                    transaction.price > 0
                      ? "text-error dark:text-red-400"
                      : "text-tertiary dark:text-emerald-400"
                  }`}
                >
                  {transaction.price > 0 ? "-" : "+"} $ {Math.abs(Number(transaction.price)).toFixed(2)}
                </span>
                <div className="flex justify-center gap-2 items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleUpdate(transaction._id)}>
                    <span className="material-symbols-outlined text-[20px] text-blue-500 hover:text-blue-700">edit</span>
                  </button>
                  <button onClick={() => handleDelete(transaction._id)}>
                    <span className="material-symbols-outlined text-[20px] text-red-500 hover:text-red-700">delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="px-lg py-xl text-center text-secondary dark:text-gray-400">
            No transactions found.
          </div>
        )}
      </div>

      {/* Conditionally render UpdateModel when a transaction is selected for update */}
      {isModelOpen && (
        <UpdateModel
          isOpen={isModelOpen}
          onClose={() => setIsModelOpen(false)}
          id={selectedTransactionId}
          transaction={transactions.find((t) => t._id === selectedTransactionId)}
          setTransactions={setTransactions}
          transactions={transactions}
        />
      )}
    </div>
  );
}

export default TransactionsList;
