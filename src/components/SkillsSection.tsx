"use client";

import { motion } from "framer-motion";
import { Code2, Database, Wrench, Cpu } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import AnimatedHeading from "./AnimatedHeading";

const iconMap: Record<string, typeof Code2> = {
  Code2,
  Database,
  Wrench,
  Cpu,
};

export default function SkillsSection() {
  const { skillCategories } = portfolioData;

  return (
    <section id="skills" className="section-dark py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="text-xs sm:text-sm font-semibold text-emerald-400 uppercase tracking-widest mb-2 sm:mb-3"
          >
            Automation &amp; Engineering Stack
          </motion.p>
          <AnimatedHeading
            text="Technologies & Automation Tools"
            highlightWords={["Automation", "Tools"]}
            highlightClassName="text-emerald-400"
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          />
        </div>

        {/* Categories Grid — Staggered Card Reveals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, catIdx) => {
            const IconComponent = iconMap[cat.iconName] || Code2;
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.42, delay: catIdx * 0.09, ease: "easeOut" }}
                className="card-dark p-5 sm:p-6 hover:border-emerald-500/30 transition-all duration-300 group"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5 sm:mb-6 pb-4 border-b border-white/8">
                  <div className={`p-2.5 rounded-xl ${cat.color} text-white shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {cat.category}
                  </h3>
                </div>

                {/* Skill List */}
                <div className="space-y-3">
                  {cat.skills.map((skill, sIdx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.15 + sIdx * 0.05 }}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] hover:border-emerald-500/20 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-medium text-slate-200 text-xs sm:text-sm">{skill.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 shrink-0">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-snug">{skill.desc}</p>
                      {/* Animated skill progress bar */}
                      <div className="w-full bg-white/[0.08] rounded-full h-1 mt-2.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{
                            width:
                              skill.level === "Daily Driver"
                                ? "98%"
                                : skill.level === "Strong"
                                ? "94%"
                                : skill.level === "Comfortable"
                                ? "88%"
                                : "78%",
                          }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.85, delay: 0.2 + sIdx * 0.04, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
