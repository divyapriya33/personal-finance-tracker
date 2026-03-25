import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const RegisterPage = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {

    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    if (users.includes(email)) {
      toast.error("User already exists");
      return;
    }

    users.push(email);
    localStorage.setItem("users", JSON.stringify(users));

    toast.success("Registered successfully 🎉");

    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0b0f1a] via-[#0e1325] to-[#070a14]">

      <motion.form
        onSubmit={handleRegister}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="neon-card w-96 space-y-6"
      >

        {/* TITLE */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-purple-300">
            Create Account
          </h2>
          <p className="text-purple-400 text-sm">
            Start managing your finances today
          </p>
        </div>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="premium-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="premium-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* REGISTER BUTTON */}
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-pink-600 py-2 rounded-xl font-semibold hover:scale-105 transition"
        >
          Register
        </button>

        {/* LOGIN LINK */}
        <p className="text-center text-purple-400 text-sm">
          Already have an account?{" "}
          <span
            className="text-purple-300 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>

      </motion.form>

    </div>
  );
};

export default RegisterPage;