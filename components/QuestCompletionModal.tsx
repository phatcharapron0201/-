import React from 'react';
import { Quest } from '../types';

interface QuestCompletionModalProps {
  quest: Quest;
  onClose: () => void;
}

const QuestCompletionModal: React.FC<QuestCompletionModalProps> = ({ quest, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-fade-in p-4">
      <div 
        className="bg-gradient-to-br from-red-900 to-red-950 border-2 border-main shadow-2xl w-full max-w-lg relative text-white flex flex-col items-center justify-center p-8 rounded-xl animate-jump-in"
      >
        <div className="w-full h-full flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-yellow-300 drop-shadow-lg mb-2">
                ภารกิจสำเร็จ!
            </h2>
            <h3 className="text-xl font-semibold text-yellow-100 mb-6">
                {quest.title}
            </h3>
            
            <p className="text-base text-gray-200 leading-relaxed mb-6 bg-black/30 p-4 rounded-lg border border-yellow-700/50">
                {quest.completionSummary}
            </p>
            
            <div className="w-full mb-6">
                 <h4 className="text-lg font-semibold text-yellow-200 mb-3">รางวัลที่ได้รับ:</h4>
                 <ul className="space-y-2">
                    {quest.rewards.map((reward, index) => (
                        <li key={index} className="text-white bg-green-800/50 px-4 py-2 rounded-md border border-green-600/50">
                            ✨ {reward}
                        </li>
                    ))}
                 </ul>
            </div>
            
            <button
                onClick={() => onClose()}
                className="mt-4 px-10 py-3 bg-yellow-600 text-red-900 font-bold rounded-lg shadow-lg transform transition-transform hover:scale-105 border-2 border-yellow-400"
            >
                ปิดหน้าต่าง
            </button>
        </div>
      </div>
    </div>
  );
};

export default QuestCompletionModal;