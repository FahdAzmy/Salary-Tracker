import { useState, useRef, useEffect } from "react";
import { Salary } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function SetSalary() {
  const [salary, setSalary] = useState("");
  const [displaySalary, setDisplaySalary] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Auto-focus on mount
  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, []);

  const handleSalaryChange = (e) => {
    // Remove non-digits
    let value = e.target.value.replace(/\D/g, '');
    setSalary(value); // Store raw number string for API
    
    // Format with commas for display
    if (value) {
      setDisplaySalary(parseInt(value, 10).toLocaleString('en-US'));
    } else {
      setDisplaySalary("");
    }
  };

  function handleSalaryForm(e) {
    e.preventDefault();
    if (salary > 0) {
      Salary({ salary: salary });
      navigate("/dashboard");
    } else {
      alert("Please Enter a valid salary");
    }
  }

  return (
    <div className="bg-background dark:bg-gray-900 min-h-[calc(100vh-80px)] flex items-center justify-center p-gutter relative overflow-hidden font-body-md text-on-surface antialiased">
      {/* Ambient Background Blur */}
      <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] bg-primary/10 dark:bg-blue-900/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[15%] w-[500px] h-[500px] bg-tertiary-container/10 dark:bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Content Container */}
      <main className="w-full max-w-[520px] z-10 animate-[fadeInUp_0.6s_ease-out_forwards]">
        {/* Elevated Card */}
        <div className="bg-surface dark:bg-gray-800 rounded-xl border border-outline-variant dark:border-gray-700 shadow-sm p-xl md:p-xxl relative overflow-hidden">
          {/* Subtle Top Highlight */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary dark:from-blue-500 to-tertiary-fixed dark:to-emerald-400 opacity-80"></div>
          
          {/* Brand Anchor */}
          <div className="flex items-center gap-sm mb-lg">
            <div className="w-8 h-8 rounded bg-primary-container/20 dark:bg-blue-900/40 flex items-center justify-center text-primary dark:text-blue-400">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
            </div>
            <span className="font-label-lg text-label-lg text-on-surface dark:text-white tracking-wide">SalaryTracker</span>
          </div>

          {/* Headers */}
          <h1 className="font-headline-lg text-headline-lg text-on-surface dark:text-white mb-xs font-bold tracking-tight">
            Let's get started.
          </h1>
          <p className="font-body-lg text-body-lg text-secondary dark:text-gray-400 mb-xl">
            What is your current annual salary?
          </p>

          {/* Form */}
          <form onSubmit={handleSalaryForm} className="space-y-xl">
            {/* Input Group */}
            <div className="relative group">
              <label className="sr-only" htmlFor="salary-input">Current Salary Amount</label>
              <div className="relative flex items-center bg-surface-container-lowest dark:bg-gray-900 border-2 border-outline-variant dark:border-gray-700 rounded-xl overflow-hidden transition-all duration-300 focus-within:border-primary dark:focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-primary/10 dark:focus-within:ring-blue-500/20 hover:border-outline dark:hover:border-gray-500">
                {/* Prefix */}
                <div className="pl-lg pr-sm py-md text-primary/80 dark:text-blue-400/80 select-none flex items-center justify-center">
                  <span className="font-display-lg text-display-lg font-bold">$</span>
                </div>
                {/* Input Field */}
                <input
                  ref={inputRef}
                  id="salary-input"
                  name="salary"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={displaySalary}
                  onChange={handleSalaryChange}
                  placeholder="0"
                  className="w-full bg-transparent border-none outline-none font-display-lg text-display-lg font-bold text-on-surface dark:text-white py-lg pr-lg placeholder:text-outline-variant dark:placeholder:text-gray-600 focus:ring-0"
                />
              </div>
              {/* Subtle underline accent that animates on focus */}
              <div className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary dark:bg-blue-500 transition-all duration-300 group-focus-within:w-full opacity-0 group-focus-within:opacity-100"></div>
            </div>

            {/* Action Area */}
            <div className="pt-sm">
              <button 
                type="submit"
                className="w-full bg-primary hover:bg-surface-tint dark:bg-blue-600 dark:hover:bg-blue-700 text-on-primary font-label-lg text-label-lg py-[18px] rounded-lg shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-sm group"
              >
                <span>Save Salary</span>
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
              
              {/* Hint Text */}
              <div className="flex items-center justify-center gap-xs mt-md text-secondary dark:text-gray-400">
                <span className="material-symbols-outlined text-[16px]">info</span>
                <p className="font-body-sm text-body-sm">
                  You can update this later from your dashboard.
                </p>
              </div>
            </div>
          </form>
        </div>
      </main>

      {/* Injecting keyframes for animation since tailwind.config wasn't configured with this specifically */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
