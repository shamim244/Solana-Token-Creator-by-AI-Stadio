
import React from 'react';
import { Wallet, Loader2, LogOut } from 'lucide-react';
import { WalletState } from '../types';
import { useToast } from './ui/Toast';
import { connectRealWallet, disconnectRealWallet } from '../services/wallet';

interface WalletButtonProps {
  wallet: WalletState;
  onConnect: () => void; // Legacy for UI toggles if needed
  onConnectSuccess?: (publicKey: string) => void; // Callback with real key
  onDisconnect: () => void;
}

export const WalletButton: React.FC<WalletButtonProps> = ({ wallet, onConnect, onConnectSuccess, onDisconnect }) => {
  const [loading, setLoading] = React.useState(false);
  const { showToast } = useToast();

  const handleConnect = async () => {
    setLoading(true);
    
    try {
      // Trigger Real Wallet Connection
      const pubKey = await connectRealWallet();
      
      if (pubKey) {
         if (onConnectSuccess) {
             onConnectSuccess(pubKey);
         } else {
             // Fallback if parent handler not provided (shouldn't happen)
             onConnect();
         }
         showToast("Wallet connected!", "success");
      }
    } catch (error: any) {
      console.error(error);
      const msg = error?.message || "Failed to connect wallet";
      // Clean up error message for display
      const displayMsg = msg.includes("rejected") ? "Connection request rejected" : msg;
      showToast(displayMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
        await disconnectRealWallet();
    } catch(e) {
        console.warn("Disconnect warning", e);
    }
    onDisconnect();
    showToast("Wallet disconnected", "info");
  };

  if (wallet.connected && wallet.publicKey) {
    return (
      <button
        onClick={handleDisconnect}
        className="group relative flex items-center gap-2 px-4 py-2 bg-[#1A1C23] border border-gray-700 rounded-full hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300"
      >
        <div className="w-2 h-2 rounded-full bg-solana-green animate-pulse group-hover:bg-red-500"></div>
        <span className="text-sm font-medium font-mono text-gray-200 group-hover:text-red-400">
          {wallet.publicKey.slice(0, 4)}...{wallet.publicKey.slice(-4)}
        </span>
        <LogOut className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity absolute right-4" />
      </button>
    );
  }

  return (
    <button
      onClick={handleConnect}
      disabled={loading}
      className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-solana-purple to-blue-600 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-70 shadow-lg shadow-solana-purple/20 text-white"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Wallet className="w-4 h-4" />
      )}
      {loading ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
};
