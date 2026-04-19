import { IoHomeOutline, IoLogOutOutline } from "react-icons/io5";
import { useAuthStore } from "../stores/useAuthStore";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  const { user, signOut } = useAuthStore();

  return (
    <div className="w-full overflow-hidden bg-blue-mirage flex items-center justify-center">
      <div className="relative">
        <div className="w-screen max-h-screen">
          {children}
        </div>
        <footer className="fixed bg-blue-mirage/90 backdrop-blur-sm bottom-0 left-1/2 -translate-x-1/2 p-2 px-5 border border-white/20 rounded-xl flex items-center justify-between gap-6">
          <IoHomeOutline size={28} className="text-white" />
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
