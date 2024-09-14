import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { getSalary, login } from "../api/api";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate(); // Hook to programmatically navigate to routes
  const [errorMessage, setErrorMessage] = useState(null); // State to handle error messages
  const { setIsLoggedIn } = useContext(AuthContext); // Accessing AuthContext to manage login state

  // Validation schema using Yup to enforce form field validation
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  // Function to handle login form submission
  async function Login(values, { setSubmitting }) {
    try {
      // Attempt to log the user in
      await login(values);
      setIsLoggedIn(true); // Update the login state on successful login
      setErrorMessage(null); // Clear any error messages

      // Fetch salary after login
      const response = await getSalary();
      // If salary exists, navigate to the home page, otherwise navigate to the add salary page
      if (response.user.salary) {
        navigate("/", { replace: true });
      } else {
        navigate("/addsalary");
      }
    } catch (error) {
      // Handle errors appropriately
      if (error.response && error.response.status === 404) {
        setErrorMessage(error.response.data.Message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setSubmitting(false); // Set form submission state back to false
    }
  }

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">
      <div className="bg-white dark:bg-gray-800 p-7 rounded-lg shadow-lg max-w-lg w-full">
        {/* Page Title */}
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mt-9 mb-7">
          Login
        </h2>

        {/* Formik form for handling form submission */}
        <Formik
          initialValues={{ email: "", password: "" }} // Initial form values
          validationSchema={validationSchema} // Form validation schema
          onSubmit={Login} // Form submission handler
        >
          {() => (
            <Form className="space-y-6">
              <div className="forminputs space-y-4">
                {/* Email field with validation */}
                <div className="relative">
                  <Field
                    type="email"
                    autoComplete="off"
                    name="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="absolute text-xs text-red-500"
                  />
                </div>

                {/* Password field with validation */}
                <div className="relative">
                  <Field
                    type="password"
                    autoComplete="off"
                    name="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border mt-2 border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="absolute text-xs text-red-500 mt-1 mb-1"
                  />
                </div>
              </div>

              {/* Display error messages if any */}
              {errorMessage && (
                <p className="text-center text-red-500">{errorMessage}</p>
              )}

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-2 mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500"
              >
                Login
              </button>

              {/* Navigation to register page */}
              <div className="text-center text-gray-600 dark:text-gray-300">
                <p>Don't have an account?</p>
                <Link
                  to="/register"
                  className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500 transition ease-in-out duration-200"
                >
                  Create an account
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
