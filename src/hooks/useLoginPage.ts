import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useLoginPage = () => {
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

  return { email, setEmail, password, setPassword, error, handleSubmit };
};
