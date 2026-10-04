"use client";

import { motion } from "framer-motion";
import { Code, Layers, BookOpen, Cpu } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import AnimatedHeading from "./AnimatedHeading";

const iconMap: Record<string, typeof Code> = {
  Code,
  Layers,
  BookOpen,
  Cpu,
};

export default function AboutSection() {
  const { personal, stats: portfolioStats, highlights } = portfolioData;

  const statsDisplay = [
    { label: "Automated Systems & Projects", value: portfolioStats.projectsShipped, color: "text-emerald-600" },
    { label: "Automation Tools & Tech", value: portfolioStats.technologiesUsed, color: "text-blue-600" },
    { label: "Years Engineering & Building", value: portfolioStats.yearsBuilding, color: "text-violet-600" },
    { label: "Degree in Progress", value: portfolioStats.degree, color: "text-amber-600" },
  ];

  return (
    <section id="about" className="section-light py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="text-xs sm:text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-2 sm:mb-3"
          >
            About Me
          </motion.p>
          <AnimatedHeading
            text="A Bit About Me & Engineering Philosophy"
            highlightWords={["Philosophy", "Engineering"]}
            highlightClassName="text-emerald-600"
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Main Story Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="lg:col-span-7 card-light p-6 sm:p-8 lg:p-10 flex flex-col justify-between"
          >
            <div>
              <motion.h3
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4"
              >
                Hey, I&apos;m {personal.name}
              </motion.h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4 sm:mb-5">
                {personal.bioP1}
              </p>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-6">
                {personal.bioP2}
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-slate-200">
              {highlights.map((item, i) => {
                const IconComponent = iconMap[item.iconName] || Code;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.15 + i * 0.08 }}
                    className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all duration-200"
                  >
                    <div className={`w-8 sm:w-9 h-8 sm:h-9 rounded-lg flex items-center justify-center mb-2.5 sm:mb-3 ${item.color}`}>
                      <IconComponent className="w-4 sm:w-5 h-4 sm:h-5" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 leading-snug">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
            {statsDisplay.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: 0.1 + idx * 0.07, ease: "easeOut" }}
                className="card-light p-4 sm:p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-200"
              >
                <span className="text-[11px] sm:text-xs font-mono text-slate-400 mb-4 sm:mb-6">0{idx + 1}</span>
                <div>
                  <div className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-1 ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 font-medium leading-snug">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
