import type { Metadata } from 'next';
import ProtectedDemo from '../private-demos/ProtectedDemo';
import { protectedPackages } from '../private-demos/manifest';

export const metadata: Metadata = {
  title: 'Brand Compass — Riddhi More',
  description: 'A private interview demonstration.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/compass' },
  openGraph: {
    title: 'Brand Compass — Riddhi More',
    description: 'A private interview demonstration.',
    url: 'https://riddhimore.com/compass',
  },
};

export default function CompassPage() {
  return <ProtectedDemo id="brand-compass" title="Brand Compass" packageUrl={protectedPackages['brand-compass']} bare />;
}
