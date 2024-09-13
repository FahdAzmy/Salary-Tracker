import { useContext, useEffect, useState } from "react";

import { getSalary, getTransactions } from "../api/api";
import AddTransactionForm from "../Components/AddTransactionForm";
import TransactionsList from "../Components/Transactions";
import { AuthContext } from "../contexts/AuthContext";
export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [salary, setSalary] = useState("");
  const { isLoggedIn } = useContext(AuthContext);
  const [filter, setFilter] = useState("all");
  //get salary
  useEffect(() => {
    const fetchSalary = async () => {
      try {
        const response = await getSalary();
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
  }, [isLoggedIn, transactions]);
  //get Transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions(filter);
        setTransactions(data.transactions);
      } catch (error) {
        console.error("Error Fetching Transactions:", error);
      }
    };

    if (isLoggedIn) {
      fetchTransactions();
    }
  }, [isLoggedIn, filter]);
  const handleFilterChange = (event) => {
    setFilter(event.target.value); // تعيين الفلتر عند تغيير الاختيار
  };
  return (
    <div className=" dark:bg-gray-800 min-h-screen py-8">
      <main className="container mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg ">
        {salary ? (
          <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6 mt-6">
            $ {salary}
            <span className="">.00</span>
          </h1>
        ) : (
          <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6 mt-6">
            $ 0<span className="">.00</span>
          </h1>
        )}
        <AddTransactionForm setTransactions={setTransactions} />
        <div className="text-left  w-11/12 m-auto">
          <select
            className="p-1 font-bold dark:bg-gray-800"
            value={filter} // Make sure this is set to the current filter value
            onChange={handleFilterChange} // This updates the filter state
          >
            <option value="all">All Transactions</option>
            <option value="thisMonth">This Month</option>
            <option value="lastmonth">Last Month</option>
          </select>
          <div className="divider   h-0.5 mt-2 bg-slate-400 "></div>
        </div>

        <TransactionsList
          transactions={transactions}
          setTransactions={setTransactions}
        />
      </main>
    </div>
  );
}
