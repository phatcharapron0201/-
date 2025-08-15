
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-yellow-400"></div>
    </div>
  );
};

export default LoadingSpinner;
