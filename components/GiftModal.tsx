import React from 'react';
import { NPC, InventoryItem } from '../types';

interface GiftModalProps {
  inventory: InventoryItem[];
  targetNpc: NPC;
  onGive: (item: InventoryItem, npc: NPC) => void;
  onClose: () => void;
}

const GiftModal: React.FC<GiftModalProps> = ({ inventory, targetNpc, onGive, onClose }) => {
    const giftableItems = inventory.filter(item => item.type === 'gift' || item.type === 'artifact');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 animate-fade-in p-4">
      <div className="bg-red-950/80 backdrop-blur-md border-2 border-main rounded-lg shadow-2xl p-2 w-full max-w-2xl relative text-white max-h-[80vh] flex flex-col">
        <div className="bg-red-800/60 rounded-md p-6 relative flex-grow flex flex-col min-h-0">
          <button onClick={onClose} className="absolute top-2 right-3 text-yellow-200 hover:text-white text-3xl z-10">&times;</button>
          
          <div className="text-center mb-6 flex-shrink-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-yellow-300 drop-shadow-md">มอบของขวัญ</h2>
              <p className="text-yellow-100 mt-2">
                เลือกไอเทมเพื่อมอบให้กับ <span className="font-semibold text-white">{targetNpc.name}</span>
              </p>
          </div>

          <div className="flex-grow overflow-y-auto pr-2">
            {giftableItems.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {giftableItems.map(item => (
                        <button
                        key={item.instanceId}
                        onClick={() => onGive(item, targetNpc)}
                        className={`p-3 border rounded-lg flex flex-col text-center transition-all duration-200 hover:scale-105
                            ${item.type === 'artifact' 
                                ? 'bg-purple-900/70 border-purple-600/50 hover:bg-purple-800'
                                : 'bg-pink-900/70 border-pink-600/50 hover:bg-pink-800'}
                        `}
                        >
                            <div className="text-4xl my-2 flex-grow flex items-center justify-center">{item.emoji}</div>
                            <div className="flex-shrink-0 w-full mt-1">
                                <span className={`font-semibold text-sm capitalize ${item.type === 'artifact' ? 'text-purple-200' : 'text-pink-200'}`}>{item.name}</span>
                                {item.favorabilityEffect && (
                                    <p className="text-xs text-gray-300 mt-1">
                                        ความพึงพอใจ +{item.favorabilityEffect}
                                    </p>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            ) : (
                 <div className="flex items-center justify-center h-full">
                    <p className="text-center text-gray-300 italic">คุณไม่มีของขวัญในสัมภาระ</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftModal;