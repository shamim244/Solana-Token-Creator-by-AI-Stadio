import React from 'react';
import { Toggle } from '../ui/Toggle';
import { TokenFormState } from '../../types';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

interface AuthoritiesProps {
  formData: TokenFormState;
  onChange: (updates: Partial<TokenFormState>) => void;
}

export const Authorities: React.FC<AuthoritiesProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      
      <div className="bg-yellow-900/20 border border-yellow-700/50 p-4 rounded-lg flex gap-3 items-start">
        <ShieldAlert className="w-6 h-6 text-yellow-500 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-yellow-500">Important Warning</h4>
          <p className="text-xs text-yellow-200/80 mt-1">
            Revoking authorities is <strong>irreversible</strong>. Once you revoke the mint authority, you can never create more supply. Once you make metadata immutable, you can never change the name, symbol, or image.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Toggle
          label="Revoke Mint Authority"
          description="If enabled, you will not be able to mint more tokens after the initial supply. This creates a 'Fixed Supply' token."
          checked={formData.revokeMint}
          onChange={(val) => onChange({ revokeMint: val })}
        />

        <Toggle
          label="Freeze Authority"
          description="If enabled (default), you keep the ability to freeze token accounts. Disable this if you want to renounce control over user accounts."
          checked={formData.freezeAuthority}
          onChange={(val) => onChange({ freezeAuthority: val })}
        />

        <Toggle
          label="Make Metadata Immutable"
          description="If enabled, the token name, symbol, and image can never be updated. This builds trust but prevents future rebrands."
          checked={formData.immutable}
          onChange={(val) => onChange({ immutable: val })}
        />
      </div>
    </div>
  );
};