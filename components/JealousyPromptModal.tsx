import React from 'react';
import { JealousyChoice } from '../types';

interface JealousyPromptModalProps {
  visitedNpcName: string;
  onSelect: (choice: JealousyChoice) => void;
  onClose: () => void;
}

const JealousyPromptModal: React.FC<JealousyPromptModalProps> = ({ visitedNpcName, onSelect, onClose }) => {
    
    const choices: JealousyChoice[] = [
        { text: "ไม่ใส่ใจเลย", level: 0, initialIntelligenceGain: 5, style: "from-gray-600 to-gray-500 border-gray-400" },
        { text: "รู้สึกรำคาญใจเล็กน้อย", level: 3, initialIntelligenceGain: 2, style: "from-blue-700 to-blue-600 border-blue-500" },
        { text: "เจ็บปวดและริษยา", level: 7, initialIntelligenceGain: 0, style: "from-purple-800 to-purple-700 border-purple-600" },
        { text: "โกรธแค้นจนทนไม่ไหว", level: 10, initialIntelligenceGain: -5, style: "from-red-800 to-red-700 border-red-600" },
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-fade-in p-4">
            <div className="bg-red-950/90 backdrop-blur-lg border-2 border-main/80 rounded-xl shadow-2xl w-full max-w-lg relative text-white transform scale-100 animate-jump-in">
                <button onClick={onClose} className="absolute top-2 right-3 text-yellow-200 hover:text-white text-3xl z-10">&times;</button>
                <div className="relative p-8">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-yellow-300 mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] tracking-wider">
                        ข่าวลือในวัง
                    </h2>
                    <div className="my-6 text-center">
                        <p className="text-lg text-yellow-100 leading-relaxed">
                            คุณได้ยินเหล่านางกำนัลพูดคุยกันหนาหูว่า เมื่อคืนนี้ฝ่าบาทได้เสด็จไปเยือนตำหนักของ...
                        </p>
                        <p className="text-2xl font-semibold text-white my-4 p-4 bg-black/30 border border-yellow-600/50 rounded-lg">
                            {visitedNpcName}
                        </p>
                        <p className="text-xl text-yellow-100 leading-relaxed font-semibold">
                            คุณรู้สึกอย่างไร?
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-4 mt-8">
                        {choices.map(choice => (
                             <button
                                key={choice.level}
                                onClick={() => onSelect(choice)}
                                className={`w-full px-6 py-3 bg-gradient-to-b text-white font-bold rounded-lg shadow-lg transform transition-transform hover:scale-105 border-2 ${choice.style}`}
                            >
                                {choice.text}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JealousyPromptModal;
