import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app.jsx";
import ToastProvider from "./providers/toast-provider";

createRoot(document.getElementById("root")).render(
  <ToastProvider>
    <App />
  </ToastProvider>
);
