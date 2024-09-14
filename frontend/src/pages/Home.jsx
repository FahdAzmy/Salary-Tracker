import { useContext, useEffect, useState } from "react";
import { getSalary, getTransactions } from "../api/api";
import AddTransactionForm from "../Components/AddTransactionForm";
import TransactionsList from "../Components/Transactions";
import { AuthContext } from "../contexts/AuthContext";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import UpdateSalaryModel from "../Components/UpdateSalaryModel";

export default function Home() {
  const [transactions, setTransactions] = useState([]); // State to store the list of transactions
  const [salary, setSalary] = useState(""); // State to store the user's salary
  const { isLoggedIn } = useContext(AuthContext); // Access the authentication status from the AuthContext
  const [filter, setFilter] = useState("all"); // State to manage the current filter for transactions
  const [updateModel, setUpdateModel] = useState(false); //update Salaryd
  // Fetch the salary data when the component mounts or when the user logs in
  useEffect(() => {
    const fetchSalary = async () => {
      try {
        const response = await getSalary();
        // Set the salary if available, otherwise set to null
        if (response.user.salary) {
          setSalary(response.user.salary);
        } else {
          setSalary(null);
        }
      } catch (error) {
        console.error("Error Fetching Salary:", error);
      }
    };

    if (isLoggedIn) {
      fetchSalary();
    }
  }, [isLoggedIn, transactions]); // Dependency on isLoggedIn and transactions to keep salary updated

  // Fetch the transactions based on the current filter
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions(filter); // Fetch transactions with the selected filter
        setTransactions(data.transactions); // Update the transactions state
      } catch (error) {
        console.error("Error Fetching Transactions:", error);
      }
    };

    if (isLoggedIn) {
      fetchTransactions();
    }
  }, [isLoggedIn, filter]); // Dependency on isLoggedIn and filter to refetch data when they change

  // Handle the change in filter selection
  const handleFilterChange = (event) => {
    setFilter(event.target.value); // Update the filter state based on user selection
  };

  return (
    <div className="dark:bg-gray-800 min-h-screen py-8">
      <main className="container mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg">
        {/* Display salary if available, otherwise show 0 */}
        {salary ? (
          <div className="flex justify-center items-center gap-2">
            <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6 mt-6">
              $ {salary}
              <span>.00</span>
            </h1>
            <PencilSquareIcon
              className="w-6  cursor-pointer"
              onClick={() => setUpdateModel(true)}
            />
          </div>
        ) : (
          <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6 mt-6">
            $ 0<span>.00</span>
          </h1>
        )}

        {/* Form to add new transactions */}
        <AddTransactionForm setTransactions={setTransactions} />

        {/* Filter dropdown for transactions */}
        <div className="text-left w-11/12 m-auto">
          <select
            className="p-1 font-bold dark:bg-gray-800"
            value={filter} // Ensure the selected filter is reflected
            onChange={handleFilterChange} // Handle filter selection changes
          >
            <option value="all">All Transactions</option>
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
          </select>
          <div className="divider h-0.5 mt-2 bg-slate-400"></div>
        </div>

        {/* List of transactions */}
        <TransactionsList
          transactions={transactions} // Pass down the current transactions
          setTransactions={setTransactions} // Pass down the function to update transactions
        />
        {updateModel && (
          <UpdateSalaryModel
            isOpen={updateModel}
            onClose={() => setUpdateModel(false)}
            salary={salary}
            setSalary={setSalary}
          />
        )}
      </main>
    </div>
  );
}
