import { AlertProps } from '@/types/uiTypes';
import React from 'react';

export const Alert = ({ variant, title, message, onClose }: AlertProps) => {
  const variants = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  return (
    <div className={`p-4 border rounded-lg flex gap-3 ${variants[variant]}`}>
      <div className="flex-1">
        {title && <p className="font-bold mb-1">{title}</p>}
        <p className="text-sm">{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="opacity-7Alert.tsx0 hover:opacity-100">✕</button>
      )}
    </div>
  );
};