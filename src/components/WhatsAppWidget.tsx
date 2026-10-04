"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bot, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "./Icons";

interface WhatsAppWidgetProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export default function WhatsAppWidget({
  phoneNumber = "923235678381",
  defaultMessage = "Hi Ghulam! I visited your portfolio and I would like to discuss a software development or automation project.",
}: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Auto-show bubble with a smooth delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setIsOpen(true);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [hasInteracted]);

  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    defaultMessage
  )}`;

  const handleOpenChat = () => {
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2.5 pointer-events-none">
      {/* Automated Speech / Message Bubble */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="pointer-events-auto max-w-[280px] sm:max-w-xs bg-slate-900/95 backdrop-blur-md text-white p-3.5 sm:p-4 rounded-2xl border border-emerald-500/30 shadow-2xl shadow-emerald-950/40 relative cursor-pointer group"
            onClick={handleOpenChat}
          >
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
                setHasInteracted(true);
              }}
              className="absolute top-2.5 right-2.5 p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close automated message"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Automation Header Badge */}
            <div className="flex items-center gap-1.5 mb-2">
              <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
                <Bot className="w-3.5 h-3.5" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1">
                <span>Automated Quick Chat</span>
                <Sparkles className="w-2.5 h-2.5" />
              </span>
            </div>

            {/* Message Body */}
            <p className="text-xs sm:text-sm text-slate-200 leading-snug mb-2.5">
              Hi there! 👋 Need software development, multi-tenant SaaS, or automated workflows?
            </p>

            {/* CTA in bubble */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px]">
              <span className="text-emerald-400 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Chat on WhatsApp →
              </span>
              <span className="text-[10px] text-slate-400">Online • Instant</span>
            </div>

            {/* Tail pointer */}
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-slate-900 border-r border-b border-emerald-500/30 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulsing & Blinking WhatsApp Floating Button */}
      <div className="relative pointer-events-auto">
        {/* Animated Radar Ping Ring */}
        <span className="animate-ping absolute -inset-1 rounded-full bg-[#25D366] opacity-40"></span>
        <span className="animate-pulse absolute -inset-2 rounded-full bg-[#25D366]/20 blur-sm"></span>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setHasInteracted(true)}
          className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[0_4px_25px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-110 active:scale-95 group"
          aria-label="Chat with Ghulam Ahmed on WhatsApp (Automated Quick Connect)"
          title="Chat with Ghulam Ahmed on WhatsApp (03235678381)"
        >
          <WhatsAppIcon className="w-7 h-7 sm:w-8 sm:h-8 fill-white transition-transform group-hover:rotate-6" />

          {/* Online green indicator badge */}
          <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300 border-2 border-slate-900"></span>
          </span>
        </a>
      </div>
    </aside>
  );
}
