'use client';
import { useEffect, useRef } from 'react';

// This field only moves in response to input, and stops drawing once it settles.
export function InteractiveNotebook() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const hero = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !hero || !ctx) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0, height = 0, frame = 0, active = false;
    let px = 0, py = 0, tx = 0, ty = 0, strength = 0;
    let ink = '', glow = '';
    let doodles: { element: HTMLElement; x: number; y: number }[] = [];
    function draw() {
      frame = 0;
      if (!ctx || !canvas) return;
      px += (tx - px) * .16;
      py += (ty - py) * .16;
      strength += ((active ? 1 : 0) - strength) * .12;
      ctx.clearRect(0, 0, width, height);
      // Reduced motion follows the pointer directly, without easing or a trailing animation.
      const force = strength;
      for (const doodle of doodles) {
        const dx = doodle.x - px, dy = doodle.y - py;
        const distance = Math.hypot(dx, dy);
        const influence = Math.exp(-distance * distance / 70000) * force;
        // A little parallax keeps every doodle connected to the field; nearby
        // doodles lift and bend away, including when the pointer is at their centre.
        const parallaxX = (px / width - .5) * 20 * force;
        const parallaxY = (py / height - .5) * 14 * force;
        const shiftX = Math.tanh(dx / 95) * 62 * influence + parallaxX;
        const shiftY = (Math.tanh(dy / 95) * 46 - 26) * influence + parallaxY;
        doodle.element.style.setProperty('--drift-x', `${shiftX}px`);
        doodle.element.style.setProperty('--drift-y', `${shiftY}px`);
        doodle.element.style.setProperty('--drift-angle', `${(Math.tanh(dx / 120) * 24 + 12) * influence}deg`);
        doodle.element.style.setProperty('--drift-scale', `${1 + influence * .2}`);
      }
      if (strength > .01) {
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, 240);
        gradient.addColorStop(0, glow); gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient; ctx.fillRect(0, 0, width, height);
      }
      ctx.strokeStyle = ink; ctx.lineWidth = 1;
      for (let row = -1; row < height / 32 + 2; row++) {
        ctx.beginPath();
        for (let x = -20; x < width + 25; x += 9) {
          const y = row * 32;
          const distance = Math.hypot(x - px, y - py);
          const bend = Math.exp(-distance * distance / 22000) * 64 * force;
          const dy = y + (y < py ? -bend : bend);
          if (x === -20) ctx.moveTo(x, dy); else ctx.lineTo(x, dy);
        }
        ctx.stroke();
      }
      for (let col = 0; col < width / 32 + 1; col++) {
        ctx.beginPath();
        for (let y = -20; y < height + 25; y += 9) {
          const x = col * 32;
          const distance = Math.hypot(x - px, y - py);
          const bend = Math.exp(-distance * distance / 22000) * 64 * force;
          const dx = x + (x < px ? -bend : bend);
          if (y === -20) ctx.moveTo(dx, y); else ctx.lineTo(dx, y);
        }
        ctx.stroke();
      }
      if (!reduced.matches && (Math.abs(tx - px) + Math.abs(ty - py) > .3 || Math.abs((active ? 1 : 0) - strength) > .005)) frame = requestAnimationFrame(draw);
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(draw); }
    function resize() {
      if (!canvas || !ctx || !hero) return;
      const rect = hero.getBoundingClientRect(); width = rect.width; height = rect.height;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = width * dpr; canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const styles = getComputedStyle(canvas);
      ink = styles.getPropertyValue('--grid-ink').trim(); glow = styles.getPropertyValue('--glow').trim();
      doodles = Array.from(hero.querySelectorAll<HTMLElement>('.hero-doodle')).map(element => ({ element, x: element.offsetLeft + element.offsetWidth / 2, y: element.offsetTop + element.offsetHeight / 2 }));
      schedule();
    }
    function move(event: PointerEvent) {
      if (!hero || event.pointerType === 'touch') return;
      const rect = hero.getBoundingClientRect(); tx = event.clientX - rect.left; ty = event.clientY - rect.top;
      active = true;
      if (reduced.matches) { px = tx; py = ty; strength = 1; }
      schedule();
    }
    function leave() { active = false; if (reduced.matches) strength = 0; schedule(); }
    const observer = new ResizeObserver(resize); observer.observe(hero);
    const themeObserver = new MutationObserver(resize); themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    hero.addEventListener('pointermove', move); hero.addEventListener('pointerleave', leave);
    reduced.addEventListener('change', leave); resize();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); themeObserver.disconnect(); hero.removeEventListener('pointermove', move); hero.removeEventListener('pointerleave', leave); reduced.removeEventListener('change', leave); };
  }, []);
  return <canvas className="interactive-notebook" ref={ref} aria-hidden="true"/>;
}
