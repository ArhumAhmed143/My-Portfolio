"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, CheckCircle2, ExternalLink, Sparkles } from "lucide-react";
import { portfolioData, ProjectItem } from "@/data/portfolioData";
import AnimatedHeading from "./AnimatedHeading";
import TiltCard from "./TiltCard";
import TypewriterText from "./TypewriterText";

const categories = ["All", "Automation", "Full Stack", "Frontend"];

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const projects = portfolioData.projects;

  const filteredProjects =
    activeTab === "All"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  return (
    <section id="projects" className="section-light py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="pointer-events-none absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/[0.04] rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 -right-20 w-96 h-96 bg-teal-500/[0.04] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-semibold uppercase tracking-widest mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>My Work</span>
          </motion.div>

          <AnimatedHeading
            text="Projects I've Built & Automated"
            highlightWords={["Built", "Automated"]}
            highlightClassName="text-emerald-600"
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight"
          />

          {/* 1 Page (Hero) Text Ki Jaisi Automation: Cycling Automated Projects Typewriter */}
          <div className="mt-4 max-w-2xl mx-auto flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-slate-200 text-xs sm:text-sm font-mono shadow-md border border-slate-800">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-semibold shrink-0">Live Systems:</span>
            <TypewriterText
              phrases={[
                "Automating multi-store inventory sync, real-time POS billing & stock pipelines",
                "Enterprise multi-tenant SaaS platform with dynamic subdomain routing & RBAC",
                "Automated email triggers, transactional flows & webhooks with Brevo",
                "Full-scale e-commerce platform with automated order status updates",
                "Automated build test suites & zero-downtime cloud hosting on Render",
              ]}
              typingSpeed={32}
              deletingSpeed={16}
              pauseDuration={2400}
              className="text-slate-300 font-medium truncate"
              cursorClassName="w-1.5 h-3.5 bg-emerald-400"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-10 sm:mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeTab === cat
                  ? "bg-emerald-600 text-white shadow-sm scale-105"
                  : "bg-white text-slate-500 border border-slate-200 hover:text-slate-900 hover:border-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid with Box-by-Box Sequential Stagger & TiltCards */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, pIdx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 35, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{
                  duration: 0.45,
                  delay: pIdx * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="h-full"
              >
                <TiltCard maxTilt={5} className="h-full rounded-2xl relative overflow-hidden group">
                  {/* Top Scanning Accent Beam for each box */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.15 + pIdx * 0.08, ease: "easeOut" }}
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-transparent origin-left rounded-t-2xl z-20"
                  />

                  <div className="card-light p-5 sm:p-7 lg:p-8 flex flex-col justify-between h-full group hover:border-emerald-300 hover:shadow-xl transition-all duration-300">
                    <div>
                      {/* Box Number, Category Pill & Live Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
                            Box 0{pIdx + 1}
                          </span>
                          <span className="text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                            {project.category}
                          </span>
                        </div>

                        {project.demoUrl ? (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 transition-colors group/link"
                            title="Check the live link"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span>Live Web</span>
                            <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          </a>
                        ) : (
                          <span className="text-[10px] font-mono text-slate-400">
                            ● Automated Core
                          </span>
                        )}
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
                        {project.description}
                      </p>

                      {/* Highlights — Staggered Inside Each Box */}
                      <div className="space-y-2 mb-5">
                        {project.highlights.slice(0, 3).map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -6 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.12 + i * 0.06 }}
                            className="flex items-start gap-2 text-xs text-slate-500 group-hover:text-slate-600 transition-colors"
                          >
                            <span className="text-emerald-500 font-bold mt-0.5 shrink-0">✓</span>
                            <span>{h}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-mono bg-slate-100 text-slate-600 border border-slate-200 group-hover:border-slate-300 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                      {project.demoUrl ? (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 hover:border-emerald-300 transition-all duration-200 hover:shadow-sm"
                          title="Open live website"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Live Link</span>
                        </a>
                      ) : (
                        <div />
                      )}

                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-all hover:shadow-md active:scale-95 cursor-pointer ml-auto"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 sm:p-8 bg-[#0f0f23] text-white relative border-b border-white/10">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {selectedProject.category}
                  </span>
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-600 text-white hover:bg-emerald-500 transition-colors shadow-sm"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Live Web Link</span>
                    </a>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white pr-8">
                  {selectedProject.title}
                </h3>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-700">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">Project Overview</h4>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {selectedProject.longDescription}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-3">Key Highlights & Features</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProject.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2.5">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-100 text-slate-700 border border-slate-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-all hover:shadow-md hover:shadow-emerald-600/20 active:scale-95"
                    >
                      <span>Open Live Website</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors"
                    >
                      <span>GitHub</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </a>
                  )}
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-slate-700 bg-slate-200 hover:bg-slate-300 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
