import { useState } from "react";
import toast from "react-hot-toast";

function BankSettings() {

  const currentUser = localStorage.getItem("user");

  const [bank, setBank] = useState(
    localStorage.getItem(`bank_${currentUser}`) || ""
  );

  const saveBank = () => {
    localStorage.setItem(`bank_${currentUser}`, bank);
    toast.success("Bank saved successfully");
  };

  return (
    <div className="space-y-6">

      <h2 className="text-xl font-bold text-purple-300">
        🏦 Bank Settings
      </h2>

      <div className="flex gap-4">

        <select
          value={bank}
          onChange={(e) => setBank(e.target.value)}
          className="premium-input"
        >
          <option value="">Select Bank</option>
          <option>HDFC</option>
          <option>SBI</option>
          <option>ICICI</option>
        </select>

        <button
          onClick={saveBank}
          className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-xl font-semibold hover:scale-105 transition"
        >
          Save
        </button>

      </div>

    </div>
  );
}

export default BankSettings;