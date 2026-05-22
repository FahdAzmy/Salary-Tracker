# 💰 AI-Powered Salary Tracker

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white)

A modern, full-stack financial management dashboard designed to help you track your income and expenses seamlessly. Featuring a premium, responsive design system and an **intelligent AI chatbot** that allows you to manage your finances using natural language.

---

## ✨ Key Features

### 🤖 Smart AI Assistant (Powered by Gemini 2.0 via OpenRouter)
Say goodbye to manual data entry! Our floating AI financial assistant understands natural language context:
- **Add Transactions**: *"I bought a coffee for $5"* or *"Got paid $300 for freelance work"*
- **Edit Records**: *"Change my coffee transaction to $7"*
- **Delete Records**: *"Remove the groceries transaction"*
- **Smart Parsing**: Automatically categorizes as Income (adds to balance) or Expense (deducts from balance).

### 🎨 Premium UI / UX
- **Stitch Design System**: Built with modern, glassmorphic UI elements and soft gradients.
- **Dark Mode Support**: Seamless toggle between stunning light and dark themes.
- **Dynamic Dashboards**: Real-time balance updates, progress bars, and animated interactions.
- **Fully Responsive**: Optimized for desktop, tablet, and mobile screens.

### 📊 Core Functionality
- **Transaction Management**: Add, edit, delete, and view your complete financial history.
- **Smart Filtering**: Filter transactions by recent (This Month, Last Month) or view all.
- **Income/Expense Toggle**: Easily classify transactions to keep your balance strictly accurate.
- **Secure Authentication**: JWT-based secure user registration and login flows.

---

## 🛠️ Technology Stack

**Frontend**
- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Context API (State Management)

**Backend**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- OpenRouter API (LLM Integration)

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js installed on your machine
- MongoDB instance (local or Atlas)
- OpenRouter API Key (for the AI Chatbot)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Salary-Tracker
```

### 2. Backend Setup
Navigate to the backend directory, install dependencies, and configure environment variables.

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
OPENROUTER_API_KEY=your_openrouter_api_key
CORS_ORIGIN=http://localhost:5173
```

Start the backend server:
```bash
npm start
# or use nodemon for development
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, install dependencies, and configure environment variables.

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:3000/api/salarytracker
```

Start the frontend development server:
```bash
npm run dev
```

---

## 📱 Usage Guide

1. **Sign Up / Log In**: Create a new account or log into your existing one.
2. **Set Initial Salary**: Click the update icon next to your balance card to set your starting amount.
3. **Add via Form**: Use the "New Transaction" form to manually input expenses or income.
4. **Add via AI Chatbot**: Click the floating action button in the bottom right. Type something like *"Just spent $50 on groceries"* and hit enter. Watch the UI instantly update your balance and transaction list!
5. **Manage**: Use the edit/delete buttons on individual transactions, or ask the AI to do it for you.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📝 License

This project is licensed under the MIT License.
