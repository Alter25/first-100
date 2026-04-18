import { create } from 'zustand';
import type { Word } from '../types/types';


interface StepType{
  words: Word[];
  setWords: (words:Word[]) => void;
}

export const useStepsStore = create<StepType>((set) => ({
  words: [],
  setWords: (words) => (set({
    words:words,
  }))
}))
