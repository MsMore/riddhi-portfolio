import type { Metadata } from 'next';
import ProtectedDemo from '../private-demos/ProtectedDemo';
import { protectedPackages } from '../private-demos/manifest';

export const metadata: Metadata = {
  title: 'My Contribution to AIDA | Riddhi More',
  description: 'A private interview presentation.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/aida-contribution' },
  openGraph: {
    title: 'My Contribution to AIDA | Riddhi More',
    description: 'A private interview presentation.',
    url: 'https://riddhimore.com/aida-contribution',
  },
};

export default function AidaContributionPage() {
  return <ProtectedDemo id="aida-contribution" title="My Contribution to AIDA" packageUrl={protectedPackages['aida-contribution']} />;
}
