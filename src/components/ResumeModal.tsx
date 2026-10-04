"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Printer, FileText, Check, Loader2 } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { generateAndDownloadResume } from "@/utils/downloadResume";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { personal } = portfolioData;
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleDownload = async () => {
    setIsDownloading(true);
    const success = await generateAndDownloadResume();
    setIsDownloading(false);
    if (success) {
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0f111a] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto"
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 bg-[#141624]/90 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white text-base sm:text-lg font-bold flex items-center gap-2">
                    <span>Curriculum Vitae / Resume</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-normal">
                      Verified
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Official format · Software Engineer &amp; Full-Stack Developer
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-emerald-500/20 active:scale-95 disabled:opacity-70 cursor-pointer"
                  title="Download PDF Resume"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="hidden sm:inline">Generating...</span>
                    </>
                  ) : downloadSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Downloaded!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handlePrint}
                  className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs sm:text-sm font-medium transition-all cursor-pointer"
                  title="Print Resume"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print</span>
                </button>

                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Resume Document Paper Viewport */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#0a0a14] flex justify-center">
              <div className="w-full max-w-[800px] bg-white text-black p-6 sm:p-12 sm:px-14 shadow-2xl rounded-sm font-sans text-[13px] leading-relaxed selection:bg-emerald-100 selection:text-black">
                {/* 1. Header (Centered with strict vertical separation) */}
                <div className="text-center mb-6 pb-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-black uppercase mb-2">
                    {personal.name}
                  </h1>
                  <p className="text-xs sm:text-sm font-bold tracking-widest text-black uppercase mb-2">
                    SOFTWARE ENGINEER
                  </p>
                  <p className="text-xs text-neutral-800">
                    <span>{personal.location}</span>
                    <span className="mx-2 font-light text-neutral-400">|</span>
                    <span>{personal.phone}</span>
                    <span className="mx-2 font-light text-neutral-400">|</span>
                    <a
                      href={`mailto:${personal.email}`}
                      className="text-blue-700 hover:underline"
                    >
                      {personal.email}
                    </a>
                  </p>
                </div>

                {/* 2. Objective */}
                <div className="mb-5">
                  <h2 className="text-sm font-bold text-black mb-1.5">
                    Objective
                  </h2>
                  <hr className="border-t border-black mb-2" />
                  <p className="text-[12.5px] text-neutral-800 leading-normal mb-2 text-justify">
                    As a motivated Front-End &amp; Full-Stack Developer with a strong foundation in C#, Object-Oriented Programming (OOP), and programming fundamentals, I am eager to contribute to your team and continue growing as a software developer. I have hands-on experience in building scalable web applications using React.js, Next.js, and TypeScript, backend development with Node.js, Laravel, REST APIs, and software automation systems.
                  </p>
                  <p className="text-[12.5px] text-neutral-800 leading-normal text-justify">
                    I am passionate about learning new technologies, building clean and user-friendly web applications, and working in a collaborative environment where I can improve my skills and contribute positively to projects.
                  </p>
                </div>

                {/* 3. Professional Experience / Internships */}
                <div className="mb-5">
                  <h2 className="text-sm font-bold text-black uppercase mb-1">
                    EXPERIENCE &amp; INTERNSHIPS
                  </h2>
                  <hr className="border-t border-black mb-2.5" />

                  <div className="mb-3">
                    <div className="flex justify-between items-baseline text-[13px] font-bold text-black">
                      <span>REVIVE MEDICAL TECHNOLOGIES</span>
                      <span>2026 – Present</span>
                    </div>
                    <p className="text-[12.5px] font-bold text-neutral-800 mb-1">
                      Software Department Intern
                    </p>
                    <p className="text-[12px] text-neutral-700 pl-3">
                      • Working in the Software Department on software automation systems, automated API testing suites, medical technology applications, and high-reliability full-stack web solutions.
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline text-[13px] font-bold text-black">
                      <span>PIG BUG SOLUTION</span>
                      <span>2026 (6 Weeks)</span>
                    </div>
                    <p className="text-[12.5px] font-bold text-neutral-800 mb-1">
                      Web Developer Intern
                    </p>
                    <p className="text-[12px] text-neutral-700 pl-3">
                      • Developed responsive web user interfaces and integrated backend REST APIs using Next.js, React, TypeScript, and Tailwind CSS with automated build optimization.
                    </p>
                  </div>
                </div>

                {/* 4. Projects */}
                <div className="mb-5">
                  <h2 className="text-sm font-bold text-black uppercase mb-1">
                    PROJECTS
                  </h2>
                  <hr className="border-t border-black mb-2.5" />

                  <ul className="space-y-1 text-[12.5px] text-neutral-900 font-semibold mb-3">
                    <li className="flex items-start">
                      <span className="mr-2 text-base leading-none">•</span>
                      <span>SaaS Multi-Tenant Automation Platform</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-base leading-none">•</span>
                      <span>Ahmed Mobile — E-Commerce Store</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-base leading-none">•</span>
                      <span>NetPrime — Video Streaming Platform</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-base leading-none">•</span>
                      <span>COVID / Health Statistics Visualizer</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-base leading-none">•</span>
                      <span>Cloud-Based Multi-Store POS &amp; Inventory Management System</span>
                    </li>
                  </ul>

                  {/* Indented Multi-Store POS Description Box */}
                  <div className="pl-4 text-[12px] text-neutral-800 leading-snug space-y-2 mb-2">
                    <p className="text-justify">
                      (A comprehensive multi-location cloud-based Point of Sale (POS) and inventory management Progressive Web Application designed for enterprise retail businesses. The system enables real-time inventory tracking across multiple branch stores with automated background synchronization, barcode scanning, offline transaction processing, staff role-based access control, receipt generation, and automated daily/monthly financial analytics. It allows store managers to manage suppliers, purchase orders, customer ledgers, and cash registers with automated low-stock threshold alerts.
                    </p>
                    <p className="font-bold text-neutral-900 pt-1">
                      For development, we used:
                    </p>
                    <div className="pl-1 space-y-0.5">
                      <p>Next.js, React.js, TypeScript, and Tailwind CSS for the frontend</p>
                      <p>Laravel &amp; Node.js RESTful APIs for backend and transaction services</p>
                      <p>PostgreSQL and MySQL for database &amp; multi-branch ledger synchronization</p>
                      <p>Offline PWA Service Workers with IndexedDB for offline resilience</p>
                      <p>Multiple APIs for automated reporting and barcode generation)</p>
                    </div>
                  </div>
                </div>

                {/* 5. Education */}
                <div className="mb-5">
                  <div className="flex justify-between items-baseline text-[13px] font-bold text-black">
                    <span>FOUNDATION UNIVERSITY ISLAMABAD, BSc (IET)</span>
                    <span>09/2023 – 2027</span>
                  </div>
                  <p className="text-[12px] text-neutral-800 mb-2">
                    Bachelor of Science in Information Engineering Technology
                  </p>

                  <div className="flex justify-between items-baseline text-[13px] font-bold text-black">
                    <span>ASKARIA COLLEGE BOYS SADDAR RAWALPINDI</span>
                    <span>04/2021 – 06/2022</span>
                  </div>
                  <p className="text-[12px] text-neutral-800">
                    ICS (Intermediate in Computer Science)
                  </p>
                </div>

                {/* 6. Skills & abilities */}
                <div>
                  <h2 className="text-sm font-bold text-black mb-1">
                    Skills &amp; abilities
                  </h2>
                  <hr className="border-t border-black mb-2" />

                  <ul className="space-y-1.5 text-[12px] text-neutral-800">
                    <li className="flex items-start">
                      <span className="mr-2 text-base leading-none">•</span>
                      <span>
                        <strong className="font-bold text-black">Backend Technologies: </strong>
                        Node.js, Express, Laravel, REST APIs, PHP, C#
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-base leading-none">•</span>
                      <span>
                        <strong className="font-bold text-black">Frontend Technologies: </strong>
                        React.js, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-base leading-none">•</span>
                      <span>
                        <strong className="font-bold text-black">Database &amp; Cloud: </strong>
                        MS SQL Server, MySQL, Firebase, PostgreSQL, MongoDB, Render
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-base leading-none">•</span>
                      <span>
                        <strong className="font-bold text-black">Programming Languages: </strong>
                        TypeScript, JavaScript, C#, C++, Java, Python
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-base leading-none">•</span>
                      <span>
                        <strong className="font-bold text-black">Soft Skills: </strong>
                        Analytical Thinking, Problem Solving, Team Collaboration, Adaptability, Time Management
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Modal Footer Note */}
            <div className="px-6 py-3 border-t border-white/10 bg-[#141624] flex items-center justify-between text-xs text-slate-400">
              <span>Press ESC or click outside to close</span>
              <button
                onClick={handleDownload}
                className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Instant PDF Download</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
