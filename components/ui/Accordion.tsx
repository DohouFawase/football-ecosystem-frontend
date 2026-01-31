import { AccordionProps } from '@/types/uiTypes';
import React, { useState } from 'react';

export const Accordion = ({ items, allowMultiple = false }: AccordionProps) => {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    } else {
      setOpenIds(prev => prev.includes(id) ? [] : [id]);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
      {items.map((item) => (
        <div key={item.id} className="w-full">
          <button
            onClick={() => toggle(item.id)}
            className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium text-gray-800">{item.title}</span>
            <span className={`transform transition-transform ${openIds.includes(item.id) ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {openIds.includes(item.id) && (
            <div className="px-6 py-4 bg-gray-50 text-gray-600 animate-in slide-in-from-top-2 duration-200">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};