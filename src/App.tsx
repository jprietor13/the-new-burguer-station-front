import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { OrderPage } from "./pages/OrderPage";
import { MyOrdersPage } from "./pages/MyOrdersPage";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { PrivateRoute } from "./routes/PrivateRoute";

import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const hidesValidation = ["/login", "/register"].includes(location.pathname);
  const hideNavbar = hidesValidation;
  const hideFooter = hidesValidation;
  return (
    <main className="flex flex-col min-h-screen">
      {!hideNavbar && <Navbar />}
      <div className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/order/:id"
            element={
              <PrivateRoute>
                <OrderPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-orders"
            element={
              <PrivateRoute>
                <MyOrdersPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      {!hideFooter && <Footer />}
    </main>
  );
}

export default App;
