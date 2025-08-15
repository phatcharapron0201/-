import React from 'react';

interface ChildbirthModalProps {
  onProceed: () => void;
}

const ChildbirthModal: React.FC<ChildbirthModalProps> = ({ onProceed }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-fade-in p-4">
      <div className="bg-red-950/90 backdrop-blur-lg border-2 border-main rounded-xl shadow-2xl w-full max-w-lg relative text-white transform scale-100 animate-jump-in">
        <div className="relative p-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-yellow-300 mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] tracking-wider">
            ถึงกำหนดแล้ว
          </h2>
          <p className="text-xl text-yellow-100 leading-relaxed my-8">
            เวลาแห่งการรอคอยสิ้นสุดลง... ถึงเวลากำหนดให้กำเนิดทายาทแล้ว
          </p>
          <button
            onClick={onProceed}
            className="w-full px-8 py-4 bg-gradient-to-b from-yellow-600 to-yellow-500 text-red-900 font-bold text-lg rounded-lg shadow-lg transform transition-transform hover:scale-105 border-2 border-yellow-400"
          >
            ดำเนินการคลอด
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChildbirthModal;