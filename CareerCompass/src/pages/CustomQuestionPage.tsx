import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle2, BrainCircuit, Command } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { CUSTOM_QUESTIONS } from '../data/customQuestions';
import { ProgressBar } from '../components/ProgressBar';
import { useAssessmentKeyboard } from '../hooks/useAssessmentKeyboard';

export const CustomQuestionPage: React.FC = () => {
  const navigate = useNavigate();
  const { customAnswers, setCustomAnswer, completeCustom, isFiroBComplete } = useAssessment();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNextTestPrompt, setShowNextTestPrompt] = useState(false);

  const question = CUSTOM_QUESTIONS[currentIndex];
  const selectedOptionId = customAnswers[question.id] || null;

  const handleSelectOption = (optionId: string) => {
    setCustomAnswer(question.id, optionId);
    if (currentIndex < CUSTOM_QUESTIONS.length - 1) {
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
    if (currentIndex < CUSTOM_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      completeCustom();
      if (isFiroBComplete) {
        navigate('/assessment/complete');
      } else {
        setShowNextTestPrompt(true);
      }
    }
  };

  // Keyboard navigation: maps 1 -> 'a', 2 -> 'b', 3 -> 'c', 4 -> 'd'
  const optionsMap: Record<string, string> = {
    '1': 'a',
    '2': 'b',
    '3': 'c',
    '4': 'd'
  };

  useAssessmentKeyboard({
    onSelectOption: handleSelectOption,
    onPrevious: handlePrevious,
    onNext: handleNext,
    optionsCount: question.options.length,
    optionsMap,
    canGoNext: Boolean(selectedOptionId),
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Top Header & Progress */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-[#1E3A34] text-[#F9F8F3] flex items-center justify-center font-bold text-xs shadow-xs">
              <BrainCircuit className="w-5 h-5 text-[#C86D51]" />
            </span>
            <span className="font-editorial font-bold text-[#1E3A34] text-lg sm:text-xl">
              CareerCompass Custom Test
            </span>
          </div>

          <span className="badge-terracotta px-3.5 py-1 rounded-full text-xs font-semibold">
            {question.section} • {question.type}
          </span>
        </div>

        <ProgressBar
          current={currentIndex + 1}
          total={CUSTOM_QUESTIONS.length}
          label="Custom Test Progress"
        />
      </div>

      {/* Main Single Question Card */}
      <div className="editorial-card p-6 sm:p-12 space-y-8 shadow-md transition-all animate-fade-in bg-white border border-[#E5E2D9]">
        
        {/* Question Counter & Keyboard Hint */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-[#C86D51]">
            <span>QUESTION {question.id} OF 30</span>
            <span className="hidden sm:flex items-center gap-1 text-[#5A6E68]">
              <Command className="w-3.5 h-3.5" /> Keys [1-4] or [A-D] active
            </span>
          </div>

          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1E3A34] leading-snug">
            {question.question}
          </h2>
        </div>

        {/* Multiple Choice Option Cards */}
        <div className="space-y-3.5 pt-2">
          {question.options.map((opt, optIdx) => {
            const isSelected = selectedOptionId === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full min-h-[52px] p-5 rounded-xl border text-left flex items-start justify-between gap-4 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1E3A34] text-[#F9F8F3] border-[#1E3A34] shadow-md scale-[1.01]'
                    : 'bg-[#F9F8F3] text-[#1E3A34] border-[#E5E2D9] hover:bg-[#F2F0E6] hover:border-[#D2CDBF]'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`w-7 h-7 rounded-lg border flex items-center justify-center font-mono text-xs font-bold uppercase shrink-0 mt-0.5 ${
                    isSelected ? 'border-[#C86D51] bg-[#C86D51] text-white' : 'border-[#D5D1C4] text-[#5A6E68] bg-white'
                  }`}>
                    {opt.id}
                  </div>
                  <span className="text-sm font-medium leading-relaxed">{opt.text}</span>
                </div>

                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-[#C86D51] shrink-0 mt-0.5" />
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
          Question {currentIndex + 1} / 30
        </div>

        <button
          onClick={handleNext}
          disabled={!selectedOptionId}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all min-h-[48px] cursor-pointer ${
            !selectedOptionId
              ? 'opacity-50 cursor-not-allowed bg-[#E5E2D9] text-[#5A6E68]'
              : currentIndex === CUSTOM_QUESTIONS.length - 1
              ? 'btn-terracotta'
              : 'btn-forest'
          }`}
        >
          <span>{currentIndex === CUSTOM_QUESTIONS.length - 1 ? 'Finish Custom Test' : 'Next Question'}</span>
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
                Aptitude & Scenarios Test Completed!
              </h3>
              <p className="text-sm text-[#5A6E68] leading-relaxed">
                Great job! Now take the <strong>FIRO-B Interpersonal Test</strong> to synthesize your complete career profile and unlock your customized roadmap.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => navigate('/assessment/firo-b')}
                className="btn-terracotta w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>Start Part 2: FIRO-B Test →</span>
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
