import { IoHomeOutline } from "react-icons/io5";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return <div className="w-full h-screen flex items-center justify-center">
    <div className="relative">
      <div className="w-screen h-screen">
        {children}
      </div>
      <footer className="fixed bottom-0 left-[50%] -translate-[50%] p-2 w-60 border rounded-lg flex">
        <IoHomeOutline size={32} />
      </footer>
    </div>
  </div>
}