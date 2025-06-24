import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-yellow-500 text-white shadow-md py-3 px-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      <div>
        {location.pathname !== "/" && (
          <Link
            to="/"
            className="inline-block bg-yellow-800 text-white px-4 py-2 rounded-md font-semibold hover:bg-yellow-600 transition duration-300 shadow-sm"
          >
            🍔 Volver al Home
          </Link>
        )}
      </div>
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            {location.pathname !== "/my-orders" && (
              <Link
                to="/my-orders"
                className="hover:text-yellow-900 transition duration-200 font-medium"
              >
                Mis Pedidos
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-white text-yellow-600 hover:bg-yellow-100 px-3 py-1 rounded-md font-medium transition duration-300"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-white text-yellow-600 hover:bg-yellow-100 px-3 py-1 rounded-md font-medium transition duration-300"
          >
            Iniciar sesión
          </Link>
        )}
      </div>
    </nav>
  );
};
