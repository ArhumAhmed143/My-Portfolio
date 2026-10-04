"use client";

import { ExternalLink, CheckCircle2, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { ProjectItem } from "@/data/portfolioData";

interface ProjectRecommendationCardProps {
  project: ProjectItem;
}

export default function ProjectRecommendationCard({
  project,
}: ProjectRecommendationCardProps) {
  return (
    <div className="my-2.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 p-3.5 shadow-lg shadow-emerald-950/30 hover:border-emerald-500/50 transition-all text-left">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 mb-1">
            <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
            <span>Recommended Match</span>
          </span>
          <h4 className="text-sm font-bold text-white leading-snug">
            {project.title}
          </h4>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 shrink-0">
          {project.category}
        </span>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed mb-2.5">
        {project.description}
      </p>

      {/* Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <div className="space-y-1 mb-3">
          {project.highlights.slice(0, 2).map((h, i) => (
            <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-300">
              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-snug">{h}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {project.tags.slice(0, 4).map((tag, i) => (
          <span
            key={i}
            className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800/80 text-emerald-300 border border-emerald-500/20"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2 border-t border-white/10">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-medium transition-colors"
          >
            <GithubIcon className="w-3 h-3 fill-current" />
            <span>Repository</span>
          </a>
        )}
      </div>
    </div>
  );
}
