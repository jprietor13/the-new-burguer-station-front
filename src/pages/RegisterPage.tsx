import { Link } from "react-router-dom";
import { useRegisterPage } from "../hooks/useRegisterPage";

export const RegisterPage = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirm,
    setConfirm,
    error,
    handleSubmit,
  } = useRegisterPage();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-orange-100 to-yellow-200 px-4">
      <article className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-center text-yellow-600 mb-6">
          📝 🍔 Cree su cuenta y pida su Hamburguesa
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-all duration-200 font-semibold"
          >
            Registrarme
          </button>

          <div className="text-center mt-4">
            <Link
              to="/login"
              className="text-yellow-600 hover:underline text-sm font-medium"
            >
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
          </div>
        </form>
      </article>
    </section>
  );
};
