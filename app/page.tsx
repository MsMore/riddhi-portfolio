import { contact, projects, experience, education } from './content';
import { InteractiveNotebook } from './interactive-notebook';
import { ThemeToggle } from './theme-toggle';
import { Doodle, type DoodleName } from './doodle';
import { PageInteractions, DetailControls, BuildProcess } from './notebook-controls';
import { ProjectShelf } from './project-shelf';
import { TechStack } from './tech-stack';

function ExternalLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}<span className="sr-only"> (opens in a new tab)</span></a>;
}
function SectionHeading({ title, id, icon }: { title: string; id: string; icon: DoodleName }) {
  return <div className="section-heading"><Doodle name={icon} size={36}/><h2 id={id}>{title}</h2></div>;
}
export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a><PageInteractions/>
    <header className="topbar page-wrap"><a className="wordmark" href="#home" aria-label="Riddhi More, home">riddhi more<Doodle name="star" size={24}/></a><nav aria-label="Main navigation"><a href="#about">About</a><a href="#experience">Experience</a><a href="#work">Projects</a><a href="#stack">Skills</a><a href="#contact">Contact</a></nav><ThemeToggle/></header>
    <main id="main">
      <section className="hero" id="home" aria-labelledby="hero-name">
        <InteractiveNotebook/>
        <div className="hero-doodle hero-doodle-a"><Doodle name="pencil" size={66}/></div><div className="hero-doodle hero-doodle-b"><Doodle name="bulb" size={70}/></div><div className="hero-doodle hero-doodle-c"><Doodle name="star" size={48}/></div><div className="hero-doodle hero-doodle-d"><Doodle name="code" size={57}/></div>
        <div className="hero-location"><Doodle name="location" size={23}/><span>Toronto, Canada</span></div>
        <div className="hero-content"><p className="hero-greeting handwritten">hello, nice to meet you!</p><h1 id="hero-name">Riddhi <span className="name-marker">More</span></h1><p className="hero-role">AI Solutions Architect</p><p className="hero-summary">Building AI systems for enterprise workflows.</p><div className="hero-actions"><a className="primary-link" href="#work">Explore my work <Doodle name="arrow" size={23}/></a><ExternalLink className="quiet-link" href={contact.linkedin}>LinkedIn ↗</ExternalLink></div></div>
        <a href="#about" className="scroll-note handwritten">a little more about me ↓</a>
      </section>
      <div className="page-wrap main-content">
        <section className="page-section about-section" id="about" aria-labelledby="about-heading">
          <SectionHeading title="About me" id="about-heading" icon="heart"/>
          <div className="about-note">
            <p className="about-lead">A builder at heart.<br/><span className="handwritten">With a researcher’s curiosity.</span></p>
            <p>I’m Riddhi, an AI Solutions Architect in Toronto. I design systems that connect language models with business data, APIs, and everyday workflows.</p>
            <p>My experience spans enterprise engineering, NLP research, and teaching. At Amgen, I built agents for Legal, Finance, and Pharmacovigilance. Today, I work on AI architecture and automation at Northeast Shared Services.</p>
            <p>I care about making technology easier to understand and use. That has shaped my research on efficient, reliable AI—and my work mentoring more than 500 students at Ontario Tech.</p>
            <div className="about-links"><a href="#experience">My experience ↘</a><a href="#education">My education ↘</a><a href="#work">My projects & papers ↘</a></div>
          </div>
        </section>
        <section className="page-section" id="approach" aria-labelledby="approach-heading"><SectionHeading title="How I build AI solutions" id="approach-heading" icon="bulb"/><BuildProcess/></section>
        <section className="page-section" id="experience" aria-labelledby="experience-heading">
          <div className="section-toolbar"><SectionHeading title="Work experience" id="experience-heading" icon="rocket"/><DetailControls target="experience-list"/></div>
          <div className="experience-list" id="experience-list">{experience.map(job => <div className="timeline-entry" key={job.id}><div className="timeline-date">{job.date}</div><details className="resume-entry job-entry" id={'job-' + job.id}>
            <summary><div className="entry-summary"><h3>{job.role}</h3><p className="job-company">{job.company}</p></div><span className="plus" aria-hidden="true">+</span></summary>
            <div className="entry-content"><ul className="detail-bullets">{job.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>{job.projectIds.length > 0 && <div className="related-links">{job.projectIds.map(id => <a key={id} href={'#project-' + id}>{projects.find(p => p.id === id)?.name} ↗</a>)}</div>}</div>
          </details></div>)}</div>
        </section>
        <section className="page-section" id="education" aria-labelledby="education-heading"><SectionHeading title="Education" id="education-heading" icon="pencil"/><div className="education-list">{education.map(school => <details className="resume-entry" key={school.school}><summary><div><h3>{school.degree}</h3><p>{school.school}</p><div className="entry-date">{school.date} · {school.grade}</div></div><span className="plus" aria-hidden="true">+</span></summary><div className="entry-content"><p>{school.thesis}</p><ul className="tags" aria-label="Selected coursework">{school.courses.map(course => <li key={course}>{course}</li>)}</ul>{school.school === 'University of Mumbai' && <a className="inline-link" href="#project-maritime">Thesis project ↗</a>}</div></details>)}</div></section>
        <section className="page-section" id="work" aria-labelledby="work-heading"><span id="publications" className="anchor-alias"/><SectionHeading title="Projects & publications" id="work-heading" icon="code"/><ProjectShelf/></section>
        <section className="page-section" id="stack" aria-labelledby="stack-heading"><SectionHeading title="Technical skills" id="stack-heading" icon="chip"/><TechStack/></section>
      </div>
      <section className="contact-section" id="contact" aria-labelledby="contact-heading"><div className="contact-content page-wrap"><div><h2 id="contact-heading">Let’s connect</h2><a className="contact-email" href={'mailto:' + contact.email}>{contact.email} ↗</a></div><div className="social-links"><ExternalLink href={contact.linkedin}>LinkedIn ↗</ExternalLink><ExternalLink href={contact.github}>GitHub ↗</ExternalLink></div></div></section>
      <div className="page-wrap">
        <footer><a href="#home" className="wordmark footer-name" aria-label="Riddhi More, back to top">riddhi more<Doodle name="star" size={24}/></a><p>© 2026 Riddhi More</p><a href="#home">Back to top ↑</a></footer>
      </div>
    </main>
  </>;
}
