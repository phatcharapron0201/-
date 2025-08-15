import React from 'react';
import { NPC } from '../types';

interface PregnancyConfirmationModalProps {
  npc: NPC;
  onConfirm: () => void;
  onCancel: () => void;
}

const PregnancyConfirmationModal: React.FC<PregnancyConfirmationModalProps> = ({ npc, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-fade-in p-4">
      <div className="bg-red-950/90 backdrop-blur-lg border-2 border-main rounded-xl shadow-2xl w-full max-w-lg relative text-white transform scale-100 animate-jump-in">
        <div className="relative p-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-yellow-300 mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] tracking-wider">
            ทายาทสืบสกุล
          </h2>
          <div className="my-6 text-center">
            <p className="text-lg text-yellow-100 leading-relaxed">
              หลังจากการสนทนาที่ลึกซึ้ง, <span className="font-bold text-white">{npc.name}</span> ได้แสดงความปรารถนาที่จะมีทายาทร่วมกับคุณ
            </p>
            <p className="text-xl font-semibold text-white my-4 p-4 bg-black/30 border border-yellow-600/50 rounded-lg">
              นี่อาจเป็นโอกาสในการสร้างสายสัมพันธ์ที่แน่นแฟ้นและเพิ่มบารมีของคุณในฐานะผู้ให้กำเนิดทายาท
            </p>
            <p className="text-lg text-yellow-100 leading-relaxed">
              คุณจะตอบรับความปรารถนานี้หรือไม่?
            </p>
          </div>
          <div className="flex justify-around mt-8">
            <button
              onClick={onConfirm}
              className="px-8 py-3 bg-gradient-to-b from-green-600 to-green-500 text-white font-bold rounded-lg shadow-lg transform transition-transform hover:scale-110 border-2 border-green-400"
            >
              ตอบรับ
            </button>
            <button
              onClick={onCancel}
              className="px-8 py-3 bg-gradient-to-b from-red-800 to-red-700 text-white font-bold rounded-lg shadow-lg transform transition-transform hover:scale-110 border-2 border-red-600"
            >
              ปฏิเสธ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PregnancyConfirmationModal;