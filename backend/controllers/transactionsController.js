let transactions = [];

export const getTransactions = (req, res) => {
  res.json(transactions);
};

export const addTransaction = (req, res) => {
  const newTx = {
    id: Date.now(),
    ...req.body,
  };

  transactions.unshift(newTx);
  res.json(newTx);
};

export const deleteTransaction = (req, res) => {
  const id = Number(req.params.id);
  transactions = transactions.filter((t) => t.id !== id);
  res.json({ message: "Deleted" });
};

export const updateTransaction = (req, res) => {
  const id = Number(req.params.id);

  transactions = transactions.map((t) =>
    t.id === id ? { ...t, ...req.body } : t
  );

  res.json({ message: "Updated" });
};
