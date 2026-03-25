function ReportsPage({ transactions = [] }) {
  let income = 0;
  let expense = 0;
  const categoryTotals = {};

  transactions.forEach((tx) => {
    const amount = Number(tx.amount);

    if (tx.category === "Income") {
      income += amount;
    } else {
      expense += Math.abs(amount);
      categoryTotals[tx.category] =
        (categoryTotals[tx.category] || 0) + Math.abs(amount);
    }
  });

  return (
    <div className="p-6 text-white">

      <h1 className="text-2xl font-bold mb-6">
        Financial Reports
      </h1>

      <div className="bg-slate-800 p-6 rounded-xl space-y-4">

        <p>💰 Total Income: ₹{income}</p>
        <p>💸 Total Expense: ₹{expense}</p>
        <p>
          🧮 Balance: ₹{income - expense}
        </p>

        <hr className="opacity-30" />

        <h3 className="font-semibold text-lg">
          Category-wise Expenses
        </h3>

        {Object.keys(categoryTotals).length === 0 && (
          <p>No expense data available</p>
        )}

        <ul className="space-y-2">
          {Object.entries(categoryTotals).map(
            ([cat, amt]) => (
              <li
                key={cat}
                className="flex justify-between border-b pb-1"
              >
                <span>{cat}</span>
                <span>₹{amt}</span>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}

export default ReportsPage;

