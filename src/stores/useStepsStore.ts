import { create } from 'zustand';
import type { Word } from '../types/types';
import { basicWords } from '../lib/words';


interface StepType{
  words: Word[];
  setWords: (words:Word[]) => void;
}

export const useStepsStore = create<StepType>((set) => ({
  words: basicWords,
  setWords: (words) => (set({
    words:words,
  }))
}))
