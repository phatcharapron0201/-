
import React from 'react';

interface FloatingActionButtonProps {
  onOpenInvestigation?: () => void;
  isInvestigationActive?: boolean;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onOpenInvestigation, isInvestigationActive }) => {
  if (!isInvestigationActive) {
    return null;
  }
  
  const baseClasses = "fixed bottom-24 right-4 z-20 w-16 h-16 text-white rounded-full shadow-lg flex items-center justify-center transform focus:outline-none transition-all duration-300 ease-in-out hover:scale-110";
  const investigationClasses = "bg-gradient-to-br from-indigo-600 to-purple-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-900 focus:ring-indigo-400 animate-pulse";
  
  return (
    <button
      onClick={onOpenInvestigation}
      title="เปิดแฟ้มคดี"
      aria-label="เปิดแฟ้มคดี"
      className={`${baseClasses} ${investigationClasses}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    </button>
  );
};

export default FloatingActionButton;