import express from "express";
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "../controllers/transactionsController.js";

const router = express.Router();

router.get("/", getTransactions);
router.post("/", addTransaction);
router.delete("/:id", deleteTransaction);
router.put("/:id", updateTransaction);

export default router;
