import React from 'react';
import Link from 'next/link'; // Utilisation de Link de Next.js
import { BreadcrumbProps } from '@/types/uiTypes';

export const Breadcrumb = ({ items, separator = "/" }: BreadcrumbProps) => {
  return (
    <nav className="flex text-sm text-gray-500 mb-4">
      <ol className="flex items-center list-none p-0">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <Link href={item.href} className="hover:text-blue-600 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium">{item.label}</span>
            )}
            {index < items.length - 1 && (
              <span className="mx-2 text-gray-400">{separator}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};