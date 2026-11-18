import type {Metadata} from 'next';
import ProtectedDemo from '../private-demos/ProtectedDemo';
import { protectedPackages } from '../private-demos/manifest';
export const metadata:Metadata={title:'Brand Compass — Riddhi More',description:'A private interview demonstration.',robots:{index:false,follow:false},alternates:{canonical:'/brand-compass'}};
export default function Page(){return <ProtectedDemo id="brand-compass" title="Brand Compass" packageUrl={protectedPackages['brand-compass']}/>}
