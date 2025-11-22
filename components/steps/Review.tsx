
import React from 'react';
import { TokenFormState } from '../../types';
import { Globe, Twitter, MessageCircle } from 'lucide-react';
import { CONTENT } from '../../content';
import { FEES } from '../../constants';
import { calculateTotalFees, calculateTotalOldFees } from '../../utils/fees';

interface ReviewProps {
  formData: TokenFormState;
}

export const Review: React.FC<ReviewProps> = ({ formData }) => {
  const { review } = CONTENT.createToken;
  const { summary } = review;

  // Tags are already an array now
  const tags = formData.tags || [];

  // Use centralized calculation
  const totalCost = calculateTotalFees(formData);
  const totalOldCost = calculateTotalOldFees(formData);
  const hasTotalDiscount = totalOldCost > totalCost;

  const LineItem = ({ label, price, oldPrice }: { label: string, price: number, oldPrice?: number }) => (
    <div className="flex justify-between items-center py-2 border-b dark:border-gray-800 border-gray-200 last:border-0">
      <span className="text-sm dark:text-gray-300 text-gray-600">{label}</span>
      <div className="flex items-center gap-2">
        {oldPrice && oldPrice > price && (
          <span className="text-xs text-gray-500 line-through decoration-gray-500">{oldPrice} SOL</span>
        )}
        <span className="text-sm font-medium dark:text-white text-gray-900">{price} SOL</span>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 animate-fadeIn">
      
      {/* Left Col: Token Preview (Takes 3/5 width on large) */}
      <div className="lg:col-span-3 space-y-6">
        <h3 className="text-lg font-semibold dark:text-white text-gray-900">{review.title}</h3>

        <div className="dark:bg-[#0B0C10] bg-white rounded-xl border dark:border-gray-800 border-gray-200 overflow-hidden shadow-md">
          {/* Header Preview */}
          <div className="p-6 border-b dark:border-gray-800 border-gray-200 flex items-center gap-4 bg-gradient-to-r dark:from-[#0B0C10] dark:to-[#14151A] from-gray-50 to-gray-100">
            <div className="w-20 h-20 rounded-xl dark:bg-gray-800 bg-white shrink-0 border dark:border-gray-700 border-gray-300 overflow-hidden flex items-center justify-center">
              {formData.imagePreviewUrl ? (
                <img src={formData.imagePreviewUrl} alt="Token" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-gray-500">{review.noImg}</span>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold dark:text-white text-gray-900">{formData.name || 'Untitled Token'}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-solana-purple/20 text-solana-purple px-2 py-0.5 rounded text-xs font-bold border border-solana-purple/30">
                  {formData.symbol || 'SYM'}
                </span>
                <span className="text-gray-500 text-sm">{formData.decimals} Decimals</span>
              </div>
              {formData.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">{formData.description}</p>
              )}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 text-sm border-b dark:border-gray-800 border-gray-200">
            <div className="p-4 border-b md:border-b-0 md:border-r dark:border-gray-800 border-gray-200">
              <span className="text-gray-500 block mb-1">{review.supplyLabel}</span>
              <span className="dark:text-white text-gray-900 font-mono text-lg">{formData.supply.toLocaleString()}</span>
            </div>
            <div className="p-4">
              <span className="text-gray-500 block mb-1">{review.creatorLabel}</span>
              <span className="dark:text-white text-gray-900 font-mono text-xs break-all">
                {formData.creatorAddress || review.connectedWallet}
              </span>
            </div>
          </div>

          {/* Socials & Tags */}
          {(formData.website || formData.twitter || formData.telegram || formData.discord || tags.length > 0) && (
             <div className="p-4 border-b dark:border-gray-800 border-gray-200 dark:bg-[#111216] bg-gray-50">
               <span className="text-gray-500 block mb-2 text-xs uppercase font-bold">{review.metadataSection}</span>
               <div className="flex flex-wrap gap-3">
                  {formData.website && <span className="dark:bg-gray-800 bg-white border dark:border-gray-700 border-gray-200 px-2 py-1 rounded text-xs flex items-center gap-1 text-gray-700 dark:text-gray-300"><Globe size={10}/> {new URL(formData.website).hostname}</span>}
                  {formData.twitter && <span className="bg-blue-500/20 text-blue-500 px-2 py-1 rounded text-xs flex items-center gap-1"><Twitter size={10}/> Twitter</span>}
                  {formData.telegram && <span className="bg-blue-400/20 text-blue-500 px-2 py-1 rounded text-xs flex items-center gap-1"><MessageCircle size={10}/> Telegram</span>}
                  {formData.discord && <span className="bg-indigo-500/20 text-indigo-500 px-2 py-1 rounded text-xs flex items-center gap-1">Discord</span>}
               </div>
               {tags.length > 0 && (
                 <div className="mt-2 flex flex-wrap gap-1">
                   {tags.map(t => (
                     <span key={t} className="text-xs text-gray-500 dark:text-gray-400 dark:bg-gray-800/50 bg-gray-200 px-2 py-0.5 rounded-full">#{t}</span>
                   ))}
                 </div>
               )}
             </div>
          )}

          {/* Authority State */}
          <div className="p-4 dark:bg-[#16181d] bg-white">
            <span className="text-gray-500 block mb-3 text-xs uppercase tracking-wider font-bold">{review.securitySection}</span>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded dark:hover:bg-white/5 hover:bg-gray-50 transition">
                <span className="dark:text-gray-300 text-gray-700 text-sm">{review.mintAuth}</span>
                <span className={`flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded ${formData.revokeMint ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-600 dark:text-green-400'}`}>
                  {formData.revokeMint ? `${review.status.revoked} (${review.status.fixed})` : `${review.status.active} (${review.status.variable})`}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded dark:hover:bg-white/5 hover:bg-gray-50 transition">
                <span className="dark:text-gray-300 text-gray-700 text-sm">{review.freezeAuth}</span>
                <span className={`flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded ${!formData.freezeAuthority ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-600 dark:text-green-400'}`}>
                  {formData.freezeAuthority ? review.status.active : review.status.revoked}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded dark:hover:bg-white/5 hover:bg-gray-50 transition">
                <span className="dark:text-gray-300 text-gray-700 text-sm">{review.updateAuth}</span>
                <span className={`flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded ${formData.immutable ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-600 dark:text-green-400'}`}>
                  {formData.immutable ? `${review.status.revoked} (${review.status.immutable})` : `${review.status.active} (${review.status.mutable})`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Col: Pricing Summary (Takes 2/5 width on large) */}
      <div className="lg:col-span-2 space-y-6">
        <h3 className="text-lg font-semibold dark:text-white text-gray-900">{summary.title}</h3>
        
        <div className="dark:bg-[#0B0C10] bg-white rounded-xl border dark:border-gray-800 border-gray-200 p-6 shadow-lg sticky top-24">
           <div className="space-y-2 mb-6">
              {/* Base Fee */}
              <LineItem 
                label={FEES.BASE.label} 
                price={FEES.BASE.price} 
                oldPrice={FEES.BASE.oldPrice} 
              />

              {/* Revoke Mint Fee */}
              {formData.revokeMint && (
                <LineItem 
                  label={FEES.REVOKE_MINT.label} 
                  price={FEES.REVOKE_MINT.price} 
                  oldPrice={FEES.REVOKE_MINT.oldPrice} 
                />
              )}

              {/* Revoke Freeze Fee (If !authority) */}
              {!formData.freezeAuthority && (
                <LineItem 
                  label={FEES.REVOKE_FREEZE.label} 
                  price={FEES.REVOKE_FREEZE.price} 
                  oldPrice={FEES.REVOKE_FREEZE.oldPrice} 
                />
              )}

               {/* Revoke Update Fee (If immutable) */}
              {formData.immutable && (
                <LineItem 
                  label={FEES.REVOKE_UPDATE.label} 
                  price={FEES.REVOKE_UPDATE.price} 
                  oldPrice={FEES.REVOKE_UPDATE.oldPrice} 
                />
              )}
           </div>

           {/* Total Divider */}
           <div className="border-t-2 border-dashed dark:border-gray-800 border-gray-200 pt-4">
             <div className="flex justify-between items-center mb-1">
                <span className="font-bold dark:text-white text-gray-900">{summary.total}</span>
                <div className="flex flex-col items-end">
                  {hasTotalDiscount && (
                    <span className="text-sm text-gray-400 line-through decoration-gray-500 mb-0.5">
                      {totalOldCost} SOL
                    </span>
                  )}
                  <span className="text-xl font-bold text-solana-green">{totalCost} SOL</span>
                </div>
             </div>
             <p className="text-xs text-right text-gray-500 dark:text-gray-400">
               Includes Network & Storage Fees
             </p>
           </div>
        </div>
      </div>

    </div>
  );
};
