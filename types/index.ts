export interface PostSummary {
  slug: string;
  title: string;
  /** `yyyy-mm-dd` */
  date: string;
  excerpt: string;
  tags: string;
}

export interface IPost extends PostSummary {
  /** Markdown */
  content: string;
}

export type ThemeState = 'light' | 'dark' | 'auto';

export function isThemeState(value: unknown): value is ThemeState {
  return value === 'light' || value === 'dark' || value === 'auto';
}
