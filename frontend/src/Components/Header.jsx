import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "../contexts/AuthContext";

function Header() {
  // Access authentication state from AuthContext
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // Initialize darkMode from localStorage; useState with lazy initialization
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  // Add or remove the "dark" class from the document element based on darkMode state
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Toggle dark mode state and save preference to localStorage
  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => {
      localStorage.setItem("darkMode", !prevDarkMode);
      return !prevDarkMode;
    });
  };

  // Handle user logout
  function handleLogout() {
    Cookies.remove("token");
    setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <header className="fixed top-0 w-full z-50 glass-panel border-b border-outline-variant dark:border-gray-700 shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center h-16 px-gutter max-w-container-max mx-auto">
        {/* Left: Page Title / Logo */}
        <Link to="/" className="flex items-center gap-sm">
          <span
            className="material-symbols-outlined text-primary dark:text-blue-400 text-2xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            account_balance_wallet
          </span>
          <span className="font-headline-md text-headline-md font-bold text-primary dark:text-blue-400 tracking-tight">
            SalaryTracker
          </span>
        </Link>

        {/* Right: Navigation Links */}
        <nav className="hidden md:flex items-center gap-lg">
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="font-label-lg text-label-lg text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="font-label-lg text-label-lg bg-red-500 text-white px-lg py-sm rounded-lg hover:bg-red-600 transition-colors shadow-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="font-label-lg text-label-lg text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="font-label-lg text-label-lg bg-primary text-on-primary px-lg py-sm rounded-lg hover:bg-primary-container dark:hover:bg-blue-600 transition-colors shadow-sm"
                to="/register"
              >
                Register
              </Link>
            </>
          )}

          {/* Dark Mode Toggle */}
          <button
            aria-label="Toggle Theme"
            className="text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors p-xs rounded-full hover:bg-surface-container-highest dark:hover:bg-gray-700"
            onClick={toggleDarkMode}
          >
            <span className="material-symbols-outlined">
              {darkMode ? "light_mode" : "dark_mode"}
            </span>
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-on-surface dark:text-white p-xs">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
