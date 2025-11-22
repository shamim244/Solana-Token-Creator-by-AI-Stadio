
import React from 'react';

interface PriceBadgeProps {
  price: number;
  oldPrice?: number;
  className?: string;
}

export const PriceBadge: React.FC<PriceBadgeProps> = ({ price, oldPrice, className = "" }) => {
  const hasDiscount = oldPrice && oldPrice > price;
  
  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      {hasDiscount && (
        <span className="text-[11px] text-gray-400 line-through decoration-gray-400/50">
          {oldPrice} SOL
        </span>
      )}
      <span className="text-[11px] font-bold text-solana-green bg-solana-green/10 px-2 py-0.5 rounded border border-solana-green/20 whitespace-nowrap shadow-sm">
        +{price} SOL
      </span>
    </div>
  );
};
