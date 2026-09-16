'use client';
import { useEffect, useState } from 'react';
import { Doodle } from './doodle';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const preference = matchMedia('(prefers-color-scheme: dark)');
    const sync = () => setDark(document.documentElement.dataset.theme === 'dark');
    const systemChange = () => {
      let saved: string | null = null;
      try { saved = localStorage.getItem('riddhi-theme'); } catch { /* Storage may be unavailable. */ }
      if (!saved) document.documentElement.dataset.theme = preference.matches ? 'dark' : 'light';
      sync();
    };
    sync();
    preference.addEventListener('change', systemChange);
    return () => preference.removeEventListener('change', systemChange);
  }, []);
  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    try { localStorage.setItem('riddhi-theme', next ? 'dark' : 'light'); } catch { /* Theme still works without persistence. */ }
  }
  return <button className="theme-toggle" onClick={toggle} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={dark} title={dark ? 'Lights on' : 'Lights off'}><Doodle name="bulb" size={29}/></button>;
}
