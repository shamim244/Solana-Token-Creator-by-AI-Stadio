
import React from 'react';
import { WalletButton } from './WalletButton';
import { WalletState, Network, View, Theme } from '../types';
import { Box, Menu, X, Sun, Moon } from 'lucide-react';
import { CONTENT } from '../content';

interface NavbarProps {
  wallet: WalletState;
  network: Network;
  currentView: View;
  theme: Theme;
  onConnect: () => void; // Legacy prop, we use handleConnectParent now
  handleConnectParent?: (key: string) => void; // New prop for real key
  onDisconnect: () => void;
  onNetworkChange: (n: Network) => void;
  onNavigate: (view: View) => void;
  onThemeToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  wallet, 
  network, 
  currentView,
  theme,
  onConnect, 
  handleConnectParent,
  onDisconnect, 
  onNetworkChange,
  onNavigate,
  onThemeToggle
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems: { id: View; label: string }[] = [
    { id: 'home', label: CONTENT.navbar.home },
    { id: 'create', label: CONTENT.navbar.create },
    { id: 'faq', label: CONTENT.navbar.faq },
    { id: 'contact', label: CONTENT.navbar.contact },
  ];

  return (
    <nav className="border-b dark:border-gray-800 border-gray-200 dark:bg-[#050505]/80 bg-white/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="bg-gradient-to-tr from-solana-green to-solana-purple p-2 rounded-lg">
            <Box className="text-black w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block dark:text-white text-gray-900">
             {CONTENT.appName.replace(CONTENT.appNameHighlight, '')}<span className="text-transparent bg-clip-text bg-gradient-to-r from-solana-green to-solana-purple">{CONTENT.appNameHighlight}</span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`text-sm font-medium transition-colors ${
                currentView === item.id 
                  ? 'dark:text-white text-black' 
                  : 'dark:text-gray-400 text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={onThemeToggle}
            className="p-2 rounded-full dark:bg-gray-800 bg-gray-100 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="flex dark:bg-[#0B0C10] bg-gray-100 rounded-full p-1 border dark:border-gray-800 border-gray-200">
            {Object.values(Network).filter(n => n !== 'testnet').map((n) => (
              <button
                key={n}
                onClick={() => onNetworkChange(n)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                  network === n 
                    ? 'dark:bg-gray-700 bg-white text-black dark:text-white shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {n === Network.DEVNET ? 'Devnet' : 'Mainnet'}
              </button>
            ))}
          </div>
          <WalletButton 
            wallet={wallet} 
            onConnect={onConnect} 
            onConnectSuccess={handleConnectParent}
            onDisconnect={onDisconnect} 
          />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button 
            onClick={onThemeToggle}
            className="p-2 rounded-full dark:bg-gray-800 bg-gray-100 text-gray-500 dark:text-gray-400"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            className="p-2 dark:text-gray-400 text-gray-600 hover:text-black dark:hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden dark:bg-[#0B0C10] bg-white border-b dark:border-gray-800 border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentView === item.id 
                    ? 'dark:bg-gray-800 bg-gray-100 dark:text-white text-black' 
                    : 'dark:text-gray-300 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 flex flex-col gap-4">
               <div className="flex dark:bg-[#000] bg-gray-100 rounded-full p-1 border dark:border-gray-800 border-gray-200 w-fit">
                {Object.values(Network).filter(n => n !== 'testnet').map((n) => (
                  <button
                    key={n}
                    onClick={() => onNetworkChange(n)}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                      network === n 
                        ? 'dark:bg-gray-700 bg-white text-black dark:text-white shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    {n === Network.DEVNET ? 'Devnet' : 'Mainnet'}
                  </button>
                ))}
              </div>
              <WalletButton 
                wallet={wallet} 
                onConnect={onConnect}
                onConnectSuccess={(key) => { handleConnectParent?.(key); setIsMobileMenuOpen(false); }}
                onDisconnect={() => { onDisconnect(); setIsMobileMenuOpen(false); }} 
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
