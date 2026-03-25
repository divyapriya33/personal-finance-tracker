import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import Budget from "../components/Budget";
import BudgetSummary from "../components/BudgetSummary";
import BudgetAlert from "../components/BudgetAlert";

function BudgetsPage({ transactions }) {

  const currentUser = localStorage.getItem("user");

  // 🔥 LOAD PROFILE (FOR SALARY)
  const savedProfile =
    JSON.parse(localStorage.getItem(`profile_${currentUser}`)) || {};

  const salary = Number(savedProfile.salary) || 0;

  // ✅ INITIAL STATE
  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem(`budgets_${currentUser}`);
    return saved ? JSON.parse(saved) : {};
  });

  // 🔥 AUTO CREATE DEFAULT BUDGET (PER USER)
  useEffect(() => {
    if (!currentUser) return;

    const existing = localStorage.getItem(`budgets_${currentUser}`);

    if (!existing) {
      // 💡 SALARY BASED DEFAULT (SMART FEATURE)
      const defaultBudgets = {
        Food: Math.round(salary * 0.2),
        Transport: Math.round(salary * 0.1),
        Bills: Math.round(salary * 0.3),
        Shopping: Math.round(salary * 0.15),
        Entertainment: Math.round(salary * 0.1),
        Other: Math.round(salary * 0.15)
      };

      setBudgets(defaultBudgets);

      localStorage.setItem(
        `budgets_${currentUser}`,
        JSON.stringify(defaultBudgets)
      );
    }
  }, [currentUser, salary]);

  // ✅ SAVE BUDGETS
  useEffect(() => {
    if (!currentUser) return;

    localStorage.setItem(
      `budgets_${currentUser}`,
      JSON.stringify(budgets)
    );
  }, [budgets, currentUser]);

  // ✅ USER TRANSACTIONS ONLY
  const userTransactions = transactions.filter(
    (tx) => tx.userId === currentUser
  );

  return (
    <div className="min-h-screen p-8 space-y-8 bg-gradient-to-br from-[#0b0f1a] via-[#0e1325] to-[#070a14]">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >

        <div>
          <h2 className="text-3xl font-bold text-purple-300">
            💳 Monthly Budgets
          </h2>

          <p className="text-purple-400 text-sm">
            Set limits and monitor category spending
          </p>
        </div>

        <div className="text-purple-400 text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </div>

      </motion.div>

      {/* SET BUDGET */}
      <div className="neon-card p-6">
        <Budget budgets={budgets} setBudgets={setBudgets} />
      </div>

      {/* SUMMARY */}
      <div className="neon-card p-6">
        <BudgetSummary
          transactions={userTransactions}
          budgets={budgets}
        />
      </div>

      {/* ALERT */}
      <BudgetAlert
        transactions={userTransactions}
        budgets={budgets}
      />

    </div>
  );
}

export default BudgetsPage;