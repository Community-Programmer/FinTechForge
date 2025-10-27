import React from 'react';

interface EmptyStateProps {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
}

const PortfolioEmptyState: React.FC<EmptyStateProps> = ({ title, subtitle, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-48 h-48 mb-6 flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Piggy Bank */}
          <path 
            d="M100,60 C120,60 140,80 140,100 C140,120 120,140 100,140 C80,140 60,120 60,100 C60,80 80,60 100,60 Z" 
            fill="#dbeafe" 
            stroke="#3b82f6" 
            strokeWidth="4" 
          />
          {/* Coin slot */}
          <rect x="90" y="85" width="20" height="8" rx="4" fill="#3b82f6" />
          {/* Coin */}
          <circle cx="120" cy="70" r="10" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="120" cy="70" r="5" fill="#f59e0b" />
          {/* Eyes */}
          <circle cx="85" cy="90" r="4" fill="#1e293b" />
          <circle cx="115" cy="90" r="4" fill="#1e293b" />
          {/* Smile */}
          <path d="M90,110 Q100,120 110,110" stroke="#1e293b" strokeWidth="2" fill="none" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">{subtitle}</p>
    </div>
  );
};

export default PortfolioEmptyState;