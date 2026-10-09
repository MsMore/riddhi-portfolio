'use client';

import { useEffect, useState } from 'react';
import { Doodle } from './doodle';
import { ThemeToggle } from './theme-toggle';

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#work', label: 'Projects' },
  { href: '#stack', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  return (
    <header className="topbar-shell">
      <div className="topbar page-wrap">
        <a className="wordmark" href="#home" aria-label="Riddhi More, home" onClick={() => setOpen(false)}>
          riddhi more<Doodle name="star" size={24}/>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
        <div className="topbar-actions">
          <ThemeToggle/>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setOpen(current => !current)}
          >
            <span/><span/><span/>
          </button>
        </div>
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>
          {links.map((link, index) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              <span aria-hidden="true">0{index + 1}</span>{link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
