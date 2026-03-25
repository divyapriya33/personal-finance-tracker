import { useMemo } from "react";

function BudgetSummary({ transactions = [], budgets = {} }) {

  const categorySpent = useMemo(() => {

    const totals = {};

    transactions.forEach((tx) => {

      if (tx.amount < 0) {

        const category = tx.category?.toLowerCase();

        totals[category] =
          (totals[category] || 0) + Math.abs(tx.amount);

      }

    });

    return totals;

  }, [transactions]);

  const icons = {
    food: "🍔",
    transport: "🚗",
    bills: "💡",
    shopping: "🛍️"
  };

  return (
    <div className="space-y-6">

      {Object.keys(budgets).map((category) => {

        const spent =
          categorySpent[category.toLowerCase()] || 0;

        const limit = budgets[category];
        if (!limit) return null;

        const percent = Math.min(
          Math.round((spent / limit) * 100),
          100
        );

        const barColor =
          percent >= 90
            ? "from-red-500 to-red-700"
            : percent >= 80
            ? "from-yellow-400 to-yellow-600"
            : "from-purple-400 to-purple-600";

        return (
          <div
            key={category}
            className="neon-card p-5 hover:shadow-xl transition"
          >

            <div className="flex justify-between items-center mb-3">

              <h3 className="text-lg font-semibold text-purple-200 flex gap-2">
                <span className="animate-bounce">
                  {icons[category.toLowerCase()] || "💰"}
                </span>
                {category}
              </h3>

              <span className="text-purple-300">
                ₹{spent} / ₹{limit}
              </span>

            </div>

            <div className="relative w-full h-6 bg-purple-900/30 rounded-full overflow-hidden">

              <div
                className={`h-6 rounded-full bg-gradient-to-r ${barColor}`}
                style={{ width: `${percent}%` }}
              />

              <div
                className="absolute top-1/2 -translate-y-1/2 text-xs bg-black px-2 py-1 rounded-full"
                style={{ left: `${percent}%` }}
              >
                {percent}%
              </div>

            </div>

          </div>
        );

      })}

    </div>
  );
}

export default BudgetSummary;