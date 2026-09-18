import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Menu, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { MobileDrawer } from './MobileDrawer';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { personalDetails, isAssessmentComplete } = useAssessment();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Profile', path: '/profile' },
    { name: 'Assessment Hub', path: '/assessment' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Recommendations', path: '/dashboard/recommendations' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F9F8F3]/90 backdrop-blur-md border-b border-[#E5E2D9] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-[#1E3A34] text-[#F9F8F3] flex items-center justify-center shadow-md group-hover:bg-[#C86D51] transition-all duration-300">
              <Compass className="w-6 h-6 animate-spin-slow group-hover:rotate-45 transition-transform" />
            </div>
            <div>
              <span className="font-editorial text-2xl font-bold tracking-tight text-[#1E3A34] block leading-none">
                Career<span className="text-[#C86D51]">Compass</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-medium text-[#5A6E68] block mt-0.5">
                AI Career Fit Engine
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'bg-[#1E3A34] text-[#F9F8F3] shadow-xs'
                      : 'text-[#1E3A34]/80 hover:text-[#1E3A34] hover:bg-[#F2F0E6]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* User Badge / Primary Action */}
          <div className="hidden md:flex items-center gap-3">
            {isAssessmentComplete ? (
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1E3A34] text-[#F9F8F3] hover:bg-[#142824] text-sm font-semibold transition-all shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-[#C86D51]" />
                <span>Dashboard ({personalDetails.name.split(' ')[0]})</span>
              </Link>
            ) : (
              <Link
                to="/assessment"
                className="btn-terracotta flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm"
              >
                <span>Take Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle button */}
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="md:hidden p-2.5 rounded-xl text-[#1E3A34] hover:bg-[#F2F0E6] transition-colors"
            aria-label="Open Mobile Navigation"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
};
