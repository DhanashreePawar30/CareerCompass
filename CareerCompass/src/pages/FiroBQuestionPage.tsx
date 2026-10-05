import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  HeartHandshake,
  Keyboard,
} from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { FIRO_B_QUESTIONS, LIKERT_OPTIONS } from '../data/firoBQuestions';
import { ProgressBar } from '../components/ProgressBar';
import { useAssessmentKeyboard } from '../hooks/useAssessmentKeyboard';

export const FiroBQuestionPage: React.FC = () => {
  const navigate = useNavigate();
  const { firoBAnswers, setFiroBAnswer, completeFiroB } = useAssessment();
  const [currentIndex, setCurrentIndex] = useState(0);

  const question = FIRO_B_QUESTIONS[currentIndex];
  const selectedValue = firoBAnswers[question.id] || null;
  const totalQuestions = FIRO_B_QUESTIONS.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const moveNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      completeFiroB();
      navigate('/assessment/complete');
    }
  };

  const handleSelectOption = (value: number) => {
    setFiroBAnswer(question.id, value);

    // Brief visual feedback, then automatically continue.
    setTimeout(() => {
      moveNext();
    }, 180);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (selectedValue) {
      moveNext();
    }
  };

  useAssessmentKeyboard({
    onSelectOption: handleSelectOption,
    onPrevious: handlePrevious,
    onNext: handleNext,
    optionsCount: 6,
    canGoNext: Boolean(selectedValue),
  });

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#F9F8F3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Compact assessment header */}
        <header className="space-y-3.5 mb-5 sm:mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#1E3A34] flex items-center justify-center shadow-sm shrink-0">
                <HeartHandshake className="w-4.5 h-4.5 text-[#C86D51]" />
              </div>

              <div className="min-w-0">
                <p className="font-editorial font-bold text-[#1E3A34] text-base leading-tight">
                  FIRO-B Assessment
                </p>
                <p className="text-[10px] text-[#6B7974] mt-0.5">
                  Interpersonal preferences & interaction style
                </p>
              </div>
            </div>

            <span className="badge-forest px-2.5 py-1.5 rounded-full text-[10px] font-semibold whitespace-nowrap">
              {question.categoryLabel}
            </span>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.1em] font-bold text-[#C86D51]">
                Question {currentIndex + 1} of {totalQuestions}
              </p>
              <p className="text-[10px] text-[#7A817C] mt-0.5">
                {Math.round(progress)}% complete
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-[#6B7974]">
              <Keyboard className="w-3.5 h-3.5" />
              <span>Press 1–6 to answer</span>
            </div>
          </div>

          <ProgressBar
            current={currentIndex + 1}
            total={totalQuestions}
            label="Assessment progress"
          />
        </header>

        {/* Compact question + 2×3 response grid */}
        <main className="editorial-card bg-white border border-[#E5E2D9] shadow-sm overflow-hidden">
          <div className="px-5 py-6 sm:px-9 sm:py-7">
            <div className="max-w-3xl mx-auto">

              <div className="mb-5 sm:mb-6">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#FCEFEA] border border-[#E9C9BC] text-[9px] font-mono font-bold uppercase tracking-[0.1em] text-[#C86D51]">
                  {question.categoryLabel}
                </span>

                <h1 className="font-editorial text-[1.45rem] sm:text-[1.9rem] font-bold text-[#1E3A34] leading-[1.2] mt-3">
                  {question.text}
                </h1>

                <p className="text-[10px] text-[#7A817C] mt-2">
                  Choose the response that best describes you.
                </p>
              </div>

              {/* 2 × 3 Likert grid */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
                role="radiogroup"
                aria-label="Response options"
              >
                {LIKERT_OPTIONS.map((opt) => {
                  const isSelected = selectedValue === opt.value;

                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => handleSelectOption(opt.value)}
                      className={`group min-h-[58px] sm:min-h-[64px] px-3.5 py-2.5 rounded-xl border text-left flex items-center justify-between gap-3 transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C86D51] focus-visible:ring-offset-2 ${
                        isSelected
                          ? 'bg-[#1E3A34] text-[#F9F8F3] border-[#1E3A34] shadow-md'
                          : 'bg-[#FAF9F5] text-[#1E3A34] border-[#E5E2D9] hover:bg-[#F2F0E6] hover:border-[#CFCABD] hover:-translate-y-[1px]'
                      }`}
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        <span
                          className={`w-8 h-8 rounded-lg border flex items-center justify-center text-[11px] font-mono font-bold shrink-0 ${
                            isSelected
                              ? 'border-[#C86D51] bg-[#C86D51] text-white'
                              : 'border-[#D5D1C4] bg-white text-[#5A6E68] group-hover:border-[#C86D51]/50'
                          }`}
                        >
                          {opt.value}
                        </span>

                        <span className="text-[12px] sm:text-[13px] font-medium leading-tight">
                          {opt.label}
                        </span>
                      </span>

                      <span
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-[#C86D51] text-[#C86D51]'
                            : 'border-[#D5D1C4] text-transparent'
                        }`}
                        aria-hidden="true"
                      >
                        {isSelected && <CheckCircle2 className="w-4 h-4" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between mt-4 px-1">
                <span className="text-[10px] text-[#7A817C]">
                  Selecting an answer moves you forward
                </span>
                <span className="hidden sm:inline text-[10px] font-mono text-[#7A817C]">
                  1 = Strongly Disagree · 6 = Strongly Agree
                </span>
              </div>
            </div>
          </div>
        </main>

        {/* Navigation */}
        <footer className="flex items-center justify-between gap-4 mt-4">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-[11px] font-semibold transition-all ${
              currentIndex === 0
                ? 'text-[#A9B0AC] cursor-not-allowed'
                : 'bg-white border border-[#E5E2D9] text-[#1E3A34] hover:bg-[#F2F0E6]'
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Previous
          </button>

          <div className="text-[10px] font-mono text-[#7A817C]">
            {currentIndex + 1} / {totalQuestions}
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={!selectedValue}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-[11px] font-semibold transition-all ${
              !selectedValue
                ? 'bg-[#E5E2D9] text-[#8A908C] cursor-not-allowed'
                : currentIndex === totalQuestions - 1
                  ? 'btn-terracotta shadow-sm'
                  : 'btn-forest shadow-sm'
            }`}
          >
            <span>{currentIndex === totalQuestions - 1 ? 'Finish FIRO-B' : 'Next'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </footer>

      </div>
    </div>
  );
};
