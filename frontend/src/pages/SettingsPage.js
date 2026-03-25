import { useState } from "react";
import { motion } from "framer-motion";

import ProfileInfo from "../components/settings/ProfileInfo";
import SalarySettings from "../components/settings/SalarySettings";
import BankSettings from "../components/settings/BankSettings";
import DangerZone from "../components/settings/DangerZone";

function SettingsPage() {

  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileInfo />;
      case "salary":
        return <SalarySettings />;
      case "bank":
        return <BankSettings />;
      case "danger":
        return <DangerZone />;
      default:
        return <ProfileInfo />;
    }
  };

  return (
    <div className="p-8 flex gap-8 min-h-screen bg-gradient-to-br from-[#0b0f1a] via-[#0e1325] to-[#070a14]">

      {/* SIDEBAR */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 neon-card space-y-3"
      >

        <h2 className="text-xl font-bold text-purple-300 mb-4">
          ⚙ Settings
        </h2>

        <SidebarButton label="👤 Profile" tab="profile" {...{ activeTab, setActiveTab }} />
        <SidebarButton label="💼 Salary" tab="salary" {...{ activeTab, setActiveTab }} />
        <SidebarButton label="🏦 Bank" tab="bank" {...{ activeTab, setActiveTab }} />
        <SidebarButton label="🗑 Delete Account" tab="danger" danger {...{ activeTab, setActiveTab }} />

      </motion.div>

      {/* CONTENT */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 neon-card"
      >
        {renderContent()}
      </motion.div>

    </div>
  );
}

export default SettingsPage;

function SidebarButton({ label, tab, activeTab, setActiveTab, danger }) {

  const isActive = activeTab === tab;

  return (
    <button
      onClick={() => setActiveTab(tab)}
      className={`w-full text-left px-4 py-2 rounded-xl font-medium transition

      ${isActive
        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
        : "text-purple-300 hover:bg-purple-900/30"}

      ${danger ? "hover:text-red-400" : ""}`}
    >
      {label}
    </button>
  );
}