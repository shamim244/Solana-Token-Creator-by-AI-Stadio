
/**
 * Service to handle Real Wallet Connections via Window Object
 */

export const getProvider = () => {
  if (typeof window === "undefined") return null;

  // 1. Standard Solana Provider (Phantom, Solflare, Backpack, etc.)
  if ("solana" in window) {
    const provider = (window as any).solana;
    
    // If it has a connect method, we assume it's a valid provider
    if (provider && provider.isPhantom) return provider;
    if (provider && provider.isSolflare) return provider;
    if (provider && typeof provider.connect === "function") return provider;
  }

  // 2. Fallback for legacy Phantom injection
  if ("phantom" in window) {
    return (window as any).phantom?.solana;
  }

  return null;
};

export const connectRealWallet = async (): Promise<string> => {
  const provider = getProvider();
  
  if (!provider) {
    // If on mobile, deep link to Phantom
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
       window.open('https://phantom.app/ul/browse/' + encodeURIComponent(window.location.href), '_blank');
       throw new Error("Redirecting to Phantom app...");
    }
    
    window.open('https://phantom.app/', '_blank');
    throw new Error("Wallet provider not found. Please install Phantom or Solflare.");
  }

  try {
    // Request connection to the wallet
    const resp = await provider.connect();
    return resp.publicKey.toString();
  } catch (err: any) {
    console.error("Wallet Connection Error:", err);
    if (err.code === 4001) {
        throw new Error("Connection request rejected by user.");
    }
    throw new Error("Failed to connect to wallet. " + (err.message || ""));
  }
};

export const disconnectRealWallet = async () => {
  const provider = getProvider();
  if (provider) {
    try {
        await provider.disconnect();
    } catch (e) {
        console.error("Disconnect error", e);
    }
  }
};

/**
 * Checks if the wallet is already connected (trusted state).
 * Useful for auto-connecting on page reload.
 */
export const checkWalletConnection = async (): Promise<string | null> => {
    const provider = getProvider();
    if (!provider) return null;

    try {
        // 'onlyIfTrusted' prevents the popup if the user hasn't previously connected
        const resp = await provider.connect({ onlyIfTrusted: true });
        return resp.publicKey.toString();
    } catch (error) {
        // User is not connected or has revoked permissions
        return null;
    }
}
