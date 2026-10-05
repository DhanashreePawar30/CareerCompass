import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartHandshake, BrainCircuit, CheckCircle2, ArrowRight, RotateCcw, LockKeyhole } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { FIRO_B_QUESTIONS } from '../data/firoBQuestions';

export const AssessmentHubPage: React.FC = () => {
  const navigate = useNavigate();
  const { firoBAnswers, isFiroBComplete, resetAssessment } = useAssessment();
  const firoBCount = Object.keys(firoBAnswers).length;
  const progress = (firoBCount / FIRO_B_QUESTIONS.length) * 100;

  const firoBAction = isFiroBComplete
    ? 'View / Re-take FIRO-B'
    : firoBCount > 0
      ? 'Continue FIRO-B Assessment'
      : 'Start FIRO-B Assessment';

  return (
    <div style={{ zoom: 0.9 }} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-11 space-y-9">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="badge-terracotta px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
          Assessment Hub
        </span>
        <h1 className="font-editorial text-3xl sm:text-[2.15rem] font-bold text-[#1E3A34] leading-tight">
          Begin Your Career Assessment
        </h1>
        <p className="text-[#5A6E68] text-sm sm:text-[15px] leading-relaxed max-w-xl mx-auto">
          Complete your interpersonal assessment to begin building your CareerCompass profile.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-stretch">
        {/* Active FIRO-B assessment */}
        <div className={`editorial-card p-7 sm:p-8 flex flex-col relative overflow-hidden transition-all border-2 ${
          isFiroBComplete
            ? 'border-[#C86D51]/45 bg-[#FBF9F5]'
            : 'border-[#1E3A34]/15 bg-white shadow-md'
        }`}>
          <div className="absolute top-4 right-4 badge-forest px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide flex items-center gap-1.5">
            {isFiroBComplete ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="w-1.5 h-1.5 rounded-full bg-[#C86D51]" />}
            {isFiroBComplete ? 'Completed' : 'Active'}
          </div>

          <div className="space-y-5 flex-1">
            <div className="w-12 h-12 rounded-xl bg-[#1E3A34] text-[#F9F8F3] flex items-center justify-center shadow-sm">
              <HeartHandshake className="w-6 h-6 text-[#C86D51]" />
            </div>

            <div>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.12em] text-[#C86D51]">
                Psychometric Assessment
              </span>
              <h3 className="font-editorial text-[1.65rem] sm:text-[1.8rem] font-bold text-[#1E3A34] mt-1 leading-tight">
                FIRO-B
              </h3>
              <p className="text-xs text-[#5A6E68] font-semibold mt-1">54 questions · about 10 minutes</p>
            </div>

            <p className="text-[#5A6E68] text-[13px] leading-relaxed max-w-lg">
              Understand your interpersonal preferences across <strong>Inclusion</strong>, <strong>Control</strong>, and <strong>Affection</strong> — including expressed and wanted behaviors.
            </p>

            <div className="rounded-xl bg-[#F2F0E6] p-3.5 border border-[#E5E2D9] space-y-2.5">
              <div className="flex justify-between items-center text-[11px] font-semibold">
                <span className="text-[#1E3A34]">Your progress</span>
                <span className="text-[#C86D51] font-mono">{firoBCount} of {FIRO_B_QUESTIONS.length}</span>
              </div>
              <div className="w-full h-1.5 bg-[#E5E2D9] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C86D51] rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[10px] text-[#7A817C]">You can pause and continue later.</p>
            </div>

            <div className="pt-1">
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#5A6E68] mb-2">You'll discover</p>
              <div className="flex flex-wrap gap-2">
                {['Inclusion', 'Control', 'Affection'].map(item => (
                  <span key={item} className="px-2.5 py-1.5 rounded-lg bg-[#F9F8F3] border border-[#E5E2D9] text-[11px] font-semibold text-[#1E3A34]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <Link
            to="/assessment/firo-b"
            className={`w-full mt-6 py-3.5 rounded-xl font-semibold text-[13px] flex items-center justify-center gap-2 transition-all ${
              isFiroBComplete
                ? 'bg-white border border-[#E5E2D9] text-[#1E3A34] hover:bg-[#F2F0E6]'
                : 'btn-terracotta shadow-sm hover:shadow-md'
            }`}
          >
            <span>{firoBAction}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* CCA 30 locked / coming soon */}
        <div className="editorial-card p-7 sm:p-8 flex flex-col relative overflow-hidden bg-[#F4F2EA] border border-[#E5E2D9]">
          <div className="absolute top-4 right-4 badge-forest px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide flex items-center gap-1.5">
            <LockKeyhole className="w-3 h-3" /> Coming Soon
          </div>

          <div className="space-y-5 flex-1">
            <div className="w-12 h-12 rounded-xl bg-[#D9E5E1] text-[#1E3A34] flex items-center justify-center">
              <BrainCircuit className="w-6 h-6 text-[#C86D51]" />
            </div>

            <div>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.12em] text-[#C86D51]">
                CareerCompass Custom Assessment
              </span>
              <h3 className="font-editorial text-[1.65rem] sm:text-[1.8rem] font-bold text-[#1E3A34] mt-1 leading-tight">
                CCA 30
              </h3>
              <p className="text-xs text-[#5A6E68] font-semibold mt-1">30 questions · in development</p>
            </div>

            <p className="text-[#5A6E68] text-[13px] leading-relaxed">
              Our custom assessment is currently under development and will add additional aptitude, interests, and role-fit inputs.
            </p>

            <div className="p-3.5 rounded-xl bg-white/75 border border-[#E5E2D9]">
              <p className="text-[11px] font-semibold text-[#1E3A34] leading-relaxed">
                CCA 30 will unlock deeper career matching when it becomes available.
              </p>
            </div>
          </div>

          <button disabled className="w-full mt-6 py-3.5 rounded-xl font-semibold text-[13px] bg-[#DCD9CF] text-[#7A817C] cursor-not-allowed flex items-center justify-center gap-2">
            <LockKeyhole className="w-3.5 h-3.5" />
            Coming Soon
          </button>
        </div>
      </div>

      {isFiroBComplete && (
        <div className="bg-[#1E3A34] text-[#F9F8F3] p-6 sm:p-7 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-editorial text-xl font-bold text-white">FIRO-B is complete.</h3>
            <p className="text-[#A2B5AF] text-[12px]">View your completed-test summary and interpersonal profile.</p>
          </div>
          <div className="flex items-center gap-2.5">
            <button onClick={resetAssessment} className="px-3.5 py-2.5 rounded-lg bg-[#142824] text-[#A2B5AF] hover:text-white text-[11px] font-semibold flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" /><span>Reset</span>
            </button>
            <button onClick={() => navigate('/assessment/complete')} className="btn-terracotta px-5 py-3 rounded-lg font-semibold text-[12px] shadow-md flex items-center gap-2">
              <span>View Test Completed</span><ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
