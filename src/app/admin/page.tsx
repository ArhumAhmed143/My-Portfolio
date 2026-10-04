"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  RefreshCw,
  Search,
  Filter,
  Mail,
  Calendar,
  DollarSign,
  Clock,
  Building,
  User,
  ExternalLink,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  MessageSquare,
  Sparkles,
  Bot,
  LogOut,
} from "lucide-react";
import { Lead, LeadStatus, LeadsSummary } from "@/lib/leadsStorage";

const STATUSES: Array<LeadStatus | "ALL"> = [
  "ALL",
  "NEW",
  "QUALIFIED",
  "CONTACTED",
  "IN PROGRESS",
  "COMPLETED",
  "REJECTED",
];

const STATUS_COLORS: Record<LeadStatus, { bg: string; text: string; border: string }> = {
  NEW: {
    bg: "bg-emerald-500/15",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
  },
  QUALIFIED: {
    bg: "bg-teal-500/15",
    text: "text-teal-300",
    border: "border-teal-500/30",
  },
  CONTACTED: {
    bg: "bg-blue-500/15",
    text: "text-blue-400",
    border: "border-blue-500/30",
  },
  "IN PROGRESS": {
    bg: "bg-amber-500/15",
    text: "text-amber-300",
    border: "border-amber-500/30",
  },
  COMPLETED: {
    bg: "bg-emerald-600/20",
    text: "text-emerald-300",
    border: "border-emerald-500/40",
  },
  REJECTED: {
    bg: "bg-rose-500/15",
    text: "text-rose-400",
    border: "border-rose-500/30",
  },
};

export default function AdminLeadsPage() {
  const [passcode, setPasscode] = useState<string>("");
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [summary, setSummary] = useState<LeadsSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState<LeadStatus | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editingNotes, setEditingNotes] = useState<string>("");
  const [savingNotes, setSavingNotes] = useState<boolean>(false);

  // Check existing session on load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("ghulam_admin_passcode");
      if (saved) {
        setAuthToken(saved);
      }
    }
  }, []);

  const fetchLeads = useCallback(async (token: string) => {
    setLoading(true);
    setError(null);

    try {
      const url = new URL("/api/agent/leads", window.location.origin);
      if (statusFilter !== "ALL") {
        url.searchParams.set("status", statusFilter);
      }
      if (searchQuery.trim()) {
        url.searchParams.set("q", searchQuery.trim());
      }

      const res = await fetch(url.toString(), {
        headers: {
          "x-admin-passcode": token,
        },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (res.status === 401) {
          sessionStorage.removeItem("ghulam_admin_passcode");
          setAuthToken(null);
          setAuthError("Session expired or invalid passcode.");
          return;
        }
        throw new Error(data.error || "Failed to load leads.");
      }

      setLeads(data.leads || []);
      setSummary(data.summary || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching leads.");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchQuery]);

  useEffect(() => {
    if (authToken) {
      fetchLeads(authToken);
    }
  }, [authToken, fetchLeads]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (!passcode.trim()) {
      setAuthError("Please enter the admin passcode.");
      return;
    }

    try {
      const res = await fetch("/api/agent/leads", {
        headers: {
          "x-admin-passcode": passcode.trim(),
        },
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setAuthError(data.error || "Invalid passcode.");
        return;
      }

      sessionStorage.setItem("ghulam_admin_passcode", passcode.trim());
      setAuthToken(passcode.trim());
      setLeads(data.leads || []);
      setSummary(data.summary || null);
    } catch {
      setAuthError("Failed to authenticate. Please check network/server.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("ghulam_admin_passcode");
    setAuthToken(null);
    setPasscode("");
  };

  const handleUpdateStatus = async (leadId: string, newStatus: LeadStatus) => {
    if (!authToken) return;

    try {
      const res = await fetch("/api/agent/leads", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": authToken,
        },
        body: JSON.stringify({
          id: leadId,
          status: newStatus,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
        );
        if (data.summary) setSummary(data.summary);
        if (selectedLead?.id === leadId) {
          setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const handleSaveNotes = async () => {
    if (!authToken || !selectedLead) return;
    setSavingNotes(true);

    try {
      const res = await fetch("/api/agent/leads", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": authToken,
        },
        body: JSON.stringify({
          id: selectedLead.id,
          status: selectedLead.status,
          notes: editingNotes,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSelectedLead((prev) => (prev ? { ...prev, notes: editingNotes } : null));
        setLeads((prev) =>
          prev.map((l) =>
            l.id === selectedLead.id ? { ...l, notes: editingNotes } : l
          )
        );
      }
    } catch (err) {
      console.error("Save notes error:", err);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!authToken) return;
    if (!window.confirm("Are you sure you want to delete this lead?")) return;

    try {
      const res = await fetch(`/api/agent/leads?id=${leadId}`, {
        method: "DELETE",
        headers: {
          "x-admin-passcode": authToken,
        },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setLeads((prev) => prev.filter((l) => l.id !== leadId));
        if (data.summary) setSummary(data.summary);
        if (selectedLead?.id === leadId) setSelectedLead(null);
      }
    } catch (err) {
      console.error("Delete lead error:", err);
    }
  };

  // Login view if unauthenticated
  if (!authToken) {
    return (
      <div className="min-h-screen bg-[#080811] text-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-[#0e1322]/90 border border-emerald-500/30 backdrop-blur-xl shadow-2xl shadow-emerald-950/40 text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-4 border border-emerald-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
            Ghulam Ahmed
          </h1>
          <p className="text-xs text-emerald-400 font-mono mb-6 uppercase tracking-wider">
            Lead Automation Command Center
          </p>

          {authError && (
            <div className="mb-4 p-3 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs text-left">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="Enter Admin Passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold text-sm shadow-lg shadow-emerald-950/40 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Authenticate & Access Leads
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 text-xs text-slate-500 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </Link>
            <span className="font-mono text-[11px] text-slate-600">Default: ghulam-admin-2026</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080811] text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0e1322]/80 border border-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-[1.5px]">
              <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center">
                <Bot className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                  Portfolio Lead Management
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  AI Agent Sync
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Live qualified inquiries, conversation summaries, and status tracking for Ghulam Ahmed.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => authToken && fetchLeads(authToken)}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs border border-white/10 transition-colors cursor-pointer"
              title="Refresh Leads"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 hover:text-white text-xs border border-emerald-500/30 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs border border-rose-500/30 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Metric Cards */}
        {summary && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="p-4 rounded-xl bg-[#0f1424] border border-white/10 shadow-sm">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Total Leads
              </span>
              <div className="text-2xl font-black text-white">{summary.totalLeads}</div>
            </div>

            <div className="p-4 rounded-xl bg-[#0f1424] border border-emerald-500/30 shadow-sm">
              <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block mb-1">
                New Leads
              </span>
              <div className="text-2xl font-black text-emerald-400">{summary.newLeads}</div>
            </div>

            <div className="p-4 rounded-xl bg-[#0f1424] border border-teal-500/30 shadow-sm">
              <span className="text-[11px] font-mono text-teal-300 uppercase tracking-wider block mb-1">
                Qualified
              </span>
              <div className="text-2xl font-black text-teal-300">{summary.qualifiedLeads}</div>
            </div>

            <div className="p-4 rounded-xl bg-[#0f1424] border border-blue-500/30 shadow-sm">
              <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider block mb-1">
                Contacted
              </span>
              <div className="text-2xl font-black text-blue-400">{summary.contactedLeads}</div>
            </div>

            <div className="p-4 rounded-xl bg-[#0f1424] border border-amber-500/30 shadow-sm">
              <span className="text-[11px] font-mono text-amber-300 uppercase tracking-wider block mb-1">
                In Progress
              </span>
              <div className="text-2xl font-black text-amber-300">{summary.inProgressLeads}</div>
            </div>

            <div className="p-4 rounded-xl bg-[#0f1424] border border-emerald-600/30 shadow-sm">
              <span className="text-[11px] font-mono text-emerald-300 uppercase tracking-wider block mb-1">
                Completed
              </span>
              <div className="text-2xl font-black text-emerald-300">{summary.completedLeads}</div>
            </div>
          </div>
        )}

        {/* Filters & Search Bar */}
        <div className="p-4 rounded-xl bg-[#0e1322]/80 border border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {STATUSES.map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  statusFilter === st
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-950/40"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search leads by name, email, or scope..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
            {error}
          </div>
        )}

        {/* Leads List / Cards */}
        {leads.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#0e1322]/60 border border-white/10 text-center">
            <Bot className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No Leads Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No leads match the selected filter or query. When visitors interact with the Portfolio AI Agent, qualified leads will populate automatically.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {leads.map((lead) => {
              const colors = STATUS_COLORS[lead.status] || STATUS_COLORS.NEW;

              return (
                <div
                  key={lead.id}
                  className="p-5 rounded-2xl bg-[#0d1322]/90 border border-white/10 hover:border-emerald-500/40 transition-all shadow-lg flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Name, Status, Date */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-white">
                            {lead.name}
                          </h3>
                          {lead.company && (
                            <span className="text-xs text-slate-400 font-medium">
                              @ {lead.company}
                            </span>
                          )}
                        </div>
                        <a
                          href={`mailto:${lead.email}`}
                          className="text-xs text-emerald-400 hover:underline font-mono"
                        >
                          {lead.email}
                        </a>
                      </div>

                      {/* Status Dropdown */}
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          handleUpdateStatus(lead.id, e.target.value as LeadStatus)
                        }
                        className={`text-[11px] font-mono font-bold uppercase px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${colors.bg} ${colors.text} ${colors.border}`}
                      >
                        <option value="NEW" className="bg-slate-900 text-white">
                          NEW
                        </option>
                        <option value="QUALIFIED" className="bg-slate-900 text-white">
                          QUALIFIED
                        </option>
                        <option value="CONTACTED" className="bg-slate-900 text-white">
                          CONTACTED
                        </option>
                        <option value="IN PROGRESS" className="bg-slate-900 text-white">
                          IN PROGRESS
                        </option>
                        <option value="COMPLETED" className="bg-slate-900 text-white">
                          COMPLETED
                        </option>
                        <option value="REJECTED" className="bg-slate-900 text-white">
                          REJECTED
                        </option>
                      </select>
                    </div>

                    {/* Metadata chips */}
                    <div className="flex flex-wrap items-center gap-2 text-xs mb-3">
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-teal-300 font-medium">
                        {lead.serviceRequested}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-amber-300">
                        {lead.budgetRange}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">
                        {lead.expectedTimeline}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono ml-auto">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Requirements snippet */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 text-xs text-slate-300 leading-relaxed mb-3">
                      <p className="line-clamp-3">"{lead.projectDescription}"</p>
                    </div>

                    {/* AI Conversation summary if present */}
                    {lead.conversationSummary && (
                      <div className="mb-3 text-[11px] text-emerald-400/90 font-mono flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="truncate">{lead.conversationSummary}</span>
                      </div>
                    )}
                  </div>

                  {/* Card Footer Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                    <div className="flex items-center gap-2">
                      <a
                        href={`mailto:${lead.email}?subject=Project%20Inquiry%20Discussion%20%E2%80%94%20Ghulam%20Ahmed`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Email</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedLead(lead);
                          setEditingNotes(lead.notes || "");
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 font-medium transition-colors cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>View Notes</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteLead(lead.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      title="Delete Lead"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Lead Details & Notes Modal */}
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-2xl p-6 rounded-2xl bg-[#0e1322] border border-emerald-500/40 shadow-2xl text-left max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {selectedLead.name}
                  </h3>
                  <p className="text-xs text-emerald-400 font-mono">
                    {selectedLead.email} {selectedLead.company ? `• ${selectedLead.company}` : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                <div className="p-3 rounded-lg bg-slate-950 border border-white/10">
                  <span className="text-slate-400 block text-[11px] mb-0.5">Service Requested</span>
                  <span className="font-semibold text-teal-300">{selectedLead.serviceRequested}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-white/10">
                  <span className="text-slate-400 block text-[11px] mb-0.5">Budget & Timeline</span>
                  <span className="font-semibold text-amber-300">
                    {selectedLead.budgetRange} • {selectedLead.expectedTimeline}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-xs font-semibold text-slate-300 block mb-1">
                  Full Project Requirements:
                </span>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {selectedLead.projectDescription}
                </div>
              </div>

              {selectedLead.conversationSnippet && selectedLead.conversationSnippet.length > 0 && (
                <div className="mb-4">
                  <span className="text-xs font-semibold text-slate-300 block mb-1">
                    AI Conversation Transcript:
                  </span>
                  <div className="p-3 rounded-xl bg-slate-950 border border-white/10 space-y-2 max-h-48 overflow-y-auto text-xs">
                    {selectedLead.conversationSnippet.map((s, idx) => (
                      <div
                        key={idx}
                        className={`p-2 rounded-lg ${
                          s.role === "user"
                            ? "bg-emerald-950/40 text-emerald-200 ml-4"
                            : "bg-slate-900 text-slate-300 mr-4"
                        }`}
                      >
                        <span className="text-[10px] font-mono text-slate-400 uppercase block mb-0.5">
                          {s.role}
                        </span>
                        <span>{s.content}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Editable Notes */}
              <div className="mb-4">
                <span className="text-xs font-semibold text-slate-300 block mb-1">
                  Admin Internal Notes:
                </span>
                <textarea
                  rows={3}
                  placeholder="Add notes about calls, client response, tech specs..."
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <a
                  href={`mailto:${selectedLead.email}?subject=Project%20Scope%20Review%20%E2%80%94%20Ghulam%20Ahmed`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Direct Email</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedLead(null)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs transition-colors"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveNotes}
                    disabled={savingNotes}
                    className="px-4 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-colors disabled:opacity-50"
                  >
                    {savingNotes ? "Saving..." : "Save Notes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
