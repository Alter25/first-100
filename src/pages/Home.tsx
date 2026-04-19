import { useState, useRef, useEffect } from "react";
import { cn } from "../lib/utils";
import MainLayout from "../layout/MainLayout";
import Step from "../components/Step";
import ProgressPath from "../components/ProgressPath";
import { useStepsStore } from "../stores/useStepsStore";
import { useUIStore } from "../stores/useUIStore";
import { useProgressStore } from "../stores/useProgressStore";
import type { Word } from "../types/types";
import QModal from "../components/QModal";
import { IoChevronDownOutline } from "react-icons/io5";

export default function Home() {
  const steps = useStepsStore((s) => s.words);
  const [stepSelected, setStepSelected] = useState<Word | null>(null);
  const [levelIndex, setLevelIndex] = useState<number | null>(null);
  const openModal = useUIStore((s) => s.openModal);
  const getStatus = useProgressStore((s) => s.getStatus);
  const canRetry = useProgressStore((s) => s.canRetry);
  const sectionRef = useRef<HTMLElement>(null);
  const [canScrollDown, setCanScrollDown] = useState(false);

  const checkScroll = () => {
    const el = sectionRef.current;
    if (!el) return;
    setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = sectionRef.current;
    el?.addEventListener("scroll", checkScroll);
    return () => el?.removeEventListener("scroll", checkScroll);
  }, [steps]);

  const handleSelectStep = (index: number) => {
    const status = getStatus(index);
    if (status !== "unanswered" && !canRetry(index)) return;
    setStepSelected(steps[index]);
    setLevelIndex(index);
    openModal();
  };

  const completedUpTo = (() => {
    let last = 0;
    for (let i = 0; i < steps.length; i++) {
      if (getStatus(i) !== "unanswered") last = i + 1;
      else break;
    }
    return last;
  })();

  return (
    <MainLayout>
      <div className="w-full max-h-screen bg-blue-mirage">
        <div className="w-full flex flex-col items-center">
          <div className="pt-5 pb-2">
            <h1 className="text-4xl text-white font-bold">Listo?!</h1>
          </div>
          <section
            ref={sectionRef}
            className="relative w-full max-w-lg pt-8 pb-28 flex flex-col items-center justify-start max-h-dvh overflow-y-auto no-scrollbar"
          >
            <ProgressPath total={steps.length} completedUpTo={completedUpTo} />
            {steps.map((_, i) => (
              <div key={i} className={cn("item", "-my-4 z-10")}>
                <Step
                  index={i}
                  status={getStatus(i)}
                  locked={getStatus(i) !== "unanswered" && !canRetry(i)}
                  onClick={() => handleSelectStep(i)}
                />
              </div>
            ))}
          </section>
          <QModal question={stepSelected} levelIndex={levelIndex} />
        </div>
      </div>
      {canScrollDown && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 pointer-events-none animate-bounce">
          <IoChevronDownOutline size={28} className="text-white/70" />
        </div>
      )}
    </MainLayout>
  );
}
