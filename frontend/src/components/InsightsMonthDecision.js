function InsightsMonthDecision({ transactions = [], selectedMonth }) {

  if (!selectedMonth) return null;

  let current = 0;
  let last = 0;

  const year = selectedMonth.getFullYear();
  const month = selectedMonth.getMonth();

  const lastDate = new Date(year, month - 1, 1);

  transactions.forEach(tx => {

    if (!tx.date) return;

    const d = new Date(tx.date);
    const amt = Number(tx.amount);

    if (amt < 0) {

      if (d.getFullYear() === year && d.getMonth() === month)
        current += Math.abs(amt);

      if (
        d.getFullYear() === lastDate.getFullYear() &&
        d.getMonth() === lastDate.getMonth()
      )
        last += Math.abs(amt);
    }
  });

  const diff = current - last;

  return (
    <div className="neon-card p-6">

      <h3 className="text-lg font-semibold text-purple-300">
        📅 Monthly Expense Decision
      </h3>

      <p className="mt-3 text-purple-100">
        Selected month: ₹{current.toLocaleString()}
      </p>

      <p className="text-purple-100">
        Previous month: ₹{last.toLocaleString()}
      </p>

      <p className="mt-3 font-semibold text-lg">

        {diff > 0 &&
          `⚠ You spent ₹${diff.toLocaleString()} MORE than last month. Try reducing expenses.`}

        {diff < 0 &&
          `✅ Good! You reduced spending by ₹${Math.abs(diff).toLocaleString()}`}

        {diff === 0 &&
          "✔ Spending same as last month"}

      </p>

    </div>
  );
}

export default InsightsMonthDecision;