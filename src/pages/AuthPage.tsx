import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

type Tab = "login" | "register";

export default function AuthPage() {
  const [tab, setTab] = useState<Tab>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { signIn, signUp } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const err = tab === "login"
      ? await signIn(email, password)
      : await signUp(email, password);

    setLoading(false);

    if (err) {
      setError(err);
      return;
    }

    if (tab === "register") {
      setSuccess(true);
      return;
    }

    navigate("/");
  };

  return (
    <div className="min-h-dvh bg-blue-mirage flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
        <h1 className="text-2xl font-bold text-white text-center mb-6">First 100</h1>

        {/* Tabs */}
        <div className="flex rounded-xl overflow-hidden border border-white/20 mb-6">
          {(["login", "register"] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => { setTab(t); setError(null); setSuccess(false); }}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                tab === t ? "bg-white/20 text-white" : "text-white/60 hover:text-white"
              }`}
            >
              {t === "login" ? "Iniciar sesión" : "Registrarse"}
            </button>
          ))}
        </div>

        {success ? (
          <div className="text-center text-white/90 py-4">
            <p className="font-semibold">¡Cuenta creada!</p>
            <p className="text-sm text-white/60 mt-1">Revisa tu email para confirmar tu cuenta.</p>
            <button
              type="button"
              onClick={() => { setTab("login"); setSuccess(false); }}
              className="mt-4 text-sm underline text-white/70"
            >
              Ir a iniciar sesión
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/50 text-sm"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/50 text-sm"
            />

            {error && (
              <p className="text-red-300 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50"
            >
              {loading ? "..." : tab === "login" ? "Entrar" : "Crear cuenta"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
