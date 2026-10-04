"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail, Sparkles, Bot, Code, Cpu } from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from "./Icons";
import { portfolioData } from "@/data/portfolioData";

const ROLES = [
  "Full-Stack Developer",
  "Software Engineer",
  "Automation Engineer",
  "AI Developer",
];

export default function HeroSection() {
  const { personal, projects } = portfolioData;
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  // Mouse-follow background light effect
  const [mousePos, setMousePos] = useState({ x: 600, y: 300 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Automated Role Text Animation (Word/Character reveal sequence)
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setCharIndex(ROLES[roleIndex].length);
      return;
    }

    const currentRole = ROLES[roleIndex];

    if (isPaused) {
      // 700ms pause after complete phrase (500–800ms)
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 700);
      return () => clearTimeout(pauseTimeout);
    }

    if (!isDeleting && charIndex === currentRole.length) {
      setIsPaused(true);
      return;
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
      return;
    }

    // 38ms typing speed (30–50ms requirement), 18ms fast transition back
    const speed = isDeleting ? 18 : 38;
    const timeout = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, isPaused, roleIndex, shouldReduceMotion]);

  const currentRoleText = ROLES[roleIndex].substring(0, charIndex);

  return (
    <section
      ref={heroRef}
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-14 lg:pb-20 bg-[#080811]"
    >
      {/* ===== BACKGROUND ANIMATIONS ===== */}
      {/* 1. Subtle Interactive Mouse-Follow Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-70"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.08), transparent 75%)`,
        }}
      />

      {/* 2. Subtle Animated Grid / Matrix */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: "4rem 4rem",
          maskImage: "radial-gradient(ellipse 65% 55% at 50% 45%, #000 65%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 65% 55% at 50% 45%, #000 65%, transparent 100%)",
        }}
      />

      {/* 3. Soft Glowing Ambient Orbs */}
      <div className="pointer-events-none absolute -top-24 right-1/4 w-[480px] h-[480px] bg-emerald-500/[0.07] rounded-full blur-[130px]" />
      <div className="pointer-events-none absolute bottom-10 left-10 w-[400px] h-[400px] bg-teal-500/[0.05] rounded-full blur-[120px]" />

      {/* 4. Subtle Floating Particles */}
      {!shouldReduceMotion && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ y: [-15, 15, -15], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/6 w-1.5 h-1.5 rounded-full bg-emerald-400/40"
          />
          <motion.div
            animate={{ y: [12, -12, 12], opacity: [0.15, 0.5, 0.15] }}
            transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-2/3 left-1/3 w-2 h-2 rounded-full bg-teal-400/30"
          />
          <motion.div
            animate={{ y: [-20, 20, -20], opacity: [0.2, 0.55, 0.2] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-emerald-300/40"
          />
        </div>
      )}

      {/* ===== HERO CONTENT CONTAINER ===== */}
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-10 sm:gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* ==================== LEFT SIDE ==================== */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* 1. Small Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold mb-4 sm:mb-5 shadow-[0_0_20px_rgba(16,185,129,0.15)] backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Software Department Intern @ Revive Medical Technologies</span>
            </motion.div>

            {/* 2. Name: Ghulam Ahmed (Visually Dominant, Bold, Modern) */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
              className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white leading-none mb-3 sm:mb-4"
            >
              Ghulam Ahmed
            </motion.h1>

            {/* 3. Automated Role Text Animation */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
              className="h-10 sm:h-12 lg:h-14 flex items-center mb-4 sm:mb-5"
            >
              <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
                {currentRoleText}
              </span>
              <span className="inline-block w-[3px] sm:w-1 h-6 sm:h-8 lg:h-9 bg-emerald-400 ml-1.5 animate-pulse rounded-full shadow-[0_0_12px_#10b981]" />
            </motion.div>

            {/* 4. Short Subtitle (1-2 lines maximum) */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24, ease: "easeOut" }}
              className="text-slate-300 sm:text-slate-400 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-xl mb-7 sm:mb-9"
            >
              Building scalable web applications, automation systems &amp; AI-powered solutions.
            </motion.p>

            {/* 5. Two Modern CTA Buttons: [ View Projects ] and [ Hire Me ] */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32, ease: "easeOut" }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 sm:gap-4 w-full sm:w-auto"
            >
              {/* View Projects */}
              <a
                href="#projects"
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold text-sm sm:text-base inline-flex items-center justify-center gap-2.5 shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_30px_rgba(16,185,129,0.55)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 group"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              {/* Hire Me */}
              <a
                href="#contact"
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 hover:border-emerald-500/50 text-slate-200 hover:text-white font-semibold text-sm sm:text-base inline-flex items-center justify-center gap-2.5 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-black/20 group"
              >
                <Mail className="w-4 h-4 text-emerald-400 transition-transform group-hover:scale-110" />
                <span>Hire Me</span>
              </a>
            </motion.div>

            {/* Subtle Quick Social Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 sm:mt-7 flex items-center justify-center lg:justify-start gap-4 text-slate-400"
            >
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2 rounded-lg hover:text-white hover:bg-white/5 transition-all"
                title="GitHub"
              >
                <GithubIcon className="w-5 h-5 fill-current" />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2 rounded-lg hover:text-white hover:bg-white/5 transition-all"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5 fill-current" />
              </a>
              <a
                href={`https://wa.me/923235678381?text=${encodeURIComponent(
                  "Hi Ghulam! I visited your portfolio and would like to discuss a software project."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Chat"
                className="p-2 rounded-lg hover:text-[#25D366] hover:bg-white/5 transition-all"
                title="WhatsApp Quick Connect (03235678381)"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" />
              </a>
              <span className="text-xs text-slate-500 font-mono pl-1">
                {personal.email}
              </span>
            </motion.div>
          </div>

          {/* ==================== RIGHT SIDE ==================== */}
          {/* Modern Visual Profile Card with Animated Border & Floating Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center items-center mt-6 lg:mt-0"
          >
            <div className="relative group w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[400px]">
              {/* Subtle animated ambient glow ring */}
              <div className="absolute -inset-1.5 rounded-[2rem] bg-gradient-to-r from-emerald-500/35 via-teal-500/25 to-emerald-400/35 opacity-70 blur-xl group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Modern Rounded Rectangle Card Frame */}
              <div className="relative rounded-[2rem] p-2 sm:p-2.5 bg-gradient-to-b from-white/15 via-white/[0.04] to-white/[0.01] border border-white/15 shadow-2xl backdrop-blur-md">
                {/* Image Container */}
                <div className="relative w-full aspect-[4/5] rounded-[1.6rem] overflow-hidden shadow-inner bg-slate-900">
                  <Image
                    src={personal.profilePicture}
                    alt={personal.name}
                    fill
                    priority
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 400px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle bottom vignette */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#080811] via-[#080811]/40 to-transparent" />
                </div>
              </div>

              {/* ===== SUBTLE FLOATING UI BADGES AROUND THE IMAGE ===== */}
              {/* 1. </> Floating badge (Top Left) */}
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [-5, 5, -5], rotate: [-2, 2, -2] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 -left-3 sm:-left-5 px-3 py-1.5 rounded-xl bg-[#0e1322]/95 border border-emerald-500/40 backdrop-blur-md shadow-xl text-emerald-400 font-mono text-xs sm:text-sm font-bold flex items-center gap-1.5 pointer-events-none z-20"
              >
                <Code className="w-3.5 h-3.5 text-emerald-400" />
                <span>&lt; / &gt;</span>
              </motion.div>

              {/* 2. AI Floating badge (Top Right) */}
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [5, -5, 5], rotate: [2, -2, 2] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 -right-3 sm:-right-5 px-3 py-1.5 rounded-xl bg-[#0e1322]/95 border border-teal-500/40 backdrop-blur-md shadow-xl text-teal-300 font-mono text-xs sm:text-sm font-bold flex items-center gap-1.5 pointer-events-none z-20"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>AI</span>
              </motion.div>

              {/* 3. FULL STACK Floating badge (Bottom Left) */}
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [-6, 6, -6], rotate: [1.5, -1.5, 1.5] }}
                transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 -left-4 sm:-left-6 px-3 py-1.5 rounded-xl bg-[#0e1322]/95 border border-white/15 backdrop-blur-md shadow-xl text-slate-200 font-mono text-[10px] sm:text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 pointer-events-none z-20"
              >
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>FULL STACK</span>
              </motion.div>

              {/* 4. AUTOMATION Floating badge (Bottom Right) */}
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [6, -6, 6], rotate: [-1.5, 1.5, -1.5] }}
                transition={{ duration: 5.1, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-3 -right-2 sm:-right-4 px-3.5 py-1.5 rounded-xl bg-emerald-950/95 border border-emerald-500/50 backdrop-blur-md shadow-xl text-emerald-400 font-mono text-[10px] sm:text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 pointer-events-none z-20"
              >
                <Bot className="w-3.5 h-3.5 text-emerald-400" />
                <span>AUTOMATION</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Selected Work Quick Bar (Clean, Minimal, Fast) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/[0.08]"
        >
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-x-8 lg:gap-x-12 gap-y-3 text-center sm:text-left">
            <span className="text-[11px] uppercase tracking-[0.18em] text-emerald-400 font-mono font-semibold">
              Featured Work
            </span>
            {projects.slice(0, 3).map((project) => (
              <a
                key={project.id}
                href={project.demoUrl || "#projects"}
                target={project.demoUrl ? "_blank" : undefined}
                rel={project.demoUrl ? "noopener noreferrer" : undefined}
                className="text-xs sm:text-sm text-slate-300 hover:text-white transition-colors group flex items-center gap-1.5"
              >
                <span className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  {project.title.split(" — ")[0]}
                </span>
                <span className="text-slate-500 text-[11px]">
                  ({project.category})
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}