import axios from "axios";

const BANK_API_URL = "http://localhost:4000/transactions";

export const fetchMockTransactions = async () => {
  const response = await axios.get(BANK_API_URL);
  return response.data;
};
