import React from 'react';

interface DeathModalProps {
  onRebirth: () => void;
  onReincarnate: () => void;
}

const DeathModal: React.FC<DeathModalProps> = ({ onRebirth, onReincarnate }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-[100] animate-fade-in p-4">
      <div className="bg-gray-900/80 backdrop-blur-lg border-2 border-gray-600 rounded-xl shadow-2xl w-full max-w-xl relative text-white transform scale-100 animate-jump-in">
        <div className="relative p-8">
          <div className="text-center mb-6">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-red-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] tracking-wider">
              ชะตาขาด
            </h2>
            <p className="text-xl text-gray-300 mt-4">
              เรื่องราวของคุณได้จบลงแล้ว... แต่ดวงวิญญาณยังคงวนเวียน
            </p>
          </div>

          <div className="my-8 space-y-6">
            <div className="bg-black/40 p-5 rounded-lg border border-gray-700">
                <h3 className="text-2xl font-bold text-white">เกิดใหม่ (Rebirth)</h3>
                <p className="text-gray-300 mt-2">เริ่มต้นตำนานบทใหม่ทั้งหมด ตัวละคร, ความสัมพันธ์ และทุกสิ่งจะถูกลบเลือนไปตลอดกาล คุณจะกลายเป็นคนใหม่โดยสมบูรณ์</p>
                <button
                    onClick={() => onRebirth()}
                    className="w-full mt-4 py-3 bg-gradient-to-b from-white/20 to-white/10 text-white font-bold rounded-lg shadow-lg transform transition-transform hover:scale-105 border-2 border-white/30"
                >
                    เริ่มต้นใหม่
                </button>
            </div>
            <div className="bg-black/40 p-5 rounded-lg border border-purple-600">
                 <h3 className="text-2xl font-bold text-purple-300">กลับชาติมาเกิด (Reincarnate)</h3>
                <p className="text-gray-300 mt-2">ดวงวิญญาณของคุณหวนคืนสู่ร่างเดิม แต่ต้องชดใช้ด้วยการสูญเสียครั้งใหญ่: <strong>ตำแหน่งลดลง 3 ขั้น</strong>, ความทรงจำและเรื่องราวทั้งหมดถูกล้างบาง คุณต้องสร้างทุกอย่างขึ้นมาใหม่อีกครั้ง</p>
                 <button
                    onClick={() => onReincarnate()}
                    className="w-full mt-4 py-3 bg-gradient-to-b from-purple-700 to-purple-600 text-white font-bold rounded-lg shadow-lg transform transition-transform hover:scale-105 border-2 border-purple-500"
                >
                    หวนคืน
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeathModal;