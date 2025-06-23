import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import axios, { AxiosError } from "axios";

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
      setTimeout(() => {
        navigate("/");
      }, 100);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Ingresar</button>
        </div>
        <div>
          <Link to="/register">
            <p>Registrarse</p>
          </Link>
        </div>
      </form>
    </div>
  );
};
