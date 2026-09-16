'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { projects } from './content';
import { Doodle, type DoodleName } from './doodle';
import { DetailControls } from './notebook-controls';

const filters = ['All work', 'Enterprise', 'Applied projects', 'Papers'] as const;
const projectIcons: Record<string, DoodleName> = { amgen: 'chip', 'research-assistant': 'search', flakyxbert: 'checklist', alignfreeze: 'chip', humaneval: 'code', 'augmentation-bias': 'shield', maritime: 'arrow', 'threaded-paws': 'code' };
export function ProjectShelf() {
  const [filter, setFilter] = useState<string>('All work');
  const [destination, setDestination] = useState<{ id: string } | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<(() => void) | null>(null);
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const cards = Array.from(list.querySelectorAll<HTMLElement>('.project-story'));
    const layout = () => {
      const styles = getComputedStyle(list);
      const columns = Number(styles.getPropertyValue('--project-columns')) || 1;
      const gap = Math.round(parseFloat(styles.columnGap) || 0);
      const bottoms = Array<number>(columns).fill(0);
      // Keep the source/keyboard order, but give each column its own vertical flow.
      // Explicit columns prevent an expanded card from moving its neighbours across.
      const visible = cards.filter(card => !card.hidden);
      const heights = visible.map(card => Math.ceil(card.getBoundingClientRect().height));
      visible.forEach((card, index) => {
        const column = index % columns;
        card.style.gridColumn = String(column + 1);
        card.style.gridRow = `${bottoms[column] + 1} / span ${heights[index]}`;
        bottoms[column] += heights[index] + gap;
      });
      list.dataset.masonry = 'true';
    };
    layoutRef.current = layout;
    const observer = new ResizeObserver(layout);
    observer.observe(list);
    cards.forEach(card => observer.observe(card));
    list.addEventListener('toggle', layout, true);
    layout();
    return () => {
      observer.disconnect();
      list.removeEventListener('toggle', layout, true);
      layoutRef.current = null;
      delete list.dataset.masonry;
      cards.forEach(card => { card.style.gridColumn = ''; card.style.gridRow = ''; });
    };
  }, [filter]);
  useLayoutEffect(() => {
    if (!destination) return;
    const target = document.getElementById(destination.id);
    const detail = target?.querySelector('details');
    if (detail) detail.open = true;
    layoutRef.current?.();
    target?.scrollIntoView({ block: 'start', behavior: 'instant' });
  }, [destination]);
  useEffect(() => {
    const showTarget = (hash = location.hash) => {
      if (!hash.startsWith('#project-')) return;
      setFilter('All work');
      setDestination({ id: hash.slice(1) });
    };
    const onHash = () => showTarget();
    const onLink = (event: MouseEvent) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      const link = event.target instanceof Element ? event.target.closest('a') : null;
      if (link?.origin === location.origin && link.pathname === location.pathname && link.hash.startsWith('#project-')) {
        event.preventDefault();
        if (location.hash !== link.hash) history.pushState(null, '', link.hash);
        showTarget(link.hash);
      }
    };
    showTarget();
    addEventListener('hashchange', onHash); document.addEventListener('click', onLink);
    return () => { removeEventListener('hashchange', onHash); document.removeEventListener('click', onLink); };
  }, []);
  return <>
    <div className="shelf-toolbar"><div className="filter-pills" aria-label="Filter projects">{filters.map(name => <button key={name} aria-pressed={filter === name} onClick={() => setFilter(name)}>{name}</button>)}</div><DetailControls target="project-list"/></div>
    <div className="project-list" id="project-list" ref={listRef}>{projects.map(project => {
      const visible = filter === 'All work' || (filter === 'Enterprise' && project.category === 'Enterprise') || (filter === 'Papers' && !!project.paper) || (filter === 'Applied projects' && !project.paper && project.category !== 'Enterprise');
      return <article className={`project-story project-${project.id}`} key={project.id} id={`project-${project.id}`} hidden={!visible}>
        <details className="project-details"><summary><div><div className="project-heading"><span className="project-stamp"><Doodle name={projectIcons[project.id]} size={30}/></span><h3>{project.name}</h3></div><p>{project.description}</p><ul className="tags project-tools" aria-label="Technologies and methods">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></div><span className="plus" aria-hidden="true">+</span></summary>
          <div className="project-body"><div className="project-context"><p className="project-scope">{project.scope}</p><p>{project.challenge}</p><p>{project.outcome}</p></div><ul className="detail-bullets project-method">{project.approach.map(item => <li key={item}>{item}</li>)}</ul>
          {project.paper && <section className="paper-note" aria-label="Related publication"><h4>{project.paper.title}</h4><p className="authors">{project.paper.authors} · {project.paper.venue}</p><p>{project.paper.summary}</p><div className="paper-links"><a href={project.paper.href} target="_blank" rel="noopener noreferrer">Read paper ↗<span className="sr-only"> (opens in a new tab)</span></a>{project.paper.code && <a href={project.paper.code} target="_blank" rel="noopener noreferrer">Code & data ↗<span className="sr-only"> (opens in a new tab)</span></a>}</div></section>}
          </div>
        </details>
      </article>;
    })}</div>
  </>;
}
