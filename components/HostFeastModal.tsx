import React, { useState, useMemo } from 'react';
import { NPC } from '../types';
import { FEAST_BASE_COST, FEAST_COST_PER_GUEST } from '../constants';

interface HostFeastModalProps {
  npcs: NPC[];
  playerMoney: number;
  onHostFeast: (selectedNpcs: NPC[]) => void;
  onClose: () => void;
}

const HostFeastModal: React.FC<HostFeastModalProps> = ({ npcs, playerMoney, onHostFeast, onClose }) => {
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
    
    const { totalCost, canAfford } = useMemo(() => {
        const cost = FEAST_BASE_COST + (selectedNpcIds.size * FEAST_COST_PER_GUEST);
        return { totalCost: cost, canAfford: playerMoney >= cost };
    }, [selectedNpcIds.size, playerMoney]);

    const handleConfirm = () => {
        const selectedNpcs = npcs.filter(npc => selectedNpcIds.has(npc.id));
        if (selectedNpcs.length >= 2 && canAfford) {
            onHostFeast(selectedNpcs);
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
                        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-300 drop-shadow-md">จัดงานเลี้ยง</h2>
                        <p className="text-yellow-100 mt-2">เลือกเชิญแขก (อย่างน้อย 2 คน) เพื่อมาร่วมงานเลี้ยงของคุณ</p>
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
                    
                    <div className="mt-6 flex-shrink-0 bg-black/30 p-4 rounded-lg">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-300">ค่าใช้จ่ายพื้นฐาน:</span>
                            <span className="text-white font-semibold">💰 {FEAST_BASE_COST.toLocaleString()}</span>
                        </div>
                         <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-300">ค่าใช้จ่ายต่อแขก ({selectedNpcIds.size} คน):</span>
                            <span className="text-white font-semibold">💰 {(selectedNpcIds.size * FEAST_COST_PER_GUEST).toLocaleString()}</span>
                        </div>
                        <div className="border-t border-yellow-700/50 my-2"></div>
                         <div className="flex justify-between items-center text-lg">
                            <span className="text-yellow-200 font-bold">รวมทั้งสิ้น:</span>
                            <span className={`font-bold ${canAfford ? 'text-yellow-200' : 'text-red-400'}`}>💰 {totalCost.toLocaleString()}</span>
                        </div>
                         <div className="text-right text-xs mt-1 text-gray-400">
                            (เงินของคุณ: 💰 {playerMoney.toLocaleString()})
                        </div>
                    </div>
                    <div className="mt-4 flex-shrink-0">
                        <button 
                            onClick={handleConfirm}
                            disabled={selectedNpcIds.size < 2 || !canAfford}
                            className="w-full bg-gradient-to-r from-yellow-600 to-yellow-400 text-red-900 font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:from-gray-500 disabled:to-gray-400 disabled:cursor-not-allowed disabled:scale-100 shadow-lg"
                        >
                            {selectedNpcIds.size < 2 ? "ต้องเลือกแขกอย่างน้อย 2 คน" : !canAfford ? "เงินไม่พอ" : `ยืนยันการจัดงานเลี้ยง (${selectedNpcIds.size} คน)`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HostFeastModal;