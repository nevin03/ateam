import React from "react";
import { toast } from "./contexts/ToastContext";
import Button from "./components/shared/Button"; // ✅ Make sure this is a real button
import Login from "./Login";

function App() {
  return (
    <div>
      <Button onClick={() => toast.success("✅ This is a toast message!")}>
        Click me
      </Button>
      <Login />
    </div>
  );
}

export default App;
