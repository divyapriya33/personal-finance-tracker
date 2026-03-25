function InsightsAdvice({ transactions }) {

  let expense = 0;

  transactions.forEach(tx => {
    if (tx.amount < 0)
      expense += Math.abs(tx.amount);
  });

  const highSpending = expense > 20000;

  return (
    <div className="neon-card p-6">

      <h2 className="font-semibold mb-3 text-purple-300">
        Smart Advice
      </h2>

      {highSpending ? (
        <p className="text-red-400">
          ⚠ Your spending is high. Consider budgeting.
        </p>
      ) : (
        <p className="text-emerald-400">
          ✅ Spending is under control.
        </p>
      )}

    </div>
  );
}

export default InsightsAdvice;