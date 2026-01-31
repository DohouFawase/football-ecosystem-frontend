import { CheckboxProps } from '@/types/uiTypes';
import React from 'react';

export const Checkbox = ({ label, description, className = '', ...props }: CheckboxProps) => {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${className}`}
          {...props}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{label}</span>
        {description && <span className="text-xs text-gray-500">{description}</span>}
      </div>
    </label>
  );
};