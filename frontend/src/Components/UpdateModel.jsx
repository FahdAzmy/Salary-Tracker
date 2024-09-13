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
  const [price, setPrice] = useState(transaction.price);
  const [date, setDate] = useState(transaction.date || "");

  if (!isOpen) return null; // إخفاء الـ Modal إذا لم يكن مفتوحًا

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      await updateTransaction(id, {
        name,
        description,
        price,
        date,
      });
      const updatedTransactions = transactions.map((t) =>
        t._id === id ? { ...t, name, description, price, date } : t
      );
      setTransactions(updatedTransactions);
      onClose();
    } catch (error) {
      console.error("Failed to update transaction:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Edit Transaction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input Name */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
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

          {/* Input Description */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              placeholder="Description"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Input Price */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
              placeholder="Price"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Input Date */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(ev) => setDate(ev.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
