"use client";

import { ChevronUp, Heart } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

export default function Footer() {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/8 py-8 sm:py-10 px-4 sm:px-6 lg:px-8 bg-[#0a0a1a]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-center md:text-left">
        {/* Brand */}
        <div className="font-bold text-base sm:text-lg text-white">
          {personal.name}
        </div>

        {/* Quick Info */}
        <div className="text-xs text-slate-500 text-center flex flex-wrap items-center justify-center gap-1.5">
          <span>Built with</span>
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
          <span>using Next.js, TypeScript & Tailwind CSS</span>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-full bg-white/[0.04] border border-white/8 hover:bg-white/8 text-slate-400 hover:text-white transition-colors cursor-pointer"
          title="Back to Top"
          aria-label="Back to Top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-5 border-t border-white/5 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} {personal.name}. All rights reserved.
      </div>
    </footer>
  );
}
