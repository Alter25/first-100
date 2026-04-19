import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/*
SQL para crear la tabla en Supabase:

CREATE TABLE progress (
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  level_index integer NOT NULL,
  status text NOT NULL CHECK (status IN ('correct', 'wrong')),
  answered_at bigint NOT NULL,
  PRIMARY KEY (user_id, level_index)
);

ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own progress" ON progress
  FOR ALL USING (auth.uid() = user_id);
*/
