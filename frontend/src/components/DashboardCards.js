import { motion } from "framer-motion";
import CountUp from "react-countup";

function DashboardCards({ transactions, salary, savings }) {

  const totalIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0);

  const balance = totalIncome - totalExpense;

  const cards = [
    { label: "Income", value: totalIncome, color: "text-purple-500" },
    { label: "Expense", value: totalExpense, color: "text-red-500" },
    { label: "Balance", value: balance, color: "text-blue-500" },
    { label: "Salary", value: salary || 0, color: "text-yellow-500" },
    { label: "Savings", value: savings || 0, color: "text-purple-500" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {cards.map((card, index) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15 }}
          whileHover={{ y: -6, scale: 1.02 }}
          className="neon-card"
        >
          <p className="text-sm text-gray-500">
            {card.label}
          </p>

          <h2 className={`text-2xl font-bold ${card.color}`}>
            ₹
            <CountUp
              start={0}
              end={card.value}
              duration={1.2}
              separator=","
            />
          </h2>
        </motion.div>
      ))}

    </div>
  );
}

export default DashboardCards;
