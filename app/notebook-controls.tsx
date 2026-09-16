'use client';
import { useEffect, useRef, useState } from 'react';
import { process } from './content';
import { Doodle, type DoodleName } from './doodle';

export function PageInteractions() {
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      const height = document.documentElement.scrollHeight - innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${height > 0 ? scrollY / height : 0})`;
    };
    // A deep link opens the corresponding entry, including links from skills and jobs.
    const openTarget = () => {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (!target) return;
      const details = target.matches('details') ? target : target.matches('.project-story') ? target.querySelector('details') : null;
      if (details instanceof HTMLDetailsElement) details.open = true;
    };
    addEventListener('scroll', update, { passive: true }); addEventListener('hashchange', openTarget);
    const observer = new ResizeObserver(update); observer.observe(document.body);
    update(); openTarget();
    return () => { removeEventListener('scroll', update); removeEventListener('hashchange', openTarget); observer.disconnect(); };
  }, []);
  return <div className="reading-progress" ref={progress} aria-hidden="true"/>;
}

export function DetailControls({ target }: { target: string }) {
  function setAll(open: boolean) { document.querySelectorAll<HTMLDetailsElement>(`#${target} details`).forEach(detail => { detail.open = open; }); }
  return <div className="detail-controls"><button onClick={() => setAll(true)}>Expand all +</button><button onClick={() => setAll(false)}>Collapse all −</button></div>;
}

const processIcons: DoodleName[] = ['search', 'bulb', 'checklist', 'shield', 'rocket'];
export function BuildProcess() {
  const [selected, setSelected] = useState(0);
  return <div className="process-notebook">
    <div className="process-tabs" role="group" aria-label="Explore my process">{process.map((step, i) => <button key={step.name} aria-pressed={selected === i} aria-controls="process-page" onClick={() => setSelected(i)}><Doodle name={processIcons[i]} size={32}/><span>{step.name}</span></button>)}</div>
    <div className="process-page" id="process-page" aria-live="polite"><h3>{process[selected].name}</h3><p>{process[selected].text}</p></div>
  </div>;
}
