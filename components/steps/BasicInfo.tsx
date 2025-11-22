
import React, { useRef } from 'react';
import { Input, TextArea } from '../ui/Input';
import { TokenFormState } from '../../types';
import { Upload, X } from 'lucide-react';
import { CONTENT } from '../../content';

interface BasicInfoProps {
  formData: TokenFormState;
  onChange: (updates: Partial<TokenFormState>) => void;
}

export const BasicInfo: React.FC<BasicInfoProps> = ({ formData, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { form } = CONTENT.createToken;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      onChange({ image: file, imagePreviewUrl: url });
    }
  };

  const clearImage = () => {
    onChange({ image: null, imagePreviewUrl: null });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Prevent invalid chars in number inputs
  const preventInvalidChars = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['e', 'E', '+', '-'].includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Row 1: Name & Symbol */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={form.name.label}
          placeholder={form.name.placeholder}
          value={formData.name}
          onChange={(e) => onChange({ name: e.target.value })}
          maxLength={32}
        />
        <Input
          label={form.symbol.label}
          placeholder={form.symbol.placeholder}
          value={formData.symbol}
          onChange={(e) => onChange({ symbol: e.target.value.toUpperCase() })}
          maxLength={10}
        />
      </div>

      {/* Row 2: Decimals & Supply */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={form.decimals.label}
          type="number"
          min="0"
          max="18"
          onKeyDown={preventInvalidChars}
          value={formData.decimals}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            onChange({ decimals: isNaN(val) ? 0 : Math.min(18, Math.max(0, val)) });
          }}
          placeholder={form.decimals.placeholder}
        />
        <Input
          label={form.supply.label}
          type="number"
          min="1"
          onKeyDown={preventInvalidChars}
          value={formData.supply}
          onChange={(e) => {
             const val = parseInt(e.target.value);
             onChange({ supply: isNaN(val) ? 0 : Math.max(0, val) });
          }}
          placeholder={form.supply.placeholder}
        />
      </div>

      {/* Row 3: Description */}
      <TextArea
        label={form.description.label}
        placeholder={form.description.placeholder}
        value={formData.description}
        onChange={(e) => onChange({ description: e.target.value })}
        className="min-h-[100px]"
      />

      {/* Row 4: Image Upload (Moved here) */}
      <div className="space-y-2">
        <label className="text-sm font-medium dark:text-gray-300 text-gray-700">{form.image.label}</label>
        <div 
          className={`relative border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center transition-colors overflow-hidden
            ${formData.imagePreviewUrl ? 'border-solana-purple dark:bg-[#0B0C10] bg-white' : 'dark:border-gray-700 border-gray-300 hover:border-gray-500 dark:bg-[#0B0C10] bg-slate-50'}`}
        >
          {formData.imagePreviewUrl ? (
            <div className="relative h-full w-full group">
              <img 
                src={formData.imagePreviewUrl} 
                alt="Token Icon" 
                className="h-full mx-auto object-contain p-2" 
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={clearImage}
                  className="bg-red-500 p-2 rounded-full text-white hover:bg-red-600 transition"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          ) : (
            <div 
              className="flex flex-col items-center gap-3 cursor-pointer w-full h-full justify-center p-4 text-center"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="p-3 dark:bg-gray-800 bg-gray-200 rounded-full group-hover:bg-gray-300 dark:group-hover:bg-gray-700 transition">
                <Upload className="w-8 h-8 dark:text-gray-400 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium dark:text-gray-300 text-gray-700">{form.image.placeholder}</p>
                <p className="text-xs text-gray-500 mt-1">{form.image.subtext}</p>
              </div>
            </div>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*"
          />
        </div>
      </div>

      <div className="p-4 bg-blue-900/20 border border-blue-800/50 rounded-lg">
        <p className="text-sm text-blue-200 dark:text-blue-200 text-blue-800">
          {form.infoBox}
        </p>
      </div>
    </div>
  );
};
