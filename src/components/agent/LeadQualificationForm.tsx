"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Send,
  Loader2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  Calendar,
  DollarSign,
  User,
  Mail,
  Building,
  Check,
} from "lucide-react";
import { GHULAM_SERVICES } from "@/lib/agentEngine";

interface LeadQualificationFormProps {
  onSuccess: (leadSummary: string) => void;
  onCancel: () => void;
  conversationSnippet?: Array<{ role: "user" | "assistant"; content: string }>;
}

const BUDGET_OPTIONS = [
  "Under $1,000",
  "$1,000 - $3,000",
  "$3,000 - $5,000",
  "$5,000+",
  "Flexible / To Discuss",
];

const TIMELINE_OPTIONS = [
  "Urgent (< 2 weeks)",
  "1 Month",
  "2 - 3 Months",
  "Flexible",
];

export default function LeadQualificationForm({
  onSuccess,
  onCancel,
  conversationSnippet,
}: LeadQualificationFormProps) {
  const [step, setStep] = useState<number>(1);
  const [service, setService] = useState<string>("Full-Stack Web Development");
  const [customService, setCustomService] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [budget, setBudget] = useState<string>("$1,000 - $3,000");
  const [timeline, setTimeline] = useState<string>("1 Month");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [company, setCompany] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState<boolean>(false);

  const selectedService =
    service === "Other" && customService.trim() ? customService.trim() : service;

  const handleNext = () => {
    setError(null);
    if (step === 1 && !selectedService) {
      setError("Please choose or specify a service.");
      return;
    }
    if (step === 2 && description.trim().length < 5) {
      setError("Please enter at least 5 characters describing your project requirements.");
      return;
    }
    if (step === 3 && !budget) {
      setError("Please pick a budget range.");
      return;
    }
    if (step === 4 && !timeline) {
      setError("Please pick an expected timeline.");
      return;
    }
    if (step === 5) {
      if (!name.trim()) {
        setError("Please enter your name.");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.trim() || !emailRegex.test(email.trim())) {
        setError("Please enter a valid email address.");
        return;
      }
    }

    if (step < 6) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setError(null);
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/agent/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || undefined,
          serviceRequested: selectedService,
          projectType: selectedService,
          projectDescription: description.trim(),
          budgetRange: budget,
          expectedTimeline: timeline,
          conversationSummary: `Qualified via portfolio AI agent. Requirements: ${description.slice(
            0,
            120
          )}...`,
          conversationSnippet,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit project inquiry.");
      }

      setCompleted(true);
      onSuccess(
        `Lead created for **${name}** (${email}). Required service: **${selectedService}**, Budget: **${budget}**, Timeline: **${timeline}**.`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (completed) {
    return (
      <div className="my-3 p-4 rounded-xl bg-slate-900/95 border border-emerald-500/40 text-center shadow-xl">
        <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-2">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-bold text-white mb-1">
          Inquiry Qualified & Dispatched!
        </h4>
        <p className="text-xs text-slate-300 mb-3 leading-relaxed">
          Ghulam has received your structured project details. A confirmation email has also been sent to{" "}
          <span className="text-emerald-400 font-mono">{email}</span>.
        </p>

        <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-slate-300 text-left mb-3 space-y-1">
          <div><strong className="text-emerald-400">Service:</strong> {selectedService}</div>
          <div><strong className="text-emerald-400">Budget:</strong> {budget}</div>
          <div><strong className="text-emerald-400">Timeline:</strong> {timeline}</div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <a
            href={`https://wa.me/923235678381?text=${encodeURIComponent(
              `Hi Ghulam! I just completed your portfolio AI qualification for ${selectedService} (${budget}) and would like to connect.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <span>Direct WhatsApp Connect</span>
          </a>
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium transition-colors"
          >
            Back to Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-3 p-4 rounded-xl bg-slate-900/95 border border-emerald-500/30 shadow-xl text-left">
      {/* Step Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <span className="text-xs font-bold text-white">
            Lead Qualification Wizard
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-emerald-300 border border-emerald-500/20">
          Step {step} of 6
        </span>
      </div>

      {error && (
        <div className="mb-3 p-2 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
          {error}
        </div>
      )}

      {/* Step 1: Service */}
      {step === 1 && (
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-200">
            What service or solution do you require?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
            {GHULAM_SERVICES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setService(s.title)}
                className={`text-left p-2 rounded-lg text-xs transition-all border ${
                  service === s.title
                    ? "bg-emerald-500/20 border-emerald-400 text-white font-semibold shadow-sm"
                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{s.title}</span>
                  {service === s.title && <Check className="w-3 h-3 text-emerald-400" />}
                </div>
              </button>
            ))}
            <button
              type="button"
              onClick={() => setService("Other")}
              className={`text-left p-2 rounded-lg text-xs transition-all border ${
                service === "Other"
                  ? "bg-emerald-500/20 border-emerald-400 text-white font-semibold"
                  : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
              }`}
            >
              Other Custom Requirement
            </button>
          </div>

          {service === "Other" && (
            <input
              type="text"
              placeholder="Specify custom requirement..."
              value={customService}
              onChange={(e) => setCustomService(e.target.value)}
              className="w-full mt-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          )}
        </div>
      )}

      {/* Step 2: Description */}
      {step === 2 && (
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-200">
            Tell me about your project requirements & scope:
          </label>
          <textarea
            rows={4}
            placeholder="E.g. We need a multi-tenant client portal with role-based access, automated billing cycles, and Render deployment..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 resize-none"
          />
          <span className="text-[10px] text-slate-400 block text-right">
            {description.length} characters (min 5)
          </span>
        </div>
      )}

      {/* Step 3: Budget */}
      {step === 3 && (
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-200 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>Select your estimated budget range:</span>
          </label>
          <div className="space-y-1.5">
            {BUDGET_OPTIONS.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBudget(b)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all border flex items-center justify-between ${
                  budget === b
                    ? "bg-emerald-500/20 border-emerald-400 text-white font-semibold"
                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                }`}
              >
                <span>{b}</span>
                {budget === b && <Check className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Timeline */}
      {step === 4 && (
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-200 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>What is your expected timeline?</span>
          </label>
          <div className="space-y-1.5">
            {TIMELINE_OPTIONS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTimeline(t)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all border flex items-center justify-between ${
                  timeline === t
                    ? "bg-emerald-500/20 border-emerald-400 text-white font-semibold"
                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                }`}
              >
                <span>{t}</span>
                {timeline === t && <Check className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 5: Contact Info */}
      {step === 5 && (
        <div className="space-y-2.5">
          <label className="block text-xs font-semibold text-slate-200">
            How can Ghulam reach you?
          </label>

          <div>
            <span className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
              <User className="w-3 h-3 text-emerald-400" /> Name *
            </span>
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <span className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
              <Mail className="w-3 h-3 text-emerald-400" /> Email Address *
            </span>
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <span className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
              <Building className="w-3 h-3 text-slate-400" /> Company / Organization (Optional)
            </span>
            <input
              type="text"
              placeholder="E.g. Acme Tech or Personal"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>
      )}

      {/* Step 6: Review */}
      {step === 6 && (
        <div className="space-y-2">
          <span className="text-xs font-semibold text-white block mb-1">
            Review Your Project Summary:
          </span>

          <div className="p-3 rounded-lg bg-slate-950 border border-white/10 text-xs space-y-1.5">
            <div>
              <span className="text-slate-400">Name:</span>{" "}
              <span className="text-white font-medium">{name}</span>
            </div>
            <div>
              <span className="text-slate-400">Email:</span>{" "}
              <span className="text-emerald-400 font-mono">{email}</span>
            </div>
            {company && (
              <div>
                <span className="text-slate-400">Company:</span>{" "}
                <span className="text-slate-200">{company}</span>
              </div>
            )}
            <div>
              <span className="text-slate-400">Service:</span>{" "}
              <span className="text-teal-300 font-semibold">{selectedService}</span>
            </div>
            <div>
              <span className="text-slate-400">Budget:</span>{" "}
              <span className="text-amber-300 font-medium">{budget}</span>
            </div>
            <div>
              <span className="text-slate-400">Timeline:</span>{" "}
              <span className="text-slate-200">{timeline}</span>
            </div>
            <div className="pt-1.5 border-t border-white/10">
              <span className="text-slate-400 block mb-0.5">Description:</span>
              <p className="text-slate-300 italic text-[11px] leading-relaxed">
                "{description}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer Navigation Buttons */}
      <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-white/10">
        <div>
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              disabled={loading}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onCancel}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
          )}
        </div>

        <div>
          {step < 6 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              <span>Next</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-xs font-bold shadow-md shadow-emerald-950/50 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Submit Inquiry</span>
                  <Send className="w-3 h-3" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
