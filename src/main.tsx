import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <HashRouter>
      <App />
      <Toaster position="top-center" reverseOrder={false} />
    </HashRouter>
  </AuthProvider>
);
