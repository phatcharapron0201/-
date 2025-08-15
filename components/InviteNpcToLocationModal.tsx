
import React, { useState } from 'react';
import { NPC, MapLocation } from '../types';

interface InviteNpcToLocationModalProps {
  location: MapLocation;
  npcs: NPC[];
  onInvite: (npc: NPC) => void;
  onClose: () => void;
  modalTitle?: string;
}

const InviteNpcToLocationModal: React.FC<InviteNpcToLocationModalProps> = ({ location, npcs, onInvite, onClose, modalTitle }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredNpcs = npcs.filter(npc =>
        npc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 animate-fade-in p-4">
            <div className="bg-red-950/80 backdrop-blur-md border-2 border-main rounded-lg shadow-2xl p-2 w-full max-w-2xl relative text-white max-h-[80vh] flex flex-col">
                <div className="bg-red-800/60 rounded-md p-6 relative flex-grow flex flex-col min-h-0">
                    <button onClick={onClose} className="absolute top-2 right-3 text-yellow-200 hover:text-white text-3xl z-10">&times;</button>
                    
                    <div className="text-center mb-6 flex-shrink-0">
                        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-300 drop-shadow-md">{modalTitle || "เชิญตัวละครมาพบ"}</h2>
                        <p className="text-yellow-100 mt-2">
                           ณ <span className="font-semibold text-white">{location.name}</span>
                        </p>
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

                    <div className="flex-grow overflow-y-auto pr-2">
                        {filteredNpcs.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {filteredNpcs.map(npc => (
                                    <button
                                        key={npc.id}
                                        onClick={() => onInvite(npc)}
                                        className="p-3 border border-purple-600/50 rounded-lg flex flex-col text-center transition-all duration-200 hover:scale-105 bg-purple-900/70 hover:bg-purple-800"
                                    >
                                        <div className="flex-shrink-0 w-full mt-1">
                                            <span className="font-semibold text-sm capitalize text-purple-200">{npc.name}</span>
                                            <p className="text-xs text-gray-300 mt-1">{npc.title}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-center text-gray-300 italic">ไม่พบตัวละครที่สามารถเชิญได้</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InviteNpcToLocationModal;
