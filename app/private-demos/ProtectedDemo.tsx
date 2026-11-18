'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { LockKeyhole, LoaderCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import styles from './protected-demo.module.css';

type Download = { id: string; filename: string; mime: string; url: string; bytes: number };
type Payload = { html: string; embedded: { id: string; mime: string; data: string }[]; downloads: Download[] };
type Session = { key: CryptoKey; salt: Uint8Array; downloads: Map<string, Download> };
const MAGIC = new TextEncoder().encode('RIDDHI02');
const ITERATIONS = 600000;
const buffer = (value: Uint8Array) => new Uint8Array(value).buffer;
const aad = (id: string, part: string) => buffer(new TextEncoder().encode(`riddhi-interview:v2:${id}:${part}`));
function packet(value: ArrayBuffer) {
  const bytes = new Uint8Array(value);
  if (bytes.length < 52 || MAGIC.some((v, i) => bytes[i] !== v)) throw new Error('The protected file could not be read.');
  return { salt: bytes.slice(8, 24), iv: bytes.slice(24, 36), ciphertext: bytes.slice(36) };
}
async function keyFromPassword(password: string, salt: Uint8Array) {
  const material = await crypto.subtle.importKey('raw', buffer(new TextEncoder().encode(password)), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey({ name: 'PBKDF2', salt: buffer(salt), iterations: ITERATIONS, hash: 'SHA-256' }, material, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
}
async function decrypt(value: ReturnType<typeof packet>, key: CryptoKey, id: string, part: string) {
  return crypto.subtle.decrypt({ name: 'AES-GCM', iv: buffer(value.iv), additionalData: aad(id, part), tagLength: 128 }, key, buffer(value.ciphertext));
}

export default function ProtectedDemo({ id, title, packageUrl, bare = false }: { id: string; title: string; packageUrl: string; bare?: boolean }) {
  const [password, setPassword] = useState('');
  const [content, setContent] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const frame = useRef<HTMLIFrameElement>(null);
  const session = useRef<Session | null>(null);
  const urls = useRef<string[]>([]);
  const epoch = useRef(0);
  const request = useRef<AbortController | null>(null);
  const downloadRequest = useRef<AbortController | null>(null);
  const downloadUrl = useRef<string | null>(null);

  const lock = useCallback(() => {
    epoch.current += 1;
    request.current?.abort(); request.current = null;
    downloadRequest.current?.abort(); downloadRequest.current = null;
    if (downloadUrl.current) URL.revokeObjectURL(downloadUrl.current); downloadUrl.current = null;
    session.current = null;
    if (frame.current) frame.current.srcdoc = '';
    urls.current.forEach(url => URL.revokeObjectURL(url)); urls.current = [];
    setContent(null); setPassword(''); setBusy(false); setError(''); setNotice('');
  }, []);

  useEffect(() => {
    lock();
    const leaving = () => lock();
    const restored = (event: PageTransitionEvent) => { if (event.persisted) lock(); };
    window.addEventListener('pagehide', leaving);
    window.addEventListener('pageshow', restored);
    return () => { window.removeEventListener('pagehide', leaving); window.removeEventListener('pageshow', restored); lock(); };
  }, [packageUrl, lock]);

  useEffect(() => {
    const message = async (event: MessageEvent) => {
      if (event.source !== frame.current?.contentWindow || event.origin !== location.origin) return;
      if (event.data?.type === 'riddhi-demo:lock') { lock(); return; }
      if (event.data?.type !== 'riddhi-demo:download' || typeof event.data.id !== 'string') return;
      const current = session.current, item = current?.downloads.get(event.data.id);
      if (!current || !item) return;
      if (downloadRequest.current) { setNotice('A download is already being prepared.'); return; }
      const currentEpoch = epoch.current;
      const controller = new AbortController(); downloadRequest.current = controller;
      try {
        setNotice(`Preparing ${item.filename}…`);
        const url = new URL(item.url, location.origin);
        if (url.origin !== location.origin || !url.pathname.startsWith(`/protected-demos/${id}/`)) throw new Error('Unknown download.');
        const response = await fetch(url, { cache: 'no-store', signal: controller.signal });
        if (!response.ok) throw new Error('The download is not available.');
        const file = packet(await response.arrayBuffer());
        if (epoch.current !== currentEpoch || session.current !== current || controller.signal.aborted) return;
        if (file.salt.some((v, i) => v !== current.salt[i])) throw new Error('Download version mismatch. Reload and unlock the app again.');
        const plain = await decrypt(file, current.key, id, item.id);
        if (epoch.current !== currentEpoch || session.current !== current) return;
        if (downloadUrl.current) URL.revokeObjectURL(downloadUrl.current);
        const blobUrl = URL.createObjectURL(new Blob([plain], { type: item.mime })); downloadUrl.current = blobUrl;
        const anchor = document.createElement('a'); anchor.href = blobUrl; anchor.download = item.filename; anchor.click();
        setTimeout(() => { if (downloadUrl.current === blobUrl) { URL.revokeObjectURL(blobUrl); downloadUrl.current = null; } }, 30000);
        setNotice(`${item.filename} is ready.`);
      } catch (e) { if (epoch.current === currentEpoch && !controller.signal.aborted) setNotice(e instanceof Error ? e.message : 'The download could not be prepared.'); }
      finally { if (downloadRequest.current === controller) downloadRequest.current = null; }
    };
    window.addEventListener('message', message);
    return () => window.removeEventListener('message', message);
  }, [id, lock]);

  const unlock = async (event: React.FormEvent) => {
    event.preventDefault(); if (!password || busy) return;
    const currentEpoch = epoch.current;
    const controller = new AbortController(); request.current = controller;
    setBusy(true); setError('');
    try {
      if (!crypto?.subtle || !window.isSecureContext) throw new Error('Open this page over HTTPS in a supported browser.');
      const response = await fetch(packageUrl, { cache: 'no-store', signal: controller.signal });
      if (!response.ok) throw new Error('The protected app is not available. Please try again.');
      const encrypted = packet(await response.arrayBuffer());
      const key = await keyFromPassword(password, encrypted.salt);
      const compressed = await decrypt(encrypted, key, id, 'main');
      const text = await new Response(new Blob([compressed]).stream().pipeThrough(new DecompressionStream('gzip'))).text();
      const payload = JSON.parse(text) as Payload;
      if (typeof payload.html !== 'string' || !Array.isArray(payload.embedded) || !Array.isArray(payload.downloads)) throw new Error('The protected package is incomplete.');
      if (epoch.current !== currentEpoch) return;
      const assets: Record<string, string> = {};
      for (const item of payload.embedded) {
        const bytes = Uint8Array.from(atob(item.data), c => c.charCodeAt(0));
        const url = URL.createObjectURL(new Blob([bytes], { type: item.mime })); urls.current.push(url); assets[item.id] = url;
      }
      const html = payload.html.replace('__DEMO_BASE_ORIGIN__', location.origin).replace('__DEMO_ASSET_MAP__', JSON.stringify(assets).replace(/</g, '\\u003c'));
      session.current = { key, salt: encrypted.salt, downloads: new Map(payload.downloads.map(item => [item.id, item])) };
      setPassword(''); setContent(html);
    } catch (e) {
      if (epoch.current !== currentEpoch || controller.signal.aborted) return;
      setPassword('');
      setError(e instanceof DOMException && e.name === 'OperationError' ? 'Incorrect password. Please try again.' : e instanceof Error ? e.message : 'The app could not be unlocked.');
    } finally { if (epoch.current === currentEpoch) { setBusy(false); request.current = null; } }
  };

  if (content) return <main className={styles.open}>{!bare && <header className={styles.toolbar}><span><ShieldCheck size={15}/>{title}</span><div>{notice && <small role="status">{notice}</small>}<button onClick={lock}><LockKeyhole size={14}/>Lock app</button></div></header>}<iframe ref={frame} title={title} srcDoc={content} allow="fullscreen; clipboard-write" allowFullScreen className={`${styles.frame} ${bare ? styles.fullFrame : ''}`}/></main>;
  return <main className={styles.locked}><section className={styles.card}><div className={styles.symbol}><LockKeyhole size={25}/></div><p className={styles.eyebrow}>PRIVATE PRESENTATION & DEMO</p><h1>{title}</h1><p className={styles.description}>Enter the password to open this app.</p><form onSubmit={unlock}><label htmlFor="demo-password">Password</label><input id="demo-password" type="password" name="demo-passcode" value={password} onChange={e => setPassword(e.target.value)} autoComplete="off" autoCapitalize="none" spellCheck={false} maxLength={256} autoFocus disabled={busy}/><button disabled={busy || !password}>{busy ? <><LoaderCircle size={17} className={styles.spin}/>Unlocking…</> : <>Open app<ArrowRight size={17}/></>}</button></form>{error && <p role="alert" className={styles.error}>{error}</p>}<p className={styles.note}>The password is not remembered. Reopening or reloading this page asks again.</p></section></main>;
}
