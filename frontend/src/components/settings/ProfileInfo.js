import { useState } from "react";
import toast from "react-hot-toast";

function ProfileInfo() {

  const currentUser = localStorage.getItem("user");

  const savedProfile =
    JSON.parse(localStorage.getItem(`profile_${currentUser}`)) || {};

  const [name, setName] = useState(savedProfile.name || "");

  const saveName = () => {

    if (!name.trim()) {
      toast.error("Enter valid name");
      return;
    }

    const updatedProfile = {
      ...savedProfile,
      name
    };

    localStorage.setItem(
      `profile_${currentUser}`,
      JSON.stringify(updatedProfile)
    );

    toast.success("Profile updated successfully");
  };

  return (
    <div className="space-y-8">

      {/* ===== HEADER ===== */}
      <div className="flex items-center gap-5">

        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
          {name ? name.charAt(0).toUpperCase() : "U"}
        </div>

        <div>
          <h2 className="text-xl font-bold text-purple-300">
            Profile Information
          </h2>
          <p className="text-purple-400 text-sm">
            Manage your personal details
          </p>
        </div>

      </div>

      {/* ===== EMAIL ===== */}
      <div>
        <p className="text-purple-400 text-sm mb-1">Email</p>
        <p className="text-purple-200 font-medium">
          {currentUser}
        </p>
      </div>

      {/* ===== NAME INPUT ===== */}
      <div className="space-y-2">

        <label className="text-purple-300 font-medium">
          Full Name
        </label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="premium-input w-72"
        />

      </div>

      {/* ===== SAVE BUTTON ===== */}
      <button
        onClick={saveName}
        className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-xl font-semibold hover:scale-105 transition"
      >
        Save Changes
      </button>

    </div>
  );
}

export default ProfileInfo;