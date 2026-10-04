import { useEffect } from 'react';

interface UseAssessmentKeyboardProps {
  onSelectOption: (value: any) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  optionsCount: number;
  optionsMap?: Record<string, any>;
  canGoNext?: boolean;
}

/**
 * Accessible keyboard navigation hook for high-velocity test taking:
 * - Number keys (1 to N) to select options
 * - ArrowLeft to go previous
 * - ArrowRight / Enter to advance
 */
export const useAssessmentKeyboard = ({
  onSelectOption,
  onPrevious,
  onNext,
  optionsCount,
  optionsMap,
  canGoNext = true,
}: UseAssessmentKeyboardProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      // Check number keys 1-9
      const keyNum = parseInt(e.key, 10);
      if (!isNaN(keyNum) && keyNum >= 1 && keyNum <= optionsCount) {
        e.preventDefault();
        if (optionsMap) {
          const mappedVal = optionsMap[keyNum.toString()];
          if (mappedVal !== undefined) {
            onSelectOption(mappedVal);
            return;
          }
        }
        onSelectOption(keyNum);
      }

      // Arrow navigation
      if (e.key === 'ArrowLeft' && onPrevious) {
        e.preventDefault();
        onPrevious();
      } else if ((e.key === 'ArrowRight' || e.key === 'Enter') && onNext && canGoNext) {
        e.preventDefault();
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onSelectOption, onPrevious, onNext, optionsCount, optionsMap, canGoNext]);
};
