import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deleteTransaction } from "../api/api";
import { useState } from "react";
import UpdateModel from "./UpdateModel";

function TransactionsList({ transactions, setTransactions }) {
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
    <div className="transactions mt-7 space-y-4">
      {/* Ensure that transactions are available before mapping */}
      {transactions.length > 0 &&
        transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="transaction bg-slate-50 dark:bg-gray-700 p-4 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center">
              <div className="left">
                {/* Display transaction name and description */}
                <div className="name text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {transaction.name}
                </div>
                <div className="description text-gray-500 dark:text-gray-400">
                  {transaction.description}
                </div>
              </div>

              <div className="right flex gap-3">
                <div>
                  {/* Display transaction price; apply conditional styling based on value */}
                  <div
                    className={`price text-lg font-bold ${
                      transaction.price > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    ${Number(transaction.price).toFixed(2)}
                  </div>
                  {/* Show formatted transaction date or fallback to today's date */}
                  <div className="datetime text-sm text-gray-400 dark:text-gray-500">
                    {transaction.date
                      ? new Date(transaction.date).toLocaleDateString()
                      : new Date().toLocaleDateString()}
                  </div>
                </div>
                {/* Buttons for editing and deleting transactions */}
                <div className="edit flex justify-center gap-2 items-center">
                  <button>
                    <PencilSquareIcon
                      className="h-7 w-7 text-blue-400"
                      onClick={() => handleUpdate(transaction._id)}
                    />
                  </button>
                  <button>
                    <TrashIcon
                      onClick={() => handleDelete(transaction._id)}
                      className="h-7 w-7 text-red-700"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

      {/* Conditionally render UpdateModel when a transaction is selected for update */}
      {isModelOpen && (
        <UpdateModel
          isOpen={isModelOpen}
          onClose={() => setIsModelOpen(false)}
          id={selectedTransactionId}
          transaction={transactions.find(
            (t) => t._id === selectedTransactionId
          )}
          setTransactions={setTransactions}
          transactions={transactions}
        />
      )}
    </div>
  );
}

export default TransactionsList;
