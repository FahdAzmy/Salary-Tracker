import { useState } from "react";
import { updateSalary } from "../api/api";

export default function UpdateSalaryModel({
  isOpen,
  onClose,
  salary,
  setSalary,
}) {
  const [amount, setAmount] = useState(salary || "");

  if (!isOpen) return null;

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const updatedSalary = await updateSalary(amount);
      setSalary(updatedSalary.salary);
      onClose();
    } catch (error) {
      console.error("Failed to update salary:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Update Salary
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input Amount */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Salary Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(ev) => setAmount(ev.target.value)}
              placeholder="Enter new salary"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
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
