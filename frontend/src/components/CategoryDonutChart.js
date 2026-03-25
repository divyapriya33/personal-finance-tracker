import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryDonutChart({ transactions = [] }) {

  const budgets = {
    food: 5000,
    transport: 3000,
    bills: 8000,
    shopping: 4000,
  };

  const categories = Object.keys(budgets);

  const spent = categories.map((cat) =>
    transactions
      .filter(
        (t) =>
          t.category?.toLowerCase() === cat &&
          Number(t.amount) < 0
      )
      .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0)
  );

  const totalSpent = spent.reduce((a, b) => a + b, 0);

  const data = {
    labels: categories.map((c) => c.toUpperCase()),
    datasets: [
      {
        data: spent,
        backgroundColor: [
          "#a855f7",
          "#8b5cf6",
          "#6366f1",
          "#ec4899",
        ],
        borderWidth: 0,
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
  };

  return (
    <div className="neon-card w-full">
      <h3 className="text-lg font-semibold mb-4 text-purple-300">
        🍩 Category Expenses
      </h3>

      {totalSpent === 0 ? (
        <p className="text-center text-purple-400 mt-12">
          No expenses recorded
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

          <div className="flex justify-center">
            <div className="w-[260px]">
              <Doughnut data={data} options={options} />
            </div>
          </div>

          <div className="space-y-4">
            {categories.map((cat, index) => {

              const amount = spent[index];
              const percent = ((amount / totalSpent) * 100).toFixed(1);

              return (
                <div key={cat} className="flex justify-between items-center">

                  <div className="flex items-center gap-3">
                    <span
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
                    />
                    <span className="capitalize text-purple-200">
                      {cat}
                    </span>
                  </div>

                  <div className="text-sm text-right text-purple-300">
                    <p>₹{amount}</p>
                    <p className="text-purple-400">{percent}%</p>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}
    </div>
  );
}

export default CategoryDonutChart;