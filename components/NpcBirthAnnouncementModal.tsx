
import React from 'react';

interface NpcBirthAnnouncementModalProps {
  announcement: {
    motherName: string;
    childName: string;
    childTitle: string;
    announcement: string;
  };
  onClose: () => void;
}

const NpcBirthAnnouncementModal: React.FC<NpcBirthAnnouncementModalProps> = ({ announcement, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[100] animate-fade-in p-4">
      <div 
        className="bg-[#fef9e7] border-t-8 border-b-8 border-amber-500 shadow-2xl w-full max-w-md relative text-[#4a2c2a] flex flex-col items-center justify-center p-8 animate-jump-in"
      >
        <div className="w-full h-full flex flex-col items-center justify-center text-center">
            <h2 className="text-4xl font-bold font-serif-sc tracking-widest mb-4 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
                ข่าวมหามงคล
            </h2>
            <h3 className="text-xl font-semibold font-serif-sc mb-6">
                ทายาทองค์ใหม่แห่งราชวงศ์ถือกำเนิด
            </h3>
            
            <p className="text-base font-medium leading-relaxed font-serif-sc">
                {announcement.announcement}
                <br/><br/>
                <span className="font-bold text-red-800">{announcement.motherName}</span> ได้ให้กำเนิด
                <br/>
                <span className="text-2xl font-bold text-red-900 my-4 inline-block font-serif-sc tracking-wider drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
                    {announcement.childTitle} {announcement.childName}
                </span>
                <br/>
                นับเป็นนิมิตหมายอันดียิ่ง!
            </p>

            <button
                onClick={onClose}
                className="mt-8 px-8 py-2 bg-yellow-600 text-white font-bold rounded-lg shadow-lg transform transition-transform hover:scale-105 border-2 border-yellow-700/80"
            >
                รับทราบ
            </button>
        </div>
      </div>
    </div>
  );
};

export default NpcBirthAnnouncementModal;