
import React from 'react';
import { Input } from '../ui/Input';
import { Toggle } from '../ui/Toggle';
import { TagInput } from '../ui/TagInput';
import { PriceBadge } from '../ui/PriceBadge';
import { TokenFormState } from '../../types';
import { Globe, Hash, ShieldAlert, User } from 'lucide-react';
import { CONTENT } from '../../content';
import { FEES } from '../../constants';

interface AdvancedSettingsProps {
  formData: TokenFormState;
  onChange: (updates: Partial<TokenFormState>) => void;
}

export const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({ formData, onChange }) => {
  const { form } = CONTENT.createToken;
  const { socials, tags, creator, authorities } = form;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Social Links */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold dark:text-white text-gray-900 flex items-center gap-2">
          <Globe size={20} className="text-solana-purple" />
          {socials.title} <span className="text-xs text-gray-500 font-normal">{socials.subtitle}</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={socials.website}
            placeholder="https://yourwebsite.com"
            value={formData.website}
            onChange={(e) => onChange({ website: e.target.value })}
          />
          <Input
            label={socials.twitter}
            placeholder="https://x.com/..."
            value={formData.twitter}
            onChange={(e) => onChange({ twitter: e.target.value })}
          />
          <Input
            label={socials.telegram}
            placeholder="https://t.me/..."
            value={formData.telegram}
            onChange={(e) => onChange({ telegram: e.target.value })}
          />
          <Input
            label={socials.discord}
            placeholder="https://discord.gg/..."
            value={formData.discord}
            onChange={(e) => onChange({ discord: e.target.value })}
          />
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-4">
         <h3 className="text-lg font-semibold dark:text-white text-gray-900 flex items-center gap-2">
          <Hash size={20} className="text-solana-purple" />
          {tags.title} <span className="text-xs text-gray-500 font-normal">{tags.subtitle}</span>
        </h3>
        <TagInput
          label={tags.label}
          placeholder={tags.placeholder}
          value={formData.tags}
          onChange={(newTags) => onChange({ tags: newTags })}
        />
      </div>

      {/* Custom Creator */}
      <div className="space-y-4">
         <h3 className="text-lg font-semibold dark:text-white text-gray-900 flex items-center gap-2">
          <User size={20} className="text-solana-purple" />
          {creator.title} <span className="text-xs text-gray-500 font-normal">{creator.subtitle}</span>
        </h3>
        <Input
          label={creator.label}
          placeholder={creator.placeholder}
          value={formData.creatorAddress}
          onChange={(e) => onChange({ creatorAddress: e.target.value })}
        />
        <p className="text-xs text-gray-500">{creator.help}</p>
      </div>

      {/* Authorities */}
      <div className="space-y-4 pt-4 border-t dark:border-gray-800 border-gray-200">
        <div className="flex items-start gap-3 mb-4">
          <ShieldAlert className="text-yellow-500 mt-1" size={24} />
          <div>
            <h3 className="text-lg font-semibold dark:text-white text-gray-900">{authorities.title}</h3>
            <p className="text-sm text-gray-500">{authorities.subtitle} <span className="text-yellow-500 font-bold">{authorities.irreversibleTitle}</span></p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <Toggle
              label={authorities.revokeMint.label}
              description={authorities.revokeMint.desc}
              checked={formData.revokeMint}
              onChange={(val) => onChange({ revokeMint: val })}
              badge={<PriceBadge price={FEES.REVOKE_MINT.price} oldPrice={FEES.REVOKE_MINT.oldPrice} />}
            />
          </div>

          <div>
            <Toggle
              label={authorities.revokeFreeze.label}
              description={authorities.revokeFreeze.desc}
              checked={!formData.freezeAuthority} 
              onChange={(revoked) => onChange({ freezeAuthority: !revoked })} 
              badge={<PriceBadge price={FEES.REVOKE_FREEZE.price} oldPrice={FEES.REVOKE_FREEZE.oldPrice} />}
            />
          </div>

          <div>
            <Toggle
              label={authorities.revokeUpdate.label}
              description={authorities.revokeUpdate.desc}
              checked={formData.immutable}
              onChange={(val) => onChange({ immutable: val })}
              badge={<PriceBadge price={FEES.REVOKE_UPDATE.price} oldPrice={FEES.REVOKE_UPDATE.oldPrice} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
