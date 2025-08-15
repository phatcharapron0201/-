import React from 'react';
import { Investigation, NPC } from '../types';

interface InvestigationModalProps {
  investigation: Investigation;
  npcs: NPC[];
  onAccuse: (npcId: string) => void;
  onClose: () => void;
}

const InvestigationModal: React.FC<InvestigationModalProps> = ({ investigation, npcs, onAccuse, onClose }) => {
  const { caseTitle, caseDescription, suspects, clues } = investigation;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-fade-in p-4">
      <div className="bg-gray-900/90 backdrop-blur-lg border-2 border-yellow-500/80 rounded-xl shadow-2xl w-full max-w-2xl relative text-white transform scale-100 animate-jump-in max-h-[90vh] flex flex-col">
        <button onClick={onClose} className="absolute top-2 right-3 text-yellow-200 hover:text-white text-3xl z-10">&times;</button>
        <div className="relative p-8 flex flex-col flex-grow overflow-hidden">
          
          {/* Header */}
          <div className="text-center mb-6 flex-shrink-0">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-yellow-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] tracking-wider">
              กระดานสืบสวนคดี
            </h2>
            <p className="text-lg text-yellow-100 mt-2">{caseTitle}</p>
          </div>

          <div className="my-4 p-4 bg-black/40 border-l-4 border-yellow-600/50 rounded-r-lg flex-shrink-0">
            <p className="text-sm text-gray-300 leading-relaxed italic">
              {caseDescription}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow min-h-0">
            {/* Suspects */}
            <div className="flex flex-col min-h-0">
              <h3 className="text-xl font-semibold text-yellow-100 mb-3 flex-shrink-0">ผู้ต้องสงสัย</h3>
              <div className="flex-grow overflow-y-auto pr-2 space-y-3">
                {suspects.map(suspect => (
                  <div key={suspect.npcId} className="w-full text-left p-3 bg-red-900/70 text-white rounded-lg shadow-md border border-red-700/60 flex justify-between items-center">
                    <span className="font-semibold">{suspect.npcName}</span>
                    <button 
                        onClick={() => onAccuse(suspect.npcId)}
                        className="text-sm bg-red-700 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
                    >
                        ชี้ตัว
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Clues */}
            <div className="flex flex-col min-h-0">
              <h3 className="text-xl font-semibold text-yellow-100 mb-3 flex-shrink-0">เบาะแสที่รวบรวมได้</h3>
              <div className="flex-grow overflow-y-auto pr-2">
                {clues.length > 0 ? (
                    <ul className="space-y-2 list-disc list-inside text-gray-200">
                        {clues.map((clue, index) => <li key={index}>{clue}</li>)}
                    </ul>
                ) : (
                    <p className="italic text-gray-400">ยังไม่มีเบาะแส...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestigationModal;