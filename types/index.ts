export interface IPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string;
  content: string;
}

export type ThemeState = 'light' | 'dark' | 'auto';

export function isThemeState(value: unknown): value is ThemeState {
  return value === 'light' || value === 'dark' || value === 'auto';
}
