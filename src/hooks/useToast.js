import { useContext } from "react";
import { ToastContext } from "@/contexts/ToastContext";

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside <ToastProvider>");

  return {
    showToast: context.showToast,
    success: (msg, duration) => context.showToast(msg, "success", duration),
    error: (msg, duration) => context.showToast(msg, "error", duration),
    warning: (msg, duration) => context.showToast(msg, "warning", duration),
    info: (msg, duration) => context.showToast(msg, "info", duration),
  };
};
