import { useState } from "react";

function SalarySettings() {

  const currentUser = localStorage.getItem("user");

  const savedProfile =
    JSON.parse(localStorage.getItem(`profile_${currentUser}`)) || {};

  const [salary, setSalary] = useState(savedProfile.salary || "");
const saveSalary = () => {

  if (!salary || salary <= 0) {
    alert("Enter valid salary");
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

  alert("Salary Updated Successfully");

  // ⭐ IMPORTANT FIX
  window.location.reload();
};

  return (
    <div>

      <h2 className="text-xl font-bold mb-4">
        Salary Settings
      </h2>

      <input
        type="number"
        value={salary}
        onChange={(e) =>
          setSalary(Number(e.target.value))
        }
        className="border p-2 mr-2"
      />

      <button
        onClick={saveSalary}
        className="bg-purple-500 text-white px-4 py-2 rounded"
      >
        Save
      </button>

    </div>
  );
}

export default SalarySettings;
