import { SkeletonProps } from '@/types/uiTypes';
import React from 'react';

export const Skeleton = ({ 
  variant = 'rectangular', 
  width, 
  height, 
  animate = 'pulse' 
}: SkeletonProps) => {
  const baseStyles = "bg-gray-200";
  const animations = {
    pulse: "animate-pulse",
    wave: "animate-shimmer", // Nécessite une config CSS spécifique pour le dégradé
    none: ""
  };
  const variants = {
    text: "rounded-md h-4 w-3/4",
    circular: "rounded-full",
    rectangular: "rounded-lg"
  };

  return (
    <div 
      className={`${baseStyles} ${variants[variant]} ${animations[animate]}`}
      style={{ width, height }}
    />
  );
};