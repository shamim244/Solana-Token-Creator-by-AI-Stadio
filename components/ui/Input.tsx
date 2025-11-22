
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className, type, ...props }) => {
  // Prevent changing numbers when scrolling via mouse wheel
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    if (type === 'number') {
      e.currentTarget.blur();
    }
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-sm font-medium dark:text-gray-300 text-gray-700 transition-colors">{label}</label>
      <input
        type={type}
        onWheel={handleWheel}
        className={`dark:bg-[#0B0C10] bg-white border ${error ? 'border-red-500' : 'dark:border-gray-700 border-gray-300'} 
        rounded-lg px-4 py-3 dark:text-white text-gray-900 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 
        focus:ring-solana-purple/50 focus:border-solana-purple transition-all duration-200`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }> = ({ label, className, ...props }) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-sm font-medium dark:text-gray-300 text-gray-700 transition-colors">{label}</label>
      <textarea
        className="dark:bg-[#0B0C10] bg-white border dark:border-gray-700 border-gray-300 rounded-lg px-4 py-3 dark:text-white text-gray-900 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-solana-purple/50 focus:border-solana-purple transition-all duration-200 min-h-[100px]"
        {...props}
      />
    </div>
  );
};
