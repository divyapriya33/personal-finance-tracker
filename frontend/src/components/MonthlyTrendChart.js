import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function MonthlyTrendChart({ transactions = [] }) {

  const monthlyTotals = {};

  transactions.forEach((tx) => {

    if (!tx.date) return;

    const month = new Date(tx.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    if (tx.amount < 0) {
      monthlyTotals[month] =
        (monthlyTotals[month] || 0) + Math.abs(tx.amount);
    }

  });

  const labels = Object.keys(monthlyTotals);
  const dataValues = Object.values(monthlyTotals);

  const data = {
    labels,
    datasets: [
      {
        label: "Monthly Expenses",
        data: dataValues,
        borderColor: "#a855f7",
        backgroundColor: "rgba(168, 85, 247, 0.3)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "#c4b5fd",
        },
      },
      tooltip: {
        backgroundColor: "#121826",
        titleColor: "#c4b5fd",
        bodyColor: "#ffffff",
        borderColor: "#a855f7",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: "#c4b5fd" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      y: {
        ticks: { color: "#c4b5fd" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
    },
  };

  return (
    <div className="neon-card mt-6">
      <h3 className="text-xl font-semibold mb-4 text-purple-300">
        📈 Monthly Expense Trend
      </h3>

      {labels.length === 0 ? (
        <p className="text-purple-400">No data available</p>
      ) : (
        <Line data={data} options={options} />
      )}
    </div>
  );
}

export default MonthlyTrendChart;