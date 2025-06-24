import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useRegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await axios.post(
        "https://the-new-burguer-station-back-jp.up.railway.app/auth/register",
        { email, password }
      );
      toast.success("¡Registro exitoso!");
      navigate("/login");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirm,
    setConfirm,
    error,
    handleSubmit,
  };
};
