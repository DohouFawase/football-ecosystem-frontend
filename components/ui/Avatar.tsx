import { AvatarProps } from '@/types/uiTypes';
import React from 'react';

export const Avatar = ({ src, alt, fallback, size = 'md' }: AvatarProps) => {
  const sizes = {
    xs: "h-6 w-6 text-[10px]",
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  return (
    <div className={`${sizes[size]} relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full border border-gray-200`}>
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <span className="font-medium text-gray-600 uppercase">{fallback}</span>
      )}
    </div>
  );
};