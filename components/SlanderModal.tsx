import React, { useState } from 'react';
import { NPC } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface SlanderModalProps {
  targetNpc: NPC;
  onSlander: (rumor: string, targetNpc: NPC) => void;
  onClose: () => void;
  isLoading: boolean;
}

const SlanderModal: React.FC<SlanderModalProps> = ({ targetNpc, onSlander, onClose, isLoading }) => {
    const [rumor, setRumor] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!rumor.trim() || isLoading) return;
        onSlander(rumor, targetNpc);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-fade-in p-4">
            <div className="bg-red-950/90 backdrop-blur-lg border-2 border-indigo-500/80 rounded-xl shadow-2xl w-full max-w-xl relative text-white transform scale-100 animate-jump-in">
                 <button onClick={onClose} disabled={isLoading} className="absolute top-2 right-3 text-indigo-200 hover:text-white text-3xl z-10 disabled:opacity-50">&times;</button>
                 <div className="relative p-8">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-indigo-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] tracking-wider">
                            สร้างข่าวลือ / ใส่ร้าย
                        </h2>
                        <p className="text-lg text-indigo-100 mt-2">
                           คุณกำลังจะสร้างเรื่องราวเกี่ยวกับ <span className="font-bold text-white">{targetNpc.name}</span>
                        </p>
                    </div>

                    <div className="my-6 p-4 bg-black/40 border-l-4 border-indigo-600/50 rounded-r-lg">
                        <p className="text-sm text-gray-300">
                           สร้างข่าวลือที่น่าเชื่อถือเพื่อทำลายชื่อเสียงของเป้าหมาย แต่จงระวัง... หากแผนการของคุณถูกเปิดโปง ชื่อเสียงของคุณก็จะมลายไปเช่นกัน ความสำเร็จขึ้นอยู่กับสติปัญญาและอำนาจของคุณ
                        </p>
                    </div>
                    
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center p-8">
                            <LoadingSpinner />
                            <p className="mt-4 text-yellow-200">กำลังปล่อยข่าว...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <textarea
                                value={rumor}
                                onChange={(e) => setRumor(e.target.value)}
                                placeholder={`เช่น "ข้าเห็น ${targetNpc.name} แอบพบกับองครักษ์ในสวนหลวง..."`}
                                className="w-full h-32 bg-red-900/80 border-2 border-indigo-500/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors text-white placeholder-gray-400"
                                required
                                minLength={10}
                            />
                            <button
                                type="submit"
                                disabled={!rumor.trim() || rumor.length < 10}
                                className="w-full mt-6 bg-gradient-to-b from-indigo-600 to-indigo-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:from-gray-600 disabled:to-gray-500 disabled:text-white disabled:cursor-not-allowed disabled:scale-100 shadow-lg"
                            >
                                ยืนยันการใส่ร้าย
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SlanderModal;