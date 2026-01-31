import { TabsProps } from '@/types/uiTypes';
import React, { useState } from 'react';

export const Tabs = ({ items, defaultTabId }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTabId || items[0].id);

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-200 mb-4">
        {items.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium text-sm transition-all border-b-2 ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            } ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex items-center gap-2">
              {tab.icon && <span>{tab.icon}</span>}
              {tab.label}
            </div>
          </button>
        ))}
      </div>
      <div className="py-2">
        {items.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};