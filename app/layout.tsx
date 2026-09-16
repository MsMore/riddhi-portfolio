import type { Metadata } from 'next';
import '@fontsource-variable/dm-sans';
import '@fontsource-variable/space-grotesk';
import '@fontsource/caveat/500.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://riddhimore.com'),
  title: 'Riddhi More — AI Systems & Enterprise Solutions',
  description: 'AI Solutions Architect in Toronto. Building secure, useful AI systems at the intersection of applied research and enterprise delivery.',
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.svg' },
  openGraph: { title: 'Riddhi More — AI Systems & Enterprise Solutions', description: 'AI systems, enterprise automation, and applied research. Selected work by Riddhi More, AI Solutions Architect in Toronto.', type: 'website', locale: 'en_CA', url: 'https://riddhimore.com' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('riddhi-theme');document.documentElement.dataset.theme=(t==='dark'||t==='light')?t:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch(e){document.documentElement.dataset.theme=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}})()` }}/></head><body>{children}</body></html>;
}
