import { useEffect, useState } from 'react';
import { ThemeState } from '../../types';

import style from './theme-picker.module.css';

export const ThemePicker: React.FC = () => {
  const [theme, setTheme] = useState<ThemeState | 'disabled'>('disabled');
  useEffect(() => {
    try {
      setTheme((document.body.dataset.theme as ThemeState) ?? 'auto');
    } catch {
      setTheme('auto');
    }
  }, []);

  return (
    <>
      <label className={style.label} htmlFor="theme-selector">
        Theme
      </label>
      <select
        className={style.dropdown}
        id="theme-selector"
        disabled={theme === 'disabled'}
        value={theme === 'disabled' ? 'auto' : theme}
        onChange={(event) => {
          const value = event.target.value as ThemeState;
          document.body.dataset.theme = value;
          setTheme(value);
          try {
            localStorage.setItem('theme', value);
          } catch {}
        }}
      >
        <option value="auto">Auto</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </>
  );
};
