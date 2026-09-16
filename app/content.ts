// Personal facts: supplied résumé and msmore.github.io. Research: linked primary sources.
export const contact = { email: 'more.riddhi11@gmail.com', linkedin: 'https://www.linkedin.com/in/riddhi-more/', github: 'https://github.com/MsMore' };

export type Project = {
  id: string; name: string; category: 'Enterprise' | 'Applied AI' | 'Research' | 'Software';
  description: string; scope: string; tags: string[];
  challenge: string; approach: string[]; outcome: string;
  paper?: { title: string; authors: string; venue: string; summary: string; href: string; code?: string };
};
export const projects: Project[] = [
  {
    id: 'amgen', name: 'Enterprise GenAI Agent Solutions', category: 'Enterprise',
    description: 'Connecting AI assistants to the documents, tools, and workflows people already use.',
    scope: 'Amgen · GenAI Engineer · 2025–2026', tags: ['RAG', 'MCP', 'LangChain', 'Amazon Bedrock', 'Node.js', 'C#', 'SQL', 'React'],
    challenge: 'Legal, Finance, and Pharmacovigilance teams work across enterprise knowledge and applications, with the access controls and reliability expected in a regulated pharmaceutical environment.',
    approach: [
      'Built agentic assistants with retrieval, reasoning, tool calling, and workflow automation.',
      'Developed end-to-end RAG pipelines: document processing, embeddings, vector search, retrieval optimization, and grounded response generation.',
      'Built MCP-enabled integrations with enterprise APIs, Microsoft Teams, Outlook, and internal platforms.',
      'Developed applications and backend services using LangChain, Amazon Bedrock, AWS, Node.js, C#, SQL, and React.',
      'Worked on prompt engineering, orchestration, evaluation, reliability, and hallucination reduction with cross-functional teams.',
    ],
    outcome: 'Delivered AI capabilities for enterprise knowledge access and process automation, with security and regulated business requirements included in the solution design.',
  },
  {
    id: 'research-assistant', name: 'LLM-Powered Agentic Research Assistant', category: 'Applied AI',
    description: 'From a research question to a searchable knowledge base, with local model inference.',
    scope: 'Research tooling · SEER Lab', tags: ['Python', 'LangGraph', 'Ollama', 'FAISS', 'RAG', 'Docker', 'Tavily'],
    challenge: 'Literature review involves repeated searching, reading, and organizing. Useful context can get lost between papers and the tools used to read them.',
    approach: [
      'Created an end-to-end agent workflow for literature review and knowledge base construction.',
      'Used LangGraph to coordinate the workflow, Tavily for web search, and FAISS for retrieval over collected material.',
      'Used Ollama for local inference and automated context injection; packaged the tooling with Docker.',
    ],
    outcome: 'The earlier portfolio reports a 65% reduction in review time in this project. Local inference kept model execution on the host; web search used an external service.',
  },
  {
    id: 'flakyxbert', name: 'FlakyXbert: LLM Optimization for Flaky Test Detection', category: 'Research',
    description: 'Finding unreliable tests when training data and compute are limited.',
    scope: 'SEER Lab · ICST 2025', tags: ['Python', 'BERT', 'PyTorch', 'TensorFlow', 'Hugging Face', 'Few-shot learning', 'Siamese networks'],
    challenge: 'A flaky test can pass and fail without any code changes. Detecting and classifying these tests is difficult when a team has little historical training data.',
    approach: [
      'Designed FlakyXbert, a few-shot approach using a Siamese network, and compared it with fine-tuning pretrained language models.',
      'Evaluated the methods on FlakyCat and IDoFT to understand the tradeoffs between accuracy, available data, and training cost.',
      'The broader résumé project included quantization, distillation, and safeguards for fairness and data leakage in software testing.',
    ],
    outcome: 'Few-shot learning provided competitive accuracy at lower training cost in limited-data settings. The résumé reports 20%+ accuracy improvement and approximately 80% lower GPU usage across the project’s experiments; these are context-specific results.',
    paper: { title: 'An Analysis of LLM Fine-Tuning and Few-Shot Learning for Flaky Test Detection and Classification', authors: 'Riddhi More & Jeremy S. Bradbury', venue: 'ICST 2025 · Naples, Italy', summary: 'Compares fine-tuning with few-shot Siamese learning for flaky test detection and classification. Both approaches can be useful, depending on an organization’s training data and resources.', href: 'https://www.sqrlab.ca/publications/icst2025_flakyxbert/', code: 'https://github.com/seer-lab/FlakyXbert' },
  },
  {
    id: 'alignfreeze', name: 'ALIGNFREEZE: Multilingual Model Realignment Analysis', category: 'Research',
    description: 'Helping multilingual models learn alignment without losing what they already know.',
    scope: 'Multilingual NLP collaboration · NAACL 2025', tags: ['Python', 'PyTorch', 'Transformers', 'Multilingual NLP', 'BERT', 'XLM-R'],
    challenge: 'Realignment can improve transfer across languages, yet reduce performance for languages that differ from the source language used for fine-tuning.',
    approach: [
      'Co-authored a study of layer-wise changes during multilingual model realignment.',
      'Compared freezing the lower or upper half of a model’s layers with full realignment.',
      'Evaluated three models across 35 languages and four tasks to understand layer sensitivity and language-specific degradation.',
    ],
    outcome: 'Lower layers were particularly vulnerable to realignment. Freezing them helped preserve performance in languages where full realignment caused degradation.',
    paper: { title: 'AlignFreeze: Navigating the Impact of Realignment on the Layers of Multilingual Models Across Diverse Languages', authors: 'Steve Bakos, Félix Gaschi, David Guzmán, Riddhi More, Kelly Chutong Li & En-Shiun Annie Lee', venue: 'NAACL 2025', summary: 'Introduces selective layer freezing during realignment. Controlled experiments investigate where realignment changes representations and how preserving lower layers can improve multilingual transfer.', href: 'https://arxiv.org/abs/2502.12959' },
  },
  {
    id: 'humaneval', name: 'HumanEval Data Leakage Mitigation Framework', category: 'Research',
    description: 'Fresh code-generation tasks that test problem solving beyond memorization.',
    scope: 'SEER Lab · ICST 2025, short papers', tags: ['Python', 'LLM evaluation', 'Combinatorial testing', 'Code generation'],
    challenge: 'Benchmark tasks and solutions may appear in a model’s training data. This can make scores a poor measure of performance on new problems.',
    approach: [
      'Co-authored a benchmark construction method based on reusable task templates.',
      'Used combinatorial test design to instantiate new concrete tasks from each template.',
      'Balanced variation with comparability: tasks should differ enough to reduce leakage effects and remain similar enough to support fair evaluation.',
    ],
    outcome: 'Proposed HumanEval_T as an alternative construction of HumanEval, making task variation part of the benchmark rather than relying on a fixed set of questions.',
    paper: { title: 'Addressing Data Leakage in HumanEval Using Combinatorial Test Design', authors: 'Jeremy S. Bradbury & Riddhi More', venue: 'ICST 2025 · Short Papers, Vision and Emerging Results', summary: 'Presents template tasks and combinatorial generation as a way to reduce the impact of contaminated benchmark examples on code-generation evaluation.', href: 'https://www.sqrlab.ca/publications/icst2025_humaneval_t/' },
  },
  {
    id: 'augmentation-bias', name: 'Assessing Data Augmentation-Induced Bias', category: 'Research',
    description: 'Examining what happens when augmented samples enter both training and testing.',
    scope: 'SEER Lab · FAIRNESS 2025', tags: ['Python', 'Machine learning', 'Data augmentation', 'Model evaluation'],
    challenge: 'Augmentation helps when data is scarce or imbalanced, but including synthetic samples in evaluation can change what a model’s score tells us.',
    approach: [
      'Co-authored a case study of augmentation-induced bias in flaky test classification.',
      'Examined how augmented training and testing samples affect evaluation, including SMOTE and mutation-based augmentation.',
      'Studied how to test for bias instead of assuming augmented data is interchangeable with original observations.',
    ],
    outcome: 'The study highlights the need to examine data construction when interpreting model performance, especially when augmented samples enter a test set.',
    paper: { title: 'Assessing Data Augmentation-Induced Bias in Training and Testing of Machine Learning Models', authors: 'Riddhi More & Jeremy S. Bradbury', venue: '1st International Workshop on Fairness in Software Systems · 2025', summary: 'Uses flaky test classification to examine the effect of augmented samples on model evaluation and to demonstrate a way to assess augmentation-induced bias.', href: 'https://www.sqrlab.ca/publications/fairness2025/', code: 'https://github.com/seer-lab/AugmentationBias' },
  },
  {
    id: 'maritime', name: 'Automated Collision Avoidance Using Reinforcement Learning', category: 'Applied AI',
    description: 'Reinforcement learning for collision avoidance in a simulated maritime environment.',
    scope: 'University of Mumbai · Bachelor’s thesis · 2023', tags: ['Unity', 'ML-Agents', 'Reinforcement learning', 'Lidar'],
    challenge: 'Autonomous navigation needs to account for moving obstacles and wildlife, including potential ship–whale collisions.',
    approach: [
      'Built a Unity simulation using lidar-derived sensor inputs to represent the surrounding environment.',
      'Used reinforcement learning and ML-Agents to train collision-avoidance behavior.',
      'Studied navigation policies in simulated, noisy conditions as part of the undergraduate thesis.',
    ],
    outcome: 'Completed “Automated Collision Avoidance of Unmanned Maritime Vehicles using Reinforcement Learning,” an unpublished undergraduate thesis exploring AI-assisted navigation.',
  },
  {
    id: 'threaded-paws', name: 'Threaded Paws', category: 'Software',
    description: 'A serious game that makes concurrency concepts easier to see and learn.',
    scope: 'Mitacs Globalink · Ontario Tech · 2022', tags: ['Software engineering', 'Concurrency', 'Game-based learning'],
    challenge: 'Thread interleaving, data races, starvation, and deadlocks can be difficult to understand through code alone.',
    approach: [
      'Worked with Prof. Jeremy Bradbury at Ontario Tech to develop a game for learning concurrency concepts and common pitfalls.',
      'Designed the learning experience for second- to fourth-year undergraduate Computer Science and Software Engineering students.',
    ],
    outcome: 'Developed Threaded Paws as a teaching-oriented research project during the Mitacs Globalink internship.',
  },
];

export const experience = [
  { id: 'northeast', date: 'Aug 2026 — Present', role: 'AI Solutions Architect', company: 'Northeast Shared Services', location: 'Canada', note: 'End-to-end enterprise AI architecture and automation.', bullets: [
    'Design end-to-end AI solutions that automate business processes and improve operational efficiency.',
    'Translate business needs into practical, scalable, and secure technical architectures.',
    'Develop AI-powered workflows connecting cloud platforms, enterprise data, APIs, and internal systems.',
    'Lead requirements gathering, solution design, research, prototyping, testing, and documentation.',
    'Collaborate with business stakeholders, IT teams, subject-matter experts, and technology partners.',
    'Evaluate security, governance, data access, traceability, scalability, and long-term support throughout the solution lifecycle.',
  ], projectIds: [] },
  { id: 'amgen', date: 'Nov 2025 — Jul 2026', role: 'GenAI Engineer', company: 'Amgen', location: 'Canada', note: 'Enterprise agents for Legal, Finance, and Pharmacovigilance.', bullets: [
    'Built enterprise GenAI agents using LLMs, RAG, MCP, and agentic workflows.',
    'Designed assistants with retrieval, reasoning, tool calling, and workflow automation to improve knowledge access.',
    'Developed RAG pipelines for document processing, embeddings, vector search, retrieval optimization, and grounded responses.',
    'Integrated enterprise applications, APIs, Teams, Outlook, and internal platforms through MCP-enabled agents.',
    'Built applications and services with LangChain, Bedrock, AWS, Node.js, C#, SQL, and React.',
    'Improved prompts, orchestration, evaluation, reliability, and hallucination reduction.',
    'Partnered with cross-functional teams to deliver secure AI in a regulated pharmaceutical environment.',
  ], projectIds: ['amgen'] },
  { id: 'seer', date: 'Sep 2023 — Nov 2025', role: 'Software & AI Researcher', company: 'Software Engineering & Education Research Lab', location: 'Ontario Tech · Canada', note: 'Efficient learning, multilingual models, and reliable evaluation.', bullets: [
    'Studied multilingual model realignment and layer sensitivity through ALIGNFREEZE, accepted at NAACL 2025.',
    'Awarded funding to optimize LLMs for flaky test detection in resource-constrained environments.',
    'Designed FlakyXbert with few-shot Siamese learning; explored fine-tuning, quantization, and distillation.',
    'Worked on fairness and data-leakage safeguards for software engineering models.',
    'Co-authored HumanEval_T, a modular template-based approach to benchmark generation and code-generation evaluation.',
    'Built an agentic research assistant for literature review and knowledge management using local inference and retrieval.',
  ], projectIds: ['research-assistant', 'flakyxbert', 'alignfreeze', 'humaneval', 'augmentation-bias'] },
  { id: 'lee', date: 'Jan 2024 — Sep 2024', role: 'NLP Researcher', company: 'Lee Language Lab', location: 'Canada', note: 'Multilingual alignment and layer-wise evaluation.', bullets: [
    'Worked on ALIGNFREEZE, analyzing the impact of realignment on multilingual models and internal representations.',
    'Contributed to an evaluation framework studying alignment behavior across languages; the resulting work was accepted at NAACL 2025.',
  ], projectIds: ['alignfreeze'] },
  { id: 'teaching', date: 'Sep 2023 — Apr 2025', role: 'Graduate Teaching Assistant', company: 'Ontario Tech University', location: 'Oshawa, Ontario', note: 'Teaching, feedback, and tools supporting 500+ students.', bullets: [
    'Mentored more than 500 students in Software Quality Assurance and Scientific Data Analysis.',
    'Developed automated grading systems; the supplied résumé reports a 15% improvement in performance metrics.',
    'Led weekly labs and office hours with tailored feedback; the résumé reports 95% student satisfaction.',
  ], projectIds: [] },
  { id: 'mitacs', date: 'Jun 2022 — Sep 2022', role: 'Globalink Research Intern', company: 'Mitacs · Ontario Tech University', location: 'Canada', note: 'Game-based learning for concurrency concepts.', bullets: [
    'Worked under Prof. Jeremy Bradbury to develop Threaded Paws, a serious game for learning thread interleaving, data races, starvation, and deadlocks.',
    'Designed for second- to fourth-year undergraduate Computer Science and Software Engineering students.',
  ], projectIds: ['threaded-paws'] },
  { id: 'we', date: 'Feb 2020 — Jan 2022', role: 'Student Technical Fellow', company: 'Google', location: 'Hyderabad, India', note: 'Technical development, mentorship, and team projects.', bullets: [
    'Selected as one of 126 participants from more than 15,000 applicants for the Women Engineers / WTEF initiative.',
    'Completed a two-year professional development program with live sessions, boot camps, ongoing mentorship, certification, and team projects.',
    'Developed problem-solving and computational-thinking skills through the Google-supported TalentSprint fellowship.',
  ], projectIds: [] },
  { id: 'mlh', date: 'Jun 2021 — Aug 2021', role: 'MLH Fellow', company: 'Major League Hacking', location: 'India · Distributed team', note: 'Open-source engineering with Ruby on Rails and Jekyll.', bullets: [
    'Contributed to an open-source contribution platform and developed applications using Ruby on Rails and Jekyll.',
    'Collaborated in an agile, cross-functional, distributed team.',
    'Worked across the software lifecycle, from conception to deployment.',
  ], projectIds: [] },
  { id: 'xculture', date: 'Aug 2020 — Nov 2020', role: 'International Business Consultant', company: 'X-Culture', location: 'Global virtual team', note: 'Market research and international expansion strategy.', bullets: [
    'Worked in an international virtual team on business solutions for US drone company Dart Drone.',
    'Researched markets and developed recommendations for expansion into additional countries.',
    'Practiced global virtual collaboration across an internationally distributed team.',
  ], projectIds: [] },
];

export const education = [
  { degree: 'MSc, Computer Science', school: 'Ontario Tech University', date: '2023 — 2025', location: 'Canada', grade: '4.2 / 4.3 GPA', thesis: 'Integrating transformer-based NLP in software testing; automation and efficiency using LLMs.', courses: ['Advanced NLP', 'Research Methodologies', 'Software Design & Project Management'] },
  { degree: 'BE, Computer Engineering', school: 'University of Mumbai', date: '2019 — 2023', location: 'India', grade: '9.11 / 10 GPA', thesis: 'Automated Collision Avoidance of Unmanned Maritime Vehicles using Reinforcement Learning. Undergraduate thesis, unpublished.', courses: ['Data Structures & Algorithms', 'DBMS', 'Operating Systems', 'Artificial Intelligence', 'Computer Vision', 'Machine Learning'] },
];
export const process = [
  { name: 'Requirements', text: 'Define the business problem, user workflow, constraints, and success criteria.' },
  { name: 'Prototype', text: 'Test models, retrieval, and tool integrations with a focused working prototype.' },
  { name: 'Evaluate', text: 'Measure answer quality and reliability. Check failure cases, groundedness, and data leakage.' },
  { name: 'Design', text: 'Plan architecture, access controls, integrations, observability, and long-term support.' },
  { name: 'Deliver', text: 'Deploy, document, measure usage, and improve the system with user feedback.' },
];
export const certifications = ['IBM Machine Learning Specialization · 2022', 'Supervised, Unsupervised & Deep Learning · 2022', 'Applied Scrum for Agile Project Management · 2022'];
