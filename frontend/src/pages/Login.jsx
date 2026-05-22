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
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility

  // Validation schema using Yup to enforce form field validation
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .default("123456"),
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
        navigate("/dashboard", { replace: true });
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
    <div className="bg-background dark:bg-gray-900 min-h-[calc(100vh-80px)] flex items-center justify-center p-md relative overflow-hidden">
      {/* Atmospheric Background Elements */}
      <div className="absolute inset-0 bg-pattern pointer-events-none z-0"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-container/20 dark:bg-blue-900/30 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-tertiary-container/10 dark:bg-emerald-900/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
      
      <main className="w-full max-w-[440px] z-10 relative">
        {/* Elevated Card (Glassmorphism inspired) */}
        <div className="bg-surface-container-lowest/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-xl border border-outline-variant dark:border-gray-700 shadow-lg p-xl flex flex-col gap-lg">
          
          {/* Header Section */}
          <div className="flex flex-col items-center text-center gap-xs mb-sm">
            {/* Brand Anchor */}
            <div className="w-12 h-12 bg-primary-container dark:bg-blue-600 rounded-lg flex items-center justify-center mb-sm shadow-sm">
              <span className="material-symbols-outlined text-on-primary-container dark:text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                monitoring
              </span>
            </div>
            <h1 className="font-headline-sm text-headline-sm text-primary dark:text-blue-400 font-bold tracking-tight">SalaryTracker</h1>
            <h2 className="font-headline-md text-headline-md text-on-surface dark:text-white mt-xs">Welcome Back</h2>
            <p className="font-body-sm text-body-sm text-secondary dark:text-gray-400">Securely login to manage your finances.</p>
          </div>

          {/* Formik form for handling form submission */}
          <Formik
            initialValues={{ email: "user@gmail.com", password: "123456" }} // Initial form values
            validationSchema={validationSchema} // Form validation schema
            onSubmit={Login} // Form submission handler
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-md">
                
                {/* Email Input */}
                <div className="flex flex-col gap-xs">
                  <label className="font-label-sm text-label-sm text-on-surface-variant dark:text-gray-300 ml-xs" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">
                      mail
                    </span>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="name@company.com"
                      className="w-full bg-surface dark:bg-gray-900 border border-outline-variant dark:border-gray-700 rounded-lg pl-10 pr-md py-[10px] font-body-md text-body-md text-on-surface dark:text-white placeholder:text-outline dark:placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                    />
                    <ErrorMessage name="email" component="div" className="absolute -bottom-5 text-xs text-red-500" />
                  </div>
                </div>

                {/* Password Input */}
                <div className="flex flex-col gap-xs mt-3">
                  <div className="flex justify-between items-center ml-xs">
                    <label className="font-label-sm text-label-sm text-on-surface-variant dark:text-gray-300" htmlFor="password">
                      Password
                    </label>
                    <a className="font-label-sm text-label-sm text-primary dark:text-blue-400 hover:text-primary-container transition-colors" href="#">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">
                      lock
                    </span>
                    <Field
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      className="w-full bg-surface dark:bg-gray-900 border border-outline-variant dark:border-gray-700 rounded-lg pl-10 pr-12 py-[10px] font-body-md text-body-md text-on-surface dark:text-white placeholder:text-outline dark:placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface dark:hover:text-white transition-colors flex items-center justify-center p-1 rounded-md hover:bg-surface-variant dark:hover:bg-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                    <ErrorMessage name="password" component="div" className="absolute -bottom-5 text-xs text-red-500" />
                  </div>
                </div>

                {/* Display error messages if any */}
                {errorMessage && (
                  <p className="text-center text-red-500 text-sm mt-3">{errorMessage}</p>
                )}

                {/* Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-on-primary font-label-lg text-label-lg py-[12px] rounded-lg hover:bg-surface-tint dark:bg-blue-600 dark:hover:bg-blue-700 transition-all shadow-sm flex items-center justify-center gap-sm mt-sm active:scale-[0.98]"
                >
                  Login
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </Form>
            )}
          </Formik>

          {/* Footer Section */}
          <div className="text-center pt-md border-t border-outline-variant/50 dark:border-gray-700 mt-sm">
            <p className="font-body-sm text-body-sm text-secondary dark:text-gray-400">
              Don't have an account? 
              <Link className="font-label-md text-label-md text-primary dark:text-blue-400 hover:text-primary-container transition-colors ml-xs" to="/register">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
