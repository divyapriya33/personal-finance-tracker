function InsightsHighestMonth({ transactions }) {

  const monthlyTotals = {};

  transactions.forEach(tx => {
    if (tx.amount < 0 && tx.date) {
      const month = tx.date.slice(0, 7);
      monthlyTotals[month] =
        (monthlyTotals[month] || 0) + Math.abs(tx.amount);
    }
  });

  const highest = Object.entries(monthlyTotals)
    .sort((a, b) => b[1] - a[1])[0];

  if (!highest) {
    return (
      <div className="neon-card p-6">
        <p className="text-purple-400">No data available</p>
      </div>
    );
  }

  return (
    <div className="neon-card p-6">

      <h2 className="font-semibold mb-3 text-purple-300">
        Highest Spending Month
      </h2>

      <p className="text-xl font-bold text-purple-100">
        {highest[0]}
      </p>

      <p className="text-red-400 font-semibold mt-1">
        ₹{highest[1].toLocaleString()}
      </p>

    </div>
  );
}

export default InsightsHighestMonth;