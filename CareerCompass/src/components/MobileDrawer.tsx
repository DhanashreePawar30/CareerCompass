import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { name: string; path: string }[];
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose, navLinks }) => {
  const location = useLocation();
  const { personalDetails, academicDetails, isAssessmentComplete } = useAssessment();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1E3A34]/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#F9F8F3] border-l border-[#E5E2D9] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-fade-in">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#E5E2D9]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#1E3A34] text-[#F9F8F3] flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-editorial text-xl font-bold text-[#1E3A34]">
                Career<span className="text-[#C86D51]">Compass</span>
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[#1E3A34] hover:bg-[#F2F0E6] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <div className="py-6 space-y-2">
            {navLinks.map((link) => {
              const active = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={onClose}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    active
                      ? 'bg-[#1E3A34] text-[#F9F8F3] font-semibold'
                      : 'text-[#1E3A34]/80 hover:bg-[#F2F0E6] hover:text-[#1E3A34]'
                  }`}
                >
                  <span>{link.name}</span>
                  {active && <span className="w-2 h-2 rounded-full bg-[#C86D51]" />}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-[#E5E2D9] space-y-3">
          {isAssessmentComplete ? (
            <Link
              to="/dashboard"
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1E3A34] text-[#F9F8F3] font-semibold text-sm shadow-md"
            >
              <CheckCircle2 className="w-4 h-4 text-[#C86D51]" />
              <span>Go to Dashboard</span>
            </Link>
          ) : (
            <Link
              to="/assessment"
              onClick={onClose}
              className="w-full btn-terracotta flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold shadow-md"
            >
              <span>Start Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}

          <div className="p-3 bg-[#F2F0E6] rounded-xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1E3A34]/10 text-[#1E3A34] flex items-center justify-center font-bold text-xs">
              {personalDetails.name ? personalDetails.name.charAt(0) : 'U'}
            </div>
            <div className="text-xs">
              <p className="font-semibold text-[#1E3A34]">{personalDetails.name || 'Student Profile'}</p>
              <p className="text-[#5A6E68]">{academicDetails?.educationLevel || 'Profile Active'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
