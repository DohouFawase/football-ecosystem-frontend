import { TableProps } from '@/types/uiTypes';
import React from 'react';

export function Table<T>({ data, columns, isLoading }: TableProps<T>) {
  return (
    <div className="w-full overflow-hidden border border-gray-200 rounded-lg shadow-sm">
      <table className="w-full text-left border-collapse bg-white">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-6 py-4 font-semibold text-gray-700 border-b">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {isLoading ? (
            <tr><td colSpan={columns.length} className="px-6 py-10 text-center text-gray-500">Chargement...</td></tr>
          ) : data.length === 0 ? (
            <tr><td colSpan={columns.length} className="px-6 py-10 text-center text-gray-500">Aucune donnée trouvée.</td></tr>
          ) : (
            data.map((item, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 text-sm text-gray-600">
                    {col.render ? col.render(item) : (item[col.key] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}