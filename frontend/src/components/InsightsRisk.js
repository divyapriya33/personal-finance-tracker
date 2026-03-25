function InsightsRisk({ transactions, budgets }) {

  const categorySpent = {};

  transactions.forEach(tx => {
    if (tx.amount < 0) {
      const cat = tx.category?.toLowerCase();
      categorySpent[cat] =
        (categorySpent[cat] || 0) + Math.abs(tx.amount);
    }
  });

  return (
    <div className="neon-card p-6">

      <h2 className="font-semibold mb-4 text-purple-300">
        Category Risk Analysis
      </h2>

      {Object.keys(budgets).length === 0 && (
        <p className="text-purple-400">
          No budgets set
        </p>
      )}

      {Object.keys(budgets).map(cat => {

        const spent = categorySpent[cat] || 0;
        const limit = budgets[cat];
        const percent = (spent / limit) * 100;

        let status = "🟢 Safe";
        let color = "text-emerald-400";

        if (percent > 90) {
          status = "🔴 High Risk";
          color = "text-red-400";
        } else if (percent > 70) {
          status = "🟡 Medium Risk";
          color = "text-yellow-400";
        }

        return (
          <div
            key={cat}
            className="flex justify-between items-center mb-2"
          >
            <span className="capitalize text-purple-200">
              {cat}
            </span>
            <span className={color}>
              {status}
            </span>
          </div>
        );
      })}

    </div>
  );
}

export default InsightsRisk;