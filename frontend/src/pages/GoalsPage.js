import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function GoalsPage() {

  const currentUser = localStorage.getItem("user");

  const [goals, setGoals] = useState(() => {
    return JSON.parse(
      localStorage.getItem(`goals_${currentUser}`)
    ) || [];
  });

  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [deadline, setDeadline] = useState("");

  const [selectedGoal, setSelectedGoal] = useState(null);
  const [contribution, setContribution] = useState("");

  useEffect(() => {
    localStorage.setItem(
      `goals_${currentUser}`,
      JSON.stringify(goals)
    );
  }, [goals, currentUser]);

  const addGoal = () => {
    if (!name || !target || !deadline) return;

    const newGoal = {
      id: Date.now(),
      name,
      target: Number(target),
      saved: 0,
      deadline
    };

    setGoals(prev => [...prev, newGoal]);

    setName("");
    setTarget("");
    setDeadline("");
  };

  const addContribution = () => {
    setGoals(prev =>
      prev.map(goal =>
        goal.id === selectedGoal.id
          ? { ...goal, saved: goal.saved + Number(contribution) }
          : goal
      )
    );

    setContribution("");
    setSelectedGoal(null);
  };

  const deleteGoal = (id) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  const daysLeft = (date) => {
    const diff = new Date(date) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-8 space-y-8 min-h-screen bg-gradient-to-br from-[#0b0f1a] via-[#0e1325] to-[#070a14]">

      {/* ✅ SAAS HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >

        <div>
          <h2 className="text-3xl font-bold text-purple-300">
            🎯 Financial Goals
          </h2>

          <p className="text-purple-400 text-sm">
            Plan, track, and achieve your saving targets
          </p>
        </div>

        <div className="text-purple-400 text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </div>

      </motion.div>


      {/* ===== CREATE GOAL CARD ===== */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="neon-card flex flex-wrap gap-4 items-center"
      >

        <input
          placeholder="Goal Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="premium-input"
        />

        <input
          type="number"
          placeholder="Target Amount"
          value={target}
          onChange={e => setTarget(e.target.value)}
          className="premium-input"
        />

        <input
          type="date"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
          className="premium-input"
        />

        <button
          onClick={addGoal}
          className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-xl font-semibold hover:scale-105 transition"
        >
          Add Goal
        </button>

      </motion.div>


      {/* ===== GOALS LIST ===== */}
      <div className="grid md:grid-cols-2 gap-6">

        {goals.map(goal => {

          const percent = Math.min(
            (goal.saved / goal.target) * 100,
            100
          );

          return (
            <motion.div
              key={goal.id}
              whileHover={{ scale: 1.02 }}
              className="neon-card space-y-3"
            >

              <h3 className="text-lg font-semibold text-purple-200">
                🎯 {goal.name}
              </h3>

              <p className="text-purple-300">
                ₹{goal.saved} / ₹{goal.target}
              </p>

              <p className="text-purple-400 text-sm">
                ⏳ {daysLeft(goal.deadline)} days left
              </p>

              <div className="w-full bg-purple-900/30 h-3 rounded-full">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <div className="flex gap-3">

                <button
                  onClick={() => setSelectedGoal(goal)}
                  className="bg-indigo-500 px-3 py-1 rounded hover:scale-105 transition"
                >
                  ➕ Add Savings
                </button>

                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="bg-red-500 px-3 py-1 rounded hover:scale-105 transition"
                >
                  Delete
                </button>

              </div>

            </motion.div>
          );
        })}

      </div>


      {/* ===== CONTRIBUTION MODAL ===== */}
      {selectedGoal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur flex justify-center items-center z-50">

          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="neon-card w-80 space-y-4"
          >

            <h3 className="text-purple-200 font-semibold">
              Add Savings to {selectedGoal.name}
            </h3>

            <input
              type="number"
              value={contribution}
              onChange={e => setContribution(e.target.value)}
              className="premium-input w-full"
            />

            <button
              onClick={addContribution}
              className="bg-gradient-to-r from-purple-600 to-pink-600 py-2 rounded-xl font-semibold w-full hover:scale-105 transition"
            >
              Save Contribution
            </button>

          </motion.div>

        </div>
      )}

    </div>
  );
}

export default GoalsPage;
