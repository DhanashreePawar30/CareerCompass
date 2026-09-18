import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle2, BrainCircuit } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { CUSTOM_QUESTIONS } from '../data/customQuestions';
import { ProgressBar } from '../components/ProgressBar';

export const CustomQuestionPage: React.FC = () => {
  const navigate = useNavigate();
  const { customAnswers, setCustomAnswer, completeCustom } = useAssessment();
  const [currentIndex, setCurrentIndex] = useState(0);

  const question = CUSTOM_QUESTIONS[currentIndex];
  const selectedOptionId = customAnswers[question.id] || null;

  const handleSelectOption = (optionId: string) => {
    setCustomAnswer(question.id, optionId);
    if (currentIndex < CUSTOM_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 250);
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
      navigate('/assessment');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header & Progress */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#1E3A34] text-[#F9F8F3] flex items-center justify-center font-bold text-xs">
              <BrainCircuit className="w-4 h-4 text-[#C86D51]" />
            </span>
            <span className="font-editorial font-bold text-[#1E3A34] text-lg sm:text-xl">
              CareerCompass Custom Test
            </span>
          </div>

          <span className="badge-terracotta px-3 py-1 rounded-full text-xs font-semibold">
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
      <div className="editorial-card p-8 sm:p-12 space-y-8 shadow-md transition-all animate-fade-in bg-white border border-[#E5E2D9]">
        
        {/* Question Counter & Text */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-[#C86D51]">
            <span>QUESTION {question.id} OF 30</span>
            <span className="text-[#5A6E68] uppercase">{question.section} SECTION</span>
          </div>

          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1E3A34] leading-snug">
            {question.question}
          </h2>
        </div>

        {/* Multiple Choice Option Cards */}
        <div className="space-y-3 pt-2">
          {question.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full p-5 rounded-xl border text-left flex items-start justify-between gap-4 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1E3A34] text-[#F9F8F3] border-[#1E3A34] shadow-md scale-101'
                    : 'bg-[#F9F8F3] text-[#1E3A34] border-[#E5E2D9] hover:bg-[#F2F0E6] hover:border-[#D2CDBF]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-lg border flex items-center justify-center font-mono text-xs font-bold uppercase shrink-0 mt-0.5 ${
                    isSelected ? 'border-[#C86D51] bg-[#C86D51] text-white' : 'border-[#5A6E68] text-[#5A6E68] bg-white'
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
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
            currentIndex === 0
              ? 'opacity-40 cursor-not-allowed text-[#5A6E68]'
              : 'bg-white border border-[#E5E2D9] text-[#1E3A34] hover:bg-[#F2F0E6]'
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
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
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

    </div>
  );
};
