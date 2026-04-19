import type { Word } from "../types/types";
import { useUIStore } from "../stores/useUIStore";
import { MdOutlineClose } from "react-icons/md";
import QCard from "./QCard";


interface Props {
  question: Word | null;
}

export default function QModal({ question }: Props) {
  const { isModalOpen, closeModal } = useUIStore();
  if (!question) return;
  return (isModalOpen &&
    <dialog open={isModalOpen} className="min-w-90 h-160 bg-white/90 mt-20 backdrop:blur-3xl border rounded-xl mx-auto">
      <nav className="flex justify-between p-4">
        <div className="flex-1 flex justify-center">
          <h1>{question.word_description}</h1>
        </div>
        <button onClick={() => closeModal()}>
          <MdOutlineClose size={32} />
        </button>
      </nav>
      <section className="h-full flex flex-col items-center">
        {
          question.examples &&
          <QCard aWord={question.similar_words[2]} rightWord={question.word} />
        }
      </section>
    </dialog>
  )
}