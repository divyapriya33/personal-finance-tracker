import toast from "react-hot-toast";

function DangerZone() {

  const currentUser = localStorage.getItem("user");

  const deleteAccount = () => {

    if (!window.confirm("Delete account permanently?")) return;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.filter(user => user !== currentUser);

    localStorage.setItem("users", JSON.stringify(users));

    localStorage.removeItem(`profile_${currentUser}`);
    localStorage.removeItem(`transactions_${currentUser}`);
    localStorage.removeItem(`budgets_${currentUser}`);
    localStorage.removeItem(`bank_${currentUser}`);

    if (users.length > 0) {

      localStorage.setItem("user", users[0]);
      window.location.reload();

    } else {

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      window.location.href = "/login";
    }

    toast.success("Account deleted");
  };

  return (
    <div className="space-y-6">

      <h2 className="text-xl font-bold text-red-400">
        🗑 Delete Account
      </h2>

      <p className="text-red-300 text-sm">
        This action is permanent and cannot be undone.
      </p>

      <button
        onClick={deleteAccount}
        className="bg-gradient-to-r from-red-600 to-red-800 px-6 py-2 rounded-xl font-semibold hover:scale-105 transition"
      >
        Delete Account
      </button>

    </div>
  );
}

export default DangerZone;