import type { Word } from "../types/types";
import { useUIStore } from "../stores/useUIStore";
import { MdOutlineClose } from "react-icons/md";


interface Props {
  question: Word | null;
}

export default function QModal({ question }: Props) {
  const { isModalOpen, closeModal } = useUIStore();
  if (!question) return;
  return (isModalOpen &&
    <dialog open={isModalOpen} className="min-w-90 h-200 bg-white/90 mt-20 backdrop:blur-3xl border rounded-xl mx-auto">
      <nav className="flex justify-between p-4">
        <div>
          <h1>{question.word_origin}</h1>
        </div>
        <button onClick={() => closeModal()}>
          <MdOutlineClose size={32} />
        </button>
      </nav>
    </dialog>
  )
}