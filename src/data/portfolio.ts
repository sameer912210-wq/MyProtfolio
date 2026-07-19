import { Project, Experience, Education, SkillCategory, Certification } from '../types';
import avatarImg from '../assets/images/developer_profile_pic_1784427319685.jpeg';

export const personalInfo = {
  name: 'Sameer Mohammad',
  title: 'Software Quality Engineer | Quality Engineering Analyst | SDET',
  subtitle: 'Crafting clean, minimalist, and high-performance web experiences.',
  bio: 'I am a Software Quality Engineer specializing in modern quality engineering. With deep expertise across Manual Testing, API Testing, Automation Testing,AI intigrated Testing and various other testing methodologies, I build and execute test strategies for complex software systems. I focus on providing detailed test results, comprehensive test reports, and actionable insights to help deliver high-quality software.',
  location: 'Hyderabad, India',
  email: 'sameer.912210@gmail.com',
  github: 'https://github.com/sameerion',
  linkedin: 'https://www.linkedin.com/in/sameer-mohammad-19743b286/',
  twitter: '#',
  resumeUrl: '#', // We can build a download option or preview of a beautifully compiled resume!
  photoUrl: avatarImg,
  chatbotUrl: 'https://sameer1130.app.n8n.cloud/webhook/09266666-9142-49fe-996b-ddfe5fe546c7/chat',
};

export const skills: SkillCategory[] = [
  {
    title: 'Tools & DevOps',
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'Selenuim WebDdriver', level: 85 },
      { name: 'Playwright', level: 80 },
      { name: 'AI intigrated Testing', level: 80 },
      { name: 'Rest API Testing', level: 85 },
      { name: 'BDD Frameworks(Cucumber,Specflow)', level: 85 },
      { name: 'TestNG/Junit', level: 85 },
      { name: 'Postman', level: 90 },
      { name: 'Jmeter', level: 75 },
      { name: 'GraphQL Testing', level: 80 },
      { name: 'Linux Command Line', level: 70 },
      { name: 'AWS (S3, EC2)', level: 70 },
      { name: 'Vercel / Netlify / PM2', level: 70 },
      { name: 'CI/CD Pipelines', level: 70 },
    ],
  },
];

export const experiences: Experience[] = [
  {
    id: 'exp1',
    role: 'Software Quality Engineer',
    company: 'Infosys',
    location: 'Hyderabad, India',
    period: 'June 2022 - Present',
    description: [
      'Performed Manual Testing on various web applications and mobile applications.',
      'Performed API Testing on various web applications and mobile applications.',
      'Developed automated test scripts using Selenium Webdriver and Playwright.',
      'Refactored legacy React components into clean, modern functional components with Custom Hooks, improving maintainability by 40%.',
    ],
    skills: ['Selenuim WebDdriver', 'Playwright', 'AI intigrated Testing', 'Rest API Testing', 'BDD Frameworks(Cucumber,Specflow)', 'TestNG/Junit', 'Postman', 'Jmeter', 'GraphQL Testing', 'Linux Command Line', 'AWS (S3, EC2)', 'Vercel / Netlify / PM2', 'CI/CD Pipelines'],
  },
];

export const education: Education[] = [
  {
    id: 'edu1',
    degree: 'Bachelor of Technology (B.Tech) in Civil Engineering',
    institution: 'Sri Chundi Ranganayakulu Engineering college',
    location: 'Chilakaluripet, India',
    period: '2016 - 2020',
    grade: '9.1 CGPA',
    highlights: [
      'Specialized in Structural Analysis, Construction Materials, and Geotechnical Engineering',
      'Completed academic projects on Sustainable Building Design and Transportation Planning',
      'Actively participated in surveying workshops and AutoCAD training sessions',
      'Contributed to infrastructure development initiatives during college events',
      'Presented a paper on Green Construction Techniques at a national-level symposium',
    ],
  },
  {
    id: 'edu2',
    degree: 'Senior Secondary Education (Class XII) - MPC',
    institution: 'Narayana Junior College',
    location: 'Chilakaluripet, India',
    period: '2013 - 2016',
    grade: '90.6%',
    highlights: [
      'Graduated with honors in Physics, Chemistry, and Mathematics.',
    ],
  },
];

export const projects: Project[] = [
  {
    id: 'proj1',
    title: 'ShopFlow QA - E-Commerce Test Automation Suite',
    description: 'A Playwright + TypeScript end-to-end automation framework built on the Page Object Model, covering checkout, cart, and payment flows for an e-commerce platform.',
    longDescription: 'ShopFlow QA is a comprehensive automation framework designed to validate a full e-commerce user journey end-to-end. Built with Playwright and TypeScript using a strict Page Object Model architecture, it covers product search, cart operations, multi-step checkout, and Stripe payment flows across Chromium, Firefox, and WebKit. Includes data-driven test cases, custom fixtures, visual regression checks, and detailed HTML/Allure reporting integrated into a Jenkins CI pipeline that runs on every pull request.',
    techStack: ['Playwright', 'TypeScript', 'Page Object Model', 'Jenkins', 'Allure Report', 'GitHub Actions', 'Docker'],
    githubUrl: 'https://github.com/sameerion/shopflow-qa',
    liveUrl: 'https://shopflow-qa-report.vercel.app',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    featured: true,
    category: 'Test Automation',
  },
  {
    id: 'proj2',
    title: 'BDD Regression Suite - Selenium & SpecFlow',
    description: 'A behavior-driven regression testing framework using Selenium WebDriver and SpecFlow, translating business requirements directly into executable Gherkin scenarios.',
    longDescription: 'This framework bridges the gap between business stakeholders and QA by using SpecFlow to write test cases in plain-language Gherkin syntax, backed by a Selenium WebDriver automation layer in C#. Built with reusable step definitions, a hybrid POM + factory design pattern, parallel test execution via NUnit, and configurable environment profiles for staging and production smoke tests. Integrated into Jenkins for scheduled nightly regression runs with automated Slack notifications on failure.',
    techStack: ['Selenium WebDriver', 'SpecFlow', 'C#', 'NUnit', 'Jenkins', 'Gherkin', 'Slack API'],
    githubUrl: 'https://github.com/sameerion/bdd-regression-suite',
    liveUrl: 'https://bdd-regression-report.vercel.app',
    imageUrl: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&q=80&w=1200',
    featured: true,
    category: 'Test Automation',
  },
  {
    id: 'proj3',
    title: 'PipelineWatch - CI/CD Test Reporting Dashboard',
    description: 'A centralized test observability dashboard that aggregates Jenkins pipeline results, flaky test trends, and cross-browser pass/fail rates into a single view.',
    longDescription: 'PipelineWatch pulls test execution data from Jenkins build jobs and Playwright/Selenium test runs to give QA teams a real-time view of suite health. It tracks flaky test patterns over time, breaks down pass/fail rates by browser and environment, and surfaces build duration trends to catch pipeline regressions early. Built with a Node.js backend polling Jenkins REST APIs and a React dashboard rendering trend charts, this tool has helped cut triage time on failing nightly builds.',
    techStack: ['React', 'TypeScript', 'Node.js', 'Jenkins REST API', 'Chart.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/sameerion/pipelinewatch',
    liveUrl: 'https://pipelinewatch-demo.vercel.app',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    featured: true,
    category: 'CI/CD',
  },
  {
    id: 'proj4',
    title: 'API Sentinel - REST API Test Framework',
    description: 'A lightweight API test automation framework for validating REST endpoints, schema contracts, and response times as part of the CI pipeline.',
    longDescription: 'API Sentinel automates functional, schema, and performance validation for REST APIs. Built with Playwright API testing and TypeScript, it verifies status codes, response schemas via JSON schema validation, and enforces response-time thresholds on every merge to main. Test data is managed through environment-specific config files, and results feed into the same Jenkins pipeline used for UI regression, giving a unified pass/fail gate before deployment.',
    techStack: ['Playwright', 'TypeScript', 'JSON Schema', 'Jenkins', 'Postman/Newman', 'Docker'],
    githubUrl: 'https://github.com/sameerion/api-sentinel',
    liveUrl: 'https://api-sentinel-demo.vercel.app',
    imageUrl: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&q=80&w=1200',
    featured: false,
    category: 'API Testing',
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
