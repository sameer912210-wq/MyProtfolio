import { Project, Experience, Education, SkillCategory, Certification } from '../types';

export const personalInfo = {
  name: 'Sameer Mohammad',
  title: 'Full-Stack Developer & Software Engineer',
  subtitle: 'Crafting clean, minimalist, and high-performance web experiences.',
  bio: 'I am a Software Engineer specializing in modern Full-Stack development. With deep expertise across React, TypeScript, Node.js, and cloud platforms, I build responsive, highly interactive web applications designed for speed, beauty, and scale. Inspired by Swiss design and minimalist aesthetics, I focus on readable layouts, elegant typography, and micro-interactions that elevate user experiences.',
  location: 'New Delhi, India',
  email: 'sameer.912210@gmail.com',
  github: 'https://github.com/sameerion',
  linkedin: 'https://www.linkedin.com/in/sameer-mohammad-19743b286/',
  twitter: '#',
  resumeUrl: '#', // We can build a download option or preview of a beautifully compiled resume!
};

export const skills: SkillCategory[] = [
  {
    title: 'Frontend Development',
    skills: [
      { name: 'React / Next.js', level: 92 },
      { name: 'TypeScript', level: 88 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Redux Toolkit / Zustand', level: 85 },
      { name: 'Framer Motion', level: 90 },
      { name: 'HTML5 & CSS3', level: 95 },
    ],
  },
  {
    title: 'Backend & Databases',
    skills: [
      { name: 'Node.js & Express', level: 88 },
      { name: 'REST & GraphQL APIs', level: 85 },
      { name: 'PostgreSQL', level: 82 },
      { name: 'MongoDB', level: 86 },
      { name: 'Firebase', level: 80 },
      { name: 'SQL & Prisma ORM', level: 84 },
    ],
  },
  {
    title: 'Tools & DevOps',
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'AWS (S3, EC2)', level: 78 },
      { name: 'Vercel / Netlify / PM2', level: 92 },
      { name: 'CI/CD Pipelines', level: 74 },
      { name: 'Linux Command Line', level: 80 },
    ],
  },
];

export const experiences: Experience[] = [
  {
    id: 'exp1',
    role: 'Associate Full-Stack Engineer',
    company: 'Apex Software Labs',
    location: 'Remote',
    period: 'July 2024 - Present',
    description: [
      'Engineered and optimized responsive react dashboards resulting in a 25% increase in user session retention.',
      'Designed and deployed server-side REST APIs using Node.js, Express, and PostgreSQL, cutting API response times by 35%.',
      'Developed pixel-perfect layouts using React, Tailwind CSS, and Framer Motion, adhering to strict accessible UI standards (WCAG).',
      'Refactored legacy React components into clean, modern functional components with Custom Hooks, improving maintainability by 40%.',
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Redux'],
  },
  {
    id: 'exp2',
    role: 'Freelance Web Developer',
    company: 'Self-Employed',
    location: 'Remote',
    period: 'October 2023 - June 2024',
    description: [
      'Collaborated directly with small business clients to understand product requirements and build bespoke high-performance landing pages and SaaS applications.',
      'Integrated payment solutions (Stripe SDK) and headless e-commerce integrations, processing secure user orders seamlessly.',
      'Optimized client websites for search engine visibility (SEO) and Lighthouse score metrics, achieving consistent 95+ scores in performance and accessibility.',
    ],
    skills: ['Next.js', 'Tailwind CSS', 'MongoDB', 'Stripe API', 'SEO', 'Figma'],
  },
];

export const education: Education[] = [
  {
    id: 'edu1',
    degree: 'Bachelor of Technology (B.Tech) in Computer Science & Engineering',
    institution: 'Jamia Millia Islamia',
    location: 'New Delhi, India',
    period: '2021 - 2025',
    grade: '8.8 CGPA',
    highlights: [
      'Specialization in Software Engineering and Web Architecture.',
      'Active contributor to the Open Source Developers Club.',
      'Organized multiple collegiate hackathons and tech workshops.',
    ],
  },
  {
    id: 'edu2',
    degree: 'Senior Secondary Education (Class XII) - Science & Math',
    institution: 'Delhi Public School',
    location: 'Patna, India',
    period: '2019 - 2021',
    grade: '94.2%',
    highlights: [
      'Graduated with honors in Computer Science, Physics, Chemistry, and Mathematics.',
      'Leader of the High School Robotics Team.',
    ],
  },
];

export const projects: Project[] = [
  {
    id: 'proj1',
    title: 'NextShop - Premium E-Commerce Suite',
    description: 'A fully responsive full-stack e-commerce experience featuring modern item discovery, fluid shopping carts, Stripe payments, and a powerful admin insights panel.',
    longDescription: 'NextShop is a flagship full-stack e-commerce ecosystem designed to represent premium retail. Features a state-of-the-art product discovery layout with faceted search filters, an elegant multi-step checkout workflow with Stripe payment authentication, user order management, and an administration dashboard mapping sales analytics, active carts, and stock levels.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Stripe', 'Zustand'],
    githubUrl: 'https://github.com/sameerion/next-shop',
    liveUrl: 'https://next-shop-demo.vercel.app',
    imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1200',
    featured: true,
    category: 'Full-Stack',
  },
  {
    id: 'proj2',
    title: 'SyncSpace - Collaborative Canvas',
    description: 'A high-performance interactive whiteboarding and collaborative digital space utilizing real-time event synchronizations.',
    longDescription: 'SyncSpace is a digital infinite whiteboarding suite for remote teams. Engineered with rich canvas drawing APIs, vector operations, shape alignment, text inputs, and multi-user pointer trackers. Utilizes server-authoritative web sockets to synchronize user changes instantly across active boards with zero latency lag.',
    techStack: ['React', 'TypeScript', 'Socket.io', 'Node.js', 'Express', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/sameerion/sync-space',
    liveUrl: 'https://sync-space-demo.vercel.app',
    imageUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=1200',
    featured: true,
    category: 'Frontend',
  },
  {
    id: 'proj3',
    title: 'GeminiPulse - Smart Content Hub',
    description: 'An AI-powered content automation dashboard integrating Gemini Flash models to summarize text, translate blogs, and draft marketing strategies.',
    longDescription: 'GeminiPulse connects deep-learning AI directly to a modern dashboard interface. Built as a full-stack SaaS workspace, users can upload documents, paste audio links, or write prompts. The app summarizes files, extracts action points, translates across 12 languages, and schedules drafts into an editorial calendar.',
    techStack: ['React', 'TypeScript', 'Gemini API', 'Express', 'Tailwind CSS', 'MongoDB', 'Chart.js'],
    githubUrl: 'https://github.com/sameerion/gemini-pulse',
    liveUrl: 'https://gemini-pulse.vercel.app',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=1200',
    featured: true,
    category: 'AI',
  },
  {
    id: 'proj4',
    title: 'DevShowcase - Developer Portals',
    description: 'A vibrant portfolio directory and social networking hub for engineers to exhibit their code, host project demos, and connect.',
    longDescription: 'DevShowcase is a social directory where programmers build beautiful customized profiles. Developers can import GitHub repos directly, toggle showcase cards, embed live code editors, write developer blogs, and follow peers. Integrated with Markdown rendering and an advanced tag system.',
    techStack: ['React', 'Redux', 'MongoDB', 'Express', 'Tailwind CSS', 'GitHub API'],
    githubUrl: 'https://github.com/sameerion/dev-showcase',
    liveUrl: 'https://dev-showcase.vercel.app',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200',
    featured: false,
    category: 'Full-Stack',
  },
];

export const certifications: Certification[] = [
  {
    id: 'cert1',
    name: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Coursera / Meta',
    date: 'March 2024',
    credentialId: 'META-FED-93817',
    url: '#',
  },
  {
    id: 'cert2',
    name: 'Google Cloud Certified - Associate Cloud Engineer',
    issuer: 'Google Cloud',
    date: 'November 2024',
    credentialId: 'GCP-ACE-28319',
    url: '#',
  },
  {
    id: 'cert3',
    name: 'Full Stack Web Development Program',
    issuer: 'FreeCodeCamp',
    date: 'August 2023',
    url: '#',
  },
];
