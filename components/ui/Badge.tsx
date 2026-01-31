import { BadgeProps } from '@/types/uiTypes';
import React from 'react';

export const Badge = ({ label, status = 'info', isRounded = false }: BadgeProps) => {
  const styles = {
    success: "bg-green-100 text-green-700 border-green-200",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-200",
    error: "bg-red-100 text-red-700 border-red-200",
    info: "bg-blue-100 text-blue-700 border-blue-200",
  };

  return (
    <span className={`px-2.5 py-0.5 text-xs font-medium border ${styles[status]} ${isRounded ? 'rounded-full' : 'rounded'}`}>
      {label}
    </span>
  );
};