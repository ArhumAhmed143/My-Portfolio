"use client";

import { motion } from "framer-motion";
import { Code, Layers, BookOpen, Cpu, Sparkles } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import AnimatedHeading from "./AnimatedHeading";
import AnimatedCounter from "./AnimatedCounter";
import TypewriterText from "./TypewriterText";

const iconMap: Record<string, typeof Code> = {
  Code,
  Layers,
  BookOpen,
  Cpu,
};

export default function AboutSection() {
  const { personal, stats: portfolioStats, highlights } = portfolioData;

  const statsDisplay = [
    { label: "Automated Systems & Projects", value: portfolioStats.projectsShipped, color: "text-emerald-600", accent: "from-emerald-500 to-teal-400" },
    { label: "Automation Tools & Tech", value: portfolioStats.technologiesUsed, color: "text-blue-600", accent: "from-blue-500 to-cyan-400" },
    { label: "Years Engineering & Building", value: portfolioStats.yearsBuilding, color: "text-violet-600", accent: "from-violet-500 to-purple-400" },
    { label: "Degree in Progress", value: portfolioStats.degree, color: "text-amber-600", accent: "from-amber-500 to-orange-400" },
  ];

  return (
    <section id="about" className="section-light py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="pointer-events-none absolute -top-24 right-10 w-96 h-96 bg-emerald-500/[0.04] rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-10 w-96 h-96 bg-blue-500/[0.04] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title with Automated Tagline */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-semibold uppercase tracking-widest mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>About Me</span>
          </motion.div>

          <AnimatedHeading
            text="A Bit About Me & Engineering Philosophy"
            highlightWords={["Philosophy", "Engineering"]}
            highlightClassName="text-emerald-600"
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight"
          />

          {/* 1 Page (Hero) Text Ki Jaisi Automation: Cycling Specialization Typewriter */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-slate-200 text-xs sm:text-sm font-mono shadow-md border border-slate-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-semibold">Specialization:</span>
            <TypewriterText
              phrases={[
                "Software Automation & Workflow Engineering",
                "Scalable Multi-Tenant SaaS Cloud Architectures",
                "Full-Stack Web Apps with Next.js, React & TypeScript",
                "Automated APIs, Cloud Deployments & Brevo Workflows",
              ]}
              typingSpeed={32}
              deletingSpeed={16}
              pauseDuration={2400}
              className="text-slate-300 font-medium"
              cursorClassName="w-1.5 h-3.5 bg-emerald-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Main Story Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="lg:col-span-7 card-light p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Top scanning accent bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-transparent origin-left"
            />

            <div>
              {/* Automated Greeting Typewriter */}
              <div className="mb-3 sm:mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center">
                  <TypewriterText
                    text={`Hey, I'm ${personal.name}`}
                    typingSpeed={40}
                    loop={false}
                    showCursor={true}
                    cursorClassName="w-1.5 h-5 bg-emerald-500"
                  />
                </h3>
              </div>

              {/* Status Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-medium mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Software Department Intern @ Revive Medical Technologies</span>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4 sm:mb-5">
                {personal.bioP1}
              </p>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-6">
                {personal.bioP2}
              </p>
            </div>

            {/* Highlights Grid — Box by Box Sequential Reveal */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-slate-200">
              {highlights.map((item, i) => {
                const IconComponent = iconMap[item.iconName] || Code;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 18, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.1, ease: "easeOut" }}
                    className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all duration-200 group hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-8 sm:w-9 h-8 sm:h-9 rounded-lg flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform duration-200`}>
                        <IconComponent className="w-4 sm:w-5 h-4 sm:h-5" />
                      </div>
                      <span className="text-[10px] font-mono text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                        Box 0{i + 1}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 leading-snug">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Stats Grid — Box by Box Sequential Automation with Live Number Counting */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
            {statsDisplay.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 25, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: 0.12 + idx * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="card-light p-4 sm:p-6 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-lg hover:border-emerald-300/80 transition-all duration-200 relative overflow-hidden group"
              >
                {/* Top scanning accent line for each box */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1, ease: "easeOut" }}
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.accent} origin-left`}
                />

                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <span className="text-[11px] sm:text-xs font-mono text-slate-400 group-hover:text-emerald-600 font-semibold transition-colors">
                    Box 0{idx + 1}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 group-hover:bg-emerald-500 transition-colors"></span>
                </div>

                <div>
                  {/* Automated Number Counter */}
                  <div className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-1 ${stat.color}`}>
                    <AnimatedCounter value={stat.value} durationMs={1100 + idx * 150} />
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 font-medium leading-snug group-hover:text-slate-700 transition-colors">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
