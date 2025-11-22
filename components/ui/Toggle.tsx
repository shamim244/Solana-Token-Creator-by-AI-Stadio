
import React from 'react';

interface ToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  badge?: React.ReactNode;
}

export const Toggle: React.FC<ToggleProps> = ({ label, description, checked, onChange, disabled, badge }) => {
  return (
    <div className={`flex items-start justify-between p-4 rounded-lg border dark:border-gray-800 border-gray-200 dark:bg-[#16181d] bg-white transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <div className="flex flex-col max-w-[80%]">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold dark:text-white text-gray-900">{label}</span>
          {badge && <div>{badge}</div>}
        </div>
        {description && <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{description}</span>}
      </div>
      <button
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none ${
          checked ? 'bg-solana-green' : 'dark:bg-gray-700 bg-gray-300'
        }`}
        type="button"
        disabled={disabled}
      >
        <span
          className={`${
            checked ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </button>
    </div>
  );
};
