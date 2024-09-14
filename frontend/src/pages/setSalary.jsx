import { useState } from "react";
import { Salary } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function SetSalary() {
  const [salary, setSalary] = useState("");
  const navigate = useNavigate();
  function handleSalaryForm(e) {
    e.preventDefault();
    if (salary > 0) {
      Salary({ salary: salary });
      navigate("/");
    } else {
      alert("Please Enter a valid salary");
    }
  }
  return (
    <div className="flex justify-center items-center h- h-screen">
      <form
        onSubmit={handleSalaryForm}
        className="flex flex-col gap-4 w-3/5 justify-center   bg-gray-100 dark:bg-gray-800 p-12 rounded-lg shadow-md"
      >
        <input
          type="text"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="Enter Salary"
          className="p-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="submit"
          value="Submit"
          className="p-3 font-bold bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300"
        />
      </form>
    </div>
  );
}
