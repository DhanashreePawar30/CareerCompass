import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, CheckCircle2, ArrowRight, LogOut } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { personalDetails, isFiroBComplete, logout } = useAssessment();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F9F8F3]/90 backdrop-blur-md border-b border-[#E5E2D9] transition-all select-none">
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
              A Career Fit Engine
            </span>
          </div>
        </Link>

        {/* Primary Action & Logout */}
        <div className="flex items-center gap-2.5">
          {isFiroBComplete ? (
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1E3A34] text-[#F9F8F3] hover:bg-[#142824] text-xs sm:text-sm font-semibold transition-all shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-[#C86D51]" />
                <span>Dashboard ({personalDetails.name ? personalDetails.name.split(' ')[0] : 'User'})</span>
              </Link>

              <button
  onClick={handleLogout}
  title="Log out & reset session as new user"
  className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-[#E5E2D9] bg-white text-[#5A6E68] hover:text-[#C86D51] hover:bg-[#FBECE7] hover:border-[#EBC8BC] text-xs sm:text-sm font-semibold transition-all cursor-pointer"
>
  <LogOut className="w-4 h-4" />
  <span>Log out</span>
</button>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn-terracotta flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm"
            >
              <span>Take Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

      </div>
    </header>
  );
};
