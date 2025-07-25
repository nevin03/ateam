import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastProvider } from "./contexts/ToastProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ToastProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ToastProvider>
);
