import React from 'react';

interface EmptyStateProps {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
}

const NewsEmptyState: React.FC<EmptyStateProps> = ({ title, subtitle, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-48 h-48 mb-6 flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Newspaper */}
          <rect x="30" y="40" width="140" height="120" rx="8" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="3" />
          {/* Lines */}
          <rect x="50" y="60" width="100" height="8" rx="4" fill="#0ea5e9" opacity="0.3" />
          <rect x="50" y="75" width="90" height="8" rx="4" fill="#0ea5e9" opacity="0.3" />
          <rect x="50" y="90" width="80" height="8" rx="4" fill="#0ea5e9" opacity="0.3" />
          <rect x="50" y="110" width="100" height="6" rx="3" fill="#0ea5e9" opacity="0.2" />
          <rect x="50" y="120" width="95" height="6" rx="3" fill="#0ea5e9" opacity="0.2" />
          <rect x="50" y="130" width="85" height="6" rx="3" fill="#0ea5e9" opacity="0.2" />
          {/* Headline */}
          <rect x="50" y="145" width="60" height="8" rx="4" fill="#0ea5e9" opacity="0.4" />
          {/* Magnifying Glass */}
          <circle cx="160" cy="60" r="15" fill="none" stroke="#0ea5e9" strokeWidth="3" />
          <line x1="170" y1="70" x2="180" y2="80" stroke="#0ea5e9" strokeWidth="3" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">{subtitle}</p>
    </div>
  );
};

export default NewsEmptyState;