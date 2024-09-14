// src/api.js
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

// Fetch transactions for the logged-in user with optional filtering
export const getTransactions = async (filter = "all") => {
  try {
    // Sends a GET request to retrieve transactions for the current user, filtered by the given filter (e.g., "thisMonth", "lastMonth", or "all").
    const response = await axios.get(`${API_URL}/transactionsbyuserid`, {
      params: { filter },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

// Add a new transaction for the logged-in user
export const addTransaction = async (transaction) => {
  try {
    // Sends a POST request to add a new transaction to the current user's account.
    const response = await axios.post(
      `${API_URL}/addtransaction`,
      transaction,
      {
        withCredentials: true,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw error;
  }
};

// Register a new user
export const registerUser = async (userData) => {
  try {
    // Sends a POST request to create a new user account.
    const response = await axios.post(`${API_URL}/createuser`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.log("Error To Create User", error);
    throw error;
  }
};

// Login the user
export const login = async (userData) => {
  try {
    // Sends a POST request to log the user in by verifying credentials.
    const response = await axios.post(`${API_URL}/login`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error Logging In User:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Logout the user
export const logout = async () => {
  try {
    // Sends a POST request to log out the current user by invalidating the session.
    await axios.post(`${API_URL}/logout`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(
      "Error in LogOut User:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Set a new salary for the logged-in user
export const Salary = async (salary) => {
  try {
    // Sends a POST request to update the user's salary.
    await axios.post(`${API_URL}/setsalary`, salary, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  } catch (error) {
    console.error(
      "Error in SetSalry:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Delete a specific transaction by its ID
export const deleteTransaction = async (id) => {
  try {
    // Sends a DELETE request to remove a specific transaction from the user's account.
    await axios.delete(`${API_URL}/deletetransaction/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  } catch (error) {
    console.error(
      "Error in DeleteTransaction",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Update an existing transaction by its ID
export const updateTransaction = async (id, updatedTransaction) => {
  try {
    // Sends a PUT request to update an existing transaction with new data.
    const response = await axios.put(
      `${API_URL}/updatetransaction/${id}`,
      updatedTransaction,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error in updateTransaction:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Get the current user's salary
export const getSalary = async () => {
  try {
    // Sends a GET request to retrieve the salary information of the current user.
    const response = await axios.get(`${API_URL}/getsalary`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error in getSalry:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
//Updated Salary
export const updateSalary = async (newSalary) => {
  try {
    // Sends a PUT request to update an existing transaction with new data.
    const response = await axios.put(
      `${API_URL}/updatesalary`,
      { salary: newSalary },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error in updateSalary:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
