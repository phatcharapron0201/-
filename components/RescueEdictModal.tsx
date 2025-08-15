
import React from 'react';
import { PlayerProfile, CareerPath, Rank } from '../types';

interface RescueEdictModalProps {
  player: PlayerProfile;
  announcement: {
    rescuerName: string;
    newCareer: CareerPath;
    newRank: Rank;
  };
  onClose: () => void;
}

const RescueEdictModal: React.FC<RescueEdictModalProps> = ({ player, announcement, onClose }) => {
  const { rescuerName, newCareer, newRank } = announcement;
  const newTitle = newCareer === CareerPath.ImperialConsort ? "พระสนมในวังหลวง" : "พระชายาในจวนฉินอ๋อง";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[100] animate-fade-in p-4">
      <div 
        className="bg-[#e7f3fe] border-t-8 border-b-8 border-blue-400 shadow-2xl w-full max-w-md relative text-[#2c3e50] flex flex-col items-center justify-center p-8 animate-jump-in"
      >
        <div className="w-full h-full flex flex-col items-center justify-center text-center">
            <h2 className="text-4xl sm:text-5xl font-bold font-serif-sc tracking-widest mb-4 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)] text-blue-800">
                聖旨
            </h2>
            <h3 className="text-xl sm:text-2xl font-semibold font-serif-sc mb-6 text-blue-700">
                ราชโองการช่วยเหลือ
            </h3>
            
            <p className="text-base font-medium leading-relaxed font-serif-sc">
                ด้วย<span className="text-lg font-bold text-blue-900"> {rescuerName} </span>ทรงมีพระเมตตา
                <br/>
                ต่อชะตากรรมของ <span className="text-lg font-bold text-blue-900">{player.name}</span>
                <br/>
                ผู้ต้องเผชิญความทุกข์ระทมอย่างไม่เป็นธรรม
                <br/>
                บัดนี้จึงมีรับสั่งให้รับนางเข้ามาอยู่ในอุปการะ
                <br/>
                และแต่งตั้งให้เป็น <span className="text-xl font-bold text-blue-900">{newTitle}</span> ในตำแหน่ง <span className="text-xl font-bold text-blue-900">{newRank}</span>
            </p>
            
            <p className="text-2xl sm:text-3xl font-bold text-blue-800 my-6 font-serif-sc tracking-wider drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
                เริ่มต้นชีวิตใหม่
            </p>

            <p className="text-base font-medium font-serif-sc">
                欽此
            </p>

            <button
                onClick={onClose}
                className="mt-8 px-8 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-lg transform transition-transform hover:scale-105 border-2 border-blue-700/80"
            >
                รับพระเมตตา
            </button>
        </div>
      </div>
    </div>
  );
};

export default RescueEdictModal;