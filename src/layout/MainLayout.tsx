import { IoHomeOutline, IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";


interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-hidden bg-blue-mirage flex items-center justify-center">
      <div className="relative">
        <div className="w-screen max-h-screen">
          {children}
        </div>
        <footer className="fixed z-50 bg-blue-mirage/90 backdrop-blur-sm bottom-0 left-1/2 -translate-x-1/2 p-2 px-5 border border-white/20 rounded-xl flex items-center justify-between gap-6">
          <button type="button" onClick={() => navigate("/")} aria-label="Inicio" className="text-white">
            <IoHomeOutline size={28} />
          </button>
          {user && (
            <button
              type="button"
              onClick={signOut}
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Cerrar sesión"
            >
              <IoLogOutOutline size={26} />
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}
