import { doodles } from './doodle-data';
export type DoodleName = keyof typeof doodles | 'location';
export function Doodle({ name, size = 28, className = '' }: { name: DoodleName; size?: number; className?: string }) {
  if (name === 'location') return <svg width={size} height={size} viewBox="0 0 28 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={'doodle ' + className} aria-hidden="true"><path d="M14 29S3 18 3.5 11.5C4 5 8 2.7 14 3c6 .2 10 4 10.2 9C24.6 19 14 29 14 29Z"/><path d="M18 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/></svg>;
  const icon = doodles[name];
  const [x, y, width, height] = icon.viewBox.split(' ').map(Number);
  const viewBox = `${x - width * .05} ${y - height * .05} ${width * 1.1} ${height * 1.1}`;
  return <svg width={size} height={size} viewBox={viewBox} fill="none" className={'doodle ' + className} aria-hidden="true" focusable="false" dangerouslySetInnerHTML={{ __html: icon.markup }}/>;
}
