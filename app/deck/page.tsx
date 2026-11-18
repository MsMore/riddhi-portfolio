import type { Metadata } from 'next';
import ProtectedDemo from '../private-demos/ProtectedDemo';
import { protectedPackages } from '../private-demos/manifest';

export const metadata: Metadata = {
  title: 'From AI to Business Value | Riddhi More',
  description: 'A private interview presentation.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/deck' },
  openGraph: {
    title: 'From AI to Business Value | Riddhi More',
    description: 'A private interview presentation.',
    url: 'https://riddhimore.com/deck',
  },
};

export default function DeckPage() {
  return <ProtectedDemo id="aida-contribution" title="From AI to Business Value" packageUrl={protectedPackages['aida-contribution']} bare />;
}
