export interface Word {
  word: string;
  title: string;
  word_description: string;
  target_phrase: string;
  similar_words: string[];
  examples?: string[] | string | null;
  image_url?: string | null;
  progress?: number;
}
