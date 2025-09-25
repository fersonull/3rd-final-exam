import { createRoot } from "react-dom/client";
import ToastProvider from "./providers/toast-provider";
import AuthProvider from "./providers/auth-provider";
import App from "./app.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ToastProvider>
      <App />
    </ToastProvider>
  </AuthProvider>
);
