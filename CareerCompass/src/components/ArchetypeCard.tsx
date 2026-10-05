import React, { useState } from 'react';
import { Sparkles, Share2, Check, Compass, Target, ArrowRight } from 'lucide-react';
import type { CareerArchetype } from '../data/archetypes';

interface ArchetypeCardProps {
  archetype: CareerArchetype;
  userName?: string;
  onExploreRecommendations?: () => void;
}

export const ArchetypeCard: React.FC<ArchetypeCardProps> = ({
  archetype,
  userName = 'Career Pioneer',
  onExploreRecommendations
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `I just discovered my Career Archetype on CareerCompass: "${archetype.title}" (${archetype.badge})! Check yours at: ${window.location.origin}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#E5E2D9] bg-white shadow-xl p-8 sm:p-10 space-y-8">
      {/* Decorative background aura */}
      <div 
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ backgroundColor: archetype.colorScheme.secondary }}
      />
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E2D9] pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#1E3A34] text-[#F9F8F3] flex items-center justify-center shadow-sm">
            <Compass className="w-6 h-6 text-[#C86D51]" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#5A6E68]">
              Verified Career Persona
            </span>
            <p className="text-sm font-semibold text-[#1E3A34]">{userName}</p>
          </div>
        </div>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#E5E2D9] text-xs font-semibold text-[#1E3A34] hover:bg-[#F9F8F3] transition-colors self-start sm:self-auto cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 font-bold">Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-[#5A6E68]" />
              <span>Share Archetype</span>
            </>
          )}
        </button>
      </div>

      {/* Main Title & Tagline */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-terracotta text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#C86D51]" />
          <span>{archetype.badge}</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1E3A34] tracking-tight">
          {archetype.title}
        </h2>
        <p className="text-lg font-medium text-[#C86D51] leading-relaxed">
          "{archetype.tagline}"
        </p>
        <p className="text-base text-[#5A6E68] leading-relaxed pt-2">
          {archetype.description}
        </p>
      </div>

      {/* Core Strengths Tags */}
      <div className="space-y-3 bg-[#F9F8F3] p-5 rounded-xl border border-[#E5E2D9]">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1E3A34]">
          <Target className="w-4 h-4 text-[#C86D51]" />
          <span>Superpower Strengths & Cognitive Fit</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {archetype.strengths.map((str, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-lg bg-white border border-[#E5E2D9] text-xs font-semibold text-[#1E3A34] shadow-2xs"
            >
              ✦ {str}
            </span>
          ))}
        </div>
      </div>

      {/* Workplace Dynamics & Optimal Environment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="p-4 rounded-xl border border-[#E5E2D9] bg-white space-y-1">
          <span className="text-xs font-mono font-semibold uppercase text-[#5A6E68]">Optimal Team Dynamic</span>
          <p className="text-sm font-medium text-[#1E3A34]">{archetype.workplaceVibe}</p>
        </div>
        <div className="p-4 rounded-xl border border-[#E5E2D9] bg-white space-y-1">
          <span className="text-xs font-mono font-semibold uppercase text-[#5A6E68]">Top Matching Role Vector</span>
          <p className="text-sm font-bold text-[#C86D51]">{archetype.recommendedRoleTitle}</p>
        </div>
      </div>

      {/* Action Footer if requested */}
      {onExploreRecommendations && (
        <div className="pt-4 border-t border-[#E5E2D9] flex justify-end">
          <button
            onClick={onExploreRecommendations}
            className="btn-terracotta px-6 py-3 rounded-xl font-semibold text-sm inline-flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <span>Explore Ranked Recommendations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
