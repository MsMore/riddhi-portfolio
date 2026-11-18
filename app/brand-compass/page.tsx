import type {Metadata} from 'next';
import CompassApp from './CompassApp';
import './compass.css';
export const metadata:Metadata={title:'Brand Compass — Riddhi More',description:'An independent commercial analytics demo with synthetic data, forecasts, evidence and open-source AI running in the browser.',alternates:{canonical:'/brand-compass'},openGraph:{title:'Brand Compass — Riddhi More',description:'Commercial decision support with synthetic data and observable browser AI.',url:'https://riddhimore.com/brand-compass'}};
export default function Page(){return <CompassApp/>}
