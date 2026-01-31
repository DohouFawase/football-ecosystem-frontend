import { GridProps } from '@/types/uiTypes';
import React from 'react';

export const Grid = ({ children, cols = 3, gap = 6, tabletCols, mobileCols = 1 }: GridProps) => {
  
  // 1. On définit strictement les clés autorisées pour correspondre à GridProps
  const colMap: Record<1 | 2 | 3 | 4 | 5 | 6 | 12, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5', // Ajouté pour correspondre au type
    6: 'grid-cols-6',
    12: 'grid-cols-12'
  };

  // 2. Utilisation sécurisée des index
  const mobileClass = colMap[mobileCols as keyof typeof colMap];
  const tabletClass = colMap[(tabletCols || cols) as keyof typeof colMap];
  const desktopClass = colMap[cols as keyof typeof colMap];

  return (
    <div className={`grid gap-${gap} ${mobileClass} md:${tabletClass} lg:${desktopClass}`}>
      {children}
    </div>
  );
};