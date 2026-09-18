import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle2, HeartHandshake } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { FIRO_B_QUESTIONS, LIKERT_OPTIONS } from '../data/firoBQuestions';
import { ProgressBar } from '../components/ProgressBar';

export const FiroBQuestionPage: React.FC = () => {
  const navigate = useNavigate();
  const { firoBAnswers, setFiroBAnswer, completeFiroB } = useAssessment();
  const [currentIndex, setCurrentIndex] = useState(0);

  const question = FIRO_B_QUESTIONS[currentIndex];
  const selectedValue = firoBAnswers[question.id] || null;

  const handleSelectOption = (value: number) => {
    setFiroBAnswer(question.id, value);
    if (currentIndex < FIRO_B_QUESTIONS.length - 1) {
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
    if (currentIndex < FIRO_B_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      completeFiroB();
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
              <HeartHandshake className="w-4 h-4 text-[#C86D51]" />
            </span>
            <span className="font-editorial font-bold text-[#1E3A34] text-lg sm:text-xl">
              FIRO-B Interpersonal Test
            </span>
          </div>

          <span className="badge-forest px-3 py-1 rounded-full text-xs font-semibold">
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
      <div className="editorial-card p-8 sm:p-12 space-y-8 shadow-md transition-all animate-fade-in bg-white border border-[#E5E2D9]">
        
        {/* Question Counter & Text */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-[#C86D51]">
            <span>QUESTION {question.id} OF 54</span>
            <span className="text-[#5A6E68]">Likert 6-Point Scale</span>
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
                className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1E3A34] text-[#F9F8F3] border-[#1E3A34] shadow-md scale-101 font-semibold'
                    : 'bg-[#F9F8F3] text-[#1E3A34] border-[#E5E2D9] hover:bg-[#F2F0E6] hover:border-[#D2CDBF]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-mono ${
                    isSelected ? 'border-[#C86D51] bg-[#C86D51] text-white' : 'border-[#5A6E68] text-[#5A6E68]'
                  }`}>
                    {opt.value}
                  </div>
                  <span className="text-sm font-medium">{opt.label}</span>
                </div>

                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-[#C86D51]" />
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
          Question {currentIndex + 1} / 54
        </div>

        <button
          onClick={handleNext}
          disabled={!selectedValue}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
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

    </div>
  );
};
