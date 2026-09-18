import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1E3A34] text-[#F9F8F3] mt-auto border-t border-[#2C524A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C86D51] text-[#F9F8F3] flex items-center justify-center font-bold">
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
                <Link to="/" className="hover:text-[#F9F8F3] transition-colors">01. Landing Page</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-[#F9F8F3] transition-colors">02. How It Works</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-[#F9F8F3] transition-colors">03. Student Profile Form</Link>
              </li>
              <li>
                <Link to="/assessment" className="hover:text-[#F9F8F3] transition-colors">04. Assessment Hub</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-[#F9F8F3] transition-colors">09. Career Dashboard</Link>
              </li>
              <li>
                <Link to="/dashboard/recommendations" className="hover:text-[#F9F8F3] transition-colors">10. Career Recommendations</Link>
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
            <h4 className="font-editorial text-lg font-semibold text-[#F9F8F3]">Stay Informed</h4>
            <p className="text-sm text-[#A2B5AF]">
              Receive monthly career insights and domain trend reports tailored for students.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter student email..."
                className="bg-[#142824] border border-[#2C524A] text-sm text-[#F9F8F3] placeholder-[#6E8880] px-3.5 py-2.5 rounded-xl flex-1 focus:outline-hidden focus:border-[#C86D51]"
              />
              <button className="bg-[#C86D51] text-white px-4 py-2.5 rounded-xl hover:bg-[#B25A40] transition-colors font-medium text-sm">
                Join
              </button>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-[#2C524A] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8BA49C] gap-4">
          <p>© {new Date().getFullYear()} CareerCompass Platform. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#C86D51] fill-current inline" />
            <span>for Student Career Growth</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
