import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { registerUser } from "../api/api";
import { useState } from "react";

export default function Register() {
  // State to hold server error messages
  const [serverError, setServerError] = useState(null);
  // State to hold success message
  const [successMessage, setSuccessMessage] = useState(null);
  // Hook for navigation
  const navigate = useNavigate();
  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation schema using Yup for form validation
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid Email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required("Confirm Password is required"),
  });

  // Function to handle form submission
  async function createUser(values, { setSubmitting }) {
    try {
      // Exclude confirmPassword when sending to the server
      const { confirmPassword, ...submitData } = values;
      
      // Call the API to register the user
      await registerUser(submitData);
      setServerError(null);
      
      // Set success message and navigate to login page after a delay
      setSuccessMessage("Registration successful. Redirecting to login...");
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
    <div className="bg-background dark:bg-gray-900 min-h-[calc(100vh-80px)] flex flex-col justify-center items-center py-xl px-md relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary-container/20 dark:bg-blue-900/30 rounded-full blur-[100px]"></div>
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] bg-tertiary-container/10 dark:bg-emerald-900/20 rounded-full blur-[80px]"></div>
        <div className="absolute inset-0 bg-pattern opacity-50 dark:opacity-20 pointer-events-none"></div>
      </div>

      {/* Main Registration Container */}
      <main className="w-full max-w-[440px] z-10 relative">
        {/* Brand Header */}
        <div className="text-center mb-xl">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary-container dark:bg-blue-600 text-on-primary-container dark:text-white mb-md shadow-sm">
            <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              account_balance_wallet
            </span>
          </div>
          <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface dark:text-white mb-xs tracking-tight font-bold">
            SalaryTracker
          </h1>
          <p className="font-body-md text-body-md text-secondary dark:text-gray-400">
            Secure your financial future.
          </p>
        </div>

        {/* Registration Card */}
        <div className="bg-surface-container-lowest/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-[16px] border border-outline-variant dark:border-gray-700 shadow-lg p-lg sm:p-xl w-full">
          <div className="mb-lg text-center">
            <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-white font-semibold">Create Account</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-gray-400 mt-sm">Enter your details to get started.</p>
          </div>

          <Formik
            initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={createUser}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-md">
                {/* Full Name Input */}
                <div className="relative group">
                  <label className="block font-label-md text-label-md text-on-surface-variant dark:text-gray-300 mb-xs" htmlFor="name">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant dark:text-gray-500 group-focus-within:text-primary dark:group-focus-within:text-blue-400 transition-colors pointer-events-none">
                      person
                    </span>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      autoComplete="off"
                      placeholder="John Doe"
                      className="w-full pl-[40px] pr-md py-[10px] bg-surface dark:bg-gray-900 border border-outline-variant dark:border-gray-700 rounded-lg font-body-md text-body-md text-on-surface dark:text-white placeholder:text-outline/50 dark:placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
                    />
                    <ErrorMessage name="name" component="div" className="absolute -bottom-5 text-xs text-red-500" />
                  </div>
                </div>

                {/* Email Input */}
                <div className="relative group mt-3">
                  <label className="block font-label-md text-label-md text-on-surface-variant dark:text-gray-300 mb-xs" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant dark:text-gray-500 group-focus-within:text-primary dark:group-focus-within:text-blue-400 transition-colors pointer-events-none">
                      mail
                    </span>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="off"
                      placeholder="john@example.com"
                      className="w-full pl-[40px] pr-md py-[10px] bg-surface dark:bg-gray-900 border border-outline-variant dark:border-gray-700 rounded-lg font-body-md text-body-md text-on-surface dark:text-white placeholder:text-outline/50 dark:placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
                    />
                    <ErrorMessage name="email" component="div" className="absolute -bottom-5 text-xs text-red-500" />
                  </div>
                </div>

                {/* Password Input */}
                <div className="relative group mt-3">
                  <label className="block font-label-md text-label-md text-on-surface-variant dark:text-gray-300 mb-xs" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant dark:text-gray-500 group-focus-within:text-primary dark:group-focus-within:text-blue-400 transition-colors pointer-events-none">
                      lock
                    </span>
                    <Field
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      autoComplete="off"
                      placeholder="••••••••"
                      className="w-full pl-[40px] pr-12 py-[10px] bg-surface dark:bg-gray-900 border border-outline-variant dark:border-gray-700 rounded-lg font-body-md text-body-md text-on-surface dark:text-white placeholder:text-outline/50 dark:placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
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
                  <p className="font-label-sm text-label-sm text-outline dark:text-gray-500 mt-xs">Must be at least 6 characters long.</p>
                </div>

                {/* Confirm Password Input */}
                <div className="relative group mt-1">
                  <label className="block font-label-md text-label-md text-on-surface-variant dark:text-gray-300 mb-xs" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant dark:text-gray-500 group-focus-within:text-primary dark:group-focus-within:text-blue-400 transition-colors pointer-events-none">
                      lock_reset
                    </span>
                    <Field
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      autoComplete="off"
                      placeholder="••••••••"
                      className="w-full pl-[40px] pr-12 py-[10px] bg-surface dark:bg-gray-900 border border-outline-variant dark:border-gray-700 rounded-lg font-body-md text-body-md text-on-surface dark:text-white placeholder:text-outline/50 dark:placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface dark:hover:text-white transition-colors flex items-center justify-center p-1 rounded-md hover:bg-surface-variant dark:hover:bg-gray-700"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showConfirmPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                    <ErrorMessage name="confirmPassword" component="div" className="absolute -bottom-5 text-xs text-red-500" />
                  </div>
                </div>

                {/* Server Error Message */}
                {serverError && (
                  <p className="text-center text-red-500 text-sm mt-3">{serverError}</p>
                )}

                {/* Success Message */}
                {successMessage && (
                  <p className="text-center text-emerald-500 dark:text-emerald-400 text-sm mt-3">{successMessage}</p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-lg bg-primary hover:bg-surface-tint dark:bg-blue-600 dark:hover:bg-blue-700 text-on-primary font-label-lg text-label-lg py-[12px] rounded-lg shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-sm mt-sm"
                >
                  Sign Up
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </Form>
            )}
          </Formik>

          {/* Footer Login Link */}
          <p className="text-center font-body-sm text-body-sm text-on-surface-variant dark:text-gray-400 mt-lg pt-md border-t border-outline-variant/50 dark:border-gray-700">
            Already have an account? 
            <Link className="font-label-md text-label-md text-primary dark:text-blue-400 hover:underline hover:text-surface-tint transition-colors ml-xs" to="/login">
              Log in
            </Link>
          </p>
        </div>

        {/* Privacy Policy subtle link */}
        <div className="mt-lg text-center pb-xl">
          <p className="font-label-sm text-label-sm text-outline dark:text-gray-500">
            By signing up, you agree to our <a className="underline hover:text-primary dark:hover:text-blue-400 transition-colors cursor-pointer">Terms of Service</a> and <a className="underline hover:text-primary dark:hover:text-blue-400 transition-colors cursor-pointer">Privacy Policy</a>.
          </p>
        </div>
      </main>
    </div>
  );
}
