
import React, { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
  label: string;
  placeholder?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  className?: string;
}

export const TagInput: React.FC<TagInputProps> = ({ label, placeholder, value, onChange, className }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  const addTag = () => {
    const trimmed = inputValue.trim();
    // Allow alphanumeric, dashes, underscores, spaces. Remove comma if present (due to keypress)
    const cleanTag = trimmed.replace(/,/g, '');
    
    if (cleanTag && !value.includes(cleanTag)) {
      onChange([...value, cleanTag]);
      setInputValue('');
    }
  };

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-sm font-medium dark:text-gray-300 text-gray-700 transition-colors">{label}</label>
      <div className="flex flex-wrap items-center gap-2 min-h-[50px] dark:bg-[#0B0C10] bg-white border dark:border-gray-700 border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-solana-purple/50 focus-within:border-solana-purple transition-all">
        {value.map((tag, index) => (
          <span key={index} className="flex items-center gap-1 text-sm bg-solana-purple/20 text-solana-purple px-2.5 py-1 rounded-md border border-solana-purple/30 animate-fadeIn">
            {tag}
            <button 
              type="button" 
              onClick={() => removeTag(index)} 
              className="hover:text-white hover:bg-solana-purple/50 rounded-full p-0.5 transition-colors"
            >
              <X size={14} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          className="flex-1 bg-transparent outline-none dark:text-white text-gray-900 placeholder-gray-400 min-w-[120px] py-1"
          placeholder={value.length === 0 ? placeholder : ''}
        />
      </div>
    </div>
  );
};
