import { createContext, useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import Button from "@components/Button";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const toastIdRef = useRef(0);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message, type = "success", duration = 3000) => {
      const id = toastIdRef.current++;
      const newToast = { id, message, type };
      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        removeToast(id);
      }, duration);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`border px-4 py-2 rounded shadow-md mb-2 ${
              toast.type === "success"
                ? "bg-green-100 text-green-800"
                : toast.type === "error"
                ? "bg-red-100 text-red-800"
                : toast.type === "info"
                ? "bg-blue-100 text-blue-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            <span>{toast.message}</span>
            <Button
              onClick={() => removeToast(toast.id)}
              variant="ghost"
              color="success"
              className="p-1 ml-4 leading-none text-lg"
              aria-label="Close toast"
            >
              x
            </Button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const ToastContextRef = ToastContext;
