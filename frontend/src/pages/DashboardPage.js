import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

import MonthlyExpenseChart from "../components/MonthlyTrendChart";
import CategoryDonutChart from "../components/CategoryDonutChart";

function DashboardPage({ transactions = [] }) {

  const currentUser = localStorage.getItem("user");

  // 🔥 PROFILE STATES
  const [showSetup, setShowSetup] = useState(false);
  const [name, setName] = useState("");
  const [salaryInput, setSalaryInput] = useState("");

  const savedProfile =
    JSON.parse(localStorage.getItem(`profile_${currentUser}`)) || {};

  const salary = savedProfile.salary || 0;
  const userName = savedProfile.name || currentUser || "User";

  // ✅ CHECK PROFILE
  useEffect(() => {
    const profile = localStorage.getItem(`profile_${currentUser}`);

    if (!profile) {
      setShowSetup(true);
    }
  }, [currentUser]);

  // ✅ SAVE PROFILE
  const handleSaveProfile = () => {
    if (!name || !salaryInput) {
      alert("Please fill all fields");
      return;
    }

    const profile = {
      name,
      salary: Number(salaryInput)
    };

    localStorage.setItem(`profile_${currentUser}`, JSON.stringify(profile));

    setShowSetup(false);

    // refresh to update dashboard values
    window.location.reload();
  };

  // 📊 CALCULATIONS
  const totalIncome = transactions
    .filter(t => Number(t.amount) > 0)
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter(t => Number(t.amount) < 0)
    .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0);

  const balance = totalIncome - totalExpense;
  const savings = salary - totalExpense;

  return (
    <div className="min-h-screen p-8 space-y-8 bg-gradient-to-br from-[#0b0f1a] via-[#0e1325] to-[#070a14]">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >

        <div>
          <h2 className="text-3xl font-bold text-purple-300">
            📊 Dashboard
          </h2>

          <p className="text-purple-400 text-sm">
            Welcome back, {userName} 👋
          </p>
        </div>

        <div className="text-purple-400 text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </div>

      </motion.div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

        <SummaryCard title="Income" value={totalIncome} icon="💰" />
        <SummaryCard title="Expense" value={totalExpense} icon="💸" />
        <SummaryCard title="Balance" value={balance} icon="🏦" />
        <SummaryCard title="Salary" value={salary} icon="💼" />
        <SummaryCard title="Savings" value={savings} icon="🏛" />

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="neon-card">
          <MonthlyExpenseChart transactions={transactions} />
        </div>

        <div className="neon-card">
          <CategoryDonutChart transactions={transactions} />
        </div>

      </div>

      {/* 🔥 PROFILE SETUP MODAL */}
      {showSetup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="neon-card p-8 w-96 space-y-6">

            <h2 className="text-2xl font-bold text-purple-300 text-center">
              Setup Your Profile
            </h2>

            <input
              type="text"
              placeholder="Enter your name"
              className="premium-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="number"
              placeholder="Enter your salary"
              className="premium-input"
              value={salaryInput}
              onChange={(e) => setSalaryInput(e.target.value)}
            />

            <button
              onClick={handleSaveProfile}
              className="bg-gradient-to-r from-purple-600 to-pink-600 w-full py-2 rounded-xl"
            >
              Save & Continue
            </button>

          </div>
        </div>
      )}

    </div>
  );
}


/* KPI CARD */
function SummaryCard({ title, value, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="summary-card"
    >
      <div>
        <p className="text-purple-400 text-sm">{title}</p>

        <h2 className="text-2xl font-bold text-purple-100">
          ₹<CountUp end={value} duration={1.5} separator="," />
        </h2>
      </div>

      <div className="icon-circle bg-gradient-to-br from-purple-500 to-pink-500">
        {icon}
      </div>
    </motion.div>
  );
}

export default DashboardPage;