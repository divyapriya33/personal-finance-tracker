import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import BudgetsPage from "./pages/BudgetsPage";
import ReportsPage from "./pages/ReportsPage";
import InsightsPage from "./pages/InsightsPage";
import SettingsPage from "./pages/SettingsPage";
import GoalsPage from "./pages/GoalsPage";
import { Toaster } from "react-hot-toast";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [transactions, setTransactions] = useState([]);

  // ✅ LOAD USER EVERY TIME APP STARTS
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);

      const saved = localStorage.getItem(`transactions_${user}`);
      setTransactions(saved ? JSON.parse(saved) : []);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // ✅ SAVE TRANSACTIONS
  useEffect(() => {
    if (!currentUser) return;

    localStorage.setItem(
      `transactions_${currentUser}`,
      JSON.stringify(transactions)
    );
  }, [transactions, currentUser]);

  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white">

      {isLoggedIn && <Navbar />}

      <Toaster position="top-right" />

      <Routes>

        {/* DEFAULT */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />

        {/* PUBLIC */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* PROTECTED */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage transactions={transactions} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <TransactionsPage
                transactions={transactions}
                setTransactions={setTransactions}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/budgets"
          element={
            <ProtectedRoute>
              <BudgetsPage transactions={transactions} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <ReportsPage transactions={transactions} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/insights"
          element={
            <ProtectedRoute>
              <InsightsPage transactions={transactions} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/goals"
          element={
            <ProtectedRoute>
              <GoalsPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>
  );
}

export default App;