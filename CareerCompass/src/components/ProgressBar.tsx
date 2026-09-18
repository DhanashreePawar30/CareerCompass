import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, label }) => {
  const percentage = Math.min(100, Math.max(0, Math.round((current / total) * 100)));

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className="text-[#1E3A34] uppercase tracking-wider">{label || 'Progress'}</span>
        <span className="text-[#C86D51] font-mono">{current} of {total} ({percentage}%)</span>
      </div>
      <div className="w-full h-2.5 bg-[#E5E2D9] rounded-full overflow-hidden p-0.5">
        <div
          className="h-full bg-gradient-to-r from-[#1E3A34] to-[#C86D51] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
