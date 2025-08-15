
import React from 'react';
import { PlayerProfile } from '../types';

interface DivorceAnnouncementModalProps {
  player: PlayerProfile;
  onClose: () => void;
}

const DivorceAnnouncementModal: React.FC<DivorceAnnouncementModalProps> = ({ player, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-[100] animate-fade-in p-4">
      <div 
        className="bg-[#3e2723] border-t-8 border-b-8 border-gray-700 shadow-2xl w-full max-w-md relative text-gray-300 flex flex-col items-center justify-center p-8 animate-jump-in"
      >
        <div className="w-full h-full flex flex-col items-center justify-center text-center">
            <h2 className="text-5xl font-bold font-serif-sc tracking-widest mb-4 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] text-red-400">
                聖旨
            </h2>
            <h3 className="text-2xl font-semibold font-serif-sc mb-6 text-red-300">
                ราชโองการปลด
            </h3>
            
            <p className="text-base font-medium leading-relaxed font-serif-sc">
                เนื่องด้วย <span className="text-lg font-bold text-white">{player.name}</span>
                <br/>
                ได้กระทำการอันน่าละอายและเสื่อมเสียเกียรติ
                <br/>
                บัดนี้朕จึงมีพระบรมราชโองการ
                <br/>
                <span className="text-red-400">ปลดออกจากตำแหน่งพระสนม/ชายา</span>
                <br/>
                ริบทรัพย์สินทั้งหมด และเนรเทศไปยังตำหนักเหมันต์
            </p>
            
            <p className="text-2xl font-bold text-red-500 my-6 font-serif-sc tracking-wider drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]">
                สิ้นสุดวาสนาต่อกัน
            </p>

            <p className="text-base font-medium font-serif-sc">
                欽此
            </p>

            <button
                onClick={onClose}
                className="mt-8 px-8 py-2 bg-gray-700 text-white font-bold rounded-lg shadow-lg transform transition-transform hover:scale-105 border-2 border-gray-600/80"
            >
                รับชะตากรรม
            </button>
        </div>
      </div>
    </div>
  );
};

export default DivorceAnnouncementModal;