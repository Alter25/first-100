import { useState, useRef, useEffect, useCallback } from "react";
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

const INITIAL_UNLOCKED = 5;

interface StepPos { cx: number; cy: number; }

export default function Home() {
  const steps = useStepsStore((s) => s.words);
  const [stepSelected, setStepSelected] = useState<Word | null>(null);
  const [levelIndex, setLevelIndex] = useState<number | null>(null);
  const openModal = useUIStore((s) => s.openModal);
  const getStatus = useProgressStore((s) => s.getStatus);
  const canRetry = useProgressStore((s) => s.canRetry);
  const results = useProgressStore((s) => s.results);

  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const [stepPositions, setStepPositions] = useState<StepPos[]>([]);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });

  // Highest ever-answered index (raw results, not affected by canRetry)
  const highestAnswered = Object.keys(results).length > 0
    ? Math.max(...Object.keys(results).map(Number))
    : -1;
  const unlockedUpTo = Math.max(INITIAL_UNLOCKED - 1, highestAnswered + 1);

  const isLocked    = (i: number) => i > unlockedUpTo;
  const isDisabled  = (i: number) => !isLocked(i) && getStatus(i) !== "unanswered" && !canRetry(i);

  // Measure actual DOM positions of each step for the SVG path
  const measurePositions = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const sectionRect = section.getBoundingClientRect();
    const scrollTop = section.scrollTop;

    const positions = itemRefs.current
      .slice(0, steps.length)
      .map((el) => {
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return {
          cx: rect.left + rect.width  / 2 - sectionRect.left,
          cy: rect.top  + rect.height / 2 - sectionRect.top + scrollTop,
        };
      })
      .filter((p): p is StepPos => p !== null);

    setStepPositions(positions);
    setSvgSize({
      width: section.clientWidth,
      height: section.scrollHeight,
    });
  }, [steps.length]);

  useEffect(() => {
    measurePositions();
    const section = sectionRef.current;
    if (!section) return;
    const ro = new ResizeObserver(measurePositions);
    ro.observe(section);
    return () => ro.disconnect();
  }, [measurePositions]);

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
    if (isLocked(index) || isDisabled(index)) return;
    setStepSelected(steps[index]);
    setLevelIndex(index);
    openModal();
  };

  const completedUpTo = (() => {
    let count = 0;
    for (let i = 0; i < steps.length; i++) {
      if (getStatus(i) !== "unanswered") count = i + 1;
      else break;
    }
    return count;
  })();

  return (
    <MainLayout>
      <div className="w-full h-dvh bg-blue-mirage flex flex-col">
        <div className="pt-5 pb-2 text-center shrink-0">
          <h1 className="text-4xl text-white font-bold">Listo?!</h1>
        </div>
        <section
          ref={sectionRef}
          className="relative flex-1 overflow-y-auto no-scrollbar flex flex-col items-center pt-8 pb-28 gap-20"
        >
          <ProgressPath
            positions={stepPositions}
            completedUpTo={completedUpTo}
            width={svgSize.width}
            height={svgSize.height}
          />
          {steps.map((_, i) => (
            <div
              key={i}
              ref={(el) => { itemRefs.current[i] = el; }}
              className={cn("item z-10")}
            >
              <Step
                index={i}
                status={getStatus(i)}
                locked={isLocked(i)}
                disabled={isDisabled(i)}
                onClick={() => handleSelectStep(i)}
              />
            </div>
          ))}
        </section>
        <QModal question={stepSelected} levelIndex={levelIndex} />
      </div>
      {canScrollDown && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 pointer-events-none animate-bounce z-40">
          <IoChevronDownOutline size={28} className="text-white/70" />
        </div>
      )}
    </MainLayout>
  );
}
