// src/api.js
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

// Fetch transactions
export const getTransactions = async (filter = "all") => {
  try {
    const response = await axios.get(`${API_URL}/transactionsbyuserid`, {
      params: { filter },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error; // Rethrow to be caught in the component
  }
};

// Add a new transaction
export const addTransaction = async (transaction) => {
  try {
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
    throw error; // Rethrow to be caught in the component
  }
};

// Create User
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/createuser`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.log("Error To Create User", error);
    throw error;
  }
};
export const login = async (userData) => {
  try {
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
export const logout = async () => {
  try {
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
export const Salary = async (salary) => {
  try {
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
export const deleteTransaction = async (id) => {
  try {
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

export const updateTransaction = async (id, updatedTransaction) => {
  try {
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

export const getSalary = async () => {
  try {
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
