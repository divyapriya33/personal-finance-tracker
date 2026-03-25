function Summary({ transactions = [] }) {
  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    if (t.category === "Income") {
      income += Number(t.amount);
    } else {
      expense += Number(t.amount);
    }
  });

  return (
    <div>
      <h2>Summary</h2>
      <p>Income: ₹{income}</p>
      <p>Expense: ₹{expense}</p>
      <p>Balance: ₹{income - expense}</p>
    </div>
  );
}

export default Summary;
