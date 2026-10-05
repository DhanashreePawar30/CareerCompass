import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Loader2, Compass, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAssessment } from '../context/AssessmentContext';

export const ProcessingPage: React.FC = () => {
  const navigate = useNavigate();
  const { personalDetails, completeFiroB, completeCustom, generateFiroBAiInsight, firoBAiInsight } = useAssessment();

  const [stepIndex, setStepIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const checklist = [
    "FIRO-B interpersonal metrics analyzed",
    "Interest domains & passions mapped",
    "Quantitative aptitude evaluated",
    "Academic history & skill tags processed",
    "Building Career Profile & Fit Rankings..."
  ];

  useEffect(() => {
    // Ensure assessments marked completed & trigger LLM synthesis
    completeFiroB();
    completeCustom();
    if (!firoBAiInsight) {
      generateFiroBAiInsight();
    }

    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < checklist.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          try {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 }
            });
          } catch (e) {
            // fallback if confetti fails
          }
          return prev;
        }
      });
    }, 750);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-10">
      
      {/* Icon Badge */}
      <div className="inline-flex p-5 rounded-3xl bg-[#1E3A34] text-[#F9F8F3] shadow-xl relative">
        <Compass className={`w-12 h-12 text-[#C86D51] ${!isComplete ? 'animate-spin' : ''}`} />
        {isComplete && (
          <div className="absolute -top-2 -right-2 bg-[#C86D51] text-white p-1.5 rounded-full shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Main Status Heading */}
      <div className="space-y-3">
        <span className="badge-terracotta px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          {isComplete ? 'Analysis Ready' : 'AI Engine Active'}
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1E3A34]">
          {isComplete ? `Career Profile Ready for ${personalDetails.name.split(' ')[0]}!` : 'Synthesizing Your Career Compass...'}
        </h1>
        <p className="text-[#5A6E68] text-base leading-relaxed">
          {isComplete
            ? 'We have calculated your trait radar metrics, FIRO-B interpersonal matrix, and career match rankings.'
            : 'Evaluating 84 data points across psychometric, quantitative, and academic matrices.'}
        </p>
      </div>

      {/* Animated Progress Checklist */}
      <div className="editorial-card p-8 space-y-4 text-left border border-[#E5E2D9] bg-white shadow-md">
        {checklist.map((item, idx) => {
          const isDone = idx < stepIndex || isComplete;
          const isCurrent = idx === stepIndex && !isComplete;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 p-3.5 rounded-xl transition-all ${
                isDone
                  ? 'bg-[#EBF2F0] text-[#1E3A34] font-medium'
                  : isCurrent
                  ? 'bg-[#F3F1E7] text-[#1E3A34] font-semibold border border-[#C86D51]/40'
                  : 'text-[#A2B5AF] opacity-50'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-5 h-5 text-[#C86D51] shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-5 h-5 text-[#1E3A34] animate-spin shrink-0" />
              ) : (
                <div className="w-5 h-5 rounded-full border border-[#D5D1C4] shrink-0" />
              )}
              <span className="text-sm">{item}</span>
            </div>
          );
        })}
      </div>

      {/* Primary Action Button */}
      {isComplete && (
        <div className="pt-4 animate-fade-in">
          <button
            onClick={() => navigate('/assessment/unlock')}
            className="btn-terracotta inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-semibold shadow-lg group cursor-pointer"
          >
            <span>Unlock Your Career Profile</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

    </div>
  );
};
