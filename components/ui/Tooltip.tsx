import { TooltipProps } from '@/types/uiTypes';
import React from 'react';

export const Tooltip = ({ children, content, position = 'top' }: TooltipProps) => {
  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div className="relative group flex items-center">
      {children}
      <div className={`absolute z-50 hidden group-hover:block px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-lg whitespace-nowrap ${positions[position]}`}>
        {content}
        {/* Petite flèche */}
        <div className="absolute w-2 h-2 bg-gray-900 rotate-45" />
      </div>
    </div>
  );
};