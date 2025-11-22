
import { TokenFormState } from '../types';
import { FEES } from '../constants';

/**
 * Calculates the total actual cost (discounted) of token creation based on selected options.
 */
export const calculateTotalFees = (formData: TokenFormState): number => {
  let total = FEES.BASE.price;

  // Revoke Mint Fee
  if (formData.revokeMint) {
    total += FEES.REVOKE_MINT.price;
  }
  
  // Revoke Freeze Fee (If freezeAuthority is FALSE, it is revoked)
  if (!formData.freezeAuthority) {
    total += FEES.REVOKE_FREEZE.price;
  }
  
  // Revoke Update Fee (If immutable is TRUE, update is revoked)
  if (formData.immutable) {
    total += FEES.REVOKE_UPDATE.price;
  }

  return parseFloat(total.toFixed(4));
};

/**
 * Calculates the total original cost (before discounts) to show savings.
 */
export const calculateTotalOldFees = (formData: TokenFormState): number => {
  let total = FEES.BASE.oldPrice || FEES.BASE.price;

  if (formData.revokeMint) {
    total += FEES.REVOKE_MINT.oldPrice || FEES.REVOKE_MINT.price;
  }
  
  if (!formData.freezeAuthority) {
    total += FEES.REVOKE_FREEZE.oldPrice || FEES.REVOKE_FREEZE.price;
  }
  
  if (formData.immutable) {
    total += FEES.REVOKE_UPDATE.oldPrice || FEES.REVOKE_UPDATE.price;
  }

  return parseFloat(total.toFixed(4));
};
