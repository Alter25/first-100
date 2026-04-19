import { IoHomeOutline } from "react-icons/io5";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return <div className="w-full overflow-hidden bg-blue-mirage flex items-center justify-center">
    <div className="relative">
      <div className="w-screen max-h-screen">
        {children}
      </div>
      <footer className="fixed bg-blue-mirage/90 backdrop-blur-[1px] bottom-0 left-[50%] -translate-[50%] p-2 w-60 border rounded-lg flex">
        <IoHomeOutline size={32} />
      </footer>
    </div>
  </div>
}