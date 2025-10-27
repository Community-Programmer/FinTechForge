import React from 'react';

interface EmptyStateProps {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
}

const ChatbotEmptyState: React.FC<EmptyStateProps> = ({ title, subtitle, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-48 h-48 mb-6 flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Chat bubble */}
          <path 
            d="M40,60 C40,40 60,40 80,40 L120,40 C140,40 160,40 160,60 L160,120 C160,140 140,160 120,160 L80,160 C60,160 40,140 40,120 Z" 
            fill="#e0e7ff" 
            stroke="#6366f1" 
            strokeWidth="4" 
          />
          {/* Speech bubble tail */}
          <path d="M70,160 L80,180 L90,160 Z" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
          {/* AI brain */}
          <path 
            d="M90,80 C95,75 105,75 110,80 C115,85 110,90 110,95 C105,100 95,100 90,95 C85,90 90,85 90,80 Z" 
            fill="#8b5cf6" 
          />
          {/* Dots */}
          <circle cx="80" cy="70" r="5" fill="#8b5cf6" />
          <circle cx="120" cy="70" r="5" fill="#8b5cf6" />
          <circle cx="75" cy="110" r="5" fill="#8b5cf6" />
          <circle cx="125" cy="110" r="5" fill="#8b5cf6" />
          {/* Thought bubbles */}
          <circle cx="140" cy="50" r="10" fill="#c4b5fd" />
          <circle cx="150" cy="40" r="6" fill="#c4b5fd" />
          <circle cx="158" cy="32" r="3" fill="#c4b5fd" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">{subtitle}</p>
    </div>
  );
};

export default ChatbotEmptyState;