
import React from 'react';
import { Mail, MessageSquare, Twitter, Send } from 'lucide-react';
import { CONTENT } from '../../content';

export const Contact: React.FC = () => {
  const { title, subtitle, cards, form } = CONTENT.contact;

  const [formState, setFormState] = React.useState({
    name: '',
    email: '',
    message: ''
  });
  const [sent, setSent] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate send
    setTimeout(() => setSent(true), 1000);
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Info Side */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold dark:text-white text-gray-900 mb-4">{title}</h1>
            <p className="dark:text-gray-400 text-gray-600 text-lg">
              {subtitle}
            </p>
          </div>

          <div className="space-y-6">
            <ContactCard 
              icon={<Mail className="text-solana-green" />}
              title={cards.email.title}
              detail={cards.email.detail}
              sub={cards.email.sub}
            />
            <ContactCard 
              icon={<Twitter className="text-blue-500 dark:text-blue-400" />}
              title={cards.twitter.title}
              detail={cards.twitter.detail}
              sub={cards.twitter.sub}
            />
            <ContactCard 
              icon={<MessageSquare className="text-indigo-500 dark:text-indigo-400" />}
              title={cards.discord.title}
              detail={cards.discord.detail}
              sub={cards.discord.sub}
            />
          </div>
        </div>

        {/* Form Side */}
        <div className="dark:bg-[#0B0C10] bg-white p-8 rounded-2xl border dark:border-gray-800 border-gray-200 shadow-sm transition-colors">
          {sent ? (
             <div className="h-full flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]">
               <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-solana-green">
                 <Send size={32} />
               </div>
               <h3 className="text-2xl font-bold dark:text-white text-gray-900">{form.success.title}</h3>
               <p className="dark:text-gray-400 text-gray-600">{form.success.desc}</p>
               <button 
                  onClick={() => { setSent(false); setFormState({name: '', email: '', message: ''}) }}
                  className="mt-4 text-sm text-solana-purple hover:underline"
               >
                 {form.success.reset}
               </button>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-2xl font-bold dark:text-white text-gray-900 mb-6">{form.title}</h3>
              
              <div>
                <label className="block text-sm font-medium dark:text-gray-400 text-gray-700 mb-2">{form.fields.name}</label>
                <input 
                  type="text" 
                  required
                  className="w-full dark:bg-gray-900 bg-gray-50 border dark:border-gray-700 border-gray-300 rounded-lg px-4 py-3 dark:text-white text-gray-900 focus:border-solana-purple focus:ring-1 focus:ring-solana-purple outline-none transition"
                  placeholder={form.fields.namePlaceholder}
                  value={formState.name}
                  onChange={e => setFormState({...formState, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium dark:text-gray-400 text-gray-700 mb-2">{form.fields.email}</label>
                <input 
                  type="email" 
                  required
                  className="w-full dark:bg-gray-900 bg-gray-50 border dark:border-gray-700 border-gray-300 rounded-lg px-4 py-3 dark:text-white text-gray-900 focus:border-solana-purple focus:ring-1 focus:ring-solana-purple outline-none transition"
                  placeholder={form.fields.emailPlaceholder}
                  value={formState.email}
                  onChange={e => setFormState({...formState, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium dark:text-gray-400 text-gray-700 mb-2">{form.fields.message}</label>
                <textarea 
                  required
                  className="w-full dark:bg-gray-900 bg-gray-50 border dark:border-gray-700 border-gray-300 rounded-lg px-4 py-3 dark:text-white text-gray-900 focus:border-solana-purple focus:ring-1 focus:ring-solana-purple outline-none transition h-32 resize-none"
                  placeholder={form.fields.messagePlaceholder}
                  value={formState.message}
                  onChange={e => setFormState({...formState, message: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                className="w-full py-4 dark:bg-white bg-black dark:text-black text-white font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                {form.submit} <Send size={18} />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

const ContactCard = ({ icon, title, detail, sub }: any) => (
  <div className="flex items-start gap-4 p-4 rounded-lg dark:hover:bg-white/5 hover:bg-black/5 transition-colors">
    <div className="p-3 dark:bg-gray-800 bg-gray-200 rounded-lg">
      {icon}
    </div>
    <div>
      <h4 className="dark:text-white text-gray-900 font-semibold">{title}</h4>
      <p className="dark:text-gray-300 text-gray-700 font-medium">{detail}</p>
      <p className="text-sm dark:text-gray-500 text-gray-500 mt-1">{sub}</p>
    </div>
  </div>
);