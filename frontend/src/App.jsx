import { Outlet } from "react-router-dom";
import Header from "./Components/Header";

// import "./App.css";
function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-gray-300">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default App;
