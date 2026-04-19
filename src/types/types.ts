export interface Word {
  word: string;
  word_description: string;
  target_phrase: string;
  similar_words: string[];
  question: string;
  word_translation: string;
  examples?: string[] | string | null;
  examples_es?: string[];
  image_url?: string | null;
  progress?: number;
}
