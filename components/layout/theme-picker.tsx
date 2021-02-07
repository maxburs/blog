import { useEffect, useState } from 'react';
import { ThemeState } from '../../types';

import style from './theme-picker.module.css';

export const ThemePicker: React.FC = () => {
  const [theme, setTheme] = useState<ThemeState | 'disabled'>('disabled');
  useEffect(() => {
    try {
      setTheme(
        (document.documentElement.dataset.theme as ThemeState) ?? 'auto',
      );
    } catch {
      setTheme('auto');
    }
  }, []);

  return (
    <>
      <label className={style.label} htmlFor="theme-selector">
        theme
      </label>
      <select
        className={style.dropdown}
        id="theme-selector"
        disabled={theme === 'disabled'}
        value={theme === 'disabled' ? 'auto' : theme}
        onChange={(event) => {
          const value = event.target.value as ThemeState;
          document.documentElement.dataset.theme = value;
          setTheme(value);
          try {
            localStorage.setItem('theme', value);
          } catch {}
        }}
      >
        <option value="auto">auto</option>
        <option value="light">light</option>
        <option value="dark">dark</option>
      </select>
    </>
  );
};
