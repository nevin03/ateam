import { createContext } from "react";

export const ToastContext = createContext(null);

export let toast = {
  success: () => {},
  error: () => {},
  info: () => {},
  warning: () => {},
};
//exp
export const setToastMethods = (methods) => {
  toast = { ...methods };
};
