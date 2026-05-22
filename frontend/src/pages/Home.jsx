import { useCallback, useContext, useEffect, useState } from "react";
import { getSalary, getTransactions } from "../api/api";
import AddTransactionForm from "../Components/AddTransactionForm";
import TransactionsList from "../Components/Transactions";
import { AuthContext } from "../contexts/AuthContext";
import UpdateSalaryModel from "../Components/UpdateSalaryModel";
import AIChatbot from "../Components/AIChatbot";

export default function Home() {
  const [transactions, setTransactions] = useState([]); // State to store the list of transactions
  const [salary, setSalary] = useState(""); // State to store the user's salary
  const { isLoggedIn } = useContext(AuthContext); // Access the authentication status from the AuthContext
  const [filter, setFilter] = useState("all"); // State to manage the current filter for transactions
  const [updateModel, setUpdateModel] = useState(false); //update Salary

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
  const handleFilterChange = useCallback((event) => {
    setFilter(event.target.value);
  }, []);

  return (
    <div className="pb-xxl px-gutter max-w-container-max mx-auto mt-lg font-body-md text-body-md antialiased">
      {/* Dashboard Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
        
        {/* Salary Hero Widget (Spans 8 cols on desktop) */}
        <div className="md:col-span-8 bg-surface-container-lowest dark:bg-gray-800 border border-outline-variant dark:border-gray-700 rounded-xl p-lg shadow-sm flex flex-col justify-between relative overflow-hidden group">
          {/* Decorative subtle gradient blob */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-container/10 dark:bg-blue-900/30 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="z-10">
            <div className="flex justify-between items-start mb-md">
              <h2 className="font-label-lg text-label-lg text-secondary dark:text-gray-400 tracking-wide uppercase">
                Current Monthly Salary
              </h2>
              <button 
                onClick={() => setUpdateModel(true)}
                className="text-outline hover:text-primary dark:hover:text-blue-400 transition-colors p-xs rounded-full hover:bg-surface-container-low dark:hover:bg-gray-700" 
                title="Edit Salary"
              >
                <span className="material-symbols-outlined text-[20px]">edit</span>
              </button>
            </div>
            
            <div className="flex items-end gap-md">
              <span className="font-display-lg text-display-lg text-on-surface dark:text-white tracking-tight">
                $ {salary || 0}.00
              </span>
              <span className="font-label-md text-label-md text-tertiary dark:text-emerald-400 bg-tertiary-fixed/20 dark:bg-emerald-900/30 px-2 py-1 rounded-md mb-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                Active
              </span>
            </div>
          </div>
          
          <div className="mt-lg pt-md border-t border-outline-variant dark:border-gray-700 z-10 flex gap-lg">
            <div>
              <div className="font-label-sm text-label-sm text-secondary dark:text-gray-400">Total Transactions</div>
              <div className="font-body-sm text-body-sm text-on-surface dark:text-white font-medium">{transactions.length}</div>
            </div>
          </div>
        </div>

        {/* Add Transaction Form (Spans 4 cols on desktop) */}
        <AddTransactionForm setTransactions={setTransactions} />

        {/* Transactions Section (Full width bottom) */}
        <TransactionsList
          transactions={transactions}
          setTransactions={setTransactions}
          filter={filter}
          handleFilterChange={handleFilterChange}
        />

        {updateModel && (
          <UpdateSalaryModel
            isOpen={updateModel}
            onClose={() => setUpdateModel(false)}
            salary={salary}
            setSalary={setSalary}
          />
        )}
      </div>

      {/* AI Chatbot - Floating */}
      <AIChatbot
        transactions={transactions}
        setTransactions={setTransactions}
        onSalaryUpdate={(updatedSalary) => {
          if (updatedSalary !== undefined) {
            setSalary(updatedSalary);
          }
        }}
      />
    </div>
  );
}
