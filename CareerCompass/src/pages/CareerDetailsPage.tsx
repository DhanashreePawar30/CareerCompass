import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, GraduationCap, CheckCircle2, Award, Calendar, Lightbulb } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';

export const CareerDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCareerById } = useAssessment();

  const career = getCareerById(id || 'data-analyst');

  if (!career) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-editorial text-3xl font-bold text-[#1E3A34]">Career Path Not Found</h2>
        <p className="text-[#5A6E68]">The requested career identifier could not be found in our database.</p>
        <button
          onClick={() => navigate('/dashboard/recommendations')}
          className="btn-terracotta px-6 py-3 rounded-xl font-semibold text-sm"
        >
          Return to Recommendations
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Back Button */}
      <div>
        <Link
          to="/dashboard/recommendations"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#5A6E68] hover:text-[#1E3A34] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Recommendations</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="bg-[#1E3A34] text-[#F9F8F3] p-8 sm:p-12 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C86D51]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="badge-terracotta px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider self-start">
            {career.cluster}
          </span>
          <span className="font-mono text-sm font-bold text-[#C86D51]">
            {career.matchScore}% Match Fit
          </span>
        </div>

        <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-white leading-tight">
          {career.title}
        </h1>

        <p className="text-[#A2B5AF] text-base sm:text-lg max-w-3xl leading-relaxed">
          {career.description}
        </p>

        <div className="pt-4 border-t border-[#2C524A] grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div>
            <span className="text-xs text-[#A2B5AF] font-bold uppercase">Entry Salary</span>
            <p className="font-editorial text-xl font-bold text-white">{career.salaryRange.entry}</p>
          </div>
          <div>
            <span className="text-xs text-[#A2B5AF] font-bold uppercase">Mid-Level Salary</span>
            <p className="font-editorial text-xl font-bold text-[#C86D51]">{career.salaryRange.mid}</p>
          </div>
          <div>
            <span className="text-xs text-[#A2B5AF] font-bold uppercase">Senior / Lead</span>
            <p className="font-editorial text-xl font-bold text-white">{career.salaryRange.senior}</p>
          </div>
        </div>
      </div>

      {/* Grid: Why Match & Required Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Why This Match? */}
        <div className="editorial-card p-8 space-y-6 bg-white border border-[#E5E2D9]">
          <div className="flex items-center gap-3 border-b border-[#E5E2D9] pb-4">
            <div className="w-10 h-10 rounded-xl bg-[#F2F0E6] text-[#1E3A34] flex items-center justify-center font-bold">
              <Lightbulb className="w-5 h-5 text-[#C86D51]" />
            </div>
            <div>
              <h3 className="font-editorial text-xl font-bold text-[#1E3A34]">Why This Career Match?</h3>
              <p className="text-xs text-[#5A6E68]">Psychometric & Aptitude Rationale</p>
            </div>
          </div>

          <ul className="space-y-3">
            {career.whyMatch.map((reason, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-[#1E3A34]">
                <CheckCircle2 className="w-5 h-5 text-[#C86D51] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Required Core Skills */}
        <div className="editorial-card p-8 space-y-6 bg-white border border-[#E5E2D9]">
          <div className="flex items-center gap-3 border-b border-[#E5E2D9] pb-4">
            <div className="w-10 h-10 rounded-xl bg-[#F2F0E6] text-[#1E3A34] flex items-center justify-center font-bold">
              <Award className="w-5 h-5 text-[#1E3A34]" />
            </div>
            <div>
              <h3 className="font-editorial text-xl font-bold text-[#1E3A34]">Required Competencies</h3>
              <p className="text-xs text-[#5A6E68]">Core Technical & Domain Skills</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {career.requiredSkills.map((skill, idx) => (
              <span key={idx} className="badge-forest px-3.5 py-2 rounded-xl text-xs font-semibold">
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Academic Tracks & Workplace Environment */}
      <div className="editorial-card p-8 sm:p-10 space-y-8 bg-white border border-[#E5E2D9]">
        <div className="flex items-center gap-3 border-b border-[#E5E2D9] pb-4">
          <div className="w-10 h-10 rounded-xl bg-[#F2F0E6] text-[#1E3A34] flex items-center justify-center font-bold">
            <GraduationCap className="w-5 h-5 text-[#1E3A34]" />
          </div>
          <div>
            <h3 className="font-editorial text-2xl font-bold text-[#1E3A34]">Recommended Academic Tracks</h3>
            <p className="text-xs text-[#5A6E68]">Degree programs and foundational subjects</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {career.academicTracks.map((track, idx) => (
            <div key={idx} className="bg-[#F9F8F3] p-5 rounded-2xl border border-[#E5E2D9] space-y-2">
              <span className="font-mono text-xs font-bold text-[#C86D51]">Track 0{idx + 1}</span>
              <h4 className="font-editorial text-base font-bold text-[#1E3A34]">{track.degree}</h4>
              <p className="text-xs text-[#5A6E68]">Focus: {track.focus}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 0-18 Month Actionable Skill Roadmap */}
      <div className="editorial-card p-8 sm:p-10 space-y-8 bg-white border border-[#E5E2D9]">
        <div className="flex items-center gap-3 border-b border-[#E5E2D9] pb-4">
          <div className="w-10 h-10 rounded-xl bg-[#F2F0E6] text-[#1E3A34] flex items-center justify-center font-bold">
            <Calendar className="w-5 h-5 text-[#C86D51]" />
          </div>
          <div>
            <h3 className="font-editorial text-2xl font-bold text-[#1E3A34]">0-18 Month Skill Development Roadmap</h3>
            <p className="text-xs text-[#5A6E68]">Step-by-step action items to bridge your skill gap</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {career.skillDevelopment.map((phase, idx) => (
            <div key={idx} className="bg-[#F9F8F3] p-6 rounded-2xl border border-[#E5E2D9] space-y-4">
              <span className="badge-terracotta px-3 py-1 rounded-full text-xs font-bold">
                {phase.category}
              </span>

              <ul className="space-y-2.5">
                {phase.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2.5 text-xs text-[#1E3A34]">
                    <CheckCircle2 className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
