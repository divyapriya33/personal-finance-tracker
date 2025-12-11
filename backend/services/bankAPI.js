import { fetchMockTransactions } from '../services/bankAPI.js';

export const getTransactions = (req, res) => {
  const data = fetchMockTransactions();
  res.json(data);
};
