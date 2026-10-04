"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Sparkles,
  X,
  Send,
  RotateCcw,
  ExternalLink,
  FileText,
  MessageCircle,
  Briefcase,
  ChevronDown,
  ShieldCheck,
  User,
} from "lucide-react";
import { ProjectItem } from "@/data/portfolioData";
import ProjectRecommendationCard from "./ProjectRecommendationCard";
import LeadQualificationForm from "./LeadQualificationForm";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  recommendations?: ProjectItem[];
  actionType?: "qualification_prompt" | "whatsapp_cta" | "resume_cta" | "contact_cta";
  quickChips?: string[];
}

export default function PortfolioAgent() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [showTeaser, setShowTeaser] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showLeadForm, setShowLeadForm] = useState<boolean>(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg_welcome",
      role: "assistant",
      content:
        "Hello! 👋 I'm Ghulam Ahmed's **Portfolio Automation Agent**.\n\nI can answer questions about his software engineering experience at Revive Medical Technologies, his multi-tenant SaaS architecture, end-to-end automation pipelines, or recommend the best project match for your needs.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      quickChips: [
        "Recommend a project for me",
        "What services do you offer?",
        "Tell me about your SaaS & Automation work",
        "I want to hire Ghulam",
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, showLeadForm]);

  // Teaser bubble after 2.8s
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted && !isOpen) {
        setShowTeaser(true);
      }
    }, 2800);
    return () => clearTimeout(timer);
  }, [hasInteracted, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setShowTeaser(false);
      setHasInteracted(true);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isTyping) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // If query implies hiring, we can directly pop lead qualification or let AI reply
    const lower = query.toLowerCase();
    if (
      lower.includes("hire") ||
      lower.includes("start a project") ||
      lower.includes("quote") ||
      lower.includes("estimate")
    ) {
      setShowLeadForm(true);
    }

    try {
      const res = await fetch("/api/agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const assistantMsg: ChatMessage = {
          id: `asst_${Date.now()}`,
          role: "assistant",
          content: data.message,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          recommendations: data.recommendations,
          actionType: data.actionType,
          quickChips: data.quickChips,
        };
        setMessages((prev) => [...prev, assistantMsg]);

        if (data.actionType === "qualification_prompt") {
          setShowLeadForm(true);
        }
      } else {
        throw new Error(data.error || "Failed to process chat response.");
      }
    } catch {
      // Fallback assistant response
      setMessages((prev) => [
        ...prev,
        {
          id: `asst_err_${Date.now()}`,
          role: "assistant",
          content:
            "I apologize, I encountered a temporary connection issue. However, you can reach Ghulam directly on WhatsApp (+92 323 5678381) or via email at ahmedghulam622@gmail.com.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          quickChips: ["Open WhatsApp Chat", "View Projects", "Download Resume"],
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleChipClick = (chip: string) => {
    if (chip === "Open WhatsApp Chat" || chip === "Connect on WhatsApp") {
      window.open(
        "https://wa.me/923235678381?text=Hi%20Ghulam!%20I%20am%20chatting%20with%20your%20Portfolio%20AI%20Agent.",
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }
    if (chip === "Download Official Resume" || chip === "Download Resume" || chip === "View Resume") {
      window.dispatchEvent(new CustomEvent("open-resume-modal"));
      return;
    }
    if (chip === "I want to hire Ghulam" || chip === "Start Project Inquiry") {
      setShowLeadForm(true);
      return;
    }

    handleSendMessage(chip);
  };

  const handleResetChat = () => {
    setShowLeadForm(false);
    setMessages([
      {
        id: `msg_reset_${Date.now()}`,
        role: "assistant",
        content:
          "Chat reset! What else would you like to explore regarding Ghulam Ahmed's software engineering background or projects?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        quickChips: [
          "Recommend a project for me",
          "What services do you offer?",
          "Tell me about your SaaS & Automation work",
          "I want to hire Ghulam",
        ],
      },
    ]);
  };

  return (
    <>
      {/* Floating Teaser Speech Bubble */}
      <AnimatePresence>
        {showTeaser && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.92 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-38 right-5 sm:bottom-40 sm:right-6 z-40 max-w-[260px] sm:max-w-[280px] p-3 rounded-2xl bg-[#0e1322]/95 backdrop-blur-md border border-emerald-500/40 shadow-2xl shadow-emerald-950/40 text-left cursor-pointer group"
            onClick={() => setIsOpen(true)}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowTeaser(false);
                setHasInteracted(true);
              }}
              className="absolute top-2 right-2 p-0.5 rounded-full text-slate-400 hover:text-white"
              aria-label="Dismiss AI greeting"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-1.5 mb-1 text-[11px] font-mono text-emerald-400 font-semibold">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Ghulam Ahmed AI Agent</span>
            </div>
            <p className="text-xs text-slate-200 leading-snug">
              Need project recommendations, a quote, or automation insights? Ask me anything!
            </p>
            <div className="mt-2 pt-1.5 border-t border-white/10 flex items-center justify-between text-[10px]">
              <span className="text-emerald-400 font-medium group-hover:translate-x-0.5 transition-transform">
                Open AI Chat →
              </span>
              <span className="text-slate-400">Online</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating AI Button (Positioned smartly above WhatsApp widget) */}
      <div className="fixed bottom-24 right-5 sm:bottom-24 sm:right-6 z-40">
        <div className="relative">
          {/* Subtle radar pulse glow */}
          <span className="animate-ping absolute -inset-1 rounded-full bg-emerald-500 opacity-25"></span>
          <span className="animate-pulse absolute -inset-2 rounded-full bg-emerald-500/20 blur-sm"></span>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#0b101d] via-[#102422] to-[#047857] border-2 border-emerald-400/80 hover:border-emerald-300 text-white shadow-[0_4px_25px_rgba(16,185,129,0.45)] hover:shadow-[0_4px_35px_rgba(16,185,129,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
            aria-label="Open Portfolio AI Automation Agent"
            title="Chat with Ghulam Ahmed's AI Automation Agent"
          >
            <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-300 transition-transform group-hover:scale-110 group-hover:rotate-6" />

            {/* Glowing active indicator dot */}
            <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-slate-900"></span>
            </span>
          </button>
        </div>
      </div>

      {/* Main Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[440px] h-[640px] max-h-[92vh] flex flex-col rounded-2xl bg-[#090d18]/95 backdrop-blur-2xl border border-emerald-500/35 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Header */}
            <div className="p-3.5 sm:p-4 bg-gradient-to-r from-[#0d1424] via-[#091e1d] to-[#0d1424] border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 p-[1.5px] shadow-md">
                    <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-emerald-400" />
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white tracking-tight">
                      Ghulam Ahmed AI
                    </h3>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Automation
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Portfolio Automation Assistant</span>
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1">
                {/* Reset Chat */}
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Reset Conversation"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                {/* Admin Link */}
                <a
                  href="/admin"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open Admin Dashboard"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-white/5 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                </a>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close Assistant"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div className="flex items-end gap-1.5 max-w-[92%]">
                    {msg.role === "assistant" && (
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mb-1">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                    )}

                    <div
                      className={`p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                        msg.role === "user"
                          ? "bg-emerald-600 text-white rounded-br-none shadow-md shadow-emerald-950/40"
                          : "bg-slate-900/90 text-slate-200 border border-white/10 rounded-bl-none shadow-md shadow-black/30"
                      }`}
                    >
                      {/* Render formatted message */}
                      <div>{msg.content}</div>

                      {/* Project Recommendations if provided */}
                      {msg.recommendations && msg.recommendations.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {msg.recommendations.map((proj) => (
                            <ProjectRecommendationCard key={proj.id} project={proj} />
                          ))}
                        </div>
                      )}

                      {/* Contextual Action CTA Buttons */}
                      {msg.actionType === "whatsapp_cta" && (
                        <div className="mt-2.5 pt-2 border-t border-white/10">
                          <a
                            href="https://wa.me/923235678381?text=Hi%20Ghulam!%20I%20am%20chatting%20with%20your%20Portfolio%20AI%20Agent%20and%20would%20like%20to%20discuss%20a%20project."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold shadow-sm transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Connect on WhatsApp (+92 323 5678381)</span>
                          </a>
                        </div>
                      )}

                      {msg.actionType === "resume_cta" && (
                        <div className="mt-2.5 pt-2 border-t border-white/10 flex gap-2">
                          <button
                            type="button"
                            onClick={() => window.dispatchEvent(new CustomEvent("open-resume-modal"))}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>View Official Resume</span>
                          </button>
                        </div>
                      )}

                      {msg.actionType === "qualification_prompt" && !showLeadForm && (
                        <div className="mt-2.5 pt-2 border-t border-white/10">
                          <button
                            type="button"
                            onClick={() => setShowLeadForm(true)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                          >
                            <Briefcase className="w-3.5 h-3.5" />
                            <span>Start Project Qualification Form</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {msg.role === "user" && (
                      <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 mb-1">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  <span className="text-[9px] text-slate-500 mt-1 px-1">
                    {msg.timestamp}
                  </span>

                  {/* Quick Chips on latest message */}
                  {msg.quickChips && msg.quickChips.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 pl-7">
                      {msg.quickChips.map((chip, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleChipClick(chip)}
                          className="px-2.5 py-1 rounded-full bg-slate-900 border border-emerald-500/25 hover:border-emerald-400 hover:bg-emerald-500/10 text-emerald-300 text-[11px] transition-all hover:scale-105 active:scale-95 text-left"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Inline Lead Qualification Wizard */}
              {showLeadForm && (
                <LeadQualificationForm
                  onSuccess={(leadSummary) => {
                    setShowLeadForm(false);
                    setMessages((prev) => [
                      ...prev,
                      {
                        id: `lead_ack_${Date.now()}`,
                        role: "assistant",
                        content: `🎉 **Project Lead Successfully Qualified!**\n\n${leadSummary}\n\nGhulam Ahmed has received your inquiry directly. Would you also like to connect on WhatsApp for immediate discussion?`,
                        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                        actionType: "whatsapp_cta",
                        quickChips: [
                          "Connect on WhatsApp",
                          "View Featured Projects",
                          "Download Resume",
                        ],
                      },
                    ]);
                  }}
                  onCancel={() => setShowLeadForm(false)}
                  conversationSnippet={messages.map((m) => ({
                    role: m.role,
                    content: m.content,
                  }))}
                />
              )}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-1.5 text-slate-400 pl-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Bot className="w-3 h-3" />
                  </div>
                  <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce"
                      style={{ animationDelay: "0.15s" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick action bar */}
            <div className="px-3 py-1.5 bg-[#090d18] border-t border-white/5 flex items-center gap-1.5 overflow-x-auto text-[10px] text-slate-400 no-scrollbar">
              <button
                type="button"
                onClick={() => setShowLeadForm(true)}
                className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 whitespace-nowrap transition-colors"
              >
                💼 Hire Ghulam
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage("Recommend a project for me")}
                className="px-2 py-0.5 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 whitespace-nowrap transition-colors"
              >
                💡 Recommend Project
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage("What are your services?")}
                className="px-2 py-0.5 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 whitespace-nowrap transition-colors"
              >
                ⚙️ Services
              </button>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("open-resume-modal"))}
                className="px-2 py-0.5 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 whitespace-nowrap transition-colors"
              >
                📄 Resume
              </button>
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-[#0d1424] border-t border-white/10 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask about Ghulam's projects, automation, or hire him..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isTyping}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 shadow-inner"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white disabled:opacity-40 disabled:hover:scale-100 shadow-md shadow-emerald-950/40 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
