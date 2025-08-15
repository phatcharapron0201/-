import React, { useState } from 'react';
import { NPC } from '../types';

interface GroupChatSetupModalProps {
  npcs: NPC[];
  onStartGroupChat: (selectedNpcs: NPC[]) => void;
  onClose: () => void;
  modalTitle?: string;
}

const GroupChatSetupModal: React.FC<GroupChatSetupModalProps> = ({ npcs, onStartGroupChat, onClose, modalTitle }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedNpcIds, setSelectedNpcIds] = useState<Set<string>>(new Set());

    const handleToggleNpc = (npcId: string) => {
        setSelectedNpcIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(npcId)) {
                newSet.delete(npcId);
            } else {
                newSet.add(npcId);
            }
            return newSet;
        });
    };

    const handleStart = () => {
        const selectedNpcs = npcs.filter(npc => selectedNpcIds.has(npc.id));
        if (selectedNpcs.length >= 1) { // Changed to 1 to allow court sessions with 1 minister
            onStartGroupChat(selectedNpcs);
        }
    };

    const filteredNpcs = npcs.filter(npc =>
        npc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 animate-fade-in p-4">
            <div className="bg-red-950/80 backdrop-blur-md border-2 border-main rounded-lg shadow-2xl p-2 w-full max-w-2xl relative text-white max-h-[80vh] flex flex-col">
                <div className="bg-red-800/60 rounded-md p-6 relative flex-grow flex flex-col min-h-0">
                    <button onClick={onClose} className="absolute top-2 right-3 text-yellow-200 hover:text-white text-3xl z-10">&times;</button>
                    
                    <div className="text-center mb-6 flex-shrink-0">
                        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-300 drop-shadow-md">{modalTitle || "เริ่มการสนทนากลุ่ม"}</h2>
                        <p className="text-yellow-100 mt-2">{modalTitle ? "เลือกผู้เข้าร่วม" : "เลือกตัวละครอย่างน้อย 2 คนเพื่อเริ่มพูดคุย"}</p>
                    </div>

                    <div className="mb-4 flex-shrink-0">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="ค้นหาชื่อตัวละคร..."
                            className="w-full bg-red-900/80 border-2 border-yellow-500/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors text-white placeholder-gray-400"
                            aria-label="ค้นหาตัวละคร"
                        />
                    </div>

                    <div className="flex-grow overflow-y-auto pr-2 grid grid-cols-2 md:grid-cols-3 gap-3">
                        {filteredNpcs.map(npc => {
                            const isSelected = selectedNpcIds.has(npc.id);
                            return (
                                <button
                                    key={npc.id}
                                    onClick={() => handleToggleNpc(npc.id)}
                                    className={`p-3 border rounded-lg flex flex-col items-center justify-center text-center transition-all duration-200 
                                        ${isSelected ? 'bg-green-800 border-green-500 scale-105' : 'bg-purple-900/70 border-purple-600/50 hover:bg-purple-800'}`
                                    }
                                >
                                    <span className="font-semibold text-sm capitalize text-purple-200">{npc.name}</span>
                                    <p className="text-xs text-gray-300 mt-1">{npc.title}</p>
                                </button>
                            );
                        })}
                    </div>
                    
                    <div className="mt-6 flex-shrink-0">
                        <button 
                            onClick={handleStart}
                            disabled={selectedNpcIds.size < (modalTitle ? 1 : 2)}
                            className="w-full bg-gradient-to-r from-yellow-600 to-yellow-400 text-red-900 font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:from-gray-500 disabled:to-gray-400 disabled:cursor-not-allowed disabled:scale-100 shadow-lg"
                        >
                            เริ่มสนทนา ({selectedNpcIds.size} คน)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupChatSetupModal;