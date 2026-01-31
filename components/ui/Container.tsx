import { ContainerProps } from '@/types/uiTypes';
import React from 'react';

export const Container = ({ children, size = 'lg', as: Component = 'div' }: ContainerProps) => {
  const sizes = {
    fluid: "max-w-full",
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
  };

  return (
    <Component className={`mx-auto px-4 w-full ${sizes[size]}`}>
      {children}
    </Component>
  );
};