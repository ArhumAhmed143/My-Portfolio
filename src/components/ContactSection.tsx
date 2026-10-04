"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check, Copy, Send, MapPin, MessageSquare, Loader2, AlertCircle, Globe } from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from "./Icons";
import { portfolioData } from "@/data/portfolioData";
import AnimatedHeading from "./AnimatedHeading";

export default function ContactSection() {
  const { personal } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message. Please try again.");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to send message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    "Hi Ghulam! I visited your portfolio and I would like to discuss a software development or automation project."
  );

  return (
    <section id="contact" className="section-dark-deep py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
            Get In Touch
          </motion.p>
          <AnimatedHeading
            text="Let's Connect & Build Something Great"
            highlightWords={["Connect", "Great"]}
            highlightClassName="text-emerald-400"
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="lg:col-span-5 card-dark p-6 sm:p-8 flex flex-col justify-between hover:border-emerald-500/30 transition-all duration-300"
          >
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Contact Information</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8">
                Want to collaborate on a software project, hire for full-stack engineering, or automate your workflows? Feel free to reach out directly.
              </p>

              {/* Direct Channels */}
              <div className="space-y-4 sm:space-y-5">
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wide">Direct Email</div>
                    <div className="text-xs sm:text-sm font-medium text-white flex items-center gap-2 flex-wrap">
                      <span className="break-all">{personal.email}</span>
                      <button
                        onClick={handleCopyEmail}
                        className="p-1 rounded hover:bg-white/10 text-slate-500 hover:text-white transition-colors shrink-0 cursor-pointer"
                        title="Copy Email"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-[#25D366]/10 text-[#25D366] shrink-0">
                    <WhatsAppIcon className="w-5 h-5 fill-[#25D366]" />
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wide">WhatsApp Instant Chat</div>
                    <a
                      href={`https://wa.me/923235678381?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-medium text-white hover:text-emerald-400 transition-colors flex items-center gap-2"
                    >
                      <span>+92 323 5678381</span>
                      <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/20 px-1.5 py-0.5 rounded">Fast Reply</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wide">Location</div>
                    <div className="text-xs sm:text-sm font-medium text-white">{personal.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-violet-500/10 text-violet-400 shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wide">Current Role</div>
                    <div className="text-xs sm:text-sm font-medium text-emerald-400">{personal.availability}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-white/8 mt-6 sm:mt-8">
              <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wide mb-3">Connect on Socials &amp; Chat</div>
              <div className="flex gap-3">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/[0.04] border border-white/8 hover:bg-white/8 text-slate-400 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-5 h-5 fill-current" />
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/[0.04] border border-white/8 hover:bg-white/8 text-slate-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-5 h-5 fill-current" />
                </a>
                <a
                  href={`https://wa.me/923235678381?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/[0.04] border border-white/8 hover:bg-[#25D366]/20 text-slate-400 hover:text-[#25D366] transition-colors"
                  aria-label="WhatsApp Direct"
                  title="WhatsApp (03235678381)"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-current" />
                </a>
                {personal.website && (
                  <a
                    href={personal.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/[0.04] border border-white/8 hover:bg-white/8 text-slate-400 hover:text-emerald-400 transition-colors"
                    aria-label="Live Project Website"
                    title="Live Web Platform"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-7 card-dark p-6 sm:p-8"
          >
            <h3 className="text-lg sm:text-xl font-bold text-white mb-5 sm:mb-6">Send Me a Message</h3>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-center"
              >
                <Check className="w-10 h-10 mx-auto mb-2 text-emerald-400" />
                <h4 className="text-base sm:text-lg font-bold">Message Sent Successfully!</h4>
                <p className="text-xs text-emerald-200 mt-1">Thank you for reaching out. I will get back to you within 24 hours.</p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-start gap-2.5"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.15 }}
                  >
                    <label className="block text-xs text-slate-400 mb-2">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/[0.04] border border-white/8 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.2 }}
                  >
                    <label className="block text-xs text-slate-400 mb-2">Your Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/[0.04] border border-white/8 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.25 }}
                >
                  <label className="block text-xs text-slate-400 mb-2">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Opportunity"
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/[0.04] border border-white/8 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.3 }}
                >
                  <label className="block text-xs text-slate-400 mb-2">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project or opportunity..."
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/[0.04] border border-white/8 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                  />
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.35 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all duration-200 flex items-center justify-center gap-2 ${
                    isSubmitting ? "opacity-75 cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
