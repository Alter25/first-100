import type { MouseEventHandler } from "react";
import { BsQuestionDiamond } from "react-icons/bs";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { cn } from "../lib/utils";
import type { LevelStatus } from "../types/types";

interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
  status: LevelStatus;
  locked: boolean;
  index: number;
}

const STATUS_STYLES: Record<LevelStatus, string> = {
  unanswered: "border-white/60 bg-blue-mirage hover:scale-110 hover:bg-blue-mirage/80",
  correct: "border-green-400 bg-green-500/20 hover:scale-105",
  wrong: "border-red-400 bg-red-500/20 hover:scale-105",
};

export default function Step({ onClick, status, locked, index }: Props) {
  const icon = locked
    ? <IoTimeOutline size={36} className="text-white/50" />
    : status === "correct"
      ? <MdOutlineFileDownloadDone size={40} className="text-green-400" />
      : status === "wrong"
        ? <BsQuestionDiamond size={32} className="text-red-400" />
        : <BsQuestionDiamond size={36} className="text-white" />;

  return (
    <button
      type="button"
      onClick={locked ? undefined : onClick}
      disabled={locked}
      aria-label={`Nivel ${index + 1}`}
      className={cn(
        "w-18 h-18 border-2 flex items-center justify-center rotate-45 rounded-xl transition-all duration-200",
        STATUS_STYLES[status],
        locked && "opacity-50 cursor-not-allowed"
      )}
    >
      <span className="-rotate-45">{icon}</span>
    </button>
  );
}
