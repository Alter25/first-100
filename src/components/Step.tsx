import type { MouseEventHandler } from "react";
import { BsQuestionDiamond } from "react-icons/bs";
interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function Step({ onClick }: Props) {
  return (
    <button onClick={onClick} className="w-20 h-20 border-2 flex items-center justify-center rotate-45 m-8 rounded-lg" >
      <span className="-rotate-45"><BsQuestionDiamond /></span>
    </button >
  )
}