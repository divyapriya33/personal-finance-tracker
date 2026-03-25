export function exportToCSV(transactions) {
  if (!transactions || transactions.length === 0) {
    alert("No transactions to export");
    return;
  }

  const headers = [
    "Description",
    "Amount",
    "Category",
    "Date",
  ];

  const rows = transactions.map((tx) => [
    tx.description,
    tx.amount,
    tx.category,
    tx.date,
  ]);

  let csvContent =
    headers.join(",") +
    "\n" +
    rows.map((row) => row.join(",")).join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "transactions.csv";
  link.click();
}
