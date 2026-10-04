import React from 'react';
import { Sparkles, Brain, Compass, Users, Target, ShieldCheck, Zap } from 'lucide-react';

export const MarqueeTicker: React.FC = () => {
  const tickerItems = [
    { icon: Sparkles, text: 'FIRO-B Interpersonal Matrix' },
    { icon: Brain, text: 'Cognitive & Quantitative Logic Engine' },
    { icon: Compass, text: 'Multi-Vector Career Vectorization' },
    { icon: Users, text: 'Workplace Team Dynamics Profiling' },
    { icon: Target, text: 'Interactive Skill Gap Radar' },
    { icon: Zap, text: '150+ Verified Industry Archetypes' },
    { icon: ShieldCheck, text: 'Explainable AI Transparency' },
  ];

  const duplicated = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div className="relative w-full overflow-hidden border-y border-[#E5E2D9] bg-[#1E3A34] text-[#F9F8F3] py-4 select-none">
      {/* Gradient edge fades */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#1E3A34] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#1E3A34] to-transparent z-10" />

      <div className="animate-marquee flex items-center gap-8">
        {duplicated.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-3 shrink-0 opacity-90 hover:opacity-100 transition-opacity">
              <Icon className="w-4 h-4 text-[#C86D51]" />
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-white/90">
                {item.text}
              </span>
              <span className="text-[#C86D51] opacity-60 text-xs">✦</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
