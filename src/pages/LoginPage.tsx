import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://the-new-burguer-station-back-jp.up.railway.app/auth/login",
        { email, password }
      );
      const token = response.data.access_token;
      login(token);
      toast.success("Inicio de sesión realizado con exito");
      setTimeout(() => {
        navigate("/");
      }, 100);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const message =
        error.response?.data?.message || "Error al iniciar sesión";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-100 px-4">
      <article className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-yellow-600 mb-2 tracking-tight">
          🍔 The New Burger Station
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Bienvenido, inicie sesión para hacer su pedido
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 text-white font-bold rounded-md shadow-md"
          >
            Ingresar
          </button>

          <p className="text-sm text-center text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link
              to="/register"
              className="text-yellow-600 hover:text-yellow-800 font-semibold transition-all"
            >
              Registrarse
            </Link>
          </p>
        </form>
      </article>
    </section>
  );
};
