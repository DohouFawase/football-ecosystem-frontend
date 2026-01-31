import { ProgressProps } from '@/types/uiTypes';
import React from 'react';

export const Progress = ({ value, showValue = false, color = "bg-blue-600" }: ProgressProps) => {
  // On s'assure que la valeur est entre 0 et 100
  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        {showValue && <span className="text-sm font-medium text-gray-700">{clampedValue}%</span>}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full transition-all duration-300 ${color}`} 
          style={{ width: `${clampedValue}%` }}
        ></div>
      </div>
    </div>
  );
};