import { portfolioData, ProjectItem } from "@/data/portfolioData";

export interface AgentChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  recommendations?: ProjectItem[];
  actionType?: "qualification_prompt" | "whatsapp_cta" | "resume_cta" | "contact_cta";
  quickChips?: string[];
}

export interface AgentResponse {
  message: string;
  recommendations?: ProjectItem[];
  actionType?: "qualification_prompt" | "whatsapp_cta" | "resume_cta" | "contact_cta";
  quickChips?: string[];
  intent: string;
}

export const GHULAM_SERVICES = [
  {
    id: "full-stack",
    title: "Full-Stack Web Development",
    desc: "Next.js (App Router), React 19, TypeScript, Tailwind CSS, Node.js, Express, and Laravel.",
    highlight: "High-performance, production-ready web apps with clean architecture.",
  },
  {
    id: "ai-solutions",
    title: "AI Solutions & Integrations",
    desc: "Intelligent portfolio agents, LLM integrations, conversational workflows, and AI logic.",
    highlight: "Custom autonomous agents and AI-powered product workflows.",
  },
  {
    id: "workflow-automation",
    title: "Workflow & Process Automation",
    desc: "Event-driven pipelines, task scheduling, background job queues, and elimination of manual bottlenecks.",
    highlight: "Save hours of manual effort through reliable end-to-end task automation.",
  },
  {
    id: "saas-multitenant",
    title: "Multi-Tenant SaaS Platforms",
    desc: "Dynamic tenant provisioning, database isolation, automated billing cycles, and RBAC.",
    highlight: "Proven in the SaaS Multi-Tenant Automation Platform deployed on Render.",
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps Automation",
    desc: "Render web services, GitHub Actions CI/CD pipelines, containerization, and static hosting.",
    highlight: "Zero-friction deployment pipelines and automated cloud telemetry.",
  },
  {
    id: "api-automation",
    title: "API Automation & Testing",
    desc: "Automated test suites, Postman collections, endpoint validation, and mock servers.",
    highlight: "Rock-solid reliability and regression prevention for RESTful systems.",
  },
  {
    id: "browser-automation",
    title: "Web & Browser Automation (Playwright/Puppeteer)",
    desc: "Headless browser scripting, automated end-to-end user flows, and intelligent web scraping.",
    highlight: "Automate complex web interactions that lack formal APIs.",
  },
  {
    id: "scripting",
    title: "Node.js & Python Automation Scripts",
    desc: "Data cleaning, JSON transformations, batch data syncing, and cron automation.",
    highlight: "Lightweight, robust scripts that handle repetitive back-office operations.",
  },
  {
    id: "email-automation",
    title: "Email & Event Automation with Brevo",
    desc: "Transactional email triggers, webhook events, onboarding flows, and template routing.",
    highlight: "Automated instant customer notifications and inquiry dispatch.",
  },
  {
    id: "ecommerce",
    title: "E-commerce Systems",
    desc: "Responsive product catalogs, shopping cart logic, checkout, and state management.",
    highlight: "Demonstrated in the Ahmed Mobile live production store.",
  },
  {
    id: "pos-inventory",
    title: "POS & Inventory Automation",
    desc: "Multi-store retail POS, real-time background sync, offline PWA, and low-stock alerts.",
    highlight: "Architected the Cloud-Based Multi-Store POS & Inventory System.",
  },
  {
    id: "data-pipelines",
    title: "Data Pipelines & Synchronization",
    desc: "Healthcare and public API ingestion, data sanitization, and interactive analytical visualizers.",
    highlight: "Built COVID / Health Statistics Visualizer with live chart dashboards.",
  },
];

export function findRelevantProjects(query: string): ProjectItem[] {
  const q = query.toLowerCase();
  const matched: ProjectItem[] = [];

  // SaaS / Multi-tenant match
  if (
    q.includes("saas") ||
    q.includes("tenant") ||
    q.includes("multi-company") ||
    q.includes("cloud platform") ||
    q.includes("provision") ||
    q.includes("workspace")
  ) {
    const proj = portfolioData.projects.find((p) => p.id === "saas-tenant");
    if (proj && !matched.includes(proj)) matched.push(proj);
  }

  // POS / Inventory / Retail / Store match
  if (
    q.includes("pos") ||
    q.includes("inventory") ||
    q.includes("store") ||
    q.includes("retail") ||
    q.includes("offline") ||
    q.includes("pwa") ||
    q.includes("barcode") ||
    q.includes("branch")
  ) {
    const proj = portfolioData.projects.find((p) => p.id === "cloud-pos");
    if (proj && !matched.includes(proj)) matched.push(proj);
  }

  // E-Commerce / Online shop / Mobile accessories match
  if (
    q.includes("ecommerce") ||
    q.includes("e-commerce") ||
    q.includes("shop") ||
    q.includes("cart") ||
    q.includes("checkout") ||
    q.includes("product catalog") ||
    q.includes("ahmed mobile")
  ) {
    const proj = portfolioData.projects.find((p) => p.id === "ahmed-mobile");
    if (proj && !matched.includes(proj)) matched.push(proj);
  }

  // Streaming / Video / Media match
  if (
    q.includes("streaming") ||
    q.includes("netflix") ||
    q.includes("video") ||
    q.includes("netprime") ||
    q.includes("media")
  ) {
    const proj = portfolioData.projects.find((p) => p.id === "netprime");
    if (proj && !matched.includes(proj)) matched.push(proj);
  }

  // Health / Analytics / Dashboard / COVID match
  if (
    q.includes("analytics") ||
    q.includes("dashboard") ||
    q.includes("chart") ||
    q.includes("covid") ||
    q.includes("health") ||
    q.includes("data pipeline")
  ) {
    const proj = portfolioData.projects.find((p) => p.id === "covid-visualizer");
    if (proj && !matched.includes(proj)) matched.push(proj);
  }

  // Automation in general - return both SaaS & Cloud POS if no specific project matched yet
  if (
    matched.length === 0 &&
    (q.includes("automation") || q.includes("script") || q.includes("playwright") || q.includes("brevo"))
  ) {
    const saas = portfolioData.projects.find((p) => p.id === "saas-tenant");
    const pos = portfolioData.projects.find((p) => p.id === "cloud-pos");
    if (saas) matched.push(saas);
    if (pos) matched.push(pos);
  }

  return matched;
}

export function processAgentQuery(query: string): AgentResponse {
  const q = query.trim().toLowerCase();

  // 1. Hiring / Lead Qualification Intent
  if (
    q.includes("hire") ||
    q.includes("quote") ||
    q.includes("estimate") ||
    q.includes("work together") ||
    q.includes("start a project") ||
    q.includes("build an app") ||
    q.includes("build a website") ||
    q.includes("need a developer") ||
    q.includes("freelance") ||
    q.includes("budget") ||
    q.includes("pricing") ||
    q.includes("collaborate") ||
    q.includes("contract")
  ) {
    return {
      intent: "hiring_qualification",
      message:
        "I'd love to help you bring your project to life! As Ghulam Ahmed's Portfolio Automation Agent, I can qualify your project requirements right now and connect you directly with him. Please share your project details below so Ghulam can review your scope, timeline, and budget.",
      actionType: "qualification_prompt",
      quickChips: [
        "Full-Stack Web App",
        "Multi-Tenant SaaS",
        "Workflow Automation",
        "POS & Inventory",
        "E-Commerce System",
      ],
    };
  }

  // 2. WhatsApp Connect Intent
  if (
    q.includes("whatsapp") ||
    q.includes("wa") ||
    q.includes("call") ||
    q.includes("phone") ||
    q.includes("number") ||
    q.includes("urgent") ||
    q.includes("direct message")
  ) {
    return {
      intent: "whatsapp_request",
      message:
        "You can connect directly with Ghulam Ahmed on WhatsApp at **+92 323 5678381** for quick messaging, technical inquiries, or immediate project discussions.",
      actionType: "whatsapp_cta",
      quickChips: [
        "Open WhatsApp Chat",
        "View Featured Projects",
        "Check Available Services",
        "I want to hire Ghulam",
      ],
    };
  }

  // 3. Resume / CV Intent
  if (
    q.includes("resume") ||
    q.includes("cv") ||
    q.includes("curriculum vitae") ||
    q.includes("qualification document") ||
    q.includes("download resume")
  ) {
    return {
      intent: "resume_request",
      message:
        "Ghulam Ahmed is a Software Department Intern at Revive Medical Technologies with a BS in Information Engineering Technology from Foundation University Islamabad. You can view or download his official verified resume directly here:",
      actionType: "resume_cta",
      quickChips: [
        "Download Official Resume",
        "What services do you offer?",
        "Tell me about your SaaS project",
        "I want to hire Ghulam",
      ],
    };
  }

  // 4. Project Recommendation Requests
  const matchedProjects = findRelevantProjects(q);
  if (
    q.includes("recommend") ||
    q.includes("suggest") ||
    q.includes("similar project") ||
    (matchedProjects.length > 0 &&
      (q.includes("saas") ||
        q.includes("pos") ||
        q.includes("inventory") ||
        q.includes("ecommerce") ||
        q.includes("shopping") ||
        q.includes("playwright") ||
        q.includes("automation")))
  ) {
    if (matchedProjects.length > 0) {
      const p = matchedProjects[0];
      let contextNote = "";
      if (p.id === "saas-tenant") {
        contextNote =
          "If you are looking for an enterprise multi-company or multi-tenant system, Ghulam's **SaaS Multi-Tenant Automation Platform** is the primary reference. It features automated tenant provisioning, dynamic workspace isolation, automated subscription billing, and RBAC.";
      } else if (p.id === "cloud-pos") {
        contextNote =
          "If you need an inventory or point-of-sale solution, Ghulam engineered the **Cloud-Based Multi-Store POS & Inventory System**. It includes real-time multi-branch synchronization, offline-capable PWA via IndexedDB, barcode scanning, and automated financial analytics.";
      } else if (p.id === "ahmed-mobile") {
        contextNote =
          "If you're building an e-commerce store, check out **Ahmed Mobile**. Built with React, TypeScript, and Vite, it delivers responsive catalog filtering, real-time shopping cart calculations, and high-conversion UX.";
      }

      return {
        intent: "project_recommendation",
        message: `${contextNote}\n\nHere are the most relevant project details and live links:`,
        recommendations: matchedProjects,
        quickChips: [
          "Tell me about automation experience",
          "What technologies does Ghulam use?",
          "I want to hire Ghulam",
          "Connect on WhatsApp",
        ],
      };
    }
  }

  // 5. Services Overview Intent
  if (
    q.includes("service") ||
    q.includes("what do you do") ||
    q.includes("what can you build") ||
    q.includes("expertise") ||
    q.includes("offer")
  ) {
    return {
      intent: "services_overview",
      message: `Ghulam Ahmed specializes in **Software Automation & Scalable Full-Stack Engineering**. Here are his 12 main service areas:\n\n` +
        `1. **Full-Stack Web Development** (Next.js App Router, React 19, TypeScript, Node.js, Laravel)\n` +
        `2. **AI Solutions & Integrations** (Intelligent automation agents, LLM pipelines)\n` +
        `3. **Workflow & Process Automation** (Task scheduling, event pipelines, background workers)\n` +
        `4. **Multi-Tenant SaaS Platforms** (Tenant database isolation, automated provisioning, RBAC)\n` +
        `5. **Cloud & DevOps Automation** (Render deployments, GitHub Actions CI/CD)\n` +
        `6. **API Automation & Testing** (Automated endpoint validation & Postman suites)\n` +
        `7. **Web & Browser Automation** (Playwright & Puppeteer headless scripting & scraping)\n` +
        `8. **Node.js & Python Automation Scripts** (Batch data pipelines & automated syncing)\n` +
        `9. **Email/Event Automation with Brevo** (Transactional triggers & notification webhooks)\n` +
        `10. **E-commerce Systems** (Product catalogs, cart state management, checkout UX)\n` +
        `11. **POS & Inventory Automation** (Multi-branch synchronization, offline PWA, alert thresholds)\n` +
        `12. **Data Pipelines & Synchronization** (Public API ingestion & interactive analytical visualizers)`,
      quickChips: [
        "Recommend a project for me",
        "Tell me about your SaaS work",
        "How do you use Playwright/Puppeteer?",
        "I want to hire Ghulam",
      ],
    };
  }

  // 6. Automation Experience Specific Intent
  if (
    q.includes("automation") ||
    q.includes("playwright") ||
    q.includes("puppeteer") ||
    q.includes("brevo") ||
    q.includes("scraping") ||
    q.includes("bot") ||
    q.includes("ci/cd") ||
    q.includes("render")
  ) {
    return {
      intent: "automation_experience",
      message:
        "Ghulam has extensive software automation engineering experience across multiple production disciplines:\n\n" +
        "• **Workflow & Process Automation**: Engineered background job queues, automated event pipelines, and task schedules that eliminate manual operational bottlenecks.\n" +
        "• **Browser & Bot Automation**: Scripts headless browser flows with Playwright & Puppeteer for automated website interaction, regression testing, and robust web scraping.\n" +
        "• **Transactional Email Automation**: Integrates Brevo (Sendinblue) transactional email triggers, automated notification pipelines, and webhook responders.\n" +
        "• **Cloud & CI/CD Automation**: Automated deployment pipelines on Render and GitHub Actions for continuous integration and zero-downtime releases.\n" +
        "• **SaaS Provisioning**: Engineered automated organization onboarding, workspace creation, and database tenant isolation in his SaaS Multi-Tenant Automation Platform.\n" +
        "• **API Automation & Testing**: Builds automated test suites and validation scripts ensuring reliable backend interfaces.",
      recommendations: portfolioData.projects.filter(
        (p) => p.id === "saas-tenant" || p.id === "cloud-pos"
      ),
      quickChips: [
        "Recommend a project for me",
        "What services do you offer?",
        "I want to hire Ghulam",
        "View Resume",
      ],
    };
  }

  // 7. Who is Ghulam Ahmed / About
  if (
    q.includes("who are you") ||
    q.includes("who is ghulam") ||
    q.includes("about") ||
    q.includes("background") ||
    q.includes("profile") ||
    q.includes("introduce")
  ) {
    return {
      intent: "about_ghulam",
      message:
        "**Ghulam Ahmed** is a Software Department Intern at **Revive Medical Technologies** and an undergraduate student pursuing a **Bachelor of Science in Information Engineering Technology (BSc IET)** at **Foundation University Islamabad** (2023–2027).\n\n" +
        "He specializes in software automation, automated data pipelines, and building scalable full-stack web applications. From architecting multi-tenant SaaS automation platforms deployed on Render and email automation via Brevo to high-traffic retail systems like Ahmed Mobile, he builds reliable software systems that eliminate manual overhead and deliver measurable impact.",
      quickChips: [
        "What are your main technologies?",
        "Show me your projects",
        "Tell me about your education",
        "I want to hire Ghulam",
      ],
    };
  }

  // 8. Technologies & Skills Intent
  if (
    q.includes("tech") ||
    q.includes("stack") ||
    q.includes("skills") ||
    q.includes("tools") ||
    q.includes("framework") ||
    q.includes("language")
  ) {
    return {
      intent: "technologies_inquiry",
      message:
        "Ghulam's core technical stack spans modern full-stack development, cloud deployment, and automation:\n\n" +
        "• **Frontend**: Next.js (App Router), React 19, TypeScript, Tailwind CSS, Vite, HTML5, Modern CSS, Framer Motion.\n" +
        "• **Backend & APIs**: Node.js, Express, Laravel (Eloquent ORM), RESTful APIs, Next.js Server Actions & API Routes.\n" +
        "• **Databases**: PostgreSQL, Prisma ORM, MongoDB (Mongoose), IndexedDB.\n" +
        "• **Automation & Testing**: Playwright, Puppeteer, Postman, Jest/automated testing suites, Python & Node.js scripts.\n" +
        "• **Cloud & DevOps**: Render Cloud Platform, GitHub Actions CI/CD, Git, Vercel, Brevo Transactional Email REST API.",
      quickChips: [
        "View featured projects",
        "Tell me about SaaS work",
        "How can I contact Ghulam?",
        "I want to hire Ghulam",
      ],
    };
  }

  // 9. Work Experience & Education Intent
  if (
    q.includes("experience") ||
    q.includes("education") ||
    q.includes("university") ||
    q.includes("degree") ||
    q.includes("internship") ||
    q.includes("revive") ||
    q.includes("pig bug")
  ) {
    return {
      intent: "experience_education",
      message:
        "**Current Work Experience:**\n" +
        "• **Software Department Intern** @ *Revive Medical Technologies* (2026 – Present): Working on software development, automated testing workflows, medical technology systems, and full-stack web solutions with high reliability standards.\n" +
        "• **Web Developer Intern** @ *Pig Bug Solution* (2026, 6 Weeks): Built responsive user interfaces and backend integrations using Next.js, React, TypeScript, Tailwind CSS, and REST APIs.\n\n" +
        "**Education:**\n" +
        "• **BS Information Engineering Technology (BSc IET)** @ *Foundation University Islamabad* (09/2023 – 2027 Ongoing).\n" +
        "• **Intermediate in Computer Science (ICS)** @ *Askaria College Boys Saddar Rawalpindi* (04/2021 – 06/2022).",
      quickChips: [
        "View Resume",
        "Show me your projects",
        "What services do you offer?",
        "I want to hire Ghulam",
      ],
    };
  }

  // 10. Projects Overview Intent
  if (
    q.includes("project") ||
    q.includes("portfolio") ||
    q.includes("work") ||
    q.includes("showcase")
  ) {
    return {
      intent: "projects_overview",
      message:
        "Ghulam has built and shipped several notable production-grade systems and automation platforms:\n\n" +
        "1. **Cloud-Based Multi-Store POS & Inventory System** (Full Stack / Automation) — Multi-branch inventory tracking, offline-capable PWA, and real-time background sync.\n" +
        "2. **SaaS Multi-Tenant Automation Platform** (Automation / SaaS) — Automated tenant provisioning, database isolation, dynamic billing, and RBAC. Live on Render.\n" +
        "3. **Ahmed Mobile E-Commerce Store** (Full Stack / E-Commerce) — Fast product catalog, live search, dynamic cart calculations. Live on Vercel.\n" +
        "4. **NetPrime Streaming Platform** (Full Stack) — Netflix-style responsive video streaming platform.\n" +
        "5. **COVID / Health Statistics Visualizer** (Analytics / Data) — Automated data ingestion from public healthcare APIs with interactive visual dashboards.",
      recommendations: portfolioData.projects.slice(0, 3),
      quickChips: [
        "Tell me about SaaS Multi-Tenant",
        "Tell me about Cloud POS",
        "I want to hire Ghulam",
        "Open WhatsApp Chat",
      ],
    };
  }

  // 11. Contact Info Intent
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("reach") ||
    q.includes("message") ||
    q.includes("location")
  ) {
    return {
      intent: "contact_inquiry",
      message:
        "You can reach Ghulam Ahmed through multiple direct channels:\n\n" +
        "• **Email**: [ahmedghulam622@gmail.com](mailto:ahmedghulam622@gmail.com)\n" +
        "• **WhatsApp**: [+92 323 5678381](https://wa.me/923235678381)\n" +
        "• **Location**: Islamabad, Pakistan\n" +
        "• **LinkedIn**: [linkedin.com/in/arhum-ahmed-4b811b441](https://www.linkedin.com/in/arhum-ahmed-4b811b441/)\n" +
        "• **GitHub**: [github.com/ArhumAhmed143](https://github.com/ArhumAhmed143)\n\n" +
        "Would you like me to start the project qualification flow to send your inquiry straight to his inbox?",
      actionType: "qualification_prompt",
      quickChips: [
        "Start Project Inquiry",
        "Chat on WhatsApp",
        "Download Resume",
        "View Projects",
      ],
    };
  }

  // Default intelligent fallback with domain awareness
  return {
    intent: "general_inquiry",
    message:
      `Hello! I'm Ghulam Ahmed's **Portfolio Automation Agent**. I have complete knowledge of Ghulam's full-stack web engineering, multi-tenant SaaS architecture, and end-to-end automation experience.\n\n` +
      `Here's how I can assist you:\n` +
      `• **Recommend relevant projects** based on your specific software or business requirements\n` +
      `• **Explain his automation workflows** (Playwright/Puppeteer, Brevo, Render, CI/CD, Python/Node scripts)\n` +
      `• **Qualify your project scope** and prepare a structured proposal directly for Ghulam\n` +
      `• **Provide instant WhatsApp connect** or official resume access`,
    quickChips: [
      "Recommend a project for me",
      "What services do you offer?",
      "Tell me about your SaaS & Automation work",
      "I want to hire Ghulam",
    ],
  };
}
