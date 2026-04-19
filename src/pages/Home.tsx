
import { useState, useRef, useEffect } from "react";
import { cn } from "../lib/utils";
import MainLayout from "../layout/MainLayout"
import Step from "../components/Step"
import { useStepsStore } from "../stores/useStepsStore"
import { useUIStore } from "../stores/useUIStore";
import type { Word } from "../types/types";
import QModal from "../components/QModal";
import { IoChevronDownOutline } from "react-icons/io5";

export default function Home() {
  const steps = useStepsStore(s => s.words);
  const [stepSelected, setStepSelected] = useState<Word | null>(null);
  const openModal = useUIStore(s => s.openModal);
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
    setStepSelected(steps[index]);
    openModal();
    console.log('click', index);
  }

  return <MainLayout>
    <div className="w-full max-h-screen bg-blue-mirage">
      <div className="w-[120] flex flex-col items-center">
        <div className="pt-5">
          <h1 className="text-4xl">Listo?!</h1>
        </div>
        <section ref={sectionRef} className="min-w-120 pt-8 pb-64 border flex flex-col items-center justify-start max-h-dvh overflow-y-auto contenedor no-scrollbar">
          {
            //aqui va un map de todos las palabras.
            (() => {
              return steps && steps.map((_, i) => (
                <div key={i} className={cn('item', '-my-6')}>
                  <Step onClick={() => handleSelectStep(i)} />
                </div>
              ));
            })()
          }
        </section>
        <QModal question={stepSelected} />
      </div>
    </div>
    {canScrollDown && (
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 pointer-events-none animate-bounce">
        <IoChevronDownOutline size={28} className="text-white/70" />
      </div>
    )}
  </MainLayout>
}