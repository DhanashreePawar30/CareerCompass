import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Loader2,
  ArrowRight,
  HeartHandshake,
  LockKeyhole,
} from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';

export const ProcessingPage: React.FC = () => {
  const navigate = useNavigate();
  const { personalDetails, completeFiroB } = useAssessment();
  const [stepIndex, setStepIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const checklist = [
    'FIRO-B responses recorded',
    'Inclusion, Control & Affection scores calculated',
    'Interpersonal profile prepared',
  ];

  useEffect(() => {
    completeFiroB();

    const interval = setInterval(() => {
      setStepIndex(prev => {
        if (prev < checklist.length - 1) return prev + 1;
        clearInterval(interval);
        setIsComplete(true);
        return prev;
      });
    }, 550);

    return () => clearInterval(interval);
  }, []);

  const firstName = personalDetails.name?.split(' ')[0];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#F9F8F3]" style={{ zoom: 0.85 }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto relative">
          {(
            <>
              <div className="pointer-events-none absolute inset-x-0 top-[-18px] h-28 overflow-hidden" aria-hidden="true">
                <span className="confetti confetti-1" />
                <span className="confetti confetti-2" />
                <span className="confetti confetti-3" />
                <span className="confetti confetti-4" />
                <span className="confetti confetti-5" />
                <span className="confetti confetti-6" />
                <span className="confetti confetti-7" />
                <span className="confetti confetti-8" />
              </div>

              <style>{`
                @keyframes ccConfettiDrop {
                  0% { transform: translateY(-22px) rotate(0deg); opacity: 0; }
                  12% { opacity: 1; }
                  100% { transform: translateY(82px) rotate(240deg); opacity: 0; }
                }
                .confetti {
                  position: absolute;
                  top: 0;
                  width: 6px;
                  height: 11px;
                  border-radius: 2px;
                  animation: ccConfettiDrop 1.8s ease-out 1 forwards;
                }
                .confetti-1 { left: 18%; background: #C86D51; animation-delay: .05s; }
                .confetti-2 { left: 28%; background: #1E3A34; animation-delay: .28s; }
                .confetti-3 { left: 39%; background: #D9A18D; animation-delay: .12s; }
                .confetti-4 { left: 49%; background: #C86D51; animation-delay: .42s; }
                .confetti-5 { left: 59%; background: #1E3A34; animation-delay: .2s; }
                .confetti-6 { left: 69%; background: #D9A18D; animation-delay: .5s; }
                .confetti-7 { left: 78%; background: #C86D51; animation-delay: .34s; }
                .confetti-8 { left: 88%; background: #1E3A34; animation-delay: .16s; }
                @media (prefers-reduced-motion: reduce) {
                  .confetti { animation: none; opacity: 0; }
                }
              `}</style>
            </>
          )}

          <div className="relative z-10 flex flex-col items-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#1E3A34] shadow-md transition-transform ${
              isComplete ? 'scale-100' : ''
            }`}>
              <HeartHandshake className="w-8 h-8 text-[#C86D51]" />
            </div>

            <span className="mt-4 inline-flex badge-terracotta px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.12em]">
              {isComplete ? 'Assessment Complete' : 'Processing FIRO-B'}
            </span>

            <h1 className="font-editorial text-3xl sm:text-[2.35rem] font-bold text-[#1E3A34] leading-tight mt-3">
              {isComplete
                ? `Your FIRO-B Results Are Ready${firstName ? `, ${firstName}` : ''}`
                : 'Preparing Your FIRO-B Results'}
            </h1>

            <p className="text-[#5A6E68] text-sm sm:text-[15px] leading-relaxed mt-3 max-w-xl mx-auto">
              {isComplete
                ? 'Your interpersonal profile has been prepared. View your dashboard to explore the key dimensions of your FIRO-B results.'
                : 'We are processing your responses and preparing your interpersonal profile.'}
            </p>
          </div>
        </div>

        {/* Completion progress */}
        <div className="mt-7 bg-white border border-[#E5E2D9] rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.12em] font-bold text-[#C86D51]">
              Assessment progress
            </span>
            <span className="text-[11px] font-semibold text-[#1E3A34]">
              {isComplete ? '54 / 54' : 'Processing'}
            </span>
          </div>

          <div className="h-1.5 bg-[#E8E5DB] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C86D51] rounded-full transition-all duration-500"
              style={{ width: isComplete ? '100%' : `${((stepIndex + 1) / checklist.length) * 100}%` }}
            />
          </div>
        </div>

        {/* What happened */}
        <section className="mt-5 bg-white border border-[#E5E2D9] rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="mb-4">
            <p className="text-[10px] font-mono uppercase tracking-[0.12em] font-bold text-[#C86D51]">
              Assessment summary
            </p>
            <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#1E3A34] mt-1">
              {isComplete ? 'Your FIRO-B profile is ready' : 'Preparing your profile'}
            </h2>
          </div>

          <div className="grid gap-2.5">
            {checklist.map((item, idx) => {
              const done = isComplete || idx < stepIndex;
              const current = !isComplete && idx === stepIndex;

              return (
                <div
                  key={item}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl border transition-all ${
                    done
                      ? 'bg-[#EBF2F0] border-[#D8E6E1] text-[#1E3A34]'
                      : current
                        ? 'bg-[#FDF5F1] border-[#E9C9BC] text-[#1E3A34]'
                        : 'bg-[#FAF9F5] border-[#E5E2D9] text-[#A2AAA6]'
                  }`}
                >
                  {done ? (
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#C86D51] shrink-0" />
                  ) : current ? (
                    <Loader2 className="w-4.5 h-4.5 text-[#1E3A34] animate-spin shrink-0" />
                  ) : (
                    <div className="w-4.5 h-4.5 rounded-full border border-[#D5D1C4] shrink-0" />
                  )}
                  <span className="text-xs sm:text-[13px] font-medium">{item}</span>
                </div>
              );
            })}
          </div>
        </section>

        {isComplete && (
          <>
            {/* What FIRO-B measures */}
            <section className="mt-5">
              <div className="text-center mb-4">
                <p className="text-[10px] font-mono uppercase tracking-[0.12em] font-bold text-[#C86D51]">
                  What your assessment measures
                </p>
                <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#1E3A34] mt-1">
                  Three interpersonal dimensions
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white border border-[#E5E2D9] rounded-xl p-4 shadow-sm">
                  <p className="font-editorial text-lg font-bold text-[#1E3A34]">Inclusion</p>
                  <p className="text-[11px] text-[#5A6E68] mt-1.5 leading-relaxed">
                    Belonging, participation and how you engage with groups.
                  </p>
                </div>

                <div className="bg-white border border-[#E5E2D9] rounded-xl p-4 shadow-sm">
                  <p className="font-editorial text-lg font-bold text-[#1E3A34]">Control</p>
                  <p className="text-[11px] text-[#5A6E68] mt-1.5 leading-relaxed">
                    Responsibility, influence and how you approach decisions.
                  </p>
                </div>

                <div className="bg-white border border-[#E5E2D9] rounded-xl p-4 shadow-sm">
                  <p className="font-editorial text-lg font-bold text-[#1E3A34]">Affection</p>
                  <p className="text-[11px] text-[#5A6E68] mt-1.5 leading-relaxed">
                    Connection, openness and interpersonal closeness.
                  </p>
                </div>
              </div>
            </section>

            {/* CCA 30 locked */}
            <section className="mt-5 bg-[#F2F0E6] border border-[#E5E2D9] rounded-2xl p-5 sm:p-6">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#1E3A34] flex items-center justify-center shrink-0">
                  <LockKeyhole className="w-4 h-4 text-[#C86D51]" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-mono uppercase tracking-[0.12em] font-bold text-[#C86D51]">
                      Career matching
                    </p>
                    <span className="px-2 py-0.5 rounded-full bg-white border border-[#DCD9CF] text-[9px] font-bold text-[#5A6E68]">
                      Coming Soon
                    </span>
                  </div>

                  <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#1E3A34] mt-1">
                    Unlock your Top 5 careers with CCA 30
                  </h3>

                  <p className="text-[11px] sm:text-xs text-[#5A6E68] leading-relaxed mt-1.5 max-w-2xl">
                    CCA 30 is currently under development. Once available, completing it will add deeper career-matching inputs to your CareerCompass profile.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA */}
            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="btn-terracotta inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold shadow-md group"
              >
                <span>View My FIRO-B Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-[10px] text-[#7A817C] mt-2.5">
                Your dashboard contains your six FIRO-B interpersonal metrics and profile summary.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
