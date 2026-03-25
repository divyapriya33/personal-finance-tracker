import { useState } from "react";

function Budget({ budgets, setBudgets }) {

  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");

  const addBudget = () => {

    if (!amount) return;

    setBudgets({
      ...budgets,
      [category]: Number(amount),
    });

    setAmount("");
  };

  return (
    <div className="space-y-4">

      <h3 className="text-lg font-semibold text-purple-200">
        Set Monthly Budget
      </h3>

      <div className="flex flex-wrap items-center gap-4">

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="premium-input"
        >
          <option>Food</option>
          <option>Transport</option>
          <option>Bills</option>
          <option>Shopping</option>
        </select>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="premium-input"
        />

        <button
          onClick={addBudget}
          className="bg-gradient-to-r from-purple-600 to-pink-600
          text-white px-6 py-2 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Set Budget
        </button>

      </div>
    </div>
  );
}

export default Budget;