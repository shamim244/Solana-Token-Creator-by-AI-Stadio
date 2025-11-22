
export enum Network {
  DEVNET = 'devnet',
  MAINNET = 'mainnet-beta',
  TESTNET = 'testnet'
}

export type View = 'home' | 'create' | 'faq' | 'contact';
export type Theme = 'light' | 'dark';

export interface TokenFormState {
  // Step 1: Basic & Visuals
  name: string;
  symbol: string;
  decimals: number;
  supply: number;
  description: string;
  image: File | null;
  imagePreviewUrl: string | null;

  // Step 2: Advanced Settings
  website: string;
  twitter: string;
  telegram: string;
  discord: string;
  tags: string[]; // Changed to array
  creatorAddress: string;

  // Authorities
  revokeMint: boolean;
  freezeAuthority: boolean; // true = has authority (default), false = revoked
  immutable: boolean; // true = immutable (revoked update), false = mutable (default)
}

export interface WalletState {
  connected: boolean;
  publicKey: string | null;
  balance: number;
}

export enum Step {
  BASIC = 1,
  ADVANCED = 2,
  REVIEW = 3,
  SUCCESS = 4
}

// Declare global window interface for Solana provider
declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      isSolflare?: boolean;
      isBackpack?: boolean;
      connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: { toString: () => string } }>;
      disconnect: () => Promise<void>;
      signTransaction: (tx: any) => Promise<any>;
      signAllTransactions: (txs: any[]) => Promise<any[]>;
      on: (event: string, callback: (args: any) => void) => void;
      removeListener: (event: string, callback: (args: any) => void) => void;
      request: (args: any) => Promise<any>;
    };
  }
}
