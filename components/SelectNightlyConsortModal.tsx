import React from 'react';
import { NPC } from '../types';

interface SelectNightlyConsortModalProps {
  consorts: NPC[];
  onSelect: (consort: NPC) => void;
  onClose: () => void;
}

const SelectNightlyConsortModal: React.FC<SelectNightlyConsortModalProps> = ({ consorts, onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 animate-fade-in p-4">
      <div className="bg-red-950/80 backdrop-blur-md border-2 border-main rounded-lg shadow-2xl p-2 w-full max-w-2xl relative text-white max-h-[80vh] flex flex-col">
        <div className="bg-red-800/60 rounded-md p-6 relative flex-grow flex flex-col min-h-0">
          <button onClick={onClose} className="absolute top-2 right-3 text-yellow-200 hover:text-white text-3xl z-10">&times;</button>
          <div className="text-center mb-6 flex-shrink-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-yellow-300 drop-shadow-md">เลือกผู้ถวายงานคืนนี้</h2>
            <p className="text-yellow-100 mt-2">โปรดเลือกราชบุรุษที่ท่านประสงค์จะให้รับใช้</p>
          </div>
          <div className="flex-grow overflow-y-auto pr-2 grid grid-cols-2 md:grid-cols-3 gap-3">
            {consorts.filter(c => c.isAlive && !c.isImprisoned).map(consort => (
              <button
                key={consort.id}
                onClick={() => onSelect(consort)}
                className="p-3 border border-purple-600/50 rounded-lg flex flex-col text-center transition-all duration-200 hover:scale-105 bg-purple-900/70 hover:bg-purple-800"
              >
                <img src={consort.imageUrl} alt={consort.name} className="w-24 h-24 object-cover rounded-full mx-auto border-2 border-purple-400/50" />
                <div className="flex-shrink-0 w-full mt-2">
                  <span className="font-semibold text-sm capitalize text-purple-200">{consort.name}</span>
                  <p className="text-xs text-gray-300 mt-1">{consort.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectNightlyConsortModal;
