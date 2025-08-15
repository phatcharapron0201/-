import React from 'react';
import { NPC } from '../types';

interface AffairConfirmationModalProps {
  npc: NPC;
  onConfirm: () => void;
  onCancel: () => void;
}

const AffairConfirmationModal: React.FC<AffairConfirmationModalProps> = ({ npc, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-fade-in p-4">
      <div className="bg-red-950/90 backdrop-blur-lg border-2 border-rose-400 rounded-xl shadow-2xl w-full max-w-lg relative text-white transform scale-100 animate-jump-in">
        <div className="relative p-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-rose-300 mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] tracking-wider">
            ความสัมพันธ์ต้องห้าม
          </h2>
          <div className="my-6 text-center">
            <p className="text-lg text-rose-100 leading-relaxed">
              หลังจากการสนทนาที่แสนพิเศษ, <span className="font-bold text-white">{npc.name}</span> ได้แสดงความรู้สึกที่ลึกซึ้งเกินกว่าเพื่อนออกมา...
            </p>
            <p className="text-xl font-semibold text-white my-4 p-4 bg-black/30 border border-rose-600/50 rounded-lg">
              นี่คือการก้าวข้ามเส้นที่ไม่อาจหวนคืน หากความลับนี้ถูกเปิดโปง อาจหมายถึงจุดจบของทุกสิ่ง
            </p>
            <p className="text-lg text-rose-100 leading-relaxed">
              คุณจะยอมเสี่ยงเพื่อความรักต้องห้ามนี้หรือไม่?
            </p>
          </div>
          <div className="flex justify-around mt-8">
            <button
              onClick={onConfirm}
              className="px-8 py-3 bg-gradient-to-b from-rose-600 to-rose-500 text-white font-bold rounded-lg shadow-lg transform transition-transform hover:scale-110 border-2 border-rose-400"
            >
              ตอบรับ (เริ่มความสัมพันธ์ลับ)
            </button>
            <button
              onClick={onCancel}
              className="px-8 py-3 bg-gradient-to-b from-gray-800 to-gray-700 text-white font-bold rounded-lg shadow-lg transform transition-transform hover:scale-110 border-2 border-gray-600"
            >
              ปฏิเสธ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffairConfirmationModal;