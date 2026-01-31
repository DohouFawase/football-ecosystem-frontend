import { ModalProps } from '@/types/uiTypes';
import React from 'react';

export const Modal = ({ isOpen, onClose, title, children, footer, size = 'md' }: ModalProps) => {
  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    full: "max-w-[95%]"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className={`bg-white w-full ${sizes[size]} rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};