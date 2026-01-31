import { InputProps } from '@/types/uiTypes';
export const Input = ({ 
  label, 
  error, 
  helperText, 
  isFullWidth = true, 
  className = '', 
  ...props 
}: InputProps) => {
  return (
    <div className={`${isFullWidth ? 'w-full' : 'w-auto'} flex flex-col gap-1.5 mb-4`}>
      {label && (
        <label className="text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}
      <input
        className={`
          px-4 py-2 border rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 outline-none
          ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500'}
          ${className}
        `}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
      {!error && helperText && <span className="text-xs text-gray-500">{helperText}</span>}
    </div>
  );
};