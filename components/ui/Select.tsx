import { SelectProps } from '@/types/uiTypes';
import React from 'react';

export const Select = ({ label, options, error, className = '', ...props }: SelectProps) => {
  return (
    <div className="flex flex-col gap-1.5 w-full mb-4">
      {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
      <select
        className={`
          px-4 py-2 border rounded-lg bg-white outline-none transition-all focus:ring-2 focus:ring-blue-500
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${className}
        `}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};