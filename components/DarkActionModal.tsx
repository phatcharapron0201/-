import React, { useState } from 'react';
import { NPC, PlayerProfile } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface DarkActionModalProps {
  player: PlayerProfile;
  targetNpc: NPC;
  onConfirm: (targetNpc: NPC) => void;
  onClose: () => void;
  isLoading: boolean;
}

const DarkActionModal: React.FC<DarkActionModalProps> = ({ player, targetNpc, onConfirm, onClose, isLoading }) => {
    
    // Simple estimation of success chance for UI display
    const successChance = Math.max(10, Math.min(90, 20 + (player.intelligence + player.power - 50) / 20));

    const handleSubmit = () => {
        if (isLoading) return;
        onConfirm(targetNpc);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-fade-in p-4">
            <div className="bg-gray-900/90 backdrop-blur-lg border-2 border-red-800 rounded-xl shadow-2xl w-full max-w-xl relative text-white transform scale-100 animate-jump-in">
                 <button onClick={onClose} disabled={isLoading} className="absolute top-2 right-3 text-gray-400 hover:text-white text-3xl z-10 disabled:opacity-50">&times;</button>
                 <div className="relative p-8">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-red-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] tracking-wider">
                            กระทำการมืด
                        </h2>
                        <p className="text-lg text-gray-300 mt-2">
                           คุณกำลังวางแผนทำร้าย <span className="font-bold text-white">{targetNpc.name}</span>
                        </p>
                    </div>

                    <div className="my-6 p-4 bg-black/40 border-l-4 border-red-700/50 rounded-r-lg">
                        <h3 className="text-lg font-bold text-red-300">เป้าหมาย: ลอบทำร้ายให้แท้ง</h3>
                        <p className="text-sm text-gray-300 mt-2">
                           การกระทำนี้ชั่วร้ายและมีความเสี่ยงสูงอย่างยิ่ง หากล้มเหลวและถูกจับได้ อาจหมายถึงความตายของคุณ
                        </p>
                        <p className="text-sm text-yellow-300 mt-3">
                           โอกาสสำเร็จโดยประมาณ: <span className="font-bold text-xl">{successChance.toFixed(0)}%</span> (ขึ้นอยู่กับสติปัญญาและอำนาจของคุณ)
                        </p>
                    </div>
                    
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center p-8">
                            <LoadingSpinner />
                            <p className="mt-4 text-yellow-200">กำลังลงมือ...</p>
                        </div>
                    ) : (
                        <div className="flex justify-around mt-8">
                            <button
                                onClick={handleSubmit}
                                className="w-2/3 px-8 py-3 bg-gradient-to-b from-red-800 to-red-700 text-white font-bold rounded-lg shadow-lg transform transition-transform hover:scale-105 border-2 border-red-600"
                            >
                                ยืนยันการลงมือ
                            </button>
                             <button
                                onClick={onClose}
                                className="px-6 py-3 bg-gradient-to-b from-gray-700 to-gray-600 text-white font-bold rounded-lg shadow-lg transform transition-transform hover:scale-105 border-2 border-gray-500"
                            >
                                ล้มเลิก
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DarkActionModal;