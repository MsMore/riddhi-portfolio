'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { contributionSlides } from './slides';
import styles from './aida-contribution.module.css';

const ASSET_BASE = '/aida-contribution';
const slideImage = (index: number) => `${ASSET_BASE}/slides/slide-${String(index + 1).padStart(2, '0')}.png`;

export default function AidaContribution() {
  const [index, setIndex] = useState(0);
  const [outlineOpen, setOutlineOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [notice, setNotice] = useState('');
  const stageRef = useRef<HTMLDivElement>(null);
  const slide = contributionSlides[index];
  const count = contributionSlides.length;
  const go = useCallback((next: number) => setIndex(Math.min(count - 1, Math.max(0, next))), [count]);

  useEffect(() => {
    const navigate = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (event.altKey || event.ctrlKey || event.metaKey || target?.closest('input, textarea, select, [contenteditable="true"]')) return;
      const directions: Record<string, number> = { ArrowLeft: -1, PageUp: -1, ArrowRight: 1, PageDown: 1 };
      if (event.key in directions) {
        event.preventDefault();
        setIndex(current => Math.min(count - 1, Math.max(0, current + directions[event.key])));
      } else if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault();
        setIndex(event.key === 'Home' ? 0 : count - 1);
      }
    };
    const changed = () => setFullscreen(document.fullscreenElement === stageRef.current);
    window.addEventListener('keydown', navigate);
    document.addEventListener('fullscreenchange', changed);
    return () => {
      window.removeEventListener('keydown', navigate);
      document.removeEventListener('fullscreenchange', changed);
    };
  }, [count]);

  const present = async () => {
    setNotice('');
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (stageRef.current?.requestFullscreen) await stageRef.current.requestFullscreen();
      else setNotice('Fullscreen is unavailable in this browser. Expand the browser window to present.');
    } catch {
      setNotice('The browser did not enter fullscreen. You can continue presenting in this window.');
    }
  };

  return (
    <main className={styles.viewer}>
      <header className={styles.header}>
        <div className={styles.identity}>
          <a href="/" className={styles.monogram} aria-label="Riddhi More portfolio">RM</a>
          <div>
            <p className={styles.eyebrow}>RIDDHI MORE</p>
            <h1 className={styles.title}>My contribution to AIDA</h1>
          </div>
        </div>
        <div className={styles.headerActions}>
          <a className={styles.quietLink} href="/brand-compass">Open Brand Compass <span aria-hidden="true">↗</span></a>
          <details className={styles.download}>
            <summary>Download <span aria-hidden="true">⌄</span></summary>
            <div className={styles.downloadMenu}>
              <a href={`${ASSET_BASE}/Riddhi_More_AIDA_Contribution.pdf`} download>PDF presentation<span>9 slides</span></a>
              <a href={`${ASSET_BASE}/Riddhi_More_AIDA_Contribution.pptx`} download>Editable PowerPoint<span>With public-safe notes</span></a>
            </div>
          </details>
        </div>
      </header>

      <section className={styles.introduction} aria-label="About this presentation">
        <p>Measurable AI in everyday operations</p>
        <span>Experience, operating practices and a proposed contribution.</span>
      </section>

      <div className={`${styles.workspace} ${outlineOpen ? styles.withOutline : ''}`}>
        {outlineOpen && <nav className={styles.outline} aria-label="Presentation outline">
          <p className={styles.outlineLabel}>IN THIS PRESENTATION</p>
          {contributionSlides.map((item, position) => (
            <button key={item.section} className={position === index ? styles.outlineActive : ''} aria-current={position === index ? 'step' : undefined} onClick={() => go(position)}>
              <span>{String(position + 1).padStart(2, '0')}</span>
              <div><strong>{item.section}</strong><small>{item.title}</small></div>
            </button>
          ))}
        </nav>}

        <div className={styles.presentationColumn}>
          <div ref={stageRef} className={styles.stage}>
            <figure className={styles.slide} aria-labelledby="current-slide-title">
              {/* The exported slide is faithful to the validated editable PowerPoint. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img key={index} src={slideImage(index)} alt="" width={1280} height={720} fetchPriority="high" draggable={false} />
              <figcaption className={styles.srOnly}>
                <h2 id="current-slide-title">Slide {index + 1}: {slide.title}</h2>
                <ul>{slide.transcript.map(line => <li key={line}>{line}</li>)}</ul>
              </figcaption>
            </figure>
            <div className={styles.controls}>
              <button className={styles.iconButton} aria-label="Previous slide" disabled={index === 0} onClick={() => go(index - 1)}><span aria-hidden="true">←</span></button>
              <span className={styles.counter} aria-live="polite" aria-atomic="true"><b>{String(index + 1).padStart(2, '0')}</b><span>/</span>{String(count).padStart(2, '0')}</span>
              <button className={styles.iconButton} aria-label="Next slide" disabled={index === count - 1} onClick={() => go(index + 1)}><span aria-hidden="true">→</span></button>
              <div className={styles.progress} aria-label="Choose a slide">
                {contributionSlides.map((item, position) => <button key={item.section} aria-label={`Slide ${position + 1}: ${item.section}`} aria-current={position === index ? 'step' : undefined} className={position === index ? styles.progressActive : ''} onClick={() => go(position)} />)}
              </div>
              <button className={styles.presentButton} onClick={present} aria-label={fullscreen ? 'Exit fullscreen presentation' : 'Present fullscreen'}><span aria-hidden="true">⛶</span><span>{fullscreen ? 'Exit' : 'Present'}</span></button>
            </div>
          </div>

          <div className={styles.belowStage}>
            <button className={styles.outlineToggle} aria-expanded={outlineOpen} onClick={() => setOutlineOpen(open => !open)}><span aria-hidden="true">☷</span>{outlineOpen ? 'Hide outline' : 'Show outline'}</button>
            <p className={styles.keyboardHint}>Use <kbd>←</kbd> <kbd>→</kbd> to navigate</p>
          </div>
          {notice && <p role="status" className={styles.notice}>{notice}</p>}

          <details className={styles.notes} key={`notes-${index}`}>
            <summary><div><span>SLIDE {String(index + 1).padStart(2, '0')}</span><strong>Speaker notes and context</strong></div><span aria-hidden="true">+</span></summary>
            <div className={styles.notesContent}>
              <h2>{slide.title}</h2>
              <p>{slide.notes}</p>
              <div className={styles.grounding}><b>Source and scope</b><p>{slide.grounding}</p></div>
              <details className={styles.transcript}><summary>Read the slide text</summary><ul>{slide.transcript.map(line => <li key={line}>{line}</li>)}</ul></details>
            </div>
          </details>
        </div>
      </div>

      <footer className={styles.footer}>
        <span>Riddhi More · AI systems and enterprise solutions</span>
        <a href="/">Back to portfolio <span aria-hidden="true">↗</span></a>
      </footer>
    </main>
  );
}
