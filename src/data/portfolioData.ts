/**
 * Portfolio Data for Nalluri Kausik
 * Source of truth: PORTFOLIO_CONTENT_76a13703.md
 * Strictly maintains verified information without fictional additions.
 */

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI / Machine Learning' | 'Full-Stack' | 'Data Analytics';
  technologies: string[];
  date: string;
  githubUrl?: string;
  liveUrl?: string;
  summary: string;
  highlights: string[];
  metrics?: string;
  featured?: boolean;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  skills: { name: string; level: number; tags?: string[] }[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  score: string;
  scoreLabel: string;
  details: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  verificationUrl?: string;
  verified: boolean;
  category: string;
}

export const PORTFOLIO_PROFILE = {
  name: 'NALLURI KAUSIK',
  role: 'AI ENGINEER',
  subtitle: 'AI ENGINEER · MACHINE LEARNING · FULL STACK',
  positioning: 'AI Engineer | Python | Machine Learning | Generative AI | LLMs',
  alternativeTitles: [
    'AI Engineer',
    'Machine Learning Specialist',
    'Full Stack Developer',
    'Data Analyst'
  ],
  email: 'nallurikausik2@gmail.com',
  phone: '8008114949',
  location: 'Guntur, Andhra Pradesh, India',
  timezone: 'IST (UTC+5:30)',
  status: 'OPEN TO WORK',
  socials: {
    linkedin: 'https://linkedin.com/in/nalluri-kausik',
    github: 'https://github.com/nalluri-sys',
    leetcode: 'https://leetcode.com/u/nalluri-kausik/',
    codechef: 'https://www.codechef.com/users/nalluri-kausik'
  },
  bio: `Final-year Computer Science and Engineering student with hands-on experience in Python, machine learning, AI application development, data analysis, full-stack development, and API integration. Experienced in building practical solutions with machine learning models, LLM-oriented workflows, REST APIs, databases, dashboards, and modern web technologies. Interested in LLM-powered applications, retrieval-augmented generation (RAG), AI agents, model evaluation, and data-driven product development.`,
  strengths: [
    { title: 'Analytical Thinking', desc: 'Translating complex ambiguous problems into structured machine learning & statistical models.' },
    { title: 'Full-Stack Integration', desc: 'Connecting deep neural networks, LLM pipelines, and predictive models to scalable web interfaces.' },
    { title: 'Problem Solving & DSA', desc: 'Rigorous algorithmic background with continuous competitive coding on LeetCode & CodeChef.' },
    { title: 'Critical Thinking', desc: 'Data-driven feature engineering, rigorous validation metrics, and error analysis.' },
    { title: 'Agile & Team Collaboration', desc: 'Experience collaborating in fast-paced hackathons and sprint cycles with Git workflows.' },
    { title: 'Continuous Learning', desc: 'Staying at the forefront of GenAI, RAG architectures, multi-agent frameworks, and quantum computing.' }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'quantathon',
    title: 'Quantathon — AI-Powered Medical Diagnosis Platform',
    subtitle: 'Automated predictive healthcare inference & feature optimization',
    category: 'AI / Machine Learning',
    technologies: ['Python', 'Machine Learning', 'Flask', 'Django', 'REST APIs', 'Docker', 'Git'],
    date: 'July 2026',
    summary: 'An end-to-end AI-powered medical diagnosis platform integrating trained machine learning models for automated predictive diagnosis and clinical report generation.',
    highlights: [
      'Developed trained machine learning pipelines for automated predictive medical diagnosis.',
      'Integrated model inference endpoints with lightweight Flask REST APIs and a full-featured Django backend.',
      'Employed QUBO-based feature optimization algorithms to isolate high-impact clinical biomarkers.',
      'Implemented automated medical report generation and structured inference metrics.',
      'Containerized with Docker with robust backend unit testing, structured logging, and modular architecture.'
    ],
    metrics: 'Top 110 Finalist out of 1,800+ teams',
    featured: true
  },
  {
    id: 'verified-pro',
    title: 'Verified-Pro — AI E-Commerce & Verification Platform',
    subtitle: 'Authenticity checking, fraud detection & role-based validation',
    category: 'Full-Stack',
    technologies: ['TypeScript', 'React', 'Node.js', 'Express.js', 'Python', 'Machine Learning', 'MongoDB', 'JWT', 'Zod', 'Docker'],
    date: 'Nov – Dec 2025',
    githubUrl: 'https://github.com/nalluri-sys/Verified-Pro',
    summary: 'A comprehensive full-stack product verification ecosystem featuring role-based workflows and an AI verification module to detect counterfeits and e-commerce fraud.',
    highlights: [
      'Implemented multi-role authentication workflows for customers, sellers, admins, and certified quality checkers.',
      'Built an AI-driven verification engine utilizing image analysis and LLM product-attribute validation.',
      'Engineered secure REST APIs with JWT tokens, Zod schema validation, OpenAPI specifications, and MongoDB persistence.',
      'Created modular responsive frontend components with React, TypeScript, and clean state handling.',
      'Containerized the entire stack with Docker for reproducible development and deployment.'
    ],
    metrics: 'Multi-Role RBAC · Automated Audit Reports',
    featured: true
  },
  {
    id: 'ev-adoption',
    title: 'Analyzing the Shift from Fuel to Electric Vehicles',
    subtitle: 'End-to-end data analytics on EV consumer behavior & infrastructure',
    category: 'Data Analytics',
    technologies: ['Python', 'Pandas', 'NumPy', 'scikit-learn', 'SQL', 'DuckDB', 'Matplotlib', 'Seaborn', 'Tableau', 'Excel'],
    date: '2025 – 2026',
    githubUrl: 'https://github.com/nalluri-sys/Analyzing_the_Shift_from_Fuel_to_Electric_Vehicles',
    summary: 'Large-scale exploratory data analysis and predictive econometric modeling investigating demographic, behavioural, and infrastructural drivers of EV adoption.',
    highlights: [
      'Cleaned and preprocessed multi-variable survey datasets; resolved IQR outliers, missing attributes, and type inconsistencies.',
      'Analyzed charging accessibility, commute patterns, income elasticity, range anxiety, and vehicle registration trends.',
      'Utilized DuckDB and Python for fast in-memory SQL queries, correlation matrix generation, and feature evaluation across thousands of responses.',
      'Architected interactive Tableau dashboards displaying KPI cards, geographic adoption clusters, and strategic transition insights.'
    ],
    metrics: 'Thousands of Survey Responses Analyzed',
    featured: true
  },
  {
    id: 'brazilian-ecommerce',
    title: 'Brazilian E-Commerce Sales & Delivery Analytics',
    subtitle: 'Multi-dataset analytics pipeline on 100,000+ orders',
    category: 'Data Analytics',
    technologies: ['SQL', 'Python', 'Pandas', 'NumPy', 'Matplotlib', 'Tableau', 'Excel'],
    date: 'Nov – Dec 2025',
    githubUrl: 'https://github.com/nalluri-sys/Brazilian-E-Commerce-Sales-Delivery-Analytics',
    summary: 'Extensive business intelligence pipeline exploring logistical delivery bottlenecks, customer lifetime values, and revenue trajectories across 100,000+ orders.',
    highlights: [
      'Integrated and harmonized relational tables covering orders, payments, logistics, customer geo-locations, and product reviews.',
      'Evaluated delivery time variations across Brazilian states to identify regional logistical friction points.',
      'Conducted statistical hypothesis testing and exploratory data analysis on repeat customer retention.',
      'Designed executive-ready Tableau dashboards monitoring revenue growth, category performance, and on-time shipment KPIs.'
    ],
    metrics: '100,000+ Real Orders Processed',
    featured: false
  },
  {
    id: 'kisan-bazar',
    title: 'Kisan Bazar — Agricultural Digital Marketplace',
    subtitle: 'Direct producer-to-buyer agricultural commerce network',
    category: 'Full-Stack',
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS', 'JavaScript', 'Git', 'GitHub'],
    date: 'June – July 2026',
    githubUrl: 'https://github.com/nalluri-sys/kisan-bazaar-net',
    summary: 'A direct-to-consumer digital marketplace bridging rural agricultural producers and urban buyers to eliminate exploitative intermediary markups.',
    highlights: [
      'Built fast, responsive, mobile-optimized storefront interfaces using Next.js and Tailwind CSS.',
      'Devised role-based authentication flows securing producer crop listings and buyer orders.',
      'Created custom Node.js REST API endpoints managing contract lifecycle, crop inventory, and transaction logging.',
      'Persisted agricultural contract histories, farmer profiles, and pricing catalogs within MongoDB.'
    ],
    metrics: 'Direct Producer-to-Buyer Trading Hub',
    featured: false
  },
  {
    id: 'asset-link',
    title: 'Asset-Link — AI Asset Lifecycle Management System',
    subtitle: 'Enterprise physical & digital asset allocation engine',
    category: 'Full-Stack',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Zustand', 'TypeScript', 'Express.js', 'PostgreSQL', 'Drizzle ORM', 'JWT'],
    date: '2026',
    summary: 'Enterprise software solution streamlining corporate hardware and software license lifecycle tracking, role allocation, and audit compliance.',
    highlights: [
      'Designed responsive cyberpunk UI with React, Vite, Framer Motion, and Zustand state slices.',
      'Implemented JWT session security, strict Zod input parsing, and comprehensive OpenAPI documentation.',
      'Leveraged Drizzle ORM paired with PostgreSQL for performant relational queries, migrations, and audit trails.',
      'Built automated asset verification pipelines and role-based clearance permissions.'
    ],
    metrics: 'Enterprise Asset Lifecycle & Audit Verification',
    featured: false
  },
  {
    id: 'expense-tracker',
    title: 'Enterprise Expense Tracker Full Stack',
    subtitle: 'Java Spring Boot & React financial management application',
    category: 'Full-Stack',
    technologies: ['Java', 'Spring Boot', 'Spring Data JPA', 'MySQL', 'React.js', 'REST APIs', 'Maven', 'Git'],
    date: '2025',
    summary: 'A robust personal and departmental finance tracking application built on enterprise Java and modern React.',
    highlights: [
      'Engineered RESTful CRUD endpoints in Java Spring Boot with transaction boundaries and query optimization.',
      'Configured MySQL persistence layers utilizing Spring Data JPA repository abstractions and entity relationships.',
      'Built a reactive frontend dashboard featuring monthly spending categorization, budget thresholds, and dynamic charts.',
      'Structured with clean multi-tier architecture adhering to enterprise OOP standards and Maven build pipelines.'
    ],
    metrics: 'Spring Boot · ACID Transactions · React SPA',
    featured: false
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'ai-ml',
    name: 'AI, Machine Learning & Data',
    icon: 'Cpu',
    skills: [
      { name: 'Python', level: 95, tags: ['Core', 'Scripting', 'Pipelines'] },
      { name: 'Machine Learning & Predictive Modeling', level: 90, tags: ['Supervised', 'Unsupervised', 'Ensemble'] },
      { name: 'Deep Learning & Computer Vision', level: 85, tags: ['CNNs', 'Inference', 'Neural Networks'] },
      { name: 'Exploratory Data Analysis (EDA)', level: 92, tags: ['Data Mining', 'Distributions', 'Patterns'] },
      { name: 'Feature Engineering & Preprocessing', level: 88, tags: ['IQR', 'Imputation', 'Scaling'] },
      { name: 'Statistical Analysis & Modeling', level: 86, tags: ['Hypothesis Testing', 'Regression'] },
      { name: 'Pandas, NumPy, scikit-learn', level: 92, tags: ['Data Manipulation', 'Vectorized Ops'] },
      { name: 'Matplotlib & Seaborn', level: 88, tags: ['Visualizations', 'Heatmaps'] },
      { name: 'SQL & DuckDB', level: 90, tags: ['Relational Queries', 'In-Memory OLAP'] }
    ]
  },
  {
    id: 'genai',
    name: 'Generative AI & LLMs',
    icon: 'Sparkles',
    skills: [
      { name: 'Large Language Models (LLMs)', level: 92, tags: ['Gemini', 'GPT', 'Fine-tuning'] },
      { name: 'Prompt Engineering', level: 94, tags: ['Few-Shot', 'Chain-of-Thought', 'System Design'] },
      { name: 'Retrieval-Augmented Generation (RAG)', level: 90, tags: ['Context Retrieval', 'Chunking'] },
      { name: 'Embeddings & Vector Databases', level: 88, tags: ['Semantic Search', 'Similarity'] },
      { name: 'AI Agents & Multi-Agent Workflows', level: 85, tags: ['Autonomous Loops', 'Tool Calling'] },
      { name: 'LangChain', level: 86, tags: ['Chains', 'Document Loaders', 'Output Parsers'] }
    ]
  },
  {
    id: 'fullstack',
    name: 'Full-Stack & Backend',
    icon: 'Code2',
    skills: [
      { name: 'JavaScript & TypeScript', level: 90, tags: ['ESNext', 'Strict Typing', 'Async/Await'] },
      { name: 'React.js & Next.js', level: 88, tags: ['Hooks', 'SSR', 'Component Architecture'] },
      { name: 'Node.js & Express.js', level: 88, tags: ['REST Endpoints', 'Middleware', 'Microservices'] },
      { name: 'Python APIs (Flask, Django, FastAPI)', level: 90, tags: ['AI Serving', 'Async Endpoints'] },
      { name: 'Java, Spring Boot & Spring Data JPA', level: 82, tags: ['Enterprise', 'Maven', 'OOP'] },
      { name: 'REST API Design & Integration', level: 92, tags: ['OpenAPI', 'Status Codes', 'JSON'] },
      { name: 'HTML5, CSS3 & Tailwind CSS', level: 92, tags: ['Responsive', 'Modern Layouts'] }
    ]
  },
  {
    id: 'databases',
    name: 'Databases & Security',
    icon: 'Database',
    skills: [
      { name: 'MongoDB & Mongoose', level: 88, tags: ['NoSQL', 'Document Schemas'] },
      { name: 'PostgreSQL & MySQL', level: 88, tags: ['ACID', 'Indexes', 'Relations'] },
      { name: 'Drizzle ORM', level: 84, tags: ['Type-Safe SQL', 'Migrations'] },
      { name: 'JWT Authentication & Security', level: 88, tags: ['Bearer Tokens', 'Hashing'] },
      { name: 'Role-Based Access Control (RBAC)', level: 86, tags: ['Clearance', 'Permissions'] },
      { name: 'Input Validation (Zod)', level: 90, tags: ['Schema Guard', 'Type Inference'] }
    ]
  },
  {
    id: 'tools',
    name: 'Tools & Engineering Practices',
    icon: 'Terminal',
    skills: [
      { name: 'Git & GitHub', level: 92, tags: ['Version Control', 'Collaboration'] },
      { name: 'Linux Environment', level: 88, tags: ['Bash Scripting', 'Server Admin'] },
      { name: 'Docker', level: 82, tags: ['Containerization', 'Dockerfiles'] },
      { name: 'Data Structures & Algorithms', level: 86, tags: ['LeetCode', 'Optimization'] },
      { name: 'Testing, Debugging & Logging', level: 85, tags: ['Unit Tests', 'Telemetry'] },
      { name: 'Agile & SDLC Collaboration', level: 90, tags: ['Sprint Planning', 'Iterative Delivery'] }
    ]
  },
  {
    id: 'analytics',
    name: 'Analytics & Visualization',
    icon: 'BarChart3',
    skills: [
      { name: 'Tableau', level: 90, tags: ['Executive Dashboards', 'Calculated Fields'] },
      { name: 'Power BI', level: 84, tags: ['DAX', 'Interactive Reports'] },
      { name: 'Microsoft Excel', level: 90, tags: ['Pivot Tables', 'Formulas'] },
      { name: 'KPI Reporting & Data Storytelling', level: 88, tags: ['Executive Summaries'] },
      { name: 'Customer Segmentation', level: 86, tags: ['RFM', 'Clustering'] }
    ]
  }
];

export const EDUCATION_LIST: EducationItem[] = [
  {
    id: 'btech',
    degree: 'Bachelor of Technology (B.Tech), Computer Science and Engineering',
    institution: 'Vasireddy Venkatadri Institute of Technology (VVIT)',
    period: 'September 2023 – Present',
    location: 'Numbur, Guntur, Andhra Pradesh',
    score: '7.5',
    scoreLabel: 'CGPA',
    details: [
      'Focusing on Artificial Intelligence, Machine Learning, Data Analytics, and Distributed Systems.',
      'Active participation in national hackathons and developer technical symposiums.',
      'Completed comprehensive coursework in Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks, and Cloud Computing.'
    ]
  },
  {
    id: 'intermediate',
    degree: 'Intermediate / State Board of Intermediate Education',
    institution: 'Bhashyam IIT College Viswakarma',
    period: '2021 – 2023',
    location: 'Guntur, Andhra Pradesh',
    score: '85.5% (855/1000)',
    scoreLabel: 'Aggregate',
    details: [
      'Specialized in Mathematics, Physics, and Chemistry (MPC stream).',
      'Rigorous foundation in analytical calculus, linear algebra, and scientific mechanics.'
    ]
  },
  {
    id: 'secondary',
    degree: 'Secondary School Education / CBSE',
    institution: 'Kendriya Vidyalaya Ongole',
    period: '2020 – 2021',
    location: 'Ongole / Guntur',
    score: '80%',
    scoreLabel: 'Percentage',
    details: [
      'Central Board of Secondary Education curriculum.',
      'Foundational excellence in mathematics, computer applications, and scientific inquiries.'
    ]
  },
  {
    id: 'quantum',
    degree: 'Additional Studies: Minor in Quantum Computing',
    institution: 'Quantum Computing Specialization',
    period: 'Foundational Studies',
    location: 'Academic Track',
    score: 'Enrolled / In Progress',
    scoreLabel: 'Status',
    details: [
      'Exploration of quantum gates, superposition, entanglement, and QUBO-based combinatorial optimization.',
      'Applied QUBO principles directly into the Quantathon 2026 medical feature selection pipeline.'
    ]
  }
];

export const CERTIFICATES: CertificateItem[] = [
  {
    id: 'cert-1',
    title: 'Google Data Analytics Professional Certificate',
    issuer: 'Google (Coursera)',
    verificationUrl: 'https://coursera.org/share/f3a63fefdf6dedd707daaf14c405974b',
    verified: true,
    category: 'Data Analytics'
  },
  {
    id: 'cert-2',
    title: 'Google Advanced Data Analytics Professional Certificate',
    issuer: 'Google (Coursera)',
    verificationUrl: 'https://coursera.org/share/661de37b57aa11856575bdd5d720d21f',
    verified: true,
    category: 'Advanced Analytics & ML'
  },
  {
    id: 'cert-3',
    title: 'Career Essentials in Data Analysis',
    issuer: 'Microsoft & LinkedIn',
    verificationUrl: 'https://www.linkedin.com/learning/certificates/07aad2eb3b128b5b03fb666497500c2e7b30ca4363adf2f602e803327edca324',
    verified: true,
    category: 'Data Analysis'
  },
  {
    id: 'cert-4',
    title: 'Meta Data Analyst Professional Certificate',
    issuer: 'Meta',
    verified: false,
    category: 'Analytics'
  },
  {
    id: 'cert-5',
    title: 'Programming with Python Professional Certificate',
    issuer: 'OpenEDG Python Institute',
    verified: false,
    category: 'Python Programming'
  },
  {
    id: 'cert-6',
    title: 'Java Foundations Professional Certificate',
    issuer: 'JetBrains',
    verified: false,
    category: 'Java & OOP'
  },
  {
    id: 'cert-7',
    title: 'Become an AI Engineer',
    issuer: 'Specialized Track',
    verified: false,
    category: 'Artificial Intelligence'
  },
  {
    id: 'cert-8',
    title: 'Prompt Engineering Skills for Developers',
    issuer: 'GenAI Development Track',
    verified: false,
    category: 'Generative AI'
  },
  {
    id: 'cert-9',
    title: 'Become a Full-Stack Web Developer',
    issuer: 'Web Engineering Track',
    verified: false,
    category: 'Full-Stack Development'
  },
  {
    id: 'cert-10',
    title: 'Learning REST APIs',
    issuer: 'Backend Engineering',
    verified: false,
    category: 'API Architecture'
  }
];

export const HACKATHON_ACHIEVEMENT = {
  title: 'Quantathon 2026 Finalist',
  event: 'Rajalakshmi Institute of Technology (RIT) Hackathon',
  date: 'July 30, 2026',
  achievement: 'Selected among Top 110 Teams out of 1,800+ Applications',
  description: `Engineered an AI-powered cancer detection and automated medical report generation platform using Python, machine learning models, QUBO-based feature optimization algorithms, Django, Flask, and REST APIs. Collaborated in a fast-paced cross-functional Agile team under stringent time constraints.`,
  stats: [
    { label: 'Applications', value: '1,800+' },
    { label: 'Selected Teams', value: 'Top 110' },
    { label: 'Domain', value: 'AI Healthcare' },
    { label: 'Methodology', value: 'QUBO + ML' }
  ]
};

export interface WorldNode {
  id: string;
  name: string;
  label: string;
  subtitle: string;
  position: [number, number, number];
  color: string;
  description: string;
  icon: string;
  route: string;
}

/**
 * 7 Interactive Nodes connecting to the central cyber core
 * Exactly matching the layout in the reference screenshot
 */
export const WORLD_NODES: WorldNode[] = [
  {
    id: 'backstage',
    name: 'BACKSTAGE',
    label: 'ABOUT ME',
    subtitle: 'Philosophy, background & vision',
    position: [-8.5, 0, -7.5],
    color: '#00f0ff',
    description: 'Personal introduction, engineering mindset, quantum curiosity, and background.',
    icon: 'User',
    route: '/about'
  },
  {
    id: 'work',
    name: 'WORKS',
    label: 'PROJECTS',
    subtitle: '7 Featured AI & full-stack systems',
    position: [-1.5, 0, -11.5],
    color: '#00f0ff',
    description: 'Quantathon, Verified-Pro, EV Analytics, Brazilian E-Commerce, and web platforms.',
    icon: 'Briefcase',
    route: '/projects'
  },
  {
    id: 'contact',
    name: 'CONTACT',
    label: 'COMMUNICATION',
    subtitle: 'Direct channels & terminal form',
    position: [9.0, 0, -8.0],
    color: '#38bdf8',
    description: 'Direct email, phone, location, interactive contact terminal, and socials.',
    icon: 'Radio',
    route: '/contact'
  },
  {
    id: 'resume',
    name: 'RESUME',
    label: 'CURRICULUM VITAE',
    subtitle: 'Preview & download credentials',
    position: [11.5, 0, 0.5],
    color: '#00f0ff',
    description: 'Structured resume view, summary of experience, education, skills, and print/export.',
    icon: 'FileText',
    route: '/resume'
  },
  {
    id: 'testimonials',
    name: 'TESTIMONIALS',
    label: 'ACHIEVEMENTS',
    subtitle: 'Quantathon & Verified credentials',
    position: [-11.0, 0, 0.8],
    color: '#38bdf8',
    description: 'Quantathon 2026 Top 110 selection, Google & Microsoft certificates, and coding handles.',
    icon: 'Award',
    route: '/achievements'
  },
  {
    id: 'experience',
    name: 'EXPERIENCE',
    label: 'EDUCATION & JOURNEY',
    subtitle: 'B.Tech VVIT & academic timeline',
    position: [-7.5, 0, 8.5],
    color: '#00f0ff',
    description: 'Education timeline at VVIT, Bhashyam IIT, KV Ongole, and minor in quantum.',
    icon: 'GraduationCap',
    route: '/experience'
  },
  {
    id: 'skills',
    name: 'SKILLS',
    label: 'TECHNICAL MATRIX',
    subtitle: 'AI/ML, GenAI, Full-Stack & Data',
    position: [2.5, 0, 8.0],
    color: '#00f0ff',
    description: 'Categorized technical proficiencies, frameworks, vector databases, and tools.',
    icon: 'Cpu',
    route: '/skills'
  }
];
