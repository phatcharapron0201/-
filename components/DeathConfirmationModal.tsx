
import React from 'react';

interface DeathConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeathConfirmationModal: React.FC<DeathConfirmationModalProps> = ({ message, onConfirm, onCancel }) => {
    const content = {
        title: "ชะตากำลังจะขาด",
        prompt: "คุณจะยอมรับชะตากรรม หรือจะดิ้นรนเพื่อเอาชีวิตรอด?",
        intro: "ชะตาชีวิตของคุณกำลังจะถึงจุดจบ...",
        confirmText: "ยอมรับชะตากรรม",
        cancelText: "ดิ้นรนเอาชีวิตรอด",
        confirmClass: "px-8 py-3 bg-gradient-to-b from-red-800 to-red-700 text-white font-bold rounded-lg shadow-lg transform transition-transform hover:scale-110 border-2 border-red-600",
        cancelClass: "px-8 py-3 bg-gradient-to-b from-green-600 to-green-500 text-white font-bold rounded-lg shadow-lg transform transition-transform hover:scale-110 border-2 border-green-400"
    };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-[100] animate-fade-in p-4">
      <div className="bg-gray-900/80 backdrop-blur-lg border-2 border-red-600 rounded-xl shadow-2xl w-full max-w-lg relative text-white transform scale-100 animate-jump-in max-h-[90vh] flex flex-col">
        <div className="relative p-8 flex flex-col overflow-hidden h-full">
          
          {/* Header (non-scrollable) */}
          <div className="flex-shrink-0 text-center">
              <h2 className="text-3xl font-extrabold text-red-400 mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] tracking-wider">
                {content.title}
              </h2>
              <p className="text-lg text-gray-200 leading-relaxed">
                {content.intro}
              </p>
          </div>
          
          {/* Message (scrollable) */}
          <div className="flex-grow my-4 overflow-y-auto pr-2">
            <p className="text-xl font-semibold text-white p-4 bg-black/40 border border-red-700/50 rounded-lg italic">
              "{message}"
            </p>
          </div>
          
          {/* Footer (non-scrollable) */}
          <div className="flex-shrink-0 text-center">
              <p className="text-lg text-gray-200 leading-relaxed font-semibold">
                {content.prompt}
              </p>
              <div className="flex justify-around mt-8">
                <button
                  onClick={onConfirm}
                  className={content.confirmClass}
                >
                  {content.confirmText}
                </button>
                 <button
                  onClick={onCancel}
                  className={content.cancelClass}
                >
                  {content.cancelText}
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeathConfirmationModal;
