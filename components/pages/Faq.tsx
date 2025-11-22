
import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { CONTENT } from '../../content';

export const Faq: React.FC = () => {
  const { title, subtitle, items } = CONTENT.faq;

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl animate-fadeIn">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 dark:bg-gray-800 bg-gray-200 rounded-full mb-6 transition-colors">
          <HelpCircle className="w-8 h-8 text-solana-purple" />
        </div>
        <h1 className="text-4xl font-bold dark:text-white text-gray-900 mb-4">{title}</h1>
        <p className="dark:text-gray-400 text-gray-600">{subtitle}</p>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <FaqItem 
            key={index}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </div>
  );
};

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border dark:border-gray-800 border-gray-200 rounded-lg dark:bg-[#0B0C10] bg-white overflow-hidden transition-colors shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
      >
        <span className="font-semibold dark:text-white text-gray-900">{question}</span>
        <ChevronDown className={`dark:text-gray-400 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div 
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-48 py-4 border-t dark:border-gray-800 border-gray-200' : 'max-h-0'
        }`}
      >
        <p className="dark:text-gray-400 text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};
