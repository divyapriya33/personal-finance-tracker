import { useState } from "react";
import toast from "react-hot-toast";

function SalarySettings() {

  const currentUser = localStorage.getItem("user");

  const savedProfile =
    JSON.parse(localStorage.getItem(`profile_${currentUser}`)) || {};

  const [salary, setSalary] = useState(savedProfile.salary || "");

  const saveSalary = () => {

    if (!salary || salary <= 0) {
      toast.error("Enter valid salary");
      return;
    }

    const updatedProfile = {
      ...savedProfile,
      salary: Number(salary)
    };

    localStorage.setItem(
      `profile_${currentUser}`,
      JSON.stringify(updatedProfile)
    );

    // ⭐ Auto Budget Calculation
    const autoBudgets = {
      food: salary * 0.30,
      transport: salary * 0.15,
      bills: salary * 0.35,
      shopping: salary * 0.20,
    };

    localStorage.setItem(
      `budgets_${currentUser}`,
      JSON.stringify(autoBudgets)
    );

    toast.success("Salary Updated Successfully 💼");

    window.location.reload();
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h2 className="text-xl font-bold text-purple-300">
          💼 Salary Settings
        </h2>

        <p className="text-purple-400 text-sm">
          Used for automatic budget calculation
        </p>
      </div>

      {/* INPUT */}
      <div className="space-y-2">

        <label className="text-purple-300 font-medium">
          Monthly Salary
        </label>

        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(Number(e.target.value))}
          className="premium-input w-72"
        />

      </div>

      {/* BUTTON */}
      <button
        onClick={saveSalary}
        className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-xl font-semibold hover:scale-105 transition"
      >
        Save Salary
      </button>

    </div>
  );
}

export default SalarySettings;