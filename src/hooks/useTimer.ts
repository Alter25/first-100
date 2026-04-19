import { useState, useEffect, useRef } from "react";

export function useTimer(seconds: number, onExpire: () => void) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [running, setRunning] = useState(false);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) {
      onExpireRef.current();
      setRunning(false);
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, running]);

  const start = () => {
    setTimeLeft(seconds);
    setRunning(true);
  };

  const stop = () => setRunning(false);

  return { timeLeft, running, start, stop, progress: timeLeft / seconds };
}
