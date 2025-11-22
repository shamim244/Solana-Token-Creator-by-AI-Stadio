
import React from 'react';
import { Rocket, Shield, Zap, Code, ArrowRight, Layout, Settings, Database } from 'lucide-react';
import { View } from '../../types';
import { CONTENT } from '../../content';

interface HomeProps {
  onNavigate: (view: View) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { hero, features, stats, cta } = CONTENT.home;

  // Map icon strings/IDs to components if needed, or just use index
  const getIcon = (id: string) => {
    switch(id) {
      case 'wizard': return <Layout className="text-blue-500 dark:text-blue-400" />;
      case 'storage': return <Database className="text-solana-purple" />;
      case 'auth': return <Shield className="text-solana-green" />;
      case 'deploy': return <Zap className="text-yellow-500 dark:text-yellow-400" />;
      case 'metadata': return <Settings className="text-pink-500 dark:text-pink-400" />;
      case 'devnet': return <Code className="text-cyan-500 dark:text-cyan-400" />;
      default: return <Rocket className="dark:text-white text-gray-900" />;
    }
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
           <div className="absolute top-20 left-1/4 w-96 h-96 bg-solana-purple/20 rounded-full blur-[128px]" />
           <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-solana-green/10 rounded-full blur-[128px]" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full dark:bg-white/5 bg-black/5 border dark:border-white/10 border-black/5 text-sm dark:text-gray-300 text-gray-600 mb-8 animate-fadeIn backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-solana-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-solana-green"></span>
            </span>
            {hero.badge}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold dark:text-white text-gray-900 mb-6 tracking-tight animate-slideUp">
            {hero.titlePrefix} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-solana-green to-solana-purple">
              {hero.titleHighlight}
            </span>
          </h1>
          
          <p className="text-xl dark:text-gray-400 text-gray-600 max-w-2xl mx-auto mb-10 animate-slideUp delay-100">
            {hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slideUp delay-200">
            <button 
              onClick={() => onNavigate('create')}
              className="px-8 py-4 bg-gradient-to-r from-solana-purple to-indigo-600 rounded-full text-white font-bold text-lg hover:shadow-lg hover:shadow-solana-purple/25 hover:scale-105 transition-all flex items-center gap-2"
            >
              {hero.primaryCta} <Rocket size={20} />
            </button>
            <button 
              onClick={() => onNavigate('faq')}
              className="px-8 py-4 dark:bg-[#1F2937] bg-white border dark:border-gray-700 border-gray-300 rounded-full dark:text-white text-gray-900 font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
            >
              {hero.secondaryCta}
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold dark:text-white text-gray-900 mb-4">{features.title}</h2>
          <p className="dark:text-gray-400 text-gray-600">{features.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.items.map((item) => (
            <FeatureCard 
              key={item.id}
              icon={getIcon(item.id)}
              title={item.title}
              description={item.desc}
            />
          ))}
        </div>
      </section>

      {/* Stats / Trust */}
      <section className="container mx-auto px-4 py-16 border-y dark:border-gray-800 border-gray-200 dark:bg-[#0B0C10]/50 bg-white/50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx}>
              <div className="text-4xl font-bold dark:text-white text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 text-center">
        <div className="bg-gradient-to-b dark:from-[#1F2937] dark:to-[#0B0C10] from-gray-100 to-white border dark:border-gray-800 border-gray-200 rounded-3xl p-12 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-solana-green/5 rounded-full blur-[64px]" />
          <h2 className="text-4xl font-bold dark:text-white text-gray-900 mb-6">{cta.title}</h2>
          <p className="dark:text-gray-400 text-gray-600 mb-8 max-w-xl mx-auto">
            {cta.subtitle}
          </p>
          <button 
             onClick={() => onNavigate('create')}
             className="px-10 py-4 dark:bg-white bg-black dark:text-black text-white rounded-full font-bold text-lg hover:opacity-80 transition-opacity inline-flex items-center gap-2"
          >
            {cta.button} <ArrowRight size={20} />
          </button>
        </div>
      </section>

    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="p-6 dark:bg-[#0B0C10] bg-white border dark:border-gray-800 border-gray-200 rounded-xl hover:border-gray-400 dark:hover:border-gray-600 transition-colors group shadow-sm">
    <div className="w-12 h-12 dark:bg-gray-900 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      {React.cloneElement(icon as React.ReactElement<any>, { size: 24 })}
    </div>
    <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-2">{title}</h3>
    <p className="dark:text-gray-400 text-gray-600 leading-relaxed">{description}</p>
  </div>
);
