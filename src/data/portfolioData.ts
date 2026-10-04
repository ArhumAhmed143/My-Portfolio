export interface ProjectItem {
  id: string;
  title: string;
  category: "Automation" | "Full Stack" | "Frontend";
  description: string;
  longDescription: string;
  highlights: string[];
  tags: string[];
  duration?: string;
  demoUrl?: string;
  githubUrl?: string;
}

export interface SkillItem {
  name: string;
  level: string;
  desc: string;
}

export interface SkillCategory {
  category: string;
  iconName: string;
  color: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  period: string;
  title: string;
  role: string;
  description: string;
  iconName: string;
  badge: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  details: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    profilePicture: string;
    email: string;
    phone: string;
    whatsapp: string;
    location: string;
    github: string;
    linkedin: string;
    website: string;
    summary: string;
    availability: string;
    badge: string;
    subtitle: string;
    tagline: string;
    bioP1: string;
    bioP2: string;
  };
  stats: {
    projectsShipped: string;
    technologiesUsed: string;
    yearsBuilding: string;
    degree: string;
  };
  highlights: Array<{
    title: string;
    desc: string;
    iconName: string;
    color: string;
  }>;
  skillCategories: SkillCategory[];
  technologies: string[];
  education: EducationItem[];
  languages: string[];
  certifications: string[];
  achievements: string[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Ghulam Ahmed",
    title: "Software Department Intern @ Revive Medical Technologies | Automation & Full-Stack Engineer",
    profilePicture: "/profile.jpg",
    email: "ahmedghulam622@gmail.com",
    phone: "+92 323 5678381",
    whatsapp: "+92 323 5678381",
    location: "Islamabad, Pakistan",
    github: "https://github.com/ArhumAhmed143",
    linkedin: "https://www.linkedin.com/in/arhum-ahmed-4b811b441/",
    website: "https://saas-tenant-frontend.onrender.com",
    summary:
      "Software Department Intern at Revive Medical Technologies and BS Information Engineering Technology student at Foundation University Islamabad. Specialized in software automation, cloud deployments on Render, automated workflows with Brevo, scalable multi-tenant SaaS architecture, and modern full-stack web engineering with Next.js, React, TypeScript, and Node.js.",
    availability: "Software Intern @ Revive Medical Technologies",
    badge: "Software Department Intern @ Revive Medical Technologies",
    subtitle: "Software Department Intern at Revive Medical Technologies, engineering automated software solutions, scalable SaaS platforms, and modern web applications.",
    tagline: "Software Department Intern @ Revive Medical Technologies · Automation & Full-Stack Engineer",
    bioP1:
      "I'm a Software Department Intern at Revive Medical Technologies and an undergraduate student in Information Engineering Technology at Foundation University Islamabad. I specialize in software automation, automated data pipelines, and building scalable full-stack web applications.",
    bioP2:
      "From architecting multi-tenant SaaS automation platforms deployed on Render and email automation via Brevo to high-traffic e-commerce systems like Ahmed Mobile, I build reliable software systems that eliminate manual overhead and deliver measurable impact.",
  },

  stats: {
    projectsShipped: "6+",
    technologiesUsed: "18+",
    yearsBuilding: "2+",
    degree: "BS-IET",
  },

  highlights: [
    {
      title: "End-to-End Automation",
      desc: "Designing automated workflows, background tasks, bot scripting, and Brevo notification pipelines that eliminate manual bottlenecks.",
      iconName: "Cpu",
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      title: "Multi-Tenant SaaS Systems",
      desc: "Engineering automated tenant provisioning, isolated workspace configurations, and robust full-stack cloud deployments on Render.",
      iconName: "Layers",
      color: "text-blue-600 bg-blue-50",
    },
    {
      title: "Reliability & Automated Testing",
      desc: "Automated API test suites, strict TypeScript validation, and high-standard software engineering at Revive Medical Technologies.",
      iconName: "Code",
      color: "text-violet-600 bg-violet-50",
    },
  ],

  skillCategories: [
    {
      category: "Automation & Cloud DevOps",
      iconName: "Cpu",
      color: "bg-emerald-500",
      skills: [
        { name: "Workflow & Process Automation", level: "Comfortable", desc: "Automated event pipelines, task scheduling, background job automation" },
        { name: "CI/CD Pipeline Automation", level: "Comfortable", desc: "Automated builds, GitHub Actions, environment configuration & releases" },
        { name: "Render Cloud Platform", level: "Comfortable", desc: "Automated web service deployments, static hosting, background workers" },
        { name: "Brevo (Email & Event Automation)", level: "Comfortable", desc: "Automated transactional email triggers, webhook events, notification flows" },
        { name: "Web & Bot Automation", level: "Comfortable", desc: "Playwright / Puppeteer headless automation, automated testing & scraping" },
        { name: "API Automation & Testing", level: "Comfortable", desc: "Automated endpoint validation, Postman collections, integration testing" },
        { name: "Scripting & Batch Automation", level: "Comfortable", desc: "Node.js & Python automated scripts, JSON pipelines, data syncing" },
      ],
    },
    {
      category: "Frontend & Web Architecture",
      iconName: "Code2",
      color: "bg-blue-500",
      skills: [
        { name: "Next.js (App Router)", level: "Comfortable", desc: "Server Components, SSR, Dynamic Routing, Optimized Builds" },
        { name: "React", level: "Comfortable", desc: "Hooks, Context, Component Patterns, SPA Architecture" },
        { name: "TypeScript", level: "Comfortable", desc: "Strict Typing, Interfaces, Generics, Automated Type Checking" },
        { name: "Tailwind CSS", level: "Comfortable", desc: "Responsive Layouts, Custom Design Tokens, Modern UI" },
        { name: "Vite & Build Tooling", level: "Comfortable", desc: "Automated rapid bundler, HMR, modern build pipelines" },
        { name: "HTML5 / Modern CSS", level: "Strong", desc: "Semantic markup, Flexbox, Grid, CSS animations & variables" },
      ],
    },
    {
      category: "Backend, Databases & Multi-Tenancy",
      iconName: "Database",
      color: "bg-violet-500",
      skills: [
        { name: "Multi-Tenant SaaS Architecture", level: "Comfortable", desc: "Tenant isolation, automated provisioning, RBAC security" },
        { name: "Laravel", level: "Comfortable", desc: "MVC, Eloquent ORM, RESTful API Development, Middleware" },
        { name: "Node.js & Express", level: "Comfortable", desc: "Async I/O, REST endpoints, backend automation engines" },
        { name: "PostgreSQL & Prisma", level: "Familiar", desc: "Relational queries, schema design, automated migrations" },
        { name: "MongoDB", level: "Familiar", desc: "Document stores, aggregation pipelines, NoSQL data modeling" },
        { name: "Git & GitHub Automation", level: "Daily Driver", desc: "Branching, Pull Requests, Code Review, Automation workflows" },
      ],
    },
  ],

  technologies: [
    "Workflow Automation",
    "CI/CD Automation",
    "Render",
    "Brevo",
    "Multi-Tenant SaaS",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Laravel",
    "PostgreSQL",
    "MongoDB",
    "REST APIs",
    "API Automation",
    "Vite",
    "Git & GitHub",
    "PWA",
  ],

  education: [
    {
      degree: "Bachelor of Science in Information Engineering Technology",
      institution: "FOUNDATION UNIVERSITY ISLAMABAD, BSc (IET)",
      period: "09/2023 – 2027",
      details:
        "Focusing on software engineering principles, automated systems, web technologies, database management, and network infrastructure.",
    },
    {
      degree: "ICS",
      institution: "ASKARIA COLLEGE BOYS SADDAR RAWALPINDI",
      period: "04/2021 – 06/2022",
      details:
        "Intermediate in Computer Science with core focus on mathematics, physics, and computer science fundamentals.",
    },
  ],

  languages: ["English (Professional Working)", "Urdu (Native)"],

  certifications: [
    "Software Automation & Full-Stack Engineering",
    "React & TypeScript Engineering",
    "Cloud Deployment & API Automation (Render & Brevo)",
  ],

  achievements: [
    "Software Department Intern at Revive Medical Technologies working on medical technology software systems and automation.",
    "Architected and deployed the SaaS Multi-Tenant Automation Platform with automated tenant onboarding and isolation.",
    "Shipped 6+ production-grade web applications and automated platforms across Next.js, React, TypeScript, and Laravel.",
    "Built and launched the Ahmed Mobile e-commerce store with real-time cart automation and live Vercel deployment.",
    "Engineered an offline-capable Multi-Store POS application with real-time multi-branch sync automation.",
  ],

  experience: [
    {
      period: "2026 - Present",
      title: "Software Department Intern",
      role: "Revive Medical Technologies — Software Department",
      description:
        "Working in the Software Department at Revive Medical Technologies on software development, automated testing workflows, medical technology systems, and full-stack web solutions with high reliability standards.",
      iconName: "Laptop",
      badge: "Current Position",
    },
    {
      period: "2025 - 2026",
      title: "SaaS & Process Automation Engineer",
      role: "Multi-Tenant SaaS & Autonomous Web Systems",
      description:
        "Engineered the SaaS Multi-Tenant Automation Platform with automated tenant provisioning, automated billing cycles, and secure role-based access control. Focused on eliminating manual overhead through intelligent workflow automation.",
      iconName: "Code",
      badge: "Automation",
    },
    {
      period: "2026 (6 Weeks)",
      title: "Web Developer Intern",
      role: "Pig Bug Solution — Next.js & React",
      description:
        "Completed a 6-week Web Developer Internship at Pig Bug Solution using Next.js, React, TypeScript, Tailwind CSS, and REST APIs to build responsive user interfaces, integrate backend endpoints, and optimize automated build performance.",
      iconName: "Laptop",
      badge: "6-Week Internship",
    },
    {
      period: "2024 - 2025",
      title: "React, TypeScript & E-Commerce",
      role: "Frontend & Full-Stack Projects",
      description:
        "Engineered the Ahmed Mobile e-commerce platform and modern responsive web apps with React, TypeScript, and Tailwind CSS. Focused on component architecture, state management, and seamless UX.",
      iconName: "Code",
      badge: "Growth",
    },
    {
      period: "2023 - 2024",
      title: "Started with Web Development & Automation",
      role: "HTML, CSS, JavaScript & React",
      description:
        "Learned foundational software engineering and built projects including the COVID statistics visualizer. Explored automated data fetching and dynamic UI generation.",
      iconName: "BookOpen",
      badge: "Foundation",
    },
    {
      period: "Ongoing",
      title: "BS Information Engineering Technology",
      role: "Foundation University Islamabad",
      description:
        "Pursuing degree coursework while working in software engineering and automating real-world software applications to merge theoretical computer science with industrial engineering practice.",
      iconName: "GraduationCap",
      badge: "Education",
    },
  ],

  projects: [
    {
      id: "cloud-pos",
      title: "Cloud-Based Multi-Store POS & Inventory System",
      category: "Full Stack",
      duration: "2024 - 2025",
      description:
        "A multi-store cloud-based Point of Sale and inventory system with real-time multi-branch sync automation, offline-capable PWA, sales reporting, and role-based staff access.",
      longDescription:
        "A comprehensive multi-location cloud-based Point of Sale (POS) and inventory management Progressive Web Application designed for enterprise retail businesses. The system enables real-time inventory tracking across multiple branch stores with automated background synchronization, barcode scanning, offline transaction processing, staff role-based access control, receipt generation, and automated daily/monthly financial analytics. It allows store managers to manage suppliers, purchase orders, customer ledgers, and cash registers with automated low-stock threshold alerts.",
      highlights: [
        "Multi-store inventory management with automated real-time background sync",
        "Offline-capable PWA with IndexedDB and automated background synchronization",
        "Comprehensive sales reporting and automated financial analytics dashboard",
        "Role-based staff authentication, receipt generation, and barcode scanning",
      ],
      tags: ["Next.js", "React", "TypeScript", "Laravel", "PostgreSQL", "PWA", "Automation"],
      githubUrl: "https://github.com/ArhumAhmed143",
    },
    {
      id: "saas-tenant",
      title: "SaaS Multi-Tenant Automation Platform",
      category: "Automation",
      duration: "2025 - 2026",
      description:
        "An enterprise multi-tenant SaaS platform featuring automated tenant provisioning, isolated workspace configuration, automated billing cycles, and RBAC security.",
      longDescription:
        "A scalable multi-tenant SaaS automation platform engineered to streamline organization lifecycle operations. It provides automated self-service onboarding, tenant database isolation, automated role-based permission auditing, subscription billing workflows, and centralized health telemetry. Designed for high availability and zero manual operational friction.",
      highlights: [
        "Automated tenant onboarding with dynamic workspace & database provisioning",
        "Role-based access control (RBAC) with automated permission auditing",
        "Automated subscription tiers, billing cycles, and invoice generation",
        "Centralized admin control plane with real-time automated health telemetry",
      ],
      tags: ["React", "TypeScript", "Automation", "SaaS", "Multi-Tenant", "REST API", "Tailwind CSS"],
      demoUrl: "https://saas-tenant-frontend.onrender.com",
      githubUrl: "https://github.com/ArhumAhmed143",
    },
    {
      id: "ahmed-mobile",
      title: "Ahmed Mobile — E-Commerce Store",
      category: "Full Stack",
      duration: "2025",
      description:
        "A modern e-commerce web platform for mobile accessories, audio gear, smartwatches, and fast chargers featuring responsive shopping, product catalogs, and cart checkout.",
      longDescription:
        "Ahmed Mobile is a production-grade e-commerce web application specializing in premium mobile accessories, audio gear, smartwatches, and fast chargers. Built with high-performance responsive UI, product catalog browsing, search & category filtering, interactive shopping cart, and a seamless checkout experience.",
      highlights: [
        "Interactive product catalog with category filtering and instant search",
        "Dynamic shopping cart with real-time quantity adjustments and price totals",
        "Sleek dark-themed responsive UI tailored for mobile and desktop shoppers",
        "Deployed live on Vercel with optimized client-side state handling",
      ],
      tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "E-Commerce"],
      demoUrl: "https://ahmed-mobile.vercel.app/",
      githubUrl: "https://github.com/ArhumAhmed143",
    },
    {
      id: "netprime",
      title: "NetPrime — Streaming Platform",
      category: "Full Stack",
      duration: "2024",
      description:
        "A Netflix-inspired streaming platform where users can browse, search, and stream video content. Built with a focus on responsive design, smooth video playback, and a clean content browsing experience.",
      longDescription:
        "NetPrime is a full-featured video streaming web application designed to deliver an engaging user experience similar to Netflix. The application features video category organization, dynamic search filtering, responsive media playback, and custom user list creation. Built using Next.js App Router, React, TypeScript, and Tailwind CSS.",
      highlights: [
        "Video streaming with adaptive playback controls",
        "Search and filter functionality for content discovery",
        "Responsive UI that works seamlessly across all devices",
        "Dynamic category browsing and curated media lists",
      ],
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "REST API"],
      githubUrl: "https://github.com/ArhumAhmed143",
    },
    {
      id: "covid-visualizer",
      title: "COVID / Health Statistics Visualizer",
      category: "Full Stack",
      duration: "2023",
      description:
        "A data visualization dashboard that pulls real-time COVID and health statistics from public APIs and displays them through interactive charts, maps, and filterable data tables.",
      longDescription:
        "A high-performance analytical dashboard designed to visualize complex global public health metrics. It fetches live data from public healthcare APIs via automated ingestion, processes statistical breakdowns across countries, and renders interactive visual analytics using Chart.js, React, and custom data filters.",
      highlights: [
        "Automated data ingestion from public healthcare APIs",
        "Country and region-level filtering and comparison",
        "Responsive dashboard layout with clear data presentation",
        "Data export and automated trend analytical overview",
      ],
      tags: ["React", "Chart.js", "REST APIs", "CSS", "JavaScript", "Automation"],
      githubUrl: "https://github.com/ArhumAhmed143",
    },
  ],
};
