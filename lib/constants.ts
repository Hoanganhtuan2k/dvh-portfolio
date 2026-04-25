import type { Project, Experience, SkillGroup } from "./types";

export const PERSON = {
  name: "Dao Viet Hoang",
  role: "AI Developer · Fintech & Banking",
  tagline: "AI Developer building intelligent backends for banking & finance",
  location: "Nguyen Khanh Toan, Cau Giay, Hanoi",
  email: "daoviethoang2k@gmail.com",
  phone: "+84 38 907 6090",
  linkedin:
    "https://www.linkedin.com/in/đào-việt-hoàng-38605026b/",
  summary:
    "AI Developer with 4+ years engineering production-grade backends for banks and financial platforms. I bridge classic Java/Spring systems with modern AI workloads — RAG pipelines, LLM gateways, fraud-signal services and decisioning APIs — while keeping latency, observability and compliance at enterprise standards.",
};

export const TECH_ICONS = [
  { label: "Java", glyph: "☕" },
  { label: "Spring", glyph: "🌱" },
  { label: "Hibernate", glyph: "⛁" },
  { label: "REST", glyph: "⇌" },
  { label: "WSO2", glyph: "⌬" },
  { label: "Vue", glyph: "▲" },
  { label: "React", glyph: "⚛" },
  { label: "MySQL", glyph: "🐬" },
  { label: "PostgreSQL", glyph: "🐘" },
  { label: "Oracle", glyph: "ORA" },
  { label: "Redis", glyph: "◈" },
  { label: "Docker", glyph: "🐳" },
  { label: "JUnit", glyph: "✓" },
  { label: "Git", glyph: "⎇" },
];

export const PROJECTS: Project[] = [
  {
    id: 0,
    title: "Enterprise Integration — Techcombank",
    description:
      "MuleSoft-based integration layer connecting core banking, payment, card and CRM systems for one of Vietnam’s largest commercial banks. Designed REST/SOAP flows, applied API-led connectivity (System / Process / Experience), and hardened with OAuth2, mTLS and Anypoint policies. Foundation for AI-augmented services on top of the integration mesh.",
    tech: ["MuleSoft", "Anypoint", "REST", "SOAP", "OAuth2", "DataWeave", "Java"],
    scope: "API-led integration, security, observability · banking-grade",
    when: "2025 — Present",
    featured: true,
  },
  {
    id: 1,
    title: "Approve System — TPBank",
    description:
      "Internal approval workflow platform supporting enterprise business processes. Designed and integrated REST APIs between internal services, optimized DB queries and supported production stability.",
    tech: ["Java", "Spring Boot", "REST", "Oracle", "Performance"],
    scope: "Workflow engine, internal REST APIs, performance & DB tuning",
    when: "2025 — Present",
  },
  {
    id: 2,
    title: "BEAD — NTT DATA (Japan)",
    description:
      "Japanese enterprise customer-management & authorization platform built on a low-code Excel-driven configuration approach. Owned migration, upgrades and long-term maintenance.",
    tech: ["Java", "Vue.js", "SQL", "JUnit", "Migration"],
    scope: "Authorization, low-code Excel config, Vue ↔ Java integration",
    when: "Oct 2024 — May 2025",
  },
  {
    id: 3,
    title: "T24 Core Banking — LPBank",
    description:
      "Active development and maintenance of the Temenos T24 core banking platform. Built API connections for seamless inter-system data exchange and tuned performance.",
    tech: ["T24", "Java", "API", "SQL", "Banking"],
    scope: "Core banking integrations, API plumbing, DB optimization",
    when: "Mar 2024 — Oct 2024",
  },
  {
    id: 4,
    title: "Webra & SigningServer — Savis Digital",
    description:
      "Digital-certificate issuance, management and digital-signing platforms. Built integration APIs, deployed across DEV/PROD, optimized DB & app.",
    tech: ["Java", "Spring Boot", "JPA", "PostgreSQL", "PKI"],
    scope: "PKI services, signing pipeline, integration APIs",
    when: "May 2022 — Mar 2024",
  },
  {
    id: 5,
    title: "WSO2 API Management — Savis Digital",
    description:
      "Governance, monitoring and security for APIs. Developed and maintained APIs and gateway components on WSO2 APIM, supporting operational stability.",
    tech: ["WSO2", "API Gateway", "Security", "Java"],
    scope: "API gateway, policies, observability",
    when: "2022 — 2024",
  },
  {
    id: 6,
    title: "Document & Identity Systems — Gtel-ICT",
    description:
      "Document management, citizen identity and records-storage platforms for the Ministry of Public Security. Backend dev, unit testing and DB optimization.",
    tech: ["Java", "SQL Server", "JUnit", "Maintenance"],
    scope: "Government identity & records platforms",
    when: "Aug 2021 — May 2022",
  },
];

export const EXPERIENCE: Experience[] = [
  {
    when: "OCT 2025 — PRESENT",
    role: "MuleSoft Developer",
    org: "Onsite Techcombank · Enterprise Integration",
    summary:
      "Building and operating MuleSoft-based integration layer between core banking, payment, card and CRM systems for one of Vietnam’s largest commercial banks.",
    bullets: [
      "Designed and implemented MuleSoft integration flows (REST & SOAP) connecting core banking, card management and downstream services.",
      "Modeled enterprise APIs (RAML / OpenAPI) and applied API-led connectivity (System / Process / Experience layers).",
      "Hardened security with OAuth2, mTLS and Anypoint policies; tuned throughput, retry and circuit-breaker behavior for production traffic.",
      "Worked closely with banking domain teams on data contracts, transaction integrity and observability across the integration mesh.",
      "Lays the groundwork for AI-augmented services (decisioning, fraud-signal, RAG over internal docs) sitting on top of the integration layer.",
    ],
    tech: [
      "MuleSoft",
      "Anypoint",
      "REST",
      "SOAP",
      "OAuth2",
      "DataWeave",
      "Java",
    ],
    badge: "TCB",
    badgeTone: "emerald",
  },
  {
    when: "MAY 2025 — OCT 2025",
    role: "Java Developer",
    org: "Onsite TPBank · Approve System",
    summary:
      "Internal approval workflow supporting enterprise business processes.",
    bullets: [
      "Developed, maintained and enhanced the workflow system.",
      "Designed and integrated RESTful APIs between internal services.",
      "Optimized application performance and database queries.",
      "Supported production issues and improved system stability.",
    ],
    tech: ["Java", "Spring Boot", "REST", "Oracle"],
  },
  {
    when: "OCT 2024 — MAY 2025",
    role: "Java Developer",
    org: "Onsite NTT DATA · BEAD (Japan)",
    summary:
      "Japanese enterprise customer-management & authorization platform on a low-code Excel-driven configuration approach.",
    bullets: [
      "Core developer for system migration, upgrades and long-term maintenance.",
      "Maintained Java backend services, SQL queries and Vue.js API integration.",
      "Implemented unit tests and authored technical documentation.",
      "Worked directly with Japanese stakeholders on change requests and incidents.",
    ],
    tech: ["Java", "Vue.js", "SQL", "JUnit"],
  },
  {
    when: "MAR 2024 — OCT 2024",
    role: "Java Developer",
    org: "Onsite LPBank · T24 System",
    summary: "Development and maintenance of the T24 core banking platform.",
    bullets: [
      "Primary developer on the T24 platform.",
      "Built API connections for seamless inter-system data interchange.",
      "Performed system, code and database optimizations.",
    ],
    tech: ["T24", "Java", "API", "SQL"],
  },
  {
    when: "MAY 2022 — MAR 2024",
    role: "Java Developer",
    org: "Savis Digital · Webra · SigningServer · WSO2 APIM",
    bullets: [
      "Webra — digital-certificate access, registration, issuance & management.",
      "SigningServer — specialized software for digital-certificate management & signing.",
      "WSO2 APIM — developed, enhanced and maintained APIs and gateway components.",
      "Deployed services across DEV/PROD; optimized DB and application performance.",
    ],
    tech: ["Java", "Spring Boot", "WSO2", "PKI", "PostgreSQL"],
  },
  {
    when: "AUG 2021 — MAY 2022",
    role: "Java Developer · Intern → Junior",
    org: "Gtel-ICT · Ministry of Public Security projects",
    bullets: [
      "Document Management Software — staff document reception & processing.",
      "Citizen Identity System — search and validate citizen identities.",
      "Records Storage & Security Software — license and citizen-record administration.",
      "Unit testing, code refactoring, DB optimization, functions & procedures.",
    ],
    tech: ["Java", "SQL Server", "JUnit"],
  },
  {
    when: "JAN 2021 — AUG 2021",
    role: "Java Developer · Intern → Fresher",
    org: "CRM Viet · CRM platform for the Japanese market",
    summary:
      "Customer info management, business phone with calls/SMS, and social-network management with scheduled posts.",
    bullets: [
      "Backend with Java, Spring Boot, Maven and JPA on Oracle.",
      "Frontend integration with ReactJS; unit testing and DB optimization.",
    ],
    tech: ["Java", "Spring Boot", "JPA", "Maven", "React", "Oracle"],
  },
  {
    when: "2024 — PRESENT",
    role: "Posts and Telecommunications Institute of Technology (PTIT)",
    org: "Distance Learning Program · Information Technology",
    summary:
      "Currently pursuing a formal IT degree alongside full-time engineering work — deepening foundations in distributed systems, software architecture and applied AI.",
    bullets: [
      "Coursework focused on data structures, networking, software engineering and modern AI / data fundamentals.",
      "Continuous self-study on LLM systems, RAG architectures and production AI for fintech use cases.",
    ],
    tech: ["Computer Science", "AI", "Systems"],
    edu: true,
    badge: "PTIT",
    badgeTone: "warm",
  },
  {
    when: "JUL 2018 — APR 2020",
    role: "Bach Khoa — Aptech",
    org: "Major: Java",
    bullets: [
      "Foundational Java engineering — OOP, web frameworks, databases, and enterprise patterns.",
      "Extracurricular: Soccer.",
    ],
    tech: ["Java"],
    edu: true,
  },
];

export const SKILLS: SkillGroup[] = [
  {
    title: "AI & LLM",
    items: [
      "RAG pipelines",
      "LLM gateways (OpenAI / local)",
      "Vector search (pgvector)",
      "Prompt engineering",
    ],
  },
  { title: "Backend", items: ["Java", "Spring Boot", "JPA", "Hibernate"] },
  {
    title: "Fintech & Banking",
    items: [
      "T24 Core Banking",
      "Payment / decisioning APIs",
      "PKI & digital signing",
      "Compliance-aware design",
    ],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "Oracle", "MySQL", "SQL Server"],
  },
  {
    title: "API & Integration",
    items: ["RESTful API", "WSO2 APIM", "API Gateway", "Event-driven"],
  },
  {
    title: "Quality · DevOps",
    items: [
      "JUnit · Mockito",
      "Redis · Docker",
      "Observability",
      "Technical Documentation",
    ],
  },
];

export const WORKFLOW = [
  "SPEC",
  "DESIGN",
  "API",
  "CODE",
  "TEST",
  "OPTIMIZE",
  "SHIP",
];

export const NAV_LINKS = [
  { href: "/", label: "HOME" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/credentials", label: "CREDENTIALS" },
  { href: "/skills", label: "FORGE" },
  { href: "/about", label: "PERSONA" },
];
