import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col font-body-md text-body-md antialiased hero-gradient dark:text-gray-200">
      <Header />
      
      {/* Main Content */}
      <main className="flex-grow pt-[104px] pb-xxl px-gutter">
        <div className="max-w-container-max mx-auto">
          {/* Hero Section */}
          <section className="flex flex-col lg:flex-row items-center gap-xxl py-xl lg:py-xxl">
            <div className="w-full lg:w-1/2 flex flex-col items-start gap-lg z-10">
              <div className="inline-flex items-center gap-xs px-sm py-xs rounded-full bg-surface-container-high dark:bg-gray-800 border border-outline-variant dark:border-gray-700 text-primary dark:text-blue-400 font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-sm">rocket_launch</span>
                v2.0 is now live
              </div>
              <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface dark:text-white leading-tight">
                Take Control of Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container dark:from-blue-400 dark:to-blue-600">
                  Finances
                </span>
              </h1>
              <p className="font-body-lg text-body-lg text-secondary dark:text-gray-300 max-w-xl">
                The simplest way to track your income, manage expenses, and grow your savings. Professional-grade tools designed for everyone.
              </p>
              <div className="flex flex-col sm:flex-row gap-md mt-sm w-full sm:w-auto">
                <Link
                  className="w-full sm:w-auto font-label-lg text-label-lg bg-primary text-on-primary px-xl py-md rounded-lg shadow-md hover:shadow-lg hover:bg-primary-container dark:hover:bg-blue-600 transition-all flex items-center justify-center gap-sm active:scale-95"
                  to="/register"
                >
                  Get Started
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
                <button className="w-full sm:w-auto font-label-lg text-label-lg bg-surface dark:bg-gray-800 text-primary dark:text-blue-400 border border-outline-variant dark:border-gray-700 px-xl py-md rounded-lg hover:bg-surface-container-low dark:hover:bg-gray-700 transition-all active:scale-95">
                  Learn More
                </button>
              </div>
              <div className="mt-lg flex items-center gap-sm text-secondary dark:text-gray-400 font-label-sm text-label-sm">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-surface-container-highest dark:bg-gray-700 border-2 border-surface dark:border-gray-800 flex items-center justify-center text-xs">
                    JD
                  </div>
                  <div className="w-8 h-8 rounded-full bg-secondary-container dark:bg-slate-600 border-2 border-surface dark:border-gray-800 flex items-center justify-center text-xs">
                    AM
                  </div>
                  <div className="w-8 h-8 rounded-full bg-tertiary-container dark:bg-emerald-700 text-on-tertiary-container dark:text-emerald-100 border-2 border-surface dark:border-gray-800 flex items-center justify-center text-xs">
                    RK
                  </div>
                </div>
                <span>Join 10,000+ users tracking their wealth.</span>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative">
              {/* Decorative blur blobs behind the image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary-container/20 dark:bg-blue-900/30 rounded-full blur-3xl -z-10"></div>
              <div className="glass-panel rounded-xl p-xs shadow-xl overflow-hidden border border-outline-variant dark:border-gray-700 transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-surface dark:bg-gray-800 rounded-lg overflow-hidden border border-surface-variant dark:border-gray-700">
                  {/* Simulated Dashboard Top Bar */}
                  <div className="h-8 bg-surface-container-low dark:bg-gray-900 border-b border-surface-variant dark:border-gray-700 flex items-center px-sm gap-xs">
                    <div className="w-2 h-2 rounded-full bg-error"></div>
                    <div className="w-2 h-2 rounded-full bg-secondary-container"></div>
                    <div className="w-2 h-2 rounded-full bg-tertiary-fixed"></div>
                  </div>
                  <img
                    alt="Financial Dashboard Preview"
                    className="w-full h-auto object-cover opacity-90 mix-blend-multiply dark:mix-blend-screen"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcWxpiP4ALMzluXEsrP-d4AF1I28ZVJryJw_I5FYQtId-tpmC_tEOwVwBqekHoLMzEs8IA5Yh3j-aNCvA5FUbylj41juPgp3OuFoQt8ksEhg7Ghp98cHAuuvcQilfvbuJHkJmXlIo0EH1n_Nmoxxq5C1lUNPlhsb2t_jcrdgS0LxaPvZKYaVTR6vBaiaZBEPYnNFJtAQcdnlTPRLyYkY7OdnIk-k6ubxKXTB132Vf7s4_YuBB9E4n_9OKTC4nFVDGXL4r8_dZ7f5Y"
                  />
                </div>
              </div>
              {/* Floating UI Element */}
              <div
                className="absolute -bottom-6 -left-6 glass-panel rounded-lg p-md shadow-lg flex items-center gap-md border border-outline-variant dark:border-gray-700 hidden sm:flex animate-bounce"
                style={{ animationDuration: "3s" }}
              >
                <div className="w-10 h-10 rounded-full bg-tertiary-fixed/20 dark:bg-emerald-900/50 text-tertiary-container dark:text-emerald-400 flex items-center justify-center">
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-secondary dark:text-gray-400">Total Savings</p>
                  <p className="font-headline-sm text-headline-sm text-on-surface dark:text-white font-bold">
                    +$4,250.00
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Features Section (Bento Grid Style) */}
          <section className="py-xxl">
            <div className="text-center mb-xl">
              <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-white mb-sm">
                Everything you need, nothing you don't.
              </h2>
              <p className="font-body-lg text-body-lg text-secondary dark:text-gray-300 max-w-2xl mx-auto">
                Designed for clarity and speed, our tools help you understand your financial picture instantly.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
              {/* Feature 1 */}
              <div className="bg-surface-container-lowest dark:bg-gray-800 rounded-xl p-lg border border-outline-variant dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-gray-900/50 transition-shadow group flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 dark:bg-blue-500/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
                <div className="w-12 h-12 rounded-lg bg-primary-container/10 dark:bg-blue-500/20 text-primary dark:text-blue-400 flex items-center justify-center mb-md z-10">
                  <span className="material-symbols-outlined">account_balance</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface dark:text-white mb-sm z-10">
                  Track Your Salary
                </h3>
                <p className="font-body-sm text-body-sm text-secondary dark:text-gray-300 flex-grow z-10">
                  Set your base salary, expected bonuses, and deductions. Watch your net income grow and project future earnings with precision.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="bg-surface-container-lowest dark:bg-gray-800 rounded-xl p-lg border border-outline-variant dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-gray-900/50 transition-shadow group flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary-container/5 dark:bg-emerald-500/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
                <div className="w-12 h-12 rounded-lg bg-tertiary-container/10 dark:bg-emerald-500/20 text-tertiary-container dark:text-emerald-400 flex items-center justify-center mb-md z-10">
                  <span className="material-symbols-outlined">receipt_long</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface dark:text-white mb-sm z-10">
                  Log Transactions
                </h3>
                <p className="font-body-sm text-body-sm text-secondary dark:text-gray-300 flex-grow z-10">
                  Fast, easy entry for every expense. Categorize spending automatically and attach receipts for a complete financial record.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="bg-surface-container-lowest dark:bg-gray-800 rounded-xl p-lg border border-outline-variant dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-gray-900/50 transition-shadow group flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 dark:bg-slate-500/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
                <div className="w-12 h-12 rounded-lg bg-secondary-container/30 dark:bg-slate-500/20 text-on-secondary-container dark:text-slate-300 flex items-center justify-center mb-md z-10">
                  <span className="material-symbols-outlined">filter_alt</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface dark:text-white mb-sm z-10">
                  Smart Filters
                </h3>
                <p className="font-body-sm text-body-sm text-secondary dark:text-gray-300 flex-grow z-10">
                  Analyze your history by date, category, or custom tags. Uncover hidden spending habits with powerful visual reports.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      {/* Footer Component */}
      <footer className="bg-surface-bright dark:bg-inverse-surface w-full py-xl border-t border-outline-variant dark:border-outline">
        <div className="flex flex-col md:flex-row justify-between items-center px-gutter max-w-container-max mx-auto gap-md">
          {/* Brand / Copyright */}
          <div className="flex flex-col items-center md:items-start gap-xs">
            <span className="font-label-lg text-label-lg font-bold text-on-surface dark:text-inverse-on-surface">
              SalaryTracker
            </span>
            <span className="font-body-sm text-body-sm text-secondary dark:text-secondary-fixed-dim">
              © 2024 SalaryTracker. All rights reserved.
            </span>
          </div>
          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-md">
            <a
              className="font-body-sm text-body-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary-fixed-dim hover:underline transition-colors opacity-80 hover:opacity-100"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="font-body-sm text-body-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary-fixed-dim hover:underline transition-colors opacity-80 hover:opacity-100"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="font-body-sm text-body-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary-fixed-dim hover:underline transition-colors opacity-80 hover:opacity-100"
              href="#"
            >
              Support
            </a>
            <a
              className="font-body-sm text-body-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary-fixed-dim hover:underline transition-colors opacity-80 hover:opacity-100"
              href="#"
            >
              Contact
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
