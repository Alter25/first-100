import { cn } from "../lib/utils";
import { useEffect, useState } from "react";
interface Props {
  aWord: string;
  rightWord: string;
}

export default function QCard({ aWord, rightWord }: Props) {
  const [trigger, setTrigger] = useState<string>('bg-blue-mirage');
  const handleBackground = () => {
    if (aWord === rightWord) {
      setTrigger('bg-green-400');
    } else {
      setTrigger('bg-red-400');
    }
  }
  useEffect(() => { }, [trigger])
  return (
    <button
      onClick={handleBackground}
      className={cn('bg-blue-mirage hover:bg-blue-mirage/80 border rounded-xl w-80 h-30', trigger)} >
      <p>
        {aWord}
      </p>
    </button>
  )
}