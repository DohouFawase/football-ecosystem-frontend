import React from 'react';
import { Button } from './Button';
import { PaginationProps } from '@/types/uiTypes';

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <Button 
        variant="outline" 
        size="sm" 
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Précédent
      </Button>
      
      <span className="text-sm text-gray-600">
        Page <strong>{currentPage}</strong> sur <strong>{totalPages}</strong>
      </span>

      <Button 
        variant="outline" 
        size="sm" 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Suivant
      </Button>
    </div>
  );
};