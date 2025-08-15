import React from 'react';
import { Rank } from '../types';

interface ImperialEdictModalProps {
  fromRank: Rank;
  toRank: Rank;
  playerName: string;
  onClose: () => void;
}

const ImperialEdictModal: React.FC<ImperialEdictModalProps> = ({ fromRank, toRank, playerName, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-fade-in p-4">
      <div 
        className="bg-[#fef9e7] border-t-8 border-b-8 border-amber-500 shadow-2xl w-full max-w-md relative text-[#4a2c2a] flex flex-col items-center justify-center p-8 animate-jump-in"
      >
        <div className="w-full h-full flex flex-col items-center justify-center text-center">
            <h2 className="text-4xl sm:text-5xl font-bold font-serif-sc tracking-widest mb-4 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
                聖旨
            </h2>
            <h3 className="text-xl sm:text-2xl font-semibold font-serif-sc mb-6">
                ราชโองการ
            </h3>
            
            <p className="text-base font-medium leading-relaxed font-serif-sc">
                奉天承运<br/>
                皇帝诏曰<br/>
                <span className="text-lg font-bold text-red-800">{playerName}</span> แห่งตำหนักใน<br/>
                มีความดีความชอบ<br/>
                บัดนี้朕จึงมีพระบรมราชโองการ<br/>
                แต่งตั้งให้ขึ้นเป็น<br/>
            </p>
            
            <p className="text-2xl sm:text-3xl font-bold text-red-900 my-6 font-serif-sc tracking-wider drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
                {toRank}
            </p>

            <p className="text-base font-medium font-serif-sc">
                欽此
            </p>

            <button
                onClick={onClose}
                className="mt-8 px-8 py-2 bg-yellow-600 text-white font-bold rounded-lg shadow-lg transform transition-transform hover:scale-105 border-2 border-yellow-700/80"
            >
                รับราชโองการ
            </button>
        </div>
      </div>
    </div>
  );
};

export default ImperialEdictModal;