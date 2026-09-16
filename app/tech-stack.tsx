'use client';
import { useState } from 'react';
import { siPython, siTypescript, siJavascript, siReact, siNodedotjs, siPytorch, siHuggingface, siLangchain, siDocker, siGit, siTensorflow, siModelcontextprotocol, type SimpleIcon } from 'simple-icons';
import { Doodle, type DoodleName } from './doodle';
import { projects, certifications } from './content';

type Skill = { name: string; icon?: SimpleIcon; context: string; links: string[] };
const groups: { name: string; icon: DoodleName; skills: Skill[] }[] = [
  { name: 'Generative AI & Agents', icon: 'chip', skills: [
    { name: 'RAG', context: 'Retrieval pipelines, document processing, embeddings, and grounded answers.', links: ['amgen', 'research-assistant'] },
    { name: 'MCP', icon: siModelcontextprotocol, context: 'Connecting assistants to enterprise APIs and applications.', links: ['amgen'] },
    { name: 'LangChain', icon: siLangchain, context: 'Agent orchestration and retrieval in enterprise GenAI applications.', links: ['amgen'] },
    { name: 'LangGraph', context: 'Coordinating a multi-step literature review workflow.', links: ['research-assistant'] },
    { name: 'Ollama', context: 'Local model inference for a research assistant.', links: ['research-assistant'] },
    { name: 'FAISS', context: 'Vector retrieval over a research knowledge base.', links: ['research-assistant'] },
    { name: 'Prompt engineering', context: 'Grounded responses, tool use, reliability, and hallucination reduction.', links: ['amgen'] },
    { name: 'LLM evaluation', context: 'Testing model behavior, data leakage, and benchmark quality.', links: ['amgen', 'humaneval', 'augmentation-bias'] },
  ] },
  { name: 'Machine Learning & NLP', icon: 'search', skills: [
    { name: 'Python', icon: siPython, context: 'The main language across model experiments, evaluation, and research tooling.', links: ['flakyxbert', 'alignfreeze', 'humaneval', 'research-assistant'] },
    { name: 'PyTorch', icon: siPytorch, context: 'Few-shot models and experiments with multilingual representations.', links: ['flakyxbert', 'alignfreeze'] },
    { name: 'TensorFlow', icon: siTensorflow, context: 'Machine learning experimentation for flaky test detection.', links: ['flakyxbert'] },
    { name: 'Hugging Face', icon: siHuggingface, context: 'Transformer models for software testing and multilingual NLP.', links: ['flakyxbert', 'alignfreeze'] },
    { name: 'Multilingual NLP', context: 'Cross-lingual transfer and layer-wise realignment analysis.', links: ['alignfreeze'] },
    { name: 'Few-shot learning', context: 'Learning from limited data using a Siamese network.', links: ['flakyxbert'] },
    { name: 'Reinforcement learning', context: 'Training collision-avoidance behavior in a simulated maritime environment.', links: ['maritime'] },
    { name: 'Combinatorial testing', context: 'Generating concrete benchmark tasks from reusable templates.', links: ['humaneval'] },
  ] },
  { name: 'Software Development', icon: 'code', skills: [
    { name: 'TypeScript', icon: siTypescript, context: 'Typed application development across frontend and backend work.', links: ['amgen'] },
    { name: 'JavaScript', icon: siJavascript, context: 'Web applications and integration work.', links: ['amgen'] },
    { name: 'React', icon: siReact, context: 'Interfaces for enterprise applications.', links: ['amgen'] },
    { name: 'Node.js', icon: siNodedotjs, context: 'Backend services for GenAI applications.', links: ['amgen'] },
    { name: 'C#', context: 'Enterprise backend development and integrations.', links: ['amgen'] },
    { name: 'SQL', context: 'Working with enterprise data and application backends.', links: ['amgen'] },
    { name: 'C++', context: 'Programming foundation listed in my technical skill set.', links: [] },
    { name: 'Ruby on Rails', context: 'Open-source application development during the MLH Fellowship.', links: [] },
    { name: 'Jekyll', context: 'Open-source site development during the MLH Fellowship.', links: [] },
    { name: 'Unity / ML-Agents', context: 'Simulated environments for learning navigation policies.', links: ['maritime'] },
  ] },
  { name: 'Cloud & Delivery', icon: 'rocket', skills: [
    { name: 'AWS / Bedrock', context: 'Cloud services and foundation models for enterprise GenAI.', links: ['amgen'] },
    { name: 'Docker', icon: siDocker, context: 'Packaging the research assistant and its dependencies.', links: ['research-assistant'] },
    { name: 'Git', icon: siGit, context: 'Version control and collaborative software development.', links: [] },
    { name: 'MLOps / LLMOps', context: 'Evaluation, reliability, and support considerations across the AI lifecycle.', links: ['amgen', 'flakyxbert'] },
    { name: 'Agile / Scrum', context: 'Collaborative delivery in distributed, cross-functional teams.', links: [] },
    { name: 'Security & governance', context: 'Data access, traceability, security, and long-term support in enterprise AI architecture.', links: ['amgen'] },
  ] },
];

function SkillGroup({ group, index }: { group: typeof groups[number]; index: number }) {
  const [selected, setSelected] = useState<Skill | null>(null);
  return <article className={'skill-group skill-group-' + index}>
    <header><Doodle name={group.icon} size={36}/><div><h3>{group.name}</h3></div></header>
    <div className="skill-stickers">{group.skills.map((skill, i) => <button key={skill.name} aria-pressed={selected?.name === skill.name} style={{ '--tilt': (i % 3 - 1) * 1.3 + 'deg' } as React.CSSProperties} onClick={() => setSelected(selected?.name === skill.name ? null : skill)}>{skill.icon && <svg aria-hidden="true" viewBox="0 0 24 24" width="21" height="21" fill="currentColor"><path d={skill.icon.path}/></svg>}<span>{skill.name}</span><span className="skill-plus" aria-hidden="true">+</span></button>)}</div>
    {selected && <div className="skill-connection" aria-live="polite"><p>{selected.context}</p>{selected.links.length > 0 && <div className="related-links">{selected.links.map(id => <a key={id} href={'#project-' + id}>{projects.find(p => p.id === id)?.name} ↗</a>)}</div>}{['Ruby on Rails', 'Jekyll', 'Agile / Scrum', 'Git'].includes(selected.name) && <a className="inline-link" href="#job-mlh">MLH Fellowship ↗</a>}</div>}
  </article>;
}
export function TechStack() {
  return <><div className="skill-groups">{groups.map((group, i) => <SkillGroup group={group} index={i} key={group.name}/>)}</div><details className="certifications resume-entry"><summary><div><h3>Certifications</h3></div><span className="plus" aria-hidden="true">+</span></summary><ul className="detail-bullets entry-content">{certifications.map(c => <li key={c}>{c}</li>)}</ul></details></>;
}
