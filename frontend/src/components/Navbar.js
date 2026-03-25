import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [openProfile, setOpenProfile] = useState(false);
  const dropdownRef = useRef();

  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  const currentUser =
    localStorage.getItem("user");

  /* CLOSE DROPDOWN ON ROUTE CHANGE */
  useEffect(() => {
    setOpenProfile(false);
  }, [location]);

  /* CLOSE ON OUTSIDE CLICK */
  useEffect(() => {
    const handleClick = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () =>
      document.removeEventListener("mousedown", handleClick);
  }, []);

  /* SWITCH ACCOUNT */
  const switchAccount = (user) => {
    localStorage.setItem("user", user);
    window.location.reload();
  };

  /* LOGOUT */
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="premium-navbar">

      {/* LOGO */}
      <div
        className="premium-logo"
        onClick={() => navigate("/")}
      >
        💰 Personal Finance Tracker
      </div>

      {/* NAV LINKS */}
      <div className="premium-links">

        <NavLink to="/" className="premium-link">
          Dashboard
        </NavLink>

        <NavLink to="/transactions" className="premium-link">
          Transactions
        </NavLink>

        <NavLink to="/budgets" className="premium-link">
          Budgets
        </NavLink>

        <NavLink to="/reports" className="premium-link">
          Reports
        </NavLink>

        <NavLink to="/insights" className="premium-link">
          Insights
        </NavLink>

        <NavLink to="/goals" className="premium-link">
          Goals
        </NavLink>

      </div>

      {/* PROFILE */}
      <div className="relative" ref={dropdownRef}>

        <button
          onClick={() => setOpenProfile(!openProfile)}
          className="premium-avatar"
        >
          {currentUser?.charAt(0).toUpperCase()}
        </button>

        {openProfile && (
          <div className="premium-dropdown">

            <p className="dropdown-user">
              {currentUser}
            </p>

            <button
              onClick={() => navigate("/settings")}
              className="dropdown-item"
            >
              ⚙ Settings
            </button>

            <div className="dropdown-divider" />

            {users.map((user) => (
              <button
                key={user}
                onClick={() => switchAccount(user)}
                className="dropdown-item"
              >
                {user}
              </button>
            ))}

            <button
              onClick={() => navigate("/login")}
              className="dropdown-item add"
            >
              ➕ Add Account
            </button>

            <button
              onClick={handleLogout}
              className="dropdown-item logout"
            >
              🚪 Logout
            </button>

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
