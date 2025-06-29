import React, { useState } from "react";
import { ToastContext, setToastMethods } from "./ToastContext";

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (msg, type = "success", duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  // ✅ Set global methods once on mount
  setToastMethods({
    success: (msg, duration) => showToast(msg, "success", duration),
    error: (msg, duration) => showToast(msg, "error", duration),
    info: (msg, duration) => showToast(msg, "info", duration),
    warning: (msg, duration) => showToast(msg, "warning", duration),
  });

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-5 right-5 space-y-2 z-50">
        {toasts.map(({ id, msg, type }) => (
          <div
            key={id}
            className={`px-4 py-2 rounded text-white shadow ${
              type === "success"
                ? "bg-green-600"
                : type === "error"
                ? "bg-red-600"
                : type === "info"
                ? "bg-blue-600"
                : "bg-yellow-500"
            }`}
          >
            {msg}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
