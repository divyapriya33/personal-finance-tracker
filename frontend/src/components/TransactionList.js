function TransactionList({ transactions = [], onDelete, onEdit }) {

  return (
    <div className="overflow-x-auto">

    

      {transactions.length === 0 ? (
        <p className="text-purple-400">
          No transactions found.
        </p>
      ) : (
        <table className="w-full rounded-xl overflow-hidden">

          <thead className="bg-[#121826] text-purple-300">
            <tr>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((txn) => (
              <tr
                key={txn.id}
                className="border-b border-purple-900/30 hover:bg-purple-900/20 transition"
              >

                <td className="p-3 text-purple-100 font-medium">
                  {txn.description}
                </td>

                <td
                  className={`p-3 font-semibold ${
                    txn.amount > 0
                      ? "text-purple-400"
                      : "text-red-400"
                  }`}
                >
                  {txn.amount > 0 ? "₹" : "-₹"}
                  {Math.abs(txn.amount)}
                </td>

                <td className="p-3">
                  <span className="px-3 py-1 rounded-full text-sm bg-purple-900/40 text-purple-300">
                    {txn.category}
                  </span>
                </td>

                <td className="p-3 text-purple-400">
                  {txn.date || "—"}
                </td>

                <td className="p-3 text-right space-x-4">

                  <button
                    onClick={() => onEdit(txn)}
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(txn.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      )}
    </div>
  );
}

export default TransactionList;