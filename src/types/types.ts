export interface Word {
  title: string;
  word_origin: string;
  word_target: string;
  examples?: string[] | string | null;
  image_url?: string | null;
  progress?: number;
  
}

