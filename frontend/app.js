document.getElementById("loadBtn").addEventListener("click", async () => {
  const res = await fetch("http://localhost:5000/api/transactions");
  const data = await res.json();

  const container = document.getElementById("transactions");
  container.innerHTML = "";

  data.forEach(t => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerText = `${t.type.toUpperCase()}: ₹${t.amount}`;
    container.appendChild(div);
  });
});
