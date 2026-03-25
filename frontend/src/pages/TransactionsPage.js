import { useState } from "react";
import { motion } from "framer-motion";

import AddTransaction from "../components/AddTransaction";
import TransactionList from "../components/TransactionList";
import { exportToCSV } from "../utils/exportCSV";

function TransactionsPage({ transactions, setTransactions }) {

  const currentUser = localStorage.getItem("user");

  const [editingTransaction, setEditingTransaction] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  // ✅ ADD
  const addTransaction = (tx) => {
    setTransactions((prev) => [
      ...prev,
      { ...tx, id: Date.now() + Math.random(), userId: currentUser }
    ]);
  };

  // ✅ UPDATE
  const updateTransaction = (updatedTx) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === updatedTx.id ? updatedTx : tx))
    );
    setEditingTransaction(null);
  };

  // ✅ DELETE
  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  // 🔥 FIXED SYNC (NO DUPLICATES)
  const importBankTransactions = async () => {
    try {
      let bank = localStorage.getItem(`bank_${currentUser}`);
      if (!bank) return alert("No bank linked");

      bank = bank.toLowerCase().trim();

      const res = await fetch(`http://localhost:4000/${bank}Transactions`);
      const data = await res.json();

      // FORMAT
      const formatted = data.map((tx, i) => ({
        ...tx,
        id: Date.now() + i,
        userId: currentUser
      }));

      // REMOVE DUPLICATES
      const newTransactions = formatted.filter((newTx) => {
        return !transactions.some((oldTx) =>
          oldTx.description === newTx.description &&
          oldTx.amount === newTx.amount &&
          oldTx.date === newTx.date &&
          oldTx.userId === currentUser
        );
      });

      if (newTransactions.length === 0) {
        alert("No new transactions to sync ✅");
        return;
      }

      setTransactions((prev) => [...prev, ...newTransactions]);

      alert(`${newTransactions.length} new transactions synced 🚀`);

    } catch {
      alert("Mock bank connection failed");
    }
  };

  // ✅ USER DATA
  const userTransactions = transactions.filter(
    (tx) => tx.userId === currentUser
  );

  // ✅ SEARCH + FILTER
  const filteredTransactions = userTransactions.filter((tx) => {
    const matchesSearch =
      tx.description?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      filterCategory === "All" || tx.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen p-8 space-y-8 bg-gradient-to-br from-[#0b0f1a] via-[#0e1325] to-[#070a14]">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h2 className="text-3xl font-bold text-purple-300">
            💳 Transactions
          </h2>
          <p className="text-purple-400 text-sm">
            Track, search, and manage your financial records
          </p>
        </div>

        <div className="text-purple-400 text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </motion.div>

      {/* SEARCH + FILTER */}
      <div className="flex gap-4">

        <input
          className="premium-input w-72"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="premium-input"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option>All</option>
          <option>Income</option>
          <option>Food</option>
          <option>Transport</option>
          <option>Bills</option>
          <option>Shopping</option>
          <option>Entertainment</option>
          <option>Other</option>
        </select>

      </div>

      {/* FORM */}
      <div className="neon-card p-8">

        <div className="flex justify-between items-center mb-6">

          <div>
            <h2 className="text-xl font-semibold text-purple-200">
              Add Transaction
            </h2>
            <p className="text-sm text-purple-400">
              Record income or expenses manually or sync from your bank
            </p>
          </div>

          <button
            onClick={importBankTransactions}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-xl shadow-lg hover:scale-105 transition"
          >
            🏦 Sync Bank Transactions
          </button>

        </div>

        <AddTransaction
          editingTransaction={editingTransaction}
          onAdd={addTransaction}
          onUpdate={updateTransaction}
        />

      </div>

      {/* EXPORT */}
      <button
        onClick={() => exportToCSV(filteredTransactions)}
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-xl shadow-lg hover:scale-105 transition"
      >
        📄 Export CSV
      </button>

      {/* LIST */}
      <div className="neon-card p-8">

        <h2 className="text-xl font-semibold mb-4 text-purple-200">
          Transaction History
        </h2>

        <TransactionList
          transactions={filteredTransactions}
          onDelete={deleteTransaction}
          onEdit={setEditingTransaction}
        />

      </div>

    </div>
  );
}

export default TransactionsPage;