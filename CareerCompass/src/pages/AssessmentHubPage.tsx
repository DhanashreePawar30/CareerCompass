import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartHandshake, BrainCircuit, CheckCircle2, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { FIRO_B_QUESTIONS } from '../data/firoBQuestions';
import { CUSTOM_QUESTIONS } from '../data/customQuestions';

export const AssessmentHubPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    firoBAnswers,
    customAnswers,
    isFiroBComplete,
    isCustomComplete,
    resetAssessment,
    loadDemoUser
  } = useAssessment();

  const firoBCount = Object.keys(firoBAnswers).length;
  const customCount = Object.keys(customAnswers).length;

  const handleLoadDemo = () => {
    loadDemoUser();
    navigate('/dashboard');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2">
          <span className="badge-terracotta px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            Step 02 & 03 of Pipeline
          </span>
          <button
            onClick={handleLoadDemo}
            className="px-3 py-1 rounded-full bg-white border border-[#E5E2D9] text-[#1E3A34] hover:bg-[#F2F0E6] text-xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
          >
            <span>⚡ Load Demo User</span>
          </button>
        </div>
        <h1 className="font-editorial text-4xl font-bold text-[#1E3A34]">
          Assessment Selection Hub
        </h1>
        <p className="text-[#5A6E68] text-base leading-relaxed">
          Complete both assessments to generate your multi-dimensional career fit profile. You can complete them in any order, or load a demo profile to test immediately.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1: FIRO-B Assessment */}
        <div className={`editorial-card p-8 sm:p-10 flex flex-col justify-between space-y-8 relative overflow-hidden transition-all ${
          isFiroBComplete ? 'border-[#C86D51]/50 bg-[#FBF9F5]' : ''
        }`}>
          {isFiroBComplete && (
            <div className="absolute top-4 right-4 badge-terracotta px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#C86D51]" />
              <span>Completed</span>
            </div>
          )}

          <div className="space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-[#1E3A34] text-[#F9F8F3] flex items-center justify-center font-bold">
              <HeartHandshake className="w-7 h-7 text-[#C86D51]" />
            </div>

            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#C86D51]">
                Psychometric Metric
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1E3A34] mt-1">
                FIRO-B Assessment
              </h3>
              <p className="text-xs text-[#5A6E68] font-semibold mt-0.5">54 Questions • ~10 Minutes</p>
            </div>

            <p className="text-[#5A6E68] text-sm leading-relaxed">
              Measures your fundamental interpersonal relations behavior across three dimensions: <strong>Inclusion</strong>, <strong>Control</strong>, and <strong>Affection</strong> (Expressed vs. Wanted).
            </p>

            {/* Progress indicator */}
            <div className="bg-[#F2F0E6] p-4 rounded-xl space-y-2 border border-[#E5E2D9]">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#1E3A34]">Completion Progress</span>
                <span className="text-[#C86D51] font-mono">{firoBCount} / {FIRO_B_QUESTIONS.length} Qs</span>
              </div>
              <div className="w-full h-2 bg-[#E5E2D9] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C86D51] transition-all duration-300"
                  style={{ width: `${(firoBCount / FIRO_B_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Link
              to="/assessment/firo-b"
              className={`w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-xs ${
                isFiroBComplete
                  ? 'bg-white border border-[#E5E2D9] text-[#1E3A34] hover:bg-[#F2F0E6]'
                  : 'btn-terracotta'
              }`}
            >
              <span>{isFiroBComplete ? 'Review / Re-take FIRO-B' : firoBCount > 0 ? 'Resume FIRO-B Test' : 'Start FIRO-B Assessment'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Card 2: CareerCompass Custom Assessment */}
        <div className={`editorial-card p-8 sm:p-10 flex flex-col justify-between space-y-8 relative overflow-hidden transition-all ${
          isCustomComplete ? 'border-[#C86D51]/50 bg-[#FBF9F5]' : ''
        }`}>
          {isCustomComplete && (
            <div className="absolute top-4 right-4 badge-terracotta px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#C86D51]" />
              <span>Completed</span>
            </div>
          )}

          <div className="space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-[#1E3A34] text-[#F9F8F3] flex items-center justify-center font-bold">
              <BrainCircuit className="w-7 h-7 text-[#C86D51]" />
            </div>

            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#C86D51]">
                Aptitude & Scenarios
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1E3A34] mt-1">
                CareerCompass Custom Test
              </h3>
              <p className="text-xs text-[#5A6E68] font-semibold mt-0.5">30 Questions • ~8 Minutes</p>
            </div>

            <p className="text-[#5A6E68] text-sm leading-relaxed">
              Evaluates your quantitative logic, analytical problem solving, domain interest preferences, and workplace environment scenarios.
            </p>

            {/* Progress indicator */}
            <div className="bg-[#F2F0E6] p-4 rounded-xl space-y-2 border border-[#E5E2D9]">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#1E3A34]">Completion Progress</span>
                <span className="text-[#C86D51] font-mono">{customCount} / {CUSTOM_QUESTIONS.length} Qs</span>
              </div>
              <div className="w-full h-2 bg-[#E5E2D9] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1E3A34] transition-all duration-300"
                  style={{ width: `${(customCount / CUSTOM_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Link
              to="/assessment/custom"
              className={`w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-xs ${
                isCustomComplete
                  ? 'bg-white border border-[#E5E2D9] text-[#1E3A34] hover:bg-[#F2F0E6]'
                  : 'btn-forest'
              }`}
            >
              <span>{isCustomComplete ? 'Review / Re-take Test' : customCount > 0 ? 'Resume Custom Test' : 'Start Custom Assessment'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

      {/* Completion Banner */}
      {(isFiroBComplete || isCustomComplete) && (
        <div className="bg-[#1E3A34] text-[#F9F8F3] p-8 sm:p-10 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-editorial text-2xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-[#C86D51]" />
              <span>Ready for Processing?</span>
            </h3>
            <p className="text-[#A2B5AF] text-sm">
              {isFiroBComplete && isCustomComplete
                ? 'Both tests completed! Proceed to generate your comprehensive Career Profile.'
                : 'You can generate a partial profile now or complete all tests for maximum accuracy.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetAssessment}
              className="px-4 py-3 rounded-xl bg-[#142824] text-[#A2B5AF] hover:text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All</span>
            </button>

            <button
              onClick={() => navigate('/assessment/complete')}
              className="btn-terracotta px-6 py-3.5 rounded-xl font-semibold text-sm shadow-md flex items-center gap-2"
            >
              <span>Generate Profile →</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
