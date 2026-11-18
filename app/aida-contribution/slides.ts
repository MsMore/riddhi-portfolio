export type ContributionSlide = {
  section: string;
  title: string;
  transcript: string[];
  notes: string;
  grounding: string;
};

export const contributionSlides: ContributionSlide[] = [
  {
    section: 'AI Solution Engineering Lead',
    title: 'Measurable AI in everyday operations',
    transcript: ['Riddhi More', 'Hands-on delivery. Clear evidence. Shared engineering practices.', 'A discussion of the contribution I would make to AIDA.'],
    notes: 'I connect hands-on AI implementation with the decisions a business needs to make. My work at Amgen covered production RAG and agent workflows, AI governance and evaluation. I led the design and full-stack implementation of a governance platform within a suite where reviewers approved custom GPTs and agents before publication. Brand Compass involved longitudinal sales trends, forecasts and drivers. In my current architecture role, I work with finance stakeholders, VPs and SMEs on options and tradeoffs. I would bring that combination to AIDA: a working solution, evidence of quality and value, and patterns other squads can use.',
    grounding: 'Professional experience is based on Riddhi’s supplied resume and her description of her work. Contributions to AIDA are proposed practices.',
  },
  {
    section: 'Experience I would bring',
    title: 'I connect delivery, business context and evaluation discipline.',
    transcript: ['Engineering: production RAG and agents at Amgen, secure APIs, retrieval, state and human approvals.', 'Business: Brand Compass used longitudinal sales, forecasts and drivers. Current work involves finance stakeholders, VPs and SMEs.', 'Evidence: golden datasets, quality and drift checks, optimization and rollback, and multilingual evaluation research.'],
    notes: 'My experience connects three parts of the role. Enterprise AI work keeps me close to implementation. Business and leadership stakeholders keep the decision and its tradeoffs clear. Evaluation and research give me a way to challenge whether a system works. I contributed RAG capabilities across multiple systems in the EVS platform; I did not own the entire platform. The independent Brand Compass demonstration uses newly created fictional data and does not reproduce an internal Amgen product.',
    grounding: 'Past-experience statements come from Riddhi’s supplied resume and direct descriptions. No numerical business outcome is claimed.',
  },
  {
    section: 'Observability',
    title: 'Every AI journey should leave evidence we can act on.',
    transcript: ['User journey: track eligible journeys, completion, abandonment, rework and feedback with clear denominators.', 'System behavior: trace retrieval, model and tool steps, versions, latency, errors and failure ownership.', 'Decision and response: review quality regressions, route incidents, improve retrieval or prompts and roll back when needed.', 'A metric needs an owner, a decision and a response.'],
    notes: 'I would instrument the user journey as well as the model call. A technically successful response can still fail the user’s task. I would connect retrieval, model and tool traces to versions and failure categories, using privacy-aware samples for quality review. My evaluation work at Amgen included golden datasets, quality and drift checks, optimization and rollback. The demonstration shows a subset of operational evidence. Response-format and tool-control checks do not certify the correctness of every generated sentence.',
    grounding: 'The evaluation experience is a resume fact. The three-level operating approach is proposed for discussion and describes no existing CIBC process.',
  },
  {
    section: 'Metrics for AI tools',
    title: 'Measure quality and value alongside reliability.',
    transcript: ['Task success: accepted completions divided by eligible tasks, supporting a decision to improve or scale the workflow.', 'AI quality: groundedness, valid citations and appropriate abstention, supporting release, revision or restrictions.', 'Reliability: p95 latency and model/tool failure rates, supporting bottleneck fixes and incident ownership.', 'Adoption: meaningful repeat use among eligible users, supporting investigation of friction and usefulness.', 'Business value: time and rework against baseline, plus cost per successful task, supporting investment and scope decisions.', 'Agree baselines and thresholds with the business owner before the pilot.'],
    notes: 'I would define a successful task and its baseline before selecting targets. Quality needs a representative evaluation set and a clear rubric. Reliability needs tail latency and failure rates, split by journey and version. Adoption needs eligible users and meaningful repeat tasks. Value needs time, rework and human-review effort against the previous workflow. Cost per successful task should include infrastructure and tools as well as model use. Thresholds depend on workflow risk and service expectations.',
    grounding: 'This is a proposed measurement framework, not historical performance data or achieved Amgen or CIBC results.',
  },
  {
    section: 'Storytelling to leadership',
    title: 'A dashboard should make the next decision easier.',
    transcript: ['Decision: what needs an owner’s choice now?', 'Evidence: what changed, against which baseline?', 'Uncertainty: what is observed, assumed or untested?', 'Next action: who acts, by when, and how is success checked?', 'Independent demonstration: Europe sales declined 23.1% in the synthetic period comparison. Review availability recovery before proposing more demand spend.'],
    notes: 'Brand Compass shaped the way I think about business-facing analytics: start with the decision, then the evidence, uncertainty and next action. In the independent demonstration, Aster’s Europe sales declined 23.1% in the three-month comparison. The fictional memo assumes a distribution interruption. I would label that simulated context and avoid treating correlation as proven causation. The commercial owner would review a proposed recovery action, its owner, review date and success measures. The AI can draft and cite the brief, while the business owner makes the decision.',
    grounding: 'The Brand Compass experience is Riddhi’s description of her work. The 23.1% figure comes from the independent synthetic dataset and is not an Amgen result. The briefing structure is proposed.',
  },
  {
    section: 'Governance and safe reuse',
    title: 'I built approval into the path to publication.',
    transcript: ['At Amgen: governance platform and marketplace workflow. Creators submitted custom GPTs and agents; reviewers approved them before publication.', 'Proposed for AIDA: evidence for release and reuse, an accountable owner and approved audience, data access and versioned evaluations, support readiness and rollback, and review depth matched to risk.'],
    notes: 'At Amgen, I led the design and full-stack implementation of an AI governance platform within a suite of tools. A team of reviewers approved custom GPTs and agents before publication in the marketplace. My lesson was that governance should fit the workflow people use. For AIDA, I would align release and publication evidence with existing control functions. The evidence could cover an owner, approved audience, permissions, versioned evaluations, support readiness and rollback, with review depth based on risk.',
    grounding: 'The Amgen approval workflow is based on Riddhi’s resume and direct description. The AIDA practices are proposed and would need alignment with CIBC’s actual policies. No adoption, turnaround-time or financial benefit is asserted.',
  },
  {
    section: 'Operating across squads',
    title: 'Stay hands-on in one squad. Make good patterns easier to reuse.',
    transcript: ['50% hands-on contribution: own a bounded delivery slice in one squad, build, evaluate and support it, and use production learning in design.', '50% architecture across squads: risk-based reviews, clear decisions, office hours, reusable patterns, named owners and escalation paths.'],
    notes: 'The role was described as approximately half hands-on work in one squad and half architecture and solution design across nine others. I would protect time for both. The primary squad would keep me close to production behavior. Across squads I would use design intake, risk-based reviews, office hours and recorded decisions. Reusable evaluation harnesses, observability conventions and integrations could reduce repeated effort. Delivery would remain with each squad owner rather than making every change wait for my review.',
    grounding: 'The 50/50 role split comes from the role information supplied to Riddhi. The operating cadence is proposed. It does not imply that she previously managed ten squads.',
  },
  {
    section: 'Delivery methodology',
    title: 'Make production readiness part of delivery from the start.',
    transcript: ['Frame the decision: owner, baseline, value and boundaries.', 'Build a bounded slice: data, retrieval, tools and human review.', 'Earn the pilot: evaluation, permissions and support.', 'Release and learn: traces, versioning, rollback and outcomes.', 'A POC is evidence for a decision; the next release needs operational ownership.'],
    notes: 'I would start with an owner, a problem statement, a baseline and a boundary around what AI should do. The first slice should be small enough to evaluate end to end. Before a pilot, I would agree representative evaluations, access controls, traceability and support ownership. Release would use versioned configuration, monitored rollout and rollback. Then I would compare quality, adoption and business outcomes with the baseline and decide whether to scale, revise or stop.',
    grounding: 'The evaluation, optimization and rollback experience is based on Riddhi’s resume. The delivery stages are a proposed approach, not an assertion about CIBC’s current gates.',
  },
  {
    section: 'First 90 days: proposed',
    title: 'Learn the operating context. Deliver one useful slice. Enable reuse.',
    transcript: ['Days 1–30: map squad priorities, architecture and controls; agree a workflow owner, baseline and success criteria.', 'Days 31–60: deliver a bounded slice with representative evaluations, traceability and support ownership.', 'Days 61–90: review quality and value, improve or scale with evidence, and share a tested pattern with another squad.', 'Where would this contribution create the most value for AIDA first?'],
    notes: 'I would use the first month to understand priorities, platform, controls and the workflow baseline with product and business owners. In the second month I would deliver a bounded slice with evaluation and observability, agreeing acceptance criteria before claiming success. By the third month I would use pilot or production evidence to decide what to improve, scale or stop, and make what worked reusable by another squad. The plan would adapt to AIDA’s actual priorities.',
    grounding: 'The entire 90-day plan is proposed. It contains no achieved CIBC outcomes or commitments made on CIBC’s behalf.',
  },
];
