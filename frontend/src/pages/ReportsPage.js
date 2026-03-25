import { useState } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ReportsPage({ transactions }) {

  const [selectedMonth, setSelectedMonth] = useState("");

  const filteredTransactions = selectedMonth
    ? transactions.filter((t) => t.date?.startsWith(selectedMonth))
    : transactions;

  const normalizedTransactions = filteredTransactions.map((t) => ({
    ...t,
    category: t.category?.toLowerCase()
  }));

  const totalExpense = normalizedTransactions
    .filter((t) => t.category !== "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const categoryTotals = {};

  normalizedTransactions.forEach((t) => {
    if (t.category !== "income") {
      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) + t.amount;
    }
  });

  return (
    <div className="min-h-screen p-8 space-y-8 bg-gradient-to-br from-[#0b0f1a] via-[#0e1325] to-[#070a14]">

      {/* ✅ SAAS HEADER WITH FILTER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >

        <div>
          <h2 className="text-3xl font-bold text-purple-300">
            📊 Financial Reports
          </h2>

          <p className="text-purple-400 text-sm">
            View monthly category breakdown and expense distribution
          </p>
        </div>

        {/* 👉 REAL SAAS: filter lives in header */}
        <DatePicker
          selected={selectedMonth ? new Date(selectedMonth) : null}
          onChange={(date) => {
            if (!date) return setSelectedMonth("");
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            setSelectedMonth(`${year}-${month}`);
          }}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          placeholderText="Select Month"
          className="premium-input w-64"
          popperClassName="neon-calendar"
        />

      </motion.div>


      {/* CATEGORY ANALYTICS */}
      <div className="neon-card p-8 space-y-6">

        <h3 className="text-xl font-semibold text-purple-300">
          Category-wise Expenses
        </h3>

        {Object.entries(categoryTotals).map(([cat, value]) => {

          const percent =
            totalExpense === 0
              ? 0
              : Math.min((value / totalExpense) * 100, 100);

          return (
            <motion.div
              key={cat}
              whileHover={{ scale: 1.02 }}
              className="space-y-2"
            >

              <div className="flex justify-between text-purple-200">
                <span className="capitalize">{cat}</span>
                <span>₹{Math.abs(value).toLocaleString()}</span>
              </div>

              <div className="w-full bg-purple-900/30 h-3 rounded-full overflow-hidden">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 1 }}
                  className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                />

              </div>

              <p className="text-xs text-purple-400">
                {percent.toFixed(1)}%
              </p>

            </motion.div>
          );
        })}

      </div>

    </div>
  );
}

export default ReportsPage;
