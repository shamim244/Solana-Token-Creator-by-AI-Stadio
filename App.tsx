
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './components/pages/Home';
import { Faq } from './components/pages/Faq';
import { Contact } from './components/pages/Contact';
import { CreateToken } from './components/pages/CreateToken';
import { WalletState, Network, View, Theme } from './types';
import { CONTENT } from './content';
import { ToastProvider } from './components/ui/Toast';
import { checkWalletConnection } from './services/wallet';

export default function App() {
  // --- Global State ---
  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
    publicKey: null,
    balance: 0
  });
  const [network, setNetwork] = useState<Network>(Network.DEVNET);
  const [currentView, setCurrentView] = useState<View>('home');
  
  // Theme State - Default to dark, check localStorage if needed
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return 'dark'; // Default preference
    }
    return 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // --- Auto Connect Effect ---
  useEffect(() => {
    const attemptAutoConnect = async () => {
        const connectedKey = await checkWalletConnection();
        if (connectedKey) {
            handleConnect(connectedKey);
        }
    };
    attemptAutoConnect();
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // --- Global Handlers ---
  
  // Updated to accept the real public key
  const handleConnect = (publicKey: string) => {
    // In a real app, you would fetch the balance here using connection.getBalance(publicKey)
    // For now, we set a default placeholder balance or 0 until the Transaction logic runs
    setWallet({ 
        connected: true, 
        publicKey: publicKey, 
        balance: 0 // You can implement real balance fetching in the next step
    });
  };

  const handleDisconnect = () => {
    setWallet({ connected: false, publicKey: null, balance: 0 });
  };

  // --- Routing ---
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home onNavigate={setCurrentView} />;
      case 'create':
        return <CreateToken wallet={wallet} network={network} />;
      case 'faq':
        return <Faq />;
      case 'contact':
        return <Contact />;
      default:
        return <Home onNavigate={setCurrentView} />;
    }
  };

  return (
    <ToastProvider>
      <div className={`${theme === 'dark' ? 'dark' : ''}`}>
        <div className="min-h-screen flex flex-col dark:bg-[#050505] bg-slate-50 dark:text-gray-200 text-gray-900 font-sans selection:bg-solana-green/30 transition-colors duration-300">
          <Navbar 
            wallet={wallet} 
            network={network}
            currentView={currentView}
            theme={theme}
            onConnect={() => {}} // Passed down but handled via WalletButton internal logic lifting state up
            onDisconnect={handleDisconnect}
            onNetworkChange={setNetwork}
            onNavigate={setCurrentView}
            onThemeToggle={toggleTheme}
            // We pass the state setter to Navbar -> WalletButton so it can update App state
            // Alternatively, we can pass a specific callback:
            handleConnectParent={handleConnect} 
          />

          <main className="flex-grow">
            {renderView()}
          </main>
          
          <footer className="dark:bg-[#0B0C10] bg-white py-12 border-t dark:border-gray-800 border-gray-200 transition-colors duration-300">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                   <span className="font-bold text-xl tracking-tight dark:text-white text-gray-900">
                    {CONTENT.appName.replace(CONTENT.appNameHighlight, '')}<span className="text-transparent bg-clip-text bg-gradient-to-r from-solana-green to-solana-purple">{CONTENT.appNameHighlight}</span>
                  </span>
                  <p className="text-sm text-gray-500 mt-2">{CONTENT.footer.tagline}</p>
                </div>
                
                <div className="flex gap-8 text-sm dark:text-gray-400 text-gray-600">
                  <button onClick={() => setCurrentView('home')} className="dark:hover:text-white hover:text-black transition">{CONTENT.footer.links.home}</button>
                  <button onClick={() => setCurrentView('create')} className="dark:hover:text-white hover:text-black transition">{CONTENT.footer.links.create}</button>
                  <button onClick={() => setCurrentView('faq')} className="dark:hover:text-white hover:text-black transition">{CONTENT.footer.links.faq}</button>
                  <button onClick={() => setCurrentView('contact')} className="dark:hover:text-white hover:text-black transition">{CONTENT.footer.links.contact}</button>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t dark:border-gray-800 border-gray-200 text-center text-xs text-gray-500">
                <p>{CONTENT.footer.copyright}</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </ToastProvider>
  );
}
