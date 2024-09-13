import { useState } from "react";
import PropTypes from "prop-types";
import { addTransaction } from "../api/api";

export default function AddTransactionForm({ setTransactions }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  function AddnewTransaction(ev) {
    if (!name || !price) {
      alert("Please set Name and Price");
      return;
    }
    const newTransaction = { name, description, price, date };

    ev.preventDefault();
    addTransaction(newTransaction).then((json) => {
      setName("");
      setDate("");
      setPrice("");
      setDescription("");
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        json.transaction,
      ]);
    });
  }
  return (
    <>
      <form
        onSubmit={AddnewTransaction}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg m-auto  w-4/5"
      >
        {/* الأسطر العليا */}
        <div className="grid grid-cols-1 max-md:grid-cols-2  gap-4 mb-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Item Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              placeholder="Name"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              placeholder="Description"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* الأسطر السفلى */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
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
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Price
            </label>
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* زر الإرسال */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500"
        >
          Add New Transaction
        </button>
      </form>
    </>
  );
}
AddTransactionForm.propTypes = {
  setTransactions: PropTypes.func.isRequired,
};
