import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./styles/neonTheme.css";
import "react-datepicker/dist/react-datepicker.css";

import { AuthProvider } from "./context/AuthContext";

import App from "./App";
import "./index.css";


const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster position="top-right" reverseOrder={false} />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
