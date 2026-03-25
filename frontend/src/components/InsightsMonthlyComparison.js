import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from "recharts";

function InsightsMonthlyComparison({ transactions }) {

  const monthlyTotals = {};

  transactions.forEach(tx => {
    if (tx.amount < 0 && tx.date) {
      const monthKey = tx.date.slice(0, 7);
      monthlyTotals[monthKey] =
        (monthlyTotals[monthKey] || 0) + Math.abs(tx.amount);
    }
  });

  const sortedMonths = Object.keys(monthlyTotals).sort();

  const data = sortedMonths.map(month => ({
    month: new Date(month + "-01").toLocaleString("default", {
      month: "short"
    }),
    expense: monthlyTotals[month]
  }));

  const highest = data.reduce(
    (max, item) => item.expense > max.expense ? item : max,
    { expense: 0 }
  );

  return (
    <div className="neon-card p-6">

      <h2 className="text-lg font-semibold mb-4 text-purple-300">
        Monthly Expense Comparison
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>

          <CartesianGrid
            stroke="rgba(168,85,247,0.15)"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="month"
            tick={{ fill: "#c4b5fd" }}
            axisLine={{ stroke: "#7c3aed" }}
          />

          <YAxis
            tick={{ fill: "#c4b5fd" }}
            axisLine={{ stroke: "#7c3aed" }}
          />

          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid rgba(168,85,247,0.4)",
              color: "#fff"
            }}
          />

          <Bar dataKey="expense" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={
                  entry.month === highest.month
                    ? "#ef4444"
                    : "#a855f7"
                }
              />
            ))}
          </Bar>

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default InsightsMonthlyComparison;