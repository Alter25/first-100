import { useState } from 'react';
import type { MouseEventHandler } from "react";
import { BsQuestionDiamond } from "react-icons/bs";
import { MdOutlineFileDownloadDone } from "react-icons/md";

interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function Step({ onClick }: Props) {
  const complete = useState<boolean>(false);
  return (
    <button onClick={onClick} className="w-30 h-30 border-2 flex items-center justify-center rotate-45 m-8 rounded-lg hover:scale-110 hover:cursor-pointer" >
      <span className="-rotate-45">{complete ? <BsQuestionDiamond size={48} /> : <MdOutlineFileDownloadDone />}</span>
    </button >
  )
}