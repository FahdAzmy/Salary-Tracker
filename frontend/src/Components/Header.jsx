import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import Cookies from "js-cookie";
import { AuthContext } from "../contexts/AuthContext";

function Header() {
  // const [isLoggedIn, setIsLoggedIn] = useState(null);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => {
      localStorage.setItem("darkMode", !prevDarkMode);
      return !prevDarkMode;
    });
  };

  function handleLogout() {
    Cookies.remove("token"); // إزالة التوكن من الكوكيز
    setIsLoggedIn(false); // تعيين حالة تسجيل الخروج
    navigate("/login"); // إعادة التوجيه لصفحة تسجيل الدخول
  }
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg dark:border-b-2 dark:border-slate-700  p-4 max-md:p-2 max-md:pb-2.5">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left: Page Title */}
        <div className="text-xl max-md:text-lg font-bold text-gray-800 dark:text-white">
          Salary Tracker
        </div>

        {/* Right: Login, Register, Dark Mode Toggle */}
        <div className="flex items-center space-x-2 gap-1 max-md:space-x-3">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-white dark:text-white max-md:text-sm bg-red-500 outline outline-red-500 px-6 py-2 font-bold rounded-lg outline-1 hover:bg-red-600 max-md:px-2.5"
            >
              Logout
            </button>
          ) : (
            // إذا لم يكن المستخدم مسجلًا، عرض أزرار تسجيل الدخول والتسجيل
            <>
              <Link
                to={"/login"}
                className="text-white dark:text-white max-md:text-sm bg-blue-500 outline outline-blue-500 px-6 py-2 font-bold rounded-lg outline-1 hover:bg-blue-600 max-md:px-2.5"
              >
                Login
              </Link>

              <Link
                to={"/register"}
                className="text-white dark:text-white max-md:text-sm bg-blue-500 outline outline-blue-500 px-5 py-2 font-bold rounded-lg outline-1 hover:bg-blue-600 max-md:px-2.5"
              >
                Register
              </Link>
            </>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="w-7 h-7 outline outline-2 justify-center rounded-2xl outline-yellow-600 dark:outline-gray-600"
          >
            {darkMode ? (
              <MoonIcon className="p-1 text-gray-500" />
            ) : (
              <SunIcon className="p-1 text-yellow-600" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
