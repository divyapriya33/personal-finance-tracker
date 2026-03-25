export const saveNotification = (alert) => {

  const existing =
    JSON.parse(localStorage.getItem("alerts")) || [];

  const updated = [alert, ...existing];

  localStorage.setItem("alerts", JSON.stringify(updated));
};
