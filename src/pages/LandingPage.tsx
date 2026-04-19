import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { IoFlashOutline, IoTrophyOutline, IoBulbOutline, IoArrowForwardOutline } from "react-icons/io5";
import { BsQuestionDiamond } from "react-icons/bs";

const FEATURES = [
  {
    icon: <IoFlashOutline size={28} />,
    title: "Aprende rápido",
    desc: "Las 100 palabras más usadas del inglés representan el 50% del idioma hablado.",
  },
  {
    icon: <IoBulbOutline size={28} />,
    title: "Quiz interactivo",
    desc: "4 opciones por nivel con timer. Pon a prueba tu memoria bajo presión.",
  },
  {
    icon: <IoTrophyOutline size={28} />,
    title: "Sigue tu progreso",
    desc: "Tu camino se guarda. Vuelve cuando quieras y continúa donde lo dejaste.",
  },
];

const STEPS = [
  { n: "01", label: "Crea tu cuenta", desc: "Registro gratis con email y contraseña." },
  { n: "02", label: "Elige un nivel", desc: "Toca cualquier nivel en el camino para iniciar el quiz." },
  { n: "03", label: "Responde a tiempo", desc: "30 segundos para elegir la traducción correcta." },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleCTA = () => navigate(user ? "/game" : "/auth");

  return (
    <div className="min-h-dvh bg-blue-mirage text-white flex flex-col">
      {/* Nav */}
      <nav className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-2">
          <BsQuestionDiamond size={22} className="text-white" />
          <span className="font-bold text-lg">First100</span>
        </div>
        <button
          type="button"
          onClick={handleCTA}
          className="text-sm font-medium bg-white/15 hover:bg-white/25 border border-white/20 rounded-xl px-4 py-2 transition-colors"
        >
          {user ? "Continuar" : "Entrar"}
        </button>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-8 pb-12 gap-6">
        <div className="flex items-center justify-center gap-1 mb-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-8 h-8 border-2 border-white/60 rotate-45 rounded-md"
              style={{ opacity: 0.4 + i * 0.3 }}
            />
          ))}
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight max-w-xs">
          Aprende inglés de verdad
        </h1>
        <p className="text-white/70 text-base max-w-sm leading-relaxed">
          Domina las <strong className="text-white">100 palabras más usadas</strong> del inglés
          con quizzes rápidos, un camino visual y tu progreso guardado.
        </p>
        <button
          type="button"
          onClick={handleCTA}
          className="flex items-center gap-2 bg-white text-blue-mirage font-bold py-4 px-8 rounded-2xl text-base hover:bg-white/90 active:scale-95 transition-all shadow-lg mt-2"
        >
          Empezar gratis <IoArrowForwardOutline size={20} />
        </button>
        <p className="text-white/40 text-xs">Sin tarjeta de crédito. Sin complicaciones.</p>
      </section>

      {/* Features */}
      <section className="px-5 pb-10 flex flex-col gap-3 max-w-lg mx-auto w-full">
        <h2 className="text-sm font-semibold text-white/50 uppercase tracking-widest text-center mb-2">
          Por qué funciona
        </h2>
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="flex items-start gap-4 bg-white/10 border border-white/15 rounded-2xl p-4"
          >
            <div className="text-white/80 mt-0.5 shrink-0">{f.icon}</div>
            <div>
              <p className="font-semibold text-sm">{f.title}</p>
              <p className="text-white/60 text-sm mt-0.5 leading-snug">{f.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section className="px-5 pb-12 max-w-lg mx-auto w-full">
        <h2 className="text-sm font-semibold text-white/50 uppercase tracking-widest text-center mb-5">
          Cómo funciona
        </h2>
        <div className="flex flex-col gap-4">
          {STEPS.map((s) => (
            <div key={s.n} className="flex items-start gap-4">
              <span className="text-2xl font-black text-white/20 leading-none mt-0.5 w-8 shrink-0">
                {s.n}
              </span>
              <div>
                <p className="font-semibold text-sm">{s.label}</p>
                <p className="text-white/60 text-sm leading-snug">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-5 pb-12 flex flex-col items-center gap-3 max-w-lg mx-auto w-full">
        <button
          type="button"
          onClick={handleCTA}
          className="w-full flex items-center justify-center gap-2 bg-white text-blue-mirage font-bold py-4 rounded-2xl text-base hover:bg-white/90 active:scale-95 transition-all shadow-lg"
        >
          {user ? "Ir al juego" : "Crear cuenta gratis"} <IoArrowForwardOutline size={20} />
        </button>
        {!user && (
          <button
            type="button"
            onClick={() => navigate("/auth")}
            className="text-white/50 text-sm underline"
          >
            Ya tengo cuenta
          </button>
        )}
      </section>
    </div>
  );
}
