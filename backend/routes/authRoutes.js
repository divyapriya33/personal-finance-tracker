import express from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import fs from "fs";

const router = express.Router();
const USERS_FILE = "./data/users.json";

const readUsers = () =>
  JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));

const writeUsers = (users) =>
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

/* ---------------- FORGOT PASSWORD ---------------- */
router.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  const users = readUsers();

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const token = crypto.randomBytes(20).toString("hex");

  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;

  writeUsers(users);

  res.json({
    message: "Reset link generated",
    resetLink: `http://localhost:3000/reset-password/${token}`
  });
});

/* ---------------- RESET PASSWORD ---------------- */
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const users = readUsers();
  const user = users.find(
    u => u.resetToken === token && u.resetTokenExpiry > Date.now()
  );

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetToken = null;
  user.resetTokenExpiry = null;

  writeUsers(users);

  res.json({ message: "Password reset successful" });
});

export default router;
