"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail, Sparkles, Bot, Code, Cpu, FileText } from "lucide-react";
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

  // 1. Automated Name Text Animation (Types out on mount character by character)
  const fullName = personal.name; // "Ghulam Ahmed"
  const [nameCharIndex, setNameCharIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setNameCharIndex(fullName.length);
      return;
    }
    if (nameCharIndex < fullName.length) {
      const timer = setTimeout(() => {
        setNameCharIndex((prev) => prev + 1);
      }, 65);
      return () => clearTimeout(timer);
    }
  }, [nameCharIndex, fullName.length, shouldReduceMotion]);

  const currentNameText = fullName.substring(0, nameCharIndex);
  const isNameComplete = nameCharIndex >= fullName.length;

  // 2. Automated Role Text Animation (Word/Character reveal sequence)
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
      // 700ms pause after complete phrase
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

    // 38ms typing speed, 18ms fast backspace
    const speed = isDeleting ? 18 : 38;
    const timeout = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, isPaused, roleIndex, shouldReduceMotion]);

  const currentRoleText = ROLES[roleIndex].substring(0, charIndex);

  // 3. Automated Subtitle Paragraph Animation (Typewriter with cycling phrases)
  const SUBTITLES = [
    "Building scalable web applications, automation systems & AI-powered solutions.",
    "Engineering multi-tenant SaaS platforms, modern APIs & automated cloud workflows.",
    "Developing high-performance full-stack applications with Next.js, React & TypeScript.",
  ];

  const [subIndex, setSubIndex] = useState(0);
  const [subCharIndex, setSubCharIndex] = useState(0);
  const [isSubDeleting, setIsSubDeleting] = useState(false);
  const [isSubPaused, setIsSubPaused] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setSubCharIndex(SUBTITLES[subIndex].length);
      return;
    }

    const currentSub = SUBTITLES[subIndex];

    if (isSubPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsSubPaused(false);
        setIsSubDeleting(true);
      }, 2600);
      return () => clearTimeout(pauseTimeout);
    }

    if (!isSubDeleting && subCharIndex === currentSub.length) {
      setIsSubPaused(true);
      return;
    }

    if (isSubDeleting && subCharIndex === 0) {
      setIsSubDeleting(false);
      setSubIndex((prev) => (prev + 1) % SUBTITLES.length);
      return;
    }

    const speed = isSubDeleting ? 12 : 24;
    const timeout = setTimeout(() => {
      setSubCharIndex((prev) => prev + (isSubDeleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [subCharIndex, isSubDeleting, isSubPaused, subIndex, shouldReduceMotion]);

  const currentSubText = SUBTITLES[subIndex].substring(0, subCharIndex);

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

            {/* 2. Name: Ghulam Ahmed (Automated Character Typing Animation) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
              className="mb-3 sm:mb-4 min-h-[44px] sm:min-h-[64px] lg:min-h-[82px] flex items-center justify-center lg:justify-start"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white leading-none flex items-center">
                <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  {currentNameText}
                </span>
                {!isNameComplete && (
                  <span className="inline-block w-[3px] sm:w-1 h-7 sm:h-11 lg:h-14 bg-emerald-400 ml-1.5 sm:ml-2.5 animate-pulse rounded-full shadow-[0_0_15px_#10b981]" />
                )}
              </h1>
            </motion.div>

            {/* 3. Automated Role Text Animation */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
              className="h-10 sm:h-12 lg:h-14 flex items-center mb-4 sm:mb-5 justify-center lg:justify-start"
            >
              <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
                {currentRoleText}
              </span>
              <span className="inline-block w-[3px] sm:w-1 h-6 sm:h-8 lg:h-9 bg-emerald-400 ml-1.5 animate-pulse rounded-full shadow-[0_0_12px_#10b981]" />
            </motion.div>

            {/* 4. Automated Subtitle Paragraph Animation (Typewriter with cycling phrases) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24, ease: "easeOut" }}
              className="min-h-[60px] sm:min-h-[70px] flex items-start mb-6 sm:mb-8 max-w-xl text-center lg:text-left justify-center lg:justify-start"
            >
              <p className="text-slate-300 sm:text-slate-400 text-base sm:text-lg lg:text-xl font-normal leading-relaxed">
                <span>{currentSubText}</span>
                <span className="inline-block w-1.5 sm:w-2 h-4 sm:h-5 bg-emerald-400/80 ml-1 animate-pulse align-middle rounded-sm shadow-[0_0_8px_#10b981]" />
              </p>
            </motion.div>

            {/* 5. Modern CTA Buttons: [ View Projects ], [ Resume / CV ], and [ Hire Me ] */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32, ease: "easeOut" }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-3.5 w-full sm:w-auto"
            >
              {/* View Projects */}
              <a
                href="#projects"
                className="w-full sm:w-auto px-5 sm:px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold text-sm sm:text-base inline-flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_30px_rgba(16,185,129,0.55)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 group"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              {/* Resume / CV Button — Opens Interactive Viewer & Direct Download */}
              <a
                href="#resume"
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-resume-modal"));
                  }
                }}
                className="w-full sm:w-auto px-5 sm:px-6 py-3.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 hover:text-white font-semibold text-sm sm:text-base inline-flex items-center justify-center gap-2.5 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] group cursor-pointer"
                title="View and Download Official Resume"
              >
                <FileText className="w-4 h-4 text-emerald-400 transition-transform group-hover:scale-110" />
                <span>Resume / CV</span>
              </a>

              {/* Hire Me */}
              <a
                href="#contact"
                className="w-full sm:w-auto px-5 sm:px-6 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 hover:border-emerald-500/50 text-slate-200 hover:text-white font-semibold text-sm sm:text-base inline-flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-black/20 group"
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
          {/* Modern Visual Profile Card that "flies in" with dynamic 3D physics and continuous floating levitation */}
          <motion.div
            initial={{
              opacity: 0,
              x: 280,
              y: -120,
              scale: 0.45,
              rotateZ: 16,
              rotateY: 35,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotateZ: 0,
              rotateY: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 45,
              damping: 11,
              mass: 1.15,
              delay: 0.25,
            }}
            className="flex justify-center items-center mt-6 lg:mt-0 [perspective:1000px]"
          >
            {/* Continuous 3D Floating Levitation */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: [-11, 11, -11],
                      rotateZ: [-1.2, 1.2, -1.2],
                      rotateY: [-2.5, 2.5, -2.5],
                    }
              }
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative group w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[400px]"
            >
              {/* Dynamic Rotating Ambient Glow Halo Ring */}
              <motion.div
                animate={shouldReduceMotion ? {} : { rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2.5 rounded-[2.2rem] bg-gradient-to-r from-emerald-500/40 via-teal-400/30 to-emerald-400/40 opacity-70 blur-xl group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              />

              {/* Modern Rounded Rectangle Card Frame */}
              <div className="relative rounded-[2rem] p-2 sm:p-2.5 bg-gradient-to-b from-white/20 via-white/[0.05] to-white/[0.01] border border-white/20 shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:border-emerald-500/50">
                {/* Image Container with specular hover shine */}
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

              {/* ===== FLYING SATELLITE BADGES ===== */}
              {/* 1. </> Floating badge (Top Left) — Flying in */}
              <motion.div
                initial={{ opacity: 0, x: -70, y: -50, scale: 0.4 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 60, damping: 10, delay: 0.6 }}
                className="absolute -top-3 -left-3 sm:-left-5 z-20 pointer-events-none"
              >
                <motion.div
                  animate={shouldReduceMotion ? {} : { y: [-5, 5, -5], rotate: [-2, 2, -2] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                  className="px-3 py-1.5 rounded-xl bg-[#0e1322]/95 border border-emerald-500/40 backdrop-blur-md shadow-xl text-emerald-400 font-mono text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                >
                  <Code className="w-3.5 h-3.5 text-emerald-400" />
                  <span>&lt; / &gt;</span>
                </motion.div>
              </motion.div>

              {/* 2. AI Floating badge (Top Right) — Flying in */}
              <motion.div
                initial={{ opacity: 0, x: 70, y: -50, scale: 0.4 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 60, damping: 10, delay: 0.75 }}
                className="absolute top-6 -right-3 sm:-right-5 z-20 pointer-events-none"
              >
                <motion.div
                  animate={shouldReduceMotion ? {} : { y: [5, -5, 5], rotate: [2, -2, 2] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                  className="px-3 py-1.5 rounded-xl bg-[#0e1322]/95 border border-teal-500/40 backdrop-blur-md shadow-xl text-teal-300 font-mono text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(20,184,166,0.3)]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  <span>AI</span>
                </motion.div>
              </motion.div>

              {/* 3. FULL STACK Floating badge (Bottom Left) — Flying in */}
              <motion.div
                initial={{ opacity: 0, x: -70, y: 50, scale: 0.4 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 60, damping: 10, delay: 0.9 }}
                className="absolute bottom-10 -left-4 sm:-left-6 z-20 pointer-events-none"
              >
                <motion.div
                  animate={shouldReduceMotion ? {} : { y: [-6, 6, -6], rotate: [1.5, -1.5, 1.5] }}
                  transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
                  className="px-3 py-1.5 rounded-xl bg-[#0e1322]/95 border border-white/20 backdrop-blur-md shadow-xl text-slate-200 font-mono text-[10px] sm:text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5"
                >
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  <span>FULL STACK</span>
                </motion.div>
              </motion.div>

              {/* 4. AUTOMATION Floating badge (Bottom Right) — Flying in with live pulsing indicator */}
              <motion.div
                initial={{ opacity: 0, x: 70, y: 50, scale: 0.4 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 60, damping: 10, delay: 1.05 }}
                className="absolute -bottom-3 -right-2 sm:-right-4 z-20 pointer-events-none"
              >
                <motion.div
                  animate={shouldReduceMotion ? {} : { y: [6, -6, 6], rotate: [-1.5, 1.5, -1.5] }}
                  transition={{ duration: 5.1, repeat: Infinity, ease: "easeInOut" }}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-950/95 border border-emerald-500/50 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.3)] text-emerald-400 font-mono text-[10px] sm:text-xs font-semibold tracking-wider uppercase flex items-center gap-2"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <Bot className="w-3.5 h-3.5 text-emerald-400" />
                  <span>AUTOMATION</span>
                </motion.div>
              </motion.div>
            </motion.div>
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