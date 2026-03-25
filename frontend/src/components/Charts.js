import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Charts({ transactions = [] }) {
  const categories = [
    "Food",
    "Transport",
    "Bills",
    "Shopping",
    "Entertainment",
  ];

  const categoryTotals = categories.map((cat) =>
    transactions
      .filter((t) => t.category === cat)
      .reduce((sum, t) => sum + Number(t.amount), 0)
  );

  const income = transactions
    .filter((t) => t.category === "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.category !== "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const animationOptions = {
    responsive: true,
    animation: {
      duration: 1200,
      easing: "easeOutQuart",
    },
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div>
      <h3>📊 Analytics</h3>

      {/* PIE CHART */}
      <div style={{ width: "420px", marginBottom: "30px" }}>
        <Pie
          data={{
            labels: categories,
            datasets: [
              {
                label: "Expenses",
                data: categoryTotals,
                backgroundColor: [
                  "#ff6384",
                  "#36a2eb",
                  "#ffce56",
                  "#4caf50",
                  "#9c27b0",
                ],
              },
            ],
          }}
          options={animationOptions}
        />
      </div>

      {/* BAR CHART */}
      <div style={{ width: "420px" }}>
        <Bar
          data={{
            labels: ["Income", "Expense"],
            datasets: [
              {
                label: "Amount",
                data: [income, expense],
                backgroundColor: ["#4caf50", "#f44336"],
              },
            ],
          }}
          options={animationOptions}
        />
      </div>
    </div>
  );
}

export default Charts;
