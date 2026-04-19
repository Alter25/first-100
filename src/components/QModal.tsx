import { useState, useEffect, useMemo } from "react";
import type { Word } from "../types/types";
import { useUIStore } from "../stores/useUIStore";
import { useProgressStore } from "../stores/useProgressStore";
import { useTimer } from "../hooks/useTimer";
import { MdOutlineClose } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import QCard from "./QCard";

const TIMER_SECONDS = 30;

interface Props {
  question: Word | null;
  levelIndex: number | null;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function QuizContent({ question, levelIndex }: { question: Word; levelIndex: number }) {
  const { closeModal } = useUIStore();
  const setResult = useProgressStore((s) => s.setResult);
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState<boolean | null>(null);

  const options = useMemo(() => {
    const right = question.word_translation;
    const wrong = shuffle(question.similar_words.filter((w) => w !== right)).slice(0, 3);
    return shuffle([right, ...wrong]);
  }, [question]);

  const timer = useTimer(TIMER_SECONDS, () => handleAnswer(false));

  function handleAnswer(isCorrect: boolean) {
    if (revealed) return;
    timer.stop();
    setRevealed(true);
    setCorrect(isCorrect);
    setResult(levelIndex, isCorrect ? "correct" : "wrong");
  }

  useEffect(() => {
    timer.start();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const barColor =
    timer.timeLeft > 20 ? "bg-green-400" : timer.timeLeft > 10 ? "bg-yellow-400" : "bg-red-400";

  return (
    <>
      {/* Timer bar */}
      <div className="h-1.5 w-full bg-gray-200 overflow-hidden">
        <div className={`timer-bar-anim ${barColor} ${revealed ? "paused" : ""}`} />
      </div>

      {/* Header */}
      <nav className="flex justify-between items-center px-5 py-3 shrink-0 border-b">
        <div className="flex items-center gap-1.5 text-sm text-gray-500 min-w-[40px]">
          <IoTimeOutline size={15} />
          <span className={timer.timeLeft <= 10 && !revealed ? "text-red-500 font-bold" : ""}>
            {timer.timeLeft}s
          </span>
        </div>
        <h1 className="font-semibold text-gray-800 text-sm text-center flex-1 mx-3 leading-tight">
          {question.word_description}
        </h1>
        <button
          type="button"
          onClick={closeModal}
          className="text-gray-400 hover:text-gray-700 transition-colors min-w-[40px] flex justify-end"
        >
          <MdOutlineClose size={22} />
        </button>
      </nav>

      {/* Content */}
      <section className="flex flex-col flex-1 min-h-0 overflow-y-auto p-5 gap-5">
        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Pregunta</p>
          <h2 className="text-lg font-semibold text-gray-800 leading-snug">{question.question}</h2>
        </div>

        {revealed && (
          <div
            className={`text-center py-2 px-4 rounded-xl text-sm font-medium ${
              correct ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {correct
              ? "¡Correcto!"
              : `Incorrecto. Era: "${question.word_translation}"`}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          {options.map((opt) => (
            <QCard
              key={opt}
              word={opt}
              isCorrect={opt === question.word_translation}
              revealed={revealed}
              onAnswer={handleAnswer}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default function QModal({ question, levelIndex }: Props) {
  const isModalOpen = useUIStore((s) => s.isModalOpen);
  const closeModal = useUIStore((s) => s.closeModal);

  if (!isModalOpen || !question || levelIndex === null) return null;

  return (
    <dialog
      open
      onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
      className="w-[92vw] max-w-lg max-h-[90dvh] bg-white/95 mt-4 sm:mt-12 border rounded-2xl mx-auto overflow-hidden flex flex-col shadow-2xl backdrop:bg-black/40 backdrop:backdrop-blur-sm"
    >
      <QuizContent key={levelIndex} question={question} levelIndex={levelIndex} />
    </dialog>
  );
}
