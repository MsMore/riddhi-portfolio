import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Riddhi More — AI Solutions Architect',
    short_name: 'Riddhi More',
    description: 'AI systems, enterprise automation, and applied research by Riddhi More.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f7fff0',
    theme_color: '#f7fff0',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
