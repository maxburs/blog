import { createEffect, createSignal, onMount } from 'solid-js';
import { ThemeState } from '../../types';

import style from './theme-picker.module.css';

export const ThemePicker = () => {
  const [getTheme, setTheme] = createSignal<ThemeState | 'disabled'>(
    'disabled',
  );

  onMount(() => {
    try {
      setTheme(
        (document.documentElement.dataset.theme as ThemeState) ?? 'auto',
      );
    } catch {
      setTheme('auto');
    }
  });

  createEffect(() => {
    console.log({ theme: getTheme() });
  });

  return (
    <>
      <label class={style.label} html-for="theme-selector">
        Theme
      </label>
      <select
        class={style.dropdown}
        id="theme-selector"
        disabled={getTheme() === 'disabled'}
        value={getTheme() === 'disabled' ? 'auto' : getTheme()}
        onChange={(event) => {
          const value = event.target.value as ThemeState;
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
};
