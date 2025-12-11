import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());

app.get("/transactions", (req, res) => {
  const data = JSON.parse(fs.readFileSync("transactions.json", "utf8"));
  res.json(data);
});

app.listen(4000, () => {
  console.log("Mock Bank API running on http://localhost:4000");
});
