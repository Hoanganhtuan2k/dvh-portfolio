"use client";

/**
 * Lightweight bilingual i18n for the portfolio.
 *
 * - Default locale: `vi` (Vietnamese)
 * - Persistence: cookie `locale=vi|en`
 * - Three hooks:
 *     * `useLocale()`        — current locale + setter
 *     * `useT()`             — translate UI labels via short keys
 *     * `useContent()`       — get the bilingual data bundle (PERSON, PROJECTS,
 *                              EXPERIENCE, SKILLS, WORKFLOW, NAV_LINKS)
 *
 * To add a new label, drop it into `UI_DICT` below.
 * To add a new project / experience entry, mirror it in BOTH bundles.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Project, Experience, SkillGroup } from "./types";

// ---------------------------------------------------------------------------
// 1. Types
// ---------------------------------------------------------------------------

export type Locale = "vi" | "en";

export interface PersonContent {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
}

export interface ContentBundle {
  person: PersonContent;
  projects: Project[];
  experience: Experience[];
  skills: SkillGroup[];
  workflow: string[];
  navLinks: { href: string; label: string }[];
}

// ---------------------------------------------------------------------------
// 2. Vietnamese bundle (default)
// ---------------------------------------------------------------------------

const VI_CONTENT: ContentBundle = {
  person: {
    name: "Đào Việt Hoàng",
    role: "Kỹ sư Backend & Tích hợp · Fintech & Ngân hàng",
    tagline:
      "Kỹ sư backend & tích hợp xây dựng nền tảng ngân hàng ổn định — với AI là mảng kỹ năng đang mở rộng",
    location: "Nguyễn Khánh Toàn, Cầu Giấy, Hà Nội",
    email: "daoviethoang2k@gmail.com",
    phone: "+84 38 907 6090",
    linkedin: "https://www.linkedin.com/in/dao-viet-hoang-38605026b/",
    summary:
      "Kỹ sư backend & tích hợp với hơn 4 năm kinh nghiệm xây dựng hệ thống production-grade cho các ngân hàng và nền tảng tài chính trên Java / Spring Boot, MuleSoft và Temenos T24. Sẵn sàng mở rộng các backend này với khối lượng công việc AI hiện đại — RAG pipeline, LLM gateway, fraud-signal service và decisioning API — đồng thời đảm bảo độ trễ, observability và compliance ở mức enterprise. Thành tích: ~3 triệu giao dịch/ngày, p95 latency < 200 ms và uptime tích hợp 99.9% trong môi trường ngân hàng có quy định nghiêm ngặt.",
  },
  projects: [
    {
      id: 0,
      title: "Tích hợp doanh nghiệp — Techcombank",
      description:
        "Lớp tích hợp dựa trên MuleSoft kết nối core banking, payment, card và CRM cho một trong những ngân hàng thương mại lớn nhất Việt Nam. Thiết kế các flow REST/SOAP, áp dụng API-led connectivity (System / Process / Experience) và bảo mật bằng OAuth2, mTLS, Anypoint policies. Là nền tảng cho các dịch vụ AI-augmented chạy trên integration mesh.",
      tech: ["MuleSoft", "Anypoint", "REST", "SOAP", "OAuth2", "DataWeave", "Java"],
      scope: "API-led integration, bảo mật, observability · cấp ngân hàng",
      when: "2025 — Hiện tại",
      featured: true,
    },
    {
      id: 1,
      title: "Hệ thống phê duyệt — TPBank",
      description:
        "Nền tảng workflow phê duyệt nội bộ phục vụ các quy trình nghiệp vụ doanh nghiệp. Thiết kế và tích hợp REST API giữa các service nội bộ, tối ưu truy vấn DB và đảm bảo ổn định production.",
      tech: ["Java", "Spring Boot", "REST", "Oracle", "Performance"],
      scope: "Workflow engine, REST API nội bộ, tối ưu performance & DB",
      when: "2025 — Hiện tại",
    },
    {
      id: 2,
      title: "BEAD — NTT DATA (Nhật Bản)",
      description:
        "Nền tảng quản lý khách hàng & phân quyền cho doanh nghiệp Nhật Bản, xây dựng theo hướng low-code cấu hình bằng Excel. Phụ trách migration, nâng cấp và bảo trì dài hạn.",
      tech: ["Java", "Vue.js", "SQL", "JUnit", "Migration"],
      scope: "Phân quyền, cấu hình Excel low-code, tích hợp Vue ↔ Java",
      when: "2024 — 2025",
    },
    {
      id: 3,
      title: "T24 Core Banking — LPBank",
      description:
        "Phát triển và bảo trì nền tảng core banking Temenos T24. Xây dựng kết nối API để trao đổi dữ liệu liền mạch giữa các hệ thống và tinh chỉnh hiệu năng.",
      tech: ["T24", "Java", "API", "SQL", "Banking"],
      scope: "Tích hợp core banking, API plumbing, tối ưu DB",
      when: "2024",
    },
    {
      id: 4,
      title: "Webra & SigningServer — Savis Digital",
      description:
        "Nền tảng cấp phát, quản lý chứng thư số và ký số. Xây dựng API tích hợp, triển khai DEV/PROD, tối ưu DB và ứng dụng.",
      tech: ["Java", "Spring Boot", "JPA", "PostgreSQL", "PKI"],
      scope: "Dịch vụ PKI, signing pipeline, API tích hợp",
      when: "2022 — 2024",
    },
    {
      id: 5,
      title: "WSO2 API Management — Savis Digital",
      description:
        "Quản trị, giám sát và bảo mật API. Phát triển và bảo trì các API, gateway component trên WSO2 APIM, đảm bảo ổn định vận hành.",
      tech: ["WSO2", "API Gateway", "Security", "Java"],
      scope: "API gateway, policies, observability",
      when: "2022 — 2024",
    },
    {
      id: 6,
      title: "Hệ thống Tài liệu & Định danh — Gtel-ICT",
      description:
        "Nền tảng quản lý tài liệu, định danh công dân và lưu trữ hồ sơ cho Bộ Công an. Phát triển backend, unit test và tối ưu DB.",
      tech: ["Java", "SQL Server", "JUnit", "Maintenance"],
      scope: "Hệ thống định danh & hồ sơ chính phủ",
      when: "2021 — 2022",
    },
  ],
  experience: [
    {
      when: "2024 — HIỆN TẠI",
      role: "Kỹ sư Backend & Tích hợp ngân hàng",
      org: "Dự án FSI đa khách hàng · Việt Nam & Nhật Bản",
      summary:
        "Trực tiếp xây dựng và vận hành các hệ thống backend, tích hợp và core banking cho nhiều ngân hàng và doanh nghiệp lớn — từ Temenos T24, workflow phê duyệt, đến integration mesh MuleSoft và nền tảng phân quyền cho khách hàng Nhật.",
      bullets: [
        "Thiết kế và triển khai 25+ flow tích hợp MuleSoft (REST & SOAP) phục vụ ~3 triệu giao dịch/ngày qua core banking, card và các service downstream; ~1.2k RPS, p95 < 200 ms, uptime 99.9%.",
        "Áp dụng API-led connectivity (RAML / OpenAPI, 3 lớp System / Process / Experience) và bảo mật bằng OAuth2, mTLS, Anypoint policies trong môi trường ngân hàng được kiểm soát.",
        "Phát triển và bảo trì nền tảng core banking Temenos T24 — xây dựng kết nối API liên hệ thống, tinh chỉnh hiệu năng và truy vấn DB.",
        "Thiết kế workflow phê duyệt doanh nghiệp (Java / Spring Boot / REST / Oracle): giảm ~45% thời gian response API trung bình và ~30% tải DB lúc peak.",
        "Làm việc trực tiếp với stakeholder Nhật Bản trên nền tảng phân quyền low-code (Excel-driven) — owner cho migration, nâng cấp và unit test.",
      ],
      tech: [
        "MuleSoft",
        "Anypoint",
        "T24",
        "Java",
        "Spring Boot",
        "OAuth2",
        "REST",
        "SOAP",
        "Oracle",
        "Vue.js",
      ],
      badge: "FSI",
      badgeTone: "emerald",
    },
    {
      when: "2022 — 2024",
      role: "Java Developer",
      org: "Savis Digital · Webra · SigningServer · WSO2 APIM",
      bullets: [
        "Webra — truy cập, đăng ký, cấp phát & quản lý chứng thư số.",
        "SigningServer — phần mềm chuyên dụng quản lý chứng thư số & ký số.",
        "WSO2 APIM — phát triển, nâng cấp và bảo trì API và gateway component.",
        "Triển khai dịch vụ trên DEV/PROD; tối ưu DB và performance ứng dụng.",
      ],
      tech: ["Java", "Spring Boot", "WSO2", "PKI", "PostgreSQL"],
    },
    {
      when: "2021 — 2022",
      role: "Java Developer · Intern → Junior",
      org: "Gtel-ICT · Dự án Bộ Công an",
      bullets: [
        "Phần mềm Quản lý Tài liệu — tiếp nhận & xử lý văn bản nghiệp vụ.",
        "Hệ thống Định danh Công dân — tra cứu và xác thực danh tính công dân.",
        "Phần mềm Lưu trữ & Bảo mật Hồ sơ — quản lý giấy phép và hồ sơ công dân.",
        "Unit test, refactor code, tối ưu DB, function & procedure.",
      ],
      tech: ["Java", "SQL Server", "JUnit"],
    },
    {
      when: "2021",
      role: "Java Developer · Intern → Fresher",
      org: "CRM Việt · Nền tảng CRM cho thị trường Nhật",
      summary:
        "Quản lý thông tin khách hàng, business phone (gọi/SMS) và quản lý mạng xã hội với đăng bài theo lịch.",
      bullets: [
        "Backend với Java, Spring Boot, Maven và JPA trên Oracle.",
        "Tích hợp frontend với ReactJS; unit test và tối ưu DB.",
      ],
      tech: ["Java", "Spring Boot", "JPA", "Maven", "React", "Oracle"],
    },
    {
      when: "2024 — HIỆN TẠI",
      role: "Học viện Công nghệ Bưu chính Viễn thông (PTIT)",
      org: "Hệ Đào tạo Từ xa · Công nghệ Thông tin",
      summary:
        "Đang theo học bằng IT chính quy song song với công việc kỹ sư toàn thời gian — củng cố nền tảng về hệ phân tán, kiến trúc phần mềm và AI ứng dụng.",
      bullets: [
        "Chương trình tập trung vào cấu trúc dữ liệu, mạng, kỹ thuật phần mềm và nền tảng AI / data hiện đại.",
        "Tự học liên tục về hệ thống LLM, kiến trúc RAG và AI production cho fintech.",
      ],
      tech: ["Computer Science", "AI", "Systems"],
      edu: true,
      badge: "PTIT",
      badgeTone: "warm",
    },
    {
      when: "2018 — 2020",
      role: "Bach Khoa — Aptech",
      org: "Chuyên ngành: Java",
      bullets: [
        "Nền tảng kỹ thuật Java — OOP, web framework, database và mẫu thiết kế enterprise.",
        "Ngoại khoá: Bóng đá.",
      ],
      tech: ["Java"],
      edu: true,
    },
  ],
  skills: [
    { title: "Backend", items: ["Java", "Spring Boot", "JPA", "Hibernate"] },
    {
      title: "API & Tích hợp",
      items: ["MuleSoft / Anypoint", "RESTful API", "WSO2 APIM", "API Gateway", "Event-driven"],
    },
    {
      title: "Fintech & Ngân hàng",
      items: [
        "T24 Core Banking",
        "Payment / decisioning API",
        "PKI & ký số",
        "Thiết kế tuân thủ compliance",
      ],
    },
    {
      title: "Cơ sở dữ liệu",
      items: ["PostgreSQL", "Oracle", "MySQL", "SQL Server"],
    },
    {
      title: "Chất lượng · DevOps",
      items: [
        "JUnit · Mockito",
        "Redis · Docker",
        "Observability",
        "Tài liệu kỹ thuật",
      ],
    },
    {
      title: "AI & LLM (đang mở rộng)",
      items: [
        "RAG pipeline",
        "LLM gateway (OpenAI / local)",
        "Vector search (pgvector)",
        "Prompt engineering",
      ],
    },
  ],
  workflow: ["PHÂN TÍCH", "THIẾT KẾ", "API", "CODE", "TEST", "TỐI ƯU", "TRIỂN KHAI"],
  navLinks: [
    { href: "/", label: "TRANG CHỦ" },
    { href: "/projects", label: "DỰ ÁN" },
    { href: "/credentials", label: "CHỨNG CHỈ" },
    { href: "/skills", label: "KỸ NĂNG" },
    { href: "/about", label: "GIỚI THIỆU" },
  ],
};

// ---------------------------------------------------------------------------
// 3. English bundle
// ---------------------------------------------------------------------------

const EN_CONTENT: ContentBundle = {
  person: {
    name: "Dao Viet Hoang",
    role: "Backend & Integration Engineer · Fintech & Banking",
    tagline:
      "Backend & integration engineer building reliable banking platforms — with AI as a growing skill area",
    location: "Nguyen Khanh Toan, Cau Giay, Hanoi",
    email: "daoviethoang2k@gmail.com",
    phone: "+84 38 907 6090",
    linkedin: "https://www.linkedin.com/in/dao-viet-hoang-38605026b/",
    summary:
      "Backend & integration engineer with 4+ years building production-grade systems for banks and financial platforms on Java / Spring Boot, MuleSoft and Temenos T24. Comfortable extending these backends with modern AI workloads — RAG pipelines, LLM gateways, fraud-signal services and decisioning APIs — while keeping latency, observability and compliance at enterprise standards. Track record: ~3M+ daily transactions, p95 latency < 200 ms and 99.9% integration uptime in regulated banking environments.",
  },
  projects: [
    {
      id: 0,
      title: "Enterprise Integration — Techcombank",
      description:
        "MuleSoft-based integration layer connecting core banking, payment, card and CRM systems for one of Vietnam's largest commercial banks. Designed REST/SOAP flows, applied API-led connectivity (System / Process / Experience), and hardened with OAuth2, mTLS and Anypoint policies. Foundation for AI-augmented services on top of the integration mesh.",
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
      when: "2024 — 2025",
    },
    {
      id: 3,
      title: "T24 Core Banking — LPBank",
      description:
        "Active development and maintenance of the Temenos T24 core banking platform. Built API connections for seamless inter-system data exchange and tuned performance.",
      tech: ["T24", "Java", "API", "SQL", "Banking"],
      scope: "Core banking integrations, API plumbing, DB optimization",
      when: "2024",
    },
    {
      id: 4,
      title: "Webra & SigningServer — Savis Digital",
      description:
        "Digital-certificate issuance, management and digital-signing platforms. Built integration APIs, deployed across DEV/PROD, optimized DB & app.",
      tech: ["Java", "Spring Boot", "JPA", "PostgreSQL", "PKI"],
      scope: "PKI services, signing pipeline, integration APIs",
      when: "2022 — 2024",
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
      when: "2021 — 2022",
    },
  ],
  experience: [
    {
      when: "2024 — PRESENT",
      role: "Banking Backend & Integration Engineer",
      org: "Multi-client FSI engagements · Vietnam & Japan",
      summary:
        "Hands-on engineering across core banking, integration mesh, internal workflows and Japanese enterprise platforms — from Temenos T24 to MuleSoft API-led connectivity and approval engines.",
      bullets: [
        "Designed and implemented 25+ MuleSoft integration flows (REST & SOAP) serving ~3M daily transactions across core banking, card and downstream services; sustained ~1.2k RPS at p95 < 200 ms with 99.9% uptime.",
        "Applied API-led connectivity (RAML / OpenAPI, System / Process / Experience layers) and hardened security with OAuth2, mTLS and Anypoint policies in regulated banking environments.",
        "Developed and maintained the Temenos T24 core banking platform — built inter-system API connections and tuned database / application performance.",
        "Engineered enterprise approval workflow (Java / Spring Boot / REST / Oracle): cut average API response time by ~45% and reduced peak DB load by ~30%.",
        "Delivered Java backend & Vue.js integration on a low-code (Excel-driven) authorization platform for Japanese clients — owned migration, upgrades and unit testing.",
      ],
      tech: ["MuleSoft", "Anypoint", "T24", "Java", "Spring Boot", "OAuth2", "REST", "SOAP", "Oracle", "Vue.js"],
      badge: "FSI",
      badgeTone: "emerald",
    },
    {
      when: "2022 — 2024",
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
      when: "2021 — 2022",
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
      when: "2021",
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
      when: "2018 — 2020",
      role: "Bach Khoa — Aptech",
      org: "Major: Java",
      bullets: [
        "Foundational Java engineering — OOP, web frameworks, databases, and enterprise patterns.",
        "Extracurricular: Soccer.",
      ],
      tech: ["Java"],
      edu: true,
    },
  ],
  skills: [
    { title: "Backend", items: ["Java", "Spring Boot", "JPA", "Hibernate"] },
    {
      title: "API & Integration",
      items: ["MuleSoft / Anypoint", "RESTful API", "WSO2 APIM", "API Gateway", "Event-driven"],
    },
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
      title: "Quality · DevOps",
      items: [
        "JUnit · Mockito",
        "Redis · Docker",
        "Observability",
        "Technical Documentation",
      ],
    },
    {
      title: "AI & LLM (growing)",
      items: [
        "RAG pipelines",
        "LLM gateways (OpenAI / local)",
        "Vector search (pgvector)",
        "Prompt engineering",
      ],
    },
  ],
  workflow: ["SPEC", "DESIGN", "API", "CODE", "TEST", "OPTIMIZE", "SHIP"],
  navLinks: [
    { href: "/", label: "HOME" },
    { href: "/projects", label: "PROJECTS" },
    { href: "/credentials", label: "CREDENTIALS" },
    { href: "/skills", label: "FORGE" },
    { href: "/about", label: "PERSONA" },
  ],
};

// ---------------------------------------------------------------------------
// 4. UI label dictionary
// ---------------------------------------------------------------------------

const UI_DICT = {
  // hero
  "hero.available": { vi: "ĐANG MỞ CƠ HỘI VIỆC LÀM", en: "AVAILABLE FOR HIRE" },
  "hero.hello": { vi: "XIN CHÀO! TÔI LÀ", en: "HELLO! I'M" },
  "hero.role.left": { vi: "Backend & Integration Engineer", en: "Backend & Integration Engineer" },
  "hero.role.right": { vi: "Fintech & Ngân hàng", en: "Fintech & Banking" },
  "hero.lead.prefix": {
    vi: "Xây dựng các hệ thống backend thông minh cho",
    en: "Building intelligent backend systems for",
  },
  "hero.lead.banking": { vi: "ngân hàng", en: "banking" },
  "hero.lead.payments": { vi: "thanh toán", en: "payments" },
  "hero.lead.platforms": { vi: "nền tảng tài chính", en: "financial platforms" },
  "hero.lead.suffix": {
    vi: "— nơi AI gặp gỡ độ tin cậy cấp doanh nghiệp.",
    en: "— where AI meets enterprise-grade reliability.",
  },
  "hero.cta.projects": { vi: "Dự án", en: "Projects" },
  "hero.cta.cv": { vi: "Xem CV", en: "View CV" },
  "hero.cta.persona": { vi: "Giới thiệu", en: "Persona" },
  "hero.scroll": { vi: "CUỘN", en: "SCROLL" },

  // navbar
  "nav.cv": { vi: "CV", en: "CV" },

  // page kickers
  "kicker.portfolio": { vi: "DỰ ÁN", en: "PORTFOLIO" },
  "kicker.about": { vi: "GIỚI THIỆU", en: "ABOUT" },
  "kicker.expertise": { vi: "KỸ NĂNG", en: "EXPERTISE" },
  "kicker.achievements": { vi: "THÀNH TỰU", en: "ACHIEVEMENTS" },

  // page titles
  "page.projects.title": { vi: "Dự án tiêu biểu", en: "Selected Works" },
  "page.about.title": { vi: "Hồ sơ cá nhân", en: "Persona" },
  "page.about.journey": { vi: "Hành trình", en: "Journey" },
  "page.skills.title": { vi: "Kỹ năng kỹ thuật", en: "Technical Forge" },
  "page.skills.workflow": { vi: "Quy trình làm việc", en: "Workflow" },
  "page.credentials.title": { vi: "Chứng chỉ của tôi", en: "My Credentials" },

  // home page
  "home.banner.featured": { vi: "DỰ ÁN NỔI BẬT", en: "FEATURED WORK" },
  "home.banner.who": { vi: "VỀ TÔI", en: "WHO I AM" },
  "home.banner.work": { vi: "HỌC VẤN & KINH NGHIỆM", en: "EDUCATION & WORK" },
  "home.banner.skills": {
    vi: "KỸ NĂNG · QUY TRÌNH · BẢN SẮC",
    en: "SKILLS · WORKFLOW · IDENTITY",
  },
  "home.banner.contact": { vi: "LIÊN HỆ", en: "REACH OUT" },
  "home.section.projects": { vi: "Dự án", en: "Projects" },
  "home.section.about": { vi: "Về tôi", en: "About Me" },
  "home.section.experience": { vi: "Kinh nghiệm", en: "Experience" },
  "home.section.forge": { vi: "Kỹ năng", en: "Forge" },
  "home.viewAll": { vi: "Xem tất cả dự án", en: "View All Projects" },
  "home.about.lead": {
    vi: "Tôi là Hoàng — kỹ sư backend & tích hợp tại Hà Nội, tập trung vào hệ thống ngân hàng và tài chính trên Java / Spring Boot, MuleSoft và T24. AI là mảng kỹ năng tôi đang mở rộng — RAG pipeline, LLM gateway, fraud-signal service và decisioning API — đặt trên nền backend production-grade mà không đánh đổi độ trễ, observability hay compliance.",
    en: "I'm Hoang — a backend & integration engineer based in Hanoi, focused on banking and financial systems on Java / Spring Boot, MuleSoft and T24. AI is a growing skill area I'm extending these backends with: RAG pipelines, LLM gateways, fraud-signal services and decisioning APIs — without sacrificing latency, observability or compliance.",
  },
  "home.about.lead2": {
    vi: "Hơn 4 năm trải nghiệm core banking (T24), nền tảng API (WSO2), PKI & ký số, và hệ thống dữ liệu chính phủ. Tôi quan tâm đến độ tin cậy đo lường được và ship tính năng AI đủ vượt qua audit, không chỉ là demo.",
    en: "4+ years across core banking (T24), API platforms (WSO2), PKI & digital signing, and government-scale data systems. I care about measurable reliability and shipping AI features that survive audit, not just demos.",
  },
  "home.about.quote": {
    vi: "\"Hệ thống tin cậy không cần ồn ào — chúng chỉ luôn vận hành.\"",
    en: "\"Reliable systems aren't loud — they just keep working.\"",
  },

  // about page
  "about.quote": {
    vi: "\"Hệ thống tin cậy không cần ồn ào — chúng chỉ luôn vận hành.\"",
    en: "\"Reliable systems aren't loud — they just keep working.\"",
  },

  // resume modal
  "resume.label": { vi: "CV · PDF", en: "RESUME · PDF" },
  "resume.download": { vi: "TẢI VỀ", en: "DOWNLOAD" },
  "resume.newTab": { vi: "TAB MỚI", en: "NEW TAB" },
  "resume.close": { vi: "Đóng", en: "Close" },
  "resume.fallback": {
    vi: "Đặt CV tại public/Dao_Viet_Hoang_CV.pdf để hiển thị xem trước inline.",
    en: "Place your CV at public/Dao_Viet_Hoang_CV.pdf to enable inline preview.",
  },
  "resume.requestCopy": { vi: "Yêu cầu bản copy", en: "Request a copy" },

  // contact / footer
  "contact.title": { vi: "Liên hệ với tôi", en: "Hit Me Up" },
  "contact.tile.mail": { vi: "EMAIL", en: "MAIL" },
  "contact.tile.phone": { vi: "ĐIỆN THOẠI", en: "PHONE" },
  "contact.tile.linkedin": { vi: "LINKEDIN", en: "LINKEDIN" },
  "contact.tile.location": { vi: "ĐỊA ĐIỂM", en: "LOCATION" },
  "contact.note": {
    vi: "Hiện đang xây dựng backend tại TPBank · sẵn sàng cho các vị trí backend & platform engineering thú vị.",
    en: "Currently building backends at TPBank · open to interesting backend & platform engineering roles.",
  },
  "footer.cta": { vi: "CÙNG XÂY DỰNG", en: "LET'S BUILD" },
  "footer.headline": {
    vi: "Có một backend cần scale, ship, hay đơn giản là sống sót qua thứ Hai?",
    en: "Got a backend that needs to scale, ship, or just survive Monday?",
  },
  "footer.sayHi": { vi: "Chào tôi nhé.", en: "Say hi." },
  "footer.tagline": { vi: "JAVA · SPRING · API", en: "JAVA · SPRING · APIs" },
  "footer.backToTop": { vi: "VỀ ĐẦU TRANG ↑", en: "BACK TO TOP ↑" },

  // pillars (about/home)
  "pillars.stability.title": { vi: "ỔN ĐỊNH", en: "STABILITY" },
  "pillars.stability.text": {
    vi: "Một kỹ sư hệ thống, theo đuổi tính dự đoán và observability.",
    en: "An engineer of systems, driven by predictability and observability.",
  },
  "pillars.performance.title": { vi: "HIỆU NĂNG", en: "PERFORMANCE" },
  "pillars.performance.text": {
    vi: "Đào sâu vào hiệu quả và độ chính xác — query, service và gateway.",
    en: "Deep work on efficiency and precision — queries, services and gateways.",
  },
  "pillars.craft.title": { vi: "CHẤT LƯỢNG", en: "CRAFT" },
  "pillars.craft.text": {
    vi: "Kỷ luật và tận tâm trong từng dòng code, test và tài liệu.",
    en: "Discipline and dedication in every line of code, test and doc.",
  },

  // locale card
  "locale.heading": {
    vi: "VỊ TRÍ · DI CHUỘT ĐỂ KHÁM PHÁ",
    en: "LOCATION · HOVER TO EXPLORE",
  },
  "locale.country": { vi: "VIỆT NAM", en: "VIETNAM" },
  "locale.field.role": { vi: "VAI TRÒ", en: "ROLE" },
  "locale.field.experience": { vi: "KINH NGHIỆM", en: "EXPERIENCE" },
  "locale.field.based": { vi: "CƠ SỞ", en: "BASED" },
  "locale.field.english": { vi: "TIẾNG ANH", en: "ENGLISH" },
  "locale.field.openTo": { vi: "SẴN SÀNG", en: "OPEN TO" },
  "locale.value.role": {
    vi: "Java Backend Engineer",
    en: "Java Backend Engineer",
  },
  "locale.value.experience": { vi: "Hơn 4 năm", en: "4+ years" },
  "locale.value.based": { vi: "Hà Nội, Việt Nam", en: "Hanoi, Vietnam" },
  "locale.value.english": { vi: "Đủ giao tiếp công việc", en: "Working proficiency" },
  "locale.value.openTo": {
    vi: "Onsite / Hybrid / Remote",
    en: "Onsite / Hybrid / Remote",
  },

  // rotating title (hero)
  "rotating.0": { vi: "BACKEND ENGINEER", en: "BACKEND ENGINEER" },
  "rotating.1": { vi: "INTEGRATION ENGINEER", en: "INTEGRATION ENGINEER" },
  "rotating.2": { vi: "FINTECH BUILDER", en: "FINTECH BUILDER" },
  "rotating.3": { vi: "AI-AUGMENTED DEV", en: "AI-AUGMENTED DEV" },

  // project card
  "project.featured.badge": { vi: "MỚI NHẤT", en: "LATEST" },
  "project.scope": { vi: "PHẠM VI", en: "SCOPE" },
} as const satisfies Record<string, { vi: string; en: string }>;

export type TKey = keyof typeof UI_DICT;

// ---------------------------------------------------------------------------
// 5. Provider + hooks
// ---------------------------------------------------------------------------

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

const COOKIE = "locale";

function readCookieLocale(): Locale {
  if (typeof document === "undefined") return "vi";
  const m = document.cookie.match(/(?:^|; )locale=(vi|en)/);
  return (m?.[1] as Locale) ?? "vi";
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("vi");

  // Read cookie on mount (avoids SSR mismatch — initial server render is "vi"
  // anyway, which matches the default).
  useEffect(() => {
    const fromCookie = readCookieLocale();
    if (fromCookie !== locale) setLocaleState(fromCookie);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof document !== "undefined") {
      // 1 year persistence
      document.cookie = `${COOKIE}=${l}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = l;
    }
  }, []);

  // Keep <html lang> in sync without forcing a reload.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

function useLocaleCtx() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    // Fallback for components that render outside the provider — return VI.
    return { locale: "vi" as Locale, setLocale: () => {} };
  }
  return ctx;
}

export function useLocale() {
  return useLocaleCtx();
}

export function useContent(): ContentBundle {
  const { locale } = useLocaleCtx();
  return locale === "vi" ? VI_CONTENT : EN_CONTENT;
}

export function useT() {
  const { locale } = useLocaleCtx();
  return useCallback(
    (key: TKey) => UI_DICT[key]?.[locale] ?? key,
    [locale],
  );
}
