import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, ShieldCheck, Heart, Sparkles, Check, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#142824] text-[#F9F8F3] mt-auto border-t border-[#2C524A] relative overflow-hidden select-none">
      
      {/* Massive Background Watermark Typography */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 pointer-events-none opacity-[0.03] whitespace-nowrap text-[12vw] font-bold font-editorial tracking-tighter text-white z-0">
        CAREER COMPASS
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 space-y-12">
        
        {/* Top Status & Telemetry Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#1E3A34]/70 border border-[#2C524A] backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono font-semibold tracking-wider text-[#A2B5AF]">
              ALL 6 ASSESSMENT ENGINES OPERATIONAL • 99.9% DIAGNOSTIC UPTIME
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#C86D51] font-mono font-bold">
            <Zap className="w-3.5 h-3.5" />
            <span>PSYCHOMETRIC FIRO-B PROTOCOL V2.4</span>
          </div>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pt-4">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C86D51] text-[#F9F8F3] flex items-center justify-center font-bold shadow-sm">
                <Compass className="w-6 h-6" />
              </div>
              <span className="font-editorial text-2xl font-bold tracking-tight">
                Career<span className="text-[#C86D51]">Compass</span>
              </span>
            </div>
            <p className="text-[#A2B5AF] text-sm leading-relaxed">
              Not just marks — understand your true career fit. Powered by FIRO-B interpersonal metrics, interest profiling, aptitude scoring, and academic mapping.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#A2B5AF]">
              <ShieldCheck className="w-4 h-4 text-[#C86D51]" />
              <span>Editorial Design System • Psychometric Precision</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-editorial text-lg font-semibold text-[#F9F8F3]">Platform Navigation</h4>
            <ul className="space-y-2.5 text-sm text-[#A2B5AF]">
              <li>
                <Link to="/" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-[#C86D51]">✦</span> 01. Home & Overview
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-[#C86D51]">✦</span> 02. How It Works
                </Link>
              </li>
              <li>
                <Link to="/assessment" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-[#C86D51]">✦</span> 03. Assessment Hub
                </Link>
              </li>
              <li>
                <Link to="/assessment/unlock" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-[#C86D51]">✦</span> 04. Unlock Persona & Profile
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-[#C86D51]">✦</span> 05. Career Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/recommendations" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-[#C86D51]">✦</span> 06. Ranked Recommendations
                </Link>
              </li>
            </ul>
          </div>

          {/* The 6 Pillars */}
          <div className="space-y-4">
            <h4 className="font-editorial text-lg font-semibold text-[#F9F8F3]">The 6 Assessment Pillars</h4>
            <ul className="space-y-2.5 text-sm text-[#A2B5AF]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C86D51]"></span>
                <span>FIRO-B Interpersonal Metrics</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C86D51]"></span>
                <span>Interest & Domain Passion</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C86D51]"></span>
                <span>Quantitative & Logic Aptitude</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C86D51]"></span>
                <span>Work Environment Preferences</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C86D51]"></span>
                <span>Academic Record & Streams</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C86D51]"></span>
                <span>Skills & Competency Mapping</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div className="space-y-4">
            <h4 className="font-editorial text-lg font-semibold text-[#F9F8F3] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C86D51]" />
              <span>Career Trajectory Dispatch</span>
            </h4>
            <p className="text-sm text-[#A2B5AF] leading-relaxed">
              Get bi-weekly emerging tech career maps, salary updates, and placement interview breakdowns.
            </p>
            
            {subscribed ? (
              <div className="p-3.5 bg-[#1E3A34] rounded-xl border border-[#2C524A] text-xs text-emerald-400 font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>You're subscribed to the Career Compass Dispatch!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter student email..."
                  className="bg-[#1E3A34] border border-[#2C524A] text-sm text-[#F9F8F3] placeholder-[#6E8880] px-4 py-2.5 rounded-xl flex-1 focus:outline-none focus:border-[#C86D51] transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#C86D51] text-white px-5 py-2.5 rounded-xl hover:bg-[#B25A40] transition-colors font-bold text-xs shrink-0 cursor-pointer shadow-sm"
                >
                  Join
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#2C524A] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8BA49C] gap-4">
          <p>© {new Date().getFullYear()} CareerCompass Intelligence Engine. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Built with precision for student trajectory</span>
            <Heart className="w-3.5 h-3.5 text-[#C86D51] fill-current inline ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
