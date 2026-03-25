import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function autoCategory(description) {

  const value = description.toLowerCase();

  if (value.includes("salary")) return "income";
  if (value.includes("amazon")) return "shopping";
  if (value.includes("swiggy")) return "food";
  if (value.includes("zomato")) return "food";
  if (value.includes("ola")) return "transport";
  if (value.includes("uber")) return "transport";
  if (value.includes("electric")) return "bills";
  if (value.includes("rent")) return "bills";

  return "other";
}

function AddTransaction({ onAdd, onUpdate, editingTransaction }) {

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [date, setDate] = useState("");

  useEffect(() => {

    if (editingTransaction) {
      setDescription(editingTransaction.description);
      setAmount(editingTransaction.amount);
      setCategory(editingTransaction.category);
      setDate(editingTransaction.date || "");
    }
    else {
      setDescription("");
      setAmount("");
      setCategory("food");
      setDate("");
    }

  }, [editingTransaction]);

  const handleSubmit = (e) => {

    e.preventDefault();

    const tx = {
      description,
      amount: Number(amount),
      category: category || autoCategory(description),
      date,
    };

    if (editingTransaction) {
      onUpdate({ ...editingTransaction, ...tx });
      toast.success("Transaction updated 💜");
    }
    else {
      onAdd(tx);
      toast.success("Transaction added 🎉");

      setDescription("");
      setAmount("");
      setCategory("food");
      setDate("");
    }
  };

  return (
    <div className="neon-card">

      <h3 className="text-lg font-semibold mb-4 text-purple-200">
        {editingTransaction ? "Edit Transaction" : "Add Transaction"}
      </h3>

      <form
        className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center"
        onSubmit={handleSubmit}
      >

        <input
          className="premium-input"
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setCategory(autoCategory(e.target.value));
          }}
          required
        />

        <input
          className="premium-input"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <select
          className="premium-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="income">Income</option>
          <option value="food">Food</option>
          <option value="transport">Transport</option>
          <option value="bills">Bills</option>
          <option value="shopping">Shopping</option>
          <option value="entertainment">Entertainment</option>
          <option value="other">Other</option>
        </select>

        <input
          className="premium-input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          className="
          bg-gradient-to-r from-purple-600 to-pink-600
          text-white py-3 px-6 rounded-xl font-semibold
          shadow-lg hover:scale-105 transition"
        >
          {editingTransaction ? "Update" : "Add"}
        </button>

      </form>
    </div>
  );
}

export default AddTransaction;