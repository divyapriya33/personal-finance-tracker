import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());

// ⭐ Read db.json
const readDB = () => {
  const data = fs.readFileSync("db.json", "utf8");
  return JSON.parse(data);
};

// ⭐ SBI Transactions
app.get("/sbiTransactions", (req, res) => {
  const db = readDB();
  res.json(db.sbiTransactions || []);
});

// ⭐ HDFC Transactions
app.get("/hdfcTransactions", (req, res) => {
  const db = readDB();
  res.json(db.hdfcTransactions || []);
});

// ⭐ ICICI Transactions
app.get("/iciciTransactions", (req, res) => {
  const db = readDB();
  res.json(db.iciciTransactions || []);
});

app.listen(4000, () => {
  console.log("Mock Bank running at http://localhost:4000");
});
