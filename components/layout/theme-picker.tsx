import { createSignal, onSettled } from 'solid-js';
import { isThemeState, type ThemeState } from '../../types';

import style from './theme-picker.module.css';

export function ThemePicker() {
  // Stays disabled until hydration, since it can't do anything without JS.
  const [theme, setTheme] = createSignal<ThemeState | 'disabled'>('disabled');
  onSettled(() => {
    const saved = document.documentElement.dataset.theme;
    setTheme(isThemeState(saved) ? saved : 'auto');
  });

  return (
    <>
      <label class={style.label} for="theme-selector">
        Theme
      </label>
      <select
        class={style.dropdown}
        id="theme-selector"
        disabled={theme() === 'disabled'}
        value={theme() === 'disabled' ? 'auto' : theme()}
        onChange={(event) => {
          const value = event.currentTarget.value;
          if (!isThemeState(value)) {
            return;
          }
          document.documentElement.dataset.theme = value;
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
}
