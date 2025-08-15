
import React from 'react';
import { Shichen } from '../types';
import { SHICHEN_CYCLE } from '../constants';

interface TimeDisplayProps {
  shichen: Shichen;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ shichen }) => {
  const timeInfo = SHICHEN_CYCLE.find(s => s.name === shichen);

  if (!timeInfo) return null;

  return (
    <div 
        className="fixed top-4 left-4 z-20 bg-black/50 backdrop-blur-md text-white py-2 px-4 rounded-lg shadow-lg flex items-center gap-3 border border-yellow-500/30"
        title={`ยาม${timeInfo.name} (${timeInfo.period})`}
    >
      <span className="text-2xl">{timeInfo.icon}</span>
      <div>
        <div className="font-bold text-xl text-yellow-200 font-serif-sc">
            ยาม{timeInfo.name}
        </div>
        <div className="text-xs text-gray-300">
            {timeInfo.period}
        </div>
      </div>
    </div>
  );
};

export default TimeDisplay;
