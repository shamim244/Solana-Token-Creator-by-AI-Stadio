import { TokenFormState, Network } from './types';

// --- PRICING CONFIGURATION ---
// Change prices here. 'oldPrice' is the struck-through price, 'price' is the actual charge.
export const FEES = {
  BASE: { 
    id: 'base', 
    label: 'Token Creation Fee', 
    oldPrice: 0.5, 
    price: 0.1 
  },
  REVOKE_MINT: { 
    id: 'revoke_mint', 
    label: 'Revoke Mint Authority', 
    oldPrice: 0.2, 
    price: 0.1 
  },
  REVOKE_FREEZE: { 
    id: 'revoke_freeze', 
    label: 'Revoke Freeze Authority', 
    oldPrice: 0.2, 
    price: 0.1 
  },
  REVOKE_UPDATE: { 
    id: 'revoke_update', 
    label: 'Revoke Update Authority', 
    oldPrice: 0.2, 
    price: 0.1 
  }
};

export const DEFAULT_FORM_STATE: TokenFormState = {
  // Basic
  name: '',
  symbol: '',
  decimals: 9,
  supply: 1000000,
  description: '',
  image: null,
  imagePreviewUrl: null,

  // Advanced
  website: '',
  twitter: '',
  telegram: '',
  discord: '',
  tags: '',
  creatorAddress: '',

  // Authorities
  revokeMint: false,
  freezeAuthority: true, // Default: Authority retained
  immutable: false,      // Default: Mutable
};

export const NETWORKS = [
  { id: Network.DEVNET, name: 'Devnet', color: 'bg-green-500' },
  { id: Network.MAINNET, name: 'Mainnet Beta', color: 'bg-solana-purple' },
];

export const MOCK_WALLET_ADDRESS = "5UAQG...8kF2";