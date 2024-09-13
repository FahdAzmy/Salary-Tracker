import { Link } from "react-router-dom";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { registerUser } from "../api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  // State to hold server error messages
  const [serverError, setServerError] = useState(null);
  // State to hold success message
  const [successMessage, setSuccessMessage] = useState(null);
  // Hook for navigation
  const navigate = useNavigate();

  // Validation schema using Yup for form validation
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid Email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
  });

  // Function to handle form submission
  async function createUser(values, { setSubmitting }) {
    try {
      // Call the API to register the user
      await registerUser(values);
      setServerError(null);
      // Set success message and navigate to login page after a delay
      setSuccessMessage("Register done. Go and login");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      // Handle known and unexpected errors
      if (error.response && error.response.status === 400) {
        setServerError(error.response.data.Message); // Set server error message
      } else {
        setServerError("An unexpected error occurred."); // Default error message
      }
    } finally {
      setSubmitting(false); // Stop form submission loading state
    }
  }

  return (
    <div className="signup max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-40 ">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
        Sign up
      </h2>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={createUser}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="forminputs space-y-4">
              {/* Name Field */}
              <Field
                type="text"
                autoComplete="off"
                name="name"
                placeholder="Name"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />

              {/* Email Field */}
              <Field
                type="email"
                autoComplete="off"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />

              {/* Password Field */}
              <Field
                name="password"
                autoComplete="off"
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Server Error Message */}
            {serverError && (
              <p className="text-red-500 text-sm mt-4">{serverError}</p>
            )}

            {/* Success Message */}
            {successMessage && (
              <p className="text-green-500 text-sm mt-4">{successMessage}</p>
            )}

            <input
              type="submit"
              value="Register"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg mt-6 hover:bg-blue-600 transition duration-300"
            />

            {/* Navigation to Login */}
            <div className="gotologin flex justify-center mt-4">
              <p className="text-gray-600 dark:text-gray-400">
                Already a member?
              </p>
              <Link
                to="/login"
                className="text-blue-500 dark:text-blue-300 ml-2 font-bold"
              >
                Login
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
