import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { OrderPage } from "./pages/OrderPage";
import { MyOrdersPage } from "./pages/MyOrdersPage";
import { Navbar } from "./components/Navbar";

import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/my-orders" element={<MyOrdersPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
