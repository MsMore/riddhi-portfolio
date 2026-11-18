import type { Metadata } from 'next';
import AidaContribution from './AidaContribution';

export const metadata: Metadata = {
  title: 'My Contribution to AIDA | Riddhi More',
  description: 'Riddhi More on observability, AI metrics, leadership communication, governance and delivery across squads.',
  alternates: { canonical: '/aida-contribution' },
  openGraph: {
    title: 'My Contribution to AIDA | Riddhi More',
    description: 'Measurable AI in everyday operations.',
    url: 'https://riddhimore.com/aida-contribution',
    images: [{ url: '/aida-contribution/slides/slide-01.png', width: 1280, height: 720 }],
  },
};

export default function AidaContributionPage() {
  return <AidaContribution />;
}
