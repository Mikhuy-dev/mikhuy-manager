import { useState } from "react"; //

export const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Por favor complete todos los campos");
      return;
    }
    setLoading(true);
    try {
      // Simula login exitoso
      localStorage.setItem("isAuthenticated", "true");
      console.log("Inicio de sesión exitoso", { username, password });
      window.location.href = "/"; // Redirige al home (puedes usar navigate también)
    } catch (err) {
      setError("Error al iniciar sesión. Verifique sus credenciales.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center md:px-10 bg-white/80 rounded-xl montserrat-bold xl:px-24 xl:py-10 min-h-[80vh] md:min-w-full">
      <div className="max-w-96 md:min-w-80">
        <h1 className="text-2xl text-center montserrat-extrabold flex flex-col justify-between text-shadow">
          Inicia sesión en
          <br />
          <span className="">MIKHUY</span>
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 mt-20">
            <label htmlFor="username" className="block text-gray-800 mb-1">
              Usuario
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="min-w-full border border-black rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-800 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="min-w-full border border-black rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="min-w-full mt-7 bg-[#c41c3c] hover:bg-[#a51833] text-white font-medium text-center rounded-md p-3 transition-colors cursor-pointer border border-black"
          >
            {loading ? "Procesando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
};
