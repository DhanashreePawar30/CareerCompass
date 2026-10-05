import React from 'react';
import { X, ArrowRight, DollarSign, Briefcase, GraduationCap } from 'lucide-react';
import type { CareerProfile } from '../data/careerDatabase';
import { Link } from 'react-router-dom';

interface ComparisonDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  careers: CareerProfile[];
  onRemoveCareer: (id: string) => void;
}

export const ComparisonDrawer: React.FC<ComparisonDrawerProps> = ({
  isOpen,
  onClose,
  careers,
  onRemoveCareer,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div className="relative w-full max-w-4xl bg-white h-full shadow-2xl flex flex-col overflow-y-auto">
        
        {/* Header */}
        <div className="p-6 border-b border-[#E5E2D9] flex items-center justify-between bg-[#F9F8F3] sticky top-0 z-20">
          <div>
            <span className="badge-terracotta px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Comparison Matrix
            </span>
            <h2 className="font-editorial text-2xl font-bold text-[#1E3A34] mt-1">
              Side-by-Side Career Evaluation
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl border border-[#E5E2D9] hover:bg-white text-[#5A6E68] hover:text-[#1E3A34] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 flex-1">
          {careers.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <Briefcase className="w-12 h-12 text-[#C86D51] mx-auto opacity-50" />
              <p className="text-base text-[#5A6E68]">
                No careers selected for comparison yet. Click "Compare" on any career card to inspect them together!
              </p>
            </div>
          ) : (
            <div className={`grid grid-cols-1 ${careers.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6`}>
              {careers.map((career) => (
                <div
                  key={career.id}
                  className="rounded-2xl border border-[#E5E2D9] p-6 space-y-6 flex flex-col justify-between bg-[#FDFCF9] relative"
                >
                  <button
                    onClick={() => onRemoveCareer(career.id)}
                    className="absolute top-4 right-4 text-xs p-1 text-[#5A6E68] hover:text-red-500 rounded-md transition-colors cursor-pointer"
                    title="Remove from comparison"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="space-y-4">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-[#C86D51] uppercase">
                        {career.cluster}
                      </span>
                      <h3 className="font-editorial text-xl font-bold text-[#1E3A34] mt-1 pr-6">
                        {career.title}
                      </h3>
                    </div>

                    {/* Match Score */}
                    <div className="p-3 rounded-xl bg-white border border-[#E5E2D9] flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#5A6E68]">Alignment Match</span>
                      <span className="text-base font-bold text-[#1E3A34]">{career.matchScore}%</span>
                    </div>

                    {/* Salary Range */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E3A34]">
                        <DollarSign className="w-3.5 h-3.5 text-[#C86D51]" />
                        <span>Compensation Range</span>
                      </div>
                      <p className="text-xs text-[#5A6E68]">Mid: <strong className="text-[#1E3A34]">{career.salaryRange.mid}</strong></p>
                      <p className="text-xs text-[#5A6E68]">Senior: <strong className="text-[#1E3A34]">{career.salaryRange.senior}</strong></p>
                    </div>

                    {/* Work Environment */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E3A34]">
                        <Briefcase className="w-3.5 h-3.5 text-[#C86D51]" />
                        <span>Work Environment</span>
                      </div>
                      <p className="text-xs text-[#5A6E68] line-clamp-3 leading-relaxed">
                        {career.workEnvironment}
                      </p>
                    </div>

                    {/* Required Skills */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E3A34]">
                        <GraduationCap className="w-3.5 h-3.5 text-[#C86D51]" />
                        <span>Core Skills Needed</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {career.requiredSkills.slice(0, 4).map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded-md bg-white border border-[#E5E2D9] text-[11px] font-medium text-[#1E3A34]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/explorer/${career.id}`}
                    onClick={onClose}
                    className="btn-terracotta w-full py-2.5 rounded-xl text-center text-xs font-semibold inline-flex items-center justify-center gap-2"
                  >
                    <span>Full Roadmap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
