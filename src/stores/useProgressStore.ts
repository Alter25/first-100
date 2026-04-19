import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LevelResult, LevelStatus } from "../types/types";
import { supabase } from "../lib/supabase";

const RETRY_MS = 12 * 60 * 60 * 1000;

interface ProgressStore {
  results: Record<number, LevelResult>;
  setResult: (index: number, status: "correct" | "wrong") => Promise<void>;
  canRetry: (index: number) => boolean;
  getStatus: (index: number) => LevelStatus;
  syncFromSupabase: () => Promise<void>;
  clearAll: () => void;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      results: {},

      setResult: async (index, status) => {
        const answeredAt = Date.now();
        set((state) => ({
          results: { ...state.results, [index]: { status, answeredAt } },
        }));

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        await supabase.from("progress").upsert({
          user_id: user.id,
          level_index: index,
          status,
          answered_at: answeredAt,
        });
      },

      canRetry: (index) => {
        const result = get().results[index];
        if (!result) return true;
        return Date.now() - result.answeredAt > RETRY_MS;
      },

      getStatus: (index) => {
        const result = get().results[index];
        if (!result) return "unanswered";
        if (get().canRetry(index)) return "unanswered";
        return result.status;
      },

      syncFromSupabase: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data } = await supabase
          .from("progress")
          .select("level_index, status, answered_at")
          .eq("user_id", user.id);

        if (!data) return;

        const results: Record<number, LevelResult> = {};
        for (const row of data) {
          results[row.level_index] = {
            status: row.status,
            answeredAt: row.answered_at,
          };
        }
        set({ results });
      },

      clearAll: () => set({ results: {} }),
    }),
    { name: "progress-storage" }
  )
);
