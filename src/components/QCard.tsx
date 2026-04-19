import { cn } from "../lib/utils";

interface Props {
  word: string;
  isCorrect: boolean;
  revealed: boolean;
  onAnswer: (correct: boolean) => void;
}

export default function QCard({ word, isCorrect, revealed, onAnswer }: Props) {
  const getBg = () => {
    if (!revealed) return "bg-blue-mirage hover:bg-blue-mirage/80 active:scale-95";
    if (isCorrect) return "bg-green-500 text-white";
    return "bg-blue-mirage/40 text-white/50";
  };

  return (
    <button
      onClick={() => !revealed && onAnswer(isCorrect)}
      disabled={revealed}
      className={cn(
        "border rounded-xl w-full h-14 font-medium transition-all duration-200 text-white text-sm px-3",
        getBg()
      )}
    >
      {word}
    </button>
  );
}
