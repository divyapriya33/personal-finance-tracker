import { useEffect } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function PremiumToast({ icon, title, percent, color }) {

  return (
    <motion.div
      initial={{ x: 120, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="w-72 bg-[#121826] rounded-xl shadow-xl p-4 border-l-4"
      style={{ borderColor: color }}
    >

      <div className="flex items-center gap-3">

        <span className="text-2xl">{icon}</span>

        <div>
          <p className="font-semibold text-purple-200">
            {title}
          </p>

          <p className="text-sm text-purple-400">
            {percent}% of budget used
          </p>
        </div>

      </div>

      <div className="mt-3 w-full bg-purple-900/30 rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all"
          style={{
            width: `${Math.min(percent, 100)}%`,
            backgroundColor: color
          }}
        />
      </div>

    </motion.div>
  );
}

function BudgetAlert({ transactions = [], budgets = {} }) {

  useEffect(() => {

    Object.keys(budgets).forEach((category) => {

      const limit = budgets[category];
      if (!limit) return;

      const spent = transactions
        .filter(
          (tx) =>
            tx.amount < 0 &&
            tx.category?.toLowerCase() === category.toLowerCase()
        )
        .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

      const percent = Math.round((spent / limit) * 100);

      if (percent >= 80 && percent < 100) {
        toast.custom(() =>
          <PremiumToast
            icon="⚠"
            title={`${category.toUpperCase()} Budget Warning`}
            percent={percent}
            color="#facc15"
          />
        );
      }

      if (percent >= 100) {
        toast.custom(() =>
          <PremiumToast
            icon="❌"
            title={`${category.toUpperCase()} Budget Exceeded`}
            percent={percent}
            color="#ef4444"
          />
        );
      }

    });

  }, [transactions, budgets]);

  return null;
}

export default BudgetAlert;