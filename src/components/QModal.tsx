import { useState, useEffect } from 'react';
import type { Word } from "../types/types";
import { useUIStore } from "../stores/useUIStore";
import { MdOutlineClose } from "react-icons/md";
import QCard from "./QCard";
import { randomNumber, randomBool  } from '../lib/utils';

interface Props {
  question: Word | null;
}

export default function QModal({ question }: Props) {
  const OPTIONS_CUANTITY = 4;
  const [options, setOptions] = useState<Word[] | null>(null);
  const { isModalOpen, closeModal } = useUIStore();

  const init = () => {
    const ran = randomNumber(0, 4);
    const rightOneSelected = false;
    for (let i = 0; i < OPTIONS_CUANTITY - 1; i++) {
      if (!rightOneSelected) {
        if (randomBool()) {

        }
      }
    }
  }

  useEffect(() => {
    init();
  }, [])


  if (!question) return;
  return (isModalOpen &&
    <dialog open={isModalOpen} className="min-w-90 min-h-160 bg-white/90 mt-20 backdrop:blur-3xl border rounded-xl mx-auto">
      <nav className="flex justify-between p-4">
        <div className="flex-1 flex justify-center">
          <h1>{question.word_description}</h1>
        </div>
        <button onClick={() => closeModal()}>
          <MdOutlineClose size={32} />
        </button>
      </nav>
      <section className="flex flex-col min-h-144 items-center justify-between border p-4">
        <div>
          <h2>{question.question}</h2>
        </div>
        {
          question.examples &&
          <QCard aWord={question.similar_words[2]} rightWord={question.word} />
        }
      </section>
    </dialog>
  )
}