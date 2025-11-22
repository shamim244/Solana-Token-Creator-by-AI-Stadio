import React, { useRef } from 'react';
import { Input, TextArea } from '../ui/Input';
import { TokenFormState } from '../../types';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface MetadataProps {
  formData: TokenFormState;
  onChange: (updates: Partial<TokenFormState>) => void;
}

export const Metadata: React.FC<MetadataProps> = ({ formData, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Image Upload */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-300">Token Icon</label>
        <div 
          className={`relative border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center transition-colors 
            ${formData.imagePreviewUrl ? 'border-solana-purple bg-[#0B0C10]' : 'border-gray-700 hover:border-gray-500 bg-[#0B0C10]'}`}
        >
          {formData.imagePreviewUrl ? (
            <div className="relative h-full w-full p-2">
              <img 
                src={formData.imagePreviewUrl} 
                alt="Token Icon" 
                className="h-full mx-auto object-contain rounded-lg" 
              />
              <button 
                onClick={clearImage}
                className="absolute top-4 right-4 bg-red-500 p-1 rounded-full text-white hover:bg-red-600 transition"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div 
              className="flex flex-col items-center gap-2 cursor-pointer w-full h-full justify-center"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="p-3 bg-gray-800 rounded-full">
                <Upload className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm text-gray-400">Click to upload image</p>
              <p className="text-xs text-gray-600">PNG, JPG, GIF up to 5MB</p>
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

      <TextArea
        label="Description"
        placeholder="Describe your project, utility, or story..."
        value={formData.description}
        onChange={(e) => onChange({ description: e.target.value })}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Website"
          placeholder="https://..."
          value={formData.website}
          onChange={(e) => onChange({ website: e.target.value })}
        />
        <Input
          label="Twitter/X"
          placeholder="@username"
          value={formData.twitter}
          onChange={(e) => onChange({ twitter: e.target.value })}
        />
        <Input
          label="Telegram"
          placeholder="t.me/group"
          value={formData.telegram}
          onChange={(e) => onChange({ telegram: e.target.value })}
        />
      </div>
    </div>
  );
};