function BudgetProgress({ transactions = [], budgets = {} }) {

  const categories = Object.keys(budgets);

  const getSpent = (category) => {
    return transactions
      .filter(
        (t) =>
          t.category === category &&
          Number(t.amount) < 0
      )
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  };

  return (
    <div className="neon-card mt-6">

      <h3 className="text-xl font-semibold mb-4 text-purple-300">
        📊 Budget Progress
      </h3>

      {categories.length === 0 && (
        <p className="text-purple-400">No budgets set</p>
      )}

      {categories.map((category) => {

        const budget = budgets[category];
        const spent = getSpent(category);
        const percent = Math.min((spent / budget) * 100, 100);

        return (
          <div key={category} className="mb-5">

            <div className="flex justify-between mb-1 text-purple-200">
              <span>{category}</span>
              <span>₹{spent} / ₹{budget}</span>
            </div>

            <div className="w-full bg-purple-900/30 rounded-full h-3">

              <div
                className={`h-3 rounded-full transition-all ${
                  percent >= 100
                    ? "bg-red-500"
                    : "bg-purple-500"
                }`}
                style={{ width: `${percent}%` }}
              />

            </div>

          </div>
        );

      })}

    </div>
  );
}

export default BudgetProgress;