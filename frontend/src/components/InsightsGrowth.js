function InsightsGrowth({ transactions }) {

  const monthly = {};

  transactions.forEach(tx => {
    if (tx.amount < 0) {

      const month = tx.date?.slice(0, 7);

      monthly[month] =
        (monthly[month] || 0) + Math.abs(tx.amount);
    }
  });

  const months = Object.keys(monthly);

  if (months.length < 2)
    return (
      <div className="neon-card p-6">
        <p className="text-purple-400">
          Not enough data
        </p>
      </div>
    );

  const last = monthly[months[months.length - 1]];
  const prev = monthly[months[months.length - 2]];

  const growth = ((last - prev) / prev) * 100;

  return (
    <div className="neon-card p-6">

      <h2 className="font-semibold mb-3 text-purple-300">
        Expense Growth
      </h2>

      <p className={growth > 0 ? "text-red-400" : "text-emerald-400"}>
        {growth > 0 ? "📈 Increased" : "📉 Decreased"} by{" "}
        {Math.abs(growth.toFixed(1))} %
      </p>

    </div>
  );
}

export default InsightsGrowth;