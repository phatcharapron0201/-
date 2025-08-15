
import React, { useState } from 'react';
import { NPC } from '../types';

interface BirthAnnouncementModalProps {
  onNameChild: (name: string, gender: 'male' | 'female') => void;
  onClose: () => void;
  allNpcs: NPC[];
}

const BirthAnnouncementModal: React.FC<BirthAnnouncementModalProps> = ({ onNameChild, onClose, allNpcs }) => {
    const [childName, setChildName] = useState('');
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!childName.trim()) return;

        if (allNpcs.some(npc => npc.name === childName.trim())) {
            setError(`ชื่อ "${childName.trim()}" มีอยู่แล้วในเกม โปรดเลือกชื่ออื่น`);
            return;
        }
        
        onNameChild(childName.trim(), gender);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-fade-in p-4">
            <div className="bg-red-950/90 backdrop-blur-lg border-2 border-main rounded-xl shadow-2xl w-full max-w-lg relative text-white transform scale-100 animate-jump-in">
                <button onClick={onClose} className="absolute top-2 right-3 text-yellow-200 hover:text-white text-3xl z-10">&times;</button>
                <div className="relative p-8">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-yellow-300 mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] tracking-wider">
                        ทายาทได้ถือกำเนิดแล้ว!
                    </h2>
                    <p className="text-center text-yellow-100 mt-2 mb-6">
                        หลังจากการรอคอยอันยาวนาน ในที่สุดคุณก็ได้ให้กำเนิดสายเลือดใหม่
                    </p>

                    <form onSubmit={handleSubmit}>
                        {error && <p className="bg-red-500/50 text-white p-3 rounded-md mb-4 text-center">{error}</p>}
                        <div className="mb-6">
                            <label className="block text-lg font-semibold text-yellow-200 mb-3">เลือกเพศของทายาท:</label>
                             <div className="flex justify-center gap-4">
                                <button type="button" onClick={() => setGender('male')} className={`px-6 py-3 rounded-lg border-2 transition-all ${gender === 'male' ? 'bg-blue-600 border-blue-400 scale-110' : 'bg-blue-800/70 border-blue-600'}`}>
                                    ♂️ ชาย
                                </button>
                                <button type="button" onClick={() => setGender('female')} className={`px-6 py-3 rounded-lg border-2 transition-all ${gender === 'female' ? 'bg-pink-600 border-pink-400 scale-110' : 'bg-pink-800/70 border-pink-600'}`}>
                                    ♀️ หญิง
                                </button>
                            </div>
                        </div>

                        <div className="mb-8">
                             <label htmlFor="child-name" className="block text-lg font-semibold text-yellow-200 mb-2">จงตั้งชื่อให้ทายาทของคุณ:</label>
                            <input
                                id="child-name"
                                type="text"
                                value={childName}
                                onChange={(e) => setChildName(e.target.value)}
                                placeholder="กรอกชื่อทายาท..."
                                className="w-full bg-red-900/80 border-2 border-yellow-500/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors text-white placeholder-gray-400"
                                required
                            />
                        </div>
                        
                        <button
                            type="submit"
                            disabled={!childName.trim()}
                            className="w-full mt-4 bg-gradient-to-b from-yellow-600 to-yellow-500 text-red-900 font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:from-gray-600 disabled:to-gray-500 disabled:text-white disabled:cursor-not-allowed disabled:scale-100 shadow-lg"
                        >
                            ยืนยัน
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BirthAnnouncementModal;
