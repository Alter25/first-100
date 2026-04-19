import type { MouseEventHandler } from "react";
import { MdOutlineFileDownloadDone, MdOutlineClose } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import { cn } from "../lib/utils";
import type { LevelStatus } from "../types/types";

interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
  status: LevelStatus;
  locked: boolean;
  disabled: boolean;
  index: number;
}

export default function Step({ onClick, status, locked, disabled, index }: Props) {
  const isInteractive = !locked && !disabled;

  const containerStyle = cn(
    "w-18 h-18 border-2 flex items-center justify-center rotate-45 rounded-xl transition-all duration-200",
    locked  && "border-white/20 bg-white/5 opacity-40",
    !locked && status === "unanswered" && "border-white/60 bg-blue-mirage hover:scale-110 active:scale-95",
    !locked && status === "correct"    && "border-green-400 bg-green-500/25",
    !locked && status === "wrong"      && "border-red-400 bg-red-500/25",
    isInteractive && "cursor-pointer hover:brightness-110"
  );

  const content = locked
    ? <IoLockClosedOutline size={24} className="text-white/30" />
    : status === "correct"
      ? <MdOutlineFileDownloadDone size={36} className="text-green-400" />
      : status === "wrong"
        ? <MdOutlineClose size={30} className="text-red-400" />
        : <span className="text-white font-bold text-xl leading-none">{index + 1}</span>;

  return (
    <button
      type="button"
      onClick={isInteractive ? onClick : undefined}
      disabled={!isInteractive}
      aria-label={`Nivel ${index + 1}`}
      className={containerStyle}
    >
      <span className="-rotate-45 flex items-center justify-center">
        {content}
      </span>
    </button>
  );
}
