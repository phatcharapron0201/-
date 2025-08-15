
import React from 'react';
import { PrinceVisitAnnouncement } from '../types';

interface PrinceVisitModalProps {
  announcement: PrinceVisitAnnouncement;
  onAccept: () => void;
  onDecline: () => void;
}

const PrinceVisitModal: React.FC<PrinceVisitModalProps> = ({ announcement, onAccept, onDecline }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-fade-in p-4">
      <div className="bg-red-950/90 backdrop-blur-lg border-2 border-blue-400 rounded-xl shadow-2xl w-full max-w-lg relative text-white transform scale-100 animate-jump-in">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10" 
          style={{ backgroundImage: "url('https://i.pinimg.com/736x/bb/85/38/bb85382d6b2ba84d36451e3d73f1bfe0.jpg')" }}
        ></div>
        <div className="relative p-8">
          <h2 className="text-4xl font-extrabold text-center text-blue-300 mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] tracking-wider">
            เทียบเชิญยามค่ำคืน
          </h2>
          <div className="my-6 text-center">
            <p className="text-lg text-blue-100 leading-relaxed">
                {announcement.butlerName} พ่อบ้านแห่งจวนอ๋อง ได้มาแจ้งข่าวถึงหน้าเรือนของท่านด้วยตนเอง
            </p>
            <p className="text-xl font-semibold text-white my-4 p-4 bg-black/30 border border-blue-600/50 rounded-lg">
              "ท่านอ๋อง {announcement.princeName} ทรงเลือกท่านในค่ำคืนนี้... โปรดเตรียมตัวให้พร้อม พระองค์จะเสด็จมาในไม่ช้า"
            </p>
            <p className="text-lg text-blue-100 leading-relaxed">
              ค่ำคืนนี้จะเป็นของคุณ...
            </p>
          </div>
          <div className="flex justify-around mt-8">
            <button
              onClick={onAccept}
              className="px-8 py-3 bg-gradient-to-b from-blue-600 to-blue-500 text-white font-bold rounded-lg shadow-lg transform transition-transform hover:scale-110 border-2 border-blue-400"
            >
              รับคำเชิญด้วยใจยินดี
            </button>
            <button
              onClick={onDecline}
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

export default PrinceVisitModal;