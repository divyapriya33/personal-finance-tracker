import { useState } from "react";
import { motion } from "framer-motion";

import InsightsMonthlyComparison from "../components/InsightsMonthlyComparison";
import InsightsHighestMonth from "../components/InsightsHighestMonth";
import InsightsGrowth from "../components/InsightsGrowth";
import InsightsRisk from "../components/InsightsRisk";
import InsightsAdvice from "../components/InsightsAdvice";
import FinancialHealthMeter from "../components/FinancialHealthMeter";
import InsightsMonthDecision from "../components/InsightsMonthDecision";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function InsightsPage({ transactions = [] }) {

  const currentUser = localStorage.getItem("user");

  const savedProfile =
    JSON.parse(localStorage.getItem(`profile_${currentUser}`)) || {};

  const salary = Number(savedProfile.salary) || 0;

  const budgets =
    JSON.parse(localStorage.getItem(`budgets_${currentUser}`)) || {};

  const userTransactions = transactions.filter(
    (tx) => tx.userId === currentUser
  );

  const [selectedMonth, setSelectedMonth] = useState(null);

  // =========================
  // 📊 MONTH FILTER
  // =========================
  const filteredTransactions = selectedMonth
    ? userTransactions.filter((tx) => {
        if (!tx.date) return false;
        const d = new Date(tx.date);
        return (
          d.getFullYear() === selectedMonth.getFullYear() &&
          d.getMonth() === selectedMonth.getMonth()
        );
      })
    : [];

  let income = 0;
  let expense = 0;

  filteredTransactions.forEach(tx => {
    const a = Number(tx.amount);
    if (a > 0) income += a;
    else expense += Math.abs(a);
  });

  const balance = income - expense;

  // =========================
  // 💰 HEALTH SCORE
  // =========================
  let totalExpenseAll = 0;

  userTransactions.forEach(tx => {
    const a = Number(tx.amount);
    if (a < 0) totalExpenseAll += Math.abs(a);
  });

  const savings = salary - totalExpenseAll;

  const healthScore =
    salary > 0
      ? Math.max(0, Math.min(100, Math.round((savings / salary) * 100)))
      : 0;

  // =========================
  // 🔥 NEW: MONTHLY ANALYSIS
  // =========================

  const monthsOrder = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const monthlyMap = {};

  userTransactions.forEach(tx => {
    const d = new Date(tx.date);
    const m = monthsOrder[d.getMonth()];
    const amt = Number(tx.amount);

    if (!monthlyMap[m]) monthlyMap[m] = 0;

    if (amt < 0) {
      monthlyMap[m] += Math.abs(amt);
    }
  });

  const monthlyData = monthsOrder
    .filter(m => monthlyMap[m])
    .map(m => ({
      month: m,
      amount: monthlyMap[m]
    }));

  const withDiff = monthlyData.map((m, i) => {
    if (i === 0) return { ...m, diff: 0 };
    return {
      ...m,
      diff: m.amount - monthlyData[i - 1].amount
    };
  });

  const total = monthlyData.reduce((s, m) => s + m.amount, 0);
  const avg = monthlyData.length ? Math.round(total / monthlyData.length) : 0;

  const current = monthlyData[monthlyData.length - 1] || { amount: 0, month: "-" };
  const diffFromAvg = current.amount - avg;

  // =========================
  // UI
  // =========================

  return (
    <div className="min-h-screen p-8 space-y-10 bg-gradient-to-br from-[#0b0f1a] via-[#0e1325] to-[#070a14]">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold text-purple-300">
            📊 Smart Financial Insights
          </h2>
          <p className="text-purple-400 text-sm">
            Automated financial analysis overview
          </p>
        </div>

        <div className="text-purple-400 text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </motion.div>


      {/* MONTH SELECT */}
      <div className="neon-card p-6">

        <label className="text-purple-200 font-semibold">
          📅 Select Month
        </label>

        <DatePicker
          selected={selectedMonth}
          onChange={(d) => setSelectedMonth(d)}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          placeholderText="Select Month"
          className="premium-input w-64"
        />

        {selectedMonth && (
          <div className="grid md:grid-cols-3 gap-6 mt-6">

            <div className="summary-card">
              <p>Income</p>
              <h3>₹{income}</h3>
            </div>

            <div className="summary-card">
              <p>Expense</p>
              <h3>₹{expense}</h3>
            </div>

            <div className="summary-card">
              <p>Balance</p>
              <h3>₹{balance}</h3>
            </div>

          </div>
        )}
      </div>


      {/* ⭐ MONTH DECISION */}
      <InsightsMonthDecision
        transactions={userTransactions}
        selectedMonth={selectedMonth}
      />


      {/* 📊 MONTHLY BREAKDOWN (NEW) */}
      <div className="neon-card p-6">
        <h3 className="text-xl font-semibold mb-4">📊 Monthly Breakdown</h3>

        {withDiff.map((m, i) => (
          <div key={i} className="flex justify-between py-2 border-b border-purple-800">

            <span>{m.month}</span>

            <span>₹{m.amount}</span>

            <span className={
              m.diff > 0 ? "text-red-400" : "text-green-400"
            }>
              {m.diff === 0 ? "-" :
                m.diff > 0 ? `🔺 +₹${m.diff}` : `🔻 ₹${m.diff}`}
            </span>

          </div>
        ))}
      </div>


      {/* 💡 AVERAGE INSIGHT (NEW) */}
      <div className="neon-card p-6">
        <h3 className="text-xl font-semibold mb-3">💡 Smart Insight</h3>

        <p>Average Spending: ₹{avg}</p>
        <p>{current.month}: ₹{current.amount}</p>

        {diffFromAvg > 0 ? (
          <p className="text-red-400">
            ⚠️ You spent ₹{diffFromAvg} more than average
          </p>
        ) : (
          <p className="text-green-400">
            ✅ You are below average
          </p>
        )}
      </div>


      {/* CHART */}
      <div className="neon-card p-6">
        <InsightsMonthlyComparison transactions={userTransactions} />
      </div>


      {/* GRID */}
      <div className="grid lg:grid-cols-2 gap-8">

        <div className="neon-card p-6">
          <InsightsHighestMonth transactions={userTransactions} />
        </div>

        <div className="neon-card p-6 flex justify-center">
          <FinancialHealthMeter score={healthScore} />
        </div>

        <div className="neon-card p-6">
          <InsightsGrowth transactions={userTransactions} />
        </div>

        <div className="neon-card p-6">
          <InsightsRisk transactions={userTransactions} budgets={budgets} />
        </div>

        <div className="neon-card p-6 lg:col-span-2">
          <InsightsAdvice transactions={userTransactions} />
        </div>

      </div>

    </div>
  );
}

export default InsightsPage;