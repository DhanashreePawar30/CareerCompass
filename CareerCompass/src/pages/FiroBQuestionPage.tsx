import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle2, HeartHandshake, Command } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { FIRO_B_QUESTIONS, LIKERT_OPTIONS } from '../data/firoBQuestions';
import { ProgressBar } from '../components/ProgressBar';
import { useAssessmentKeyboard } from '../hooks/useAssessmentKeyboard';

export const FiroBQuestionPage: React.FC = () => {
  const navigate = useNavigate();
  const { firoBAnswers, setFiroBAnswer, completeFiroB, isCustomComplete } = useAssessment();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNextTestPrompt, setShowNextTestPrompt] = useState(false);

  const question = FIRO_B_QUESTIONS[currentIndex];
  const selectedValue = firoBAnswers[question.id] || null;

  const handleSelectOption = (value: number) => {
    setFiroBAnswer(question.id, value);
    if (currentIndex < FIRO_B_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 200);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < FIRO_B_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      completeFiroB();
      if (isCustomComplete) {
        navigate('/assessment/complete');
      } else {
        setShowNextTestPrompt(true);
      }
    }
  };

  // Keyboard navigation: 1-6 keys, ArrowLeft, ArrowRight/Enter
  useAssessmentKeyboard({
    onSelectOption: handleSelectOption,
    onPrevious: handlePrevious,
    onNext: handleNext,
    optionsCount: 6,
    canGoNext: Boolean(selectedValue),
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Top Header & Sticky Progress */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-[#1E3A34] text-[#F9F8F3] flex items-center justify-center font-bold text-xs shadow-xs">
              <HeartHandshake className="w-5 h-5 text-[#C86D51]" />
            </span>
            <span className="font-editorial font-bold text-[#1E3A34] text-lg sm:text-xl">
              FIRO-B Interpersonal Test
            </span>
          </div>

          <span className="badge-forest px-3.5 py-1 rounded-full text-xs font-semibold">
            {question.categoryLabel}
          </span>
        </div>

        <ProgressBar
          current={currentIndex + 1}
          total={FIRO_B_QUESTIONS.length}
          label="FIRO-B Question Progress"
        />
      </div>

      {/* Main Single Question Card */}
      <div className="editorial-card p-6 sm:p-12 space-y-8 shadow-md transition-all animate-fade-in bg-white border border-[#E5E2D9]">
        
        {/* Question Counter & Keyboard Hint */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-[#C86D51]">
            <span>QUESTION {question.id} OF 54</span>
            <span className="hidden sm:flex items-center gap-1 text-[#5A6E68]">
              <Command className="w-3.5 h-3.5" /> Keys [1-6] active
            </span>
          </div>

          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1E3A34] leading-snug">
            "{question.text}"
          </h2>
        </div>

        {/* 6-Point Likert Scale Options */}
        <div className="space-y-3 pt-2">
          {LIKERT_OPTIONS.map((opt) => {
            const isSelected = selectedValue === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => handleSelectOption(opt.value)}
                className={`w-full min-h-[52px] p-4 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1E3A34] text-[#F9F8F3] border-[#1E3A34] shadow-md scale-[1.01] font-semibold'
                    : 'bg-[#F9F8F3] text-[#1E3A34] border-[#E5E2D9] hover:bg-[#F2F0E6] hover:border-[#D2CDBF]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-mono font-bold ${
                    isSelected ? 'border-[#C86D51] bg-[#C86D51] text-white' : 'border-[#D5D1C4] bg-white text-[#5A6E68]'
                  }`}>
                    {opt.value}
                  </div>
                  <span className="text-sm font-medium leading-relaxed">{opt.label}</span>
                </div>

                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-[#C86D51] shrink-0" />
                )}
              </button>
            );
          })}
        </div>

      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all min-h-[48px] ${
            currentIndex === 0
              ? 'opacity-40 cursor-not-allowed text-[#5A6E68]'
              : 'bg-white border border-[#E5E2D9] text-[#1E3A34] hover:bg-[#F2F0E6] cursor-pointer'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="text-xs text-[#5A6E68] font-mono hidden sm:block">
          Question {currentIndex + 1} / 54
        </div>

        <button
          onClick={handleNext}
          disabled={!selectedValue}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all min-h-[48px] cursor-pointer ${
            !selectedValue
              ? 'opacity-50 cursor-not-allowed bg-[#E5E2D9] text-[#5A6E68]'
              : currentIndex === FIRO_B_QUESTIONS.length - 1
              ? 'btn-terracotta'
              : 'btn-forest'
          }`}
        >
          <span>{currentIndex === FIRO_B_QUESTIONS.length - 1 ? 'Finish FIRO-B' : 'Next Question'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      {/* Next Test Sequential Prompt Modal */}
      {showNextTestPrompt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 sm:p-10 max-w-lg w-full border border-[#E5E2D9] shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#EBF2F0] text-[#1E3A34] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9 text-emerald-600" />
            </div>

            <div className="space-y-2">
              <span className="badge-terracotta px-3 py-1 rounded-full text-xs font-bold uppercase">
                Part 1 of 2 Complete
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1E3A34]">
                FIRO-B Assessment Completed!
              </h3>
              <p className="text-sm text-[#5A6E68] leading-relaxed">
                Great job! Now take the <strong>Aptitude & Scenarios Test</strong> to synthesize your complete career profile and unlock your customized roadmap.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => navigate('/assessment/custom')}
                className="btn-terracotta w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>Start Part 2: Aptitude Test →</span>
              </button>

              <button
                onClick={() => navigate('/assessment')}
                className="w-full py-3 rounded-xl border border-[#E5E2D9] bg-[#F9F8F3] hover:bg-[#F2F0E6] text-xs font-semibold text-[#5A6E68] cursor-pointer"
              >
                Return to Assessment Hub
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
