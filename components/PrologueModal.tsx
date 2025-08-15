
import React from 'react';
import { PrologueState } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface PrologueModalProps {
  state: PrologueState;
  onChoice: (choiceText: string) => void;
  isLoading: boolean;
}

const PrologueModal: React.FC<PrologueModalProps> = ({ state, onChoice, isLoading }) => {
    const { examinerName, examinerTitle, npcResponse, choices, currentRound, careerPath } = state;
    
    const scenarioStyles = {
        ImperialConsort: { title: 'การคัดเลือกสู่ตำหนักใน', border: 'border-yellow-500/80', text: 'text-yellow-300' },
        QinConsort: { title: 'บททดสอบแห่งจวนอ๋อง', border: 'border-blue-500/80', text: 'text-blue-300' },
    };

    const styles = careerPath === "พระสนมในวังหลวง" ? scenarioStyles.ImperialConsort : scenarioStyles.QinConsort;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-[100] animate-fade-in p-4">
            <div className={`bg-red-950/90 backdrop-blur-lg border-2 ${styles.border} rounded-xl shadow-2xl w-full max-w-2xl relative text-white transform scale-100 animate-jump-in max-h-[90vh] flex flex-col`}>
                 <div className="relative p-8 flex flex-col flex-grow overflow-hidden">
                    <div className="text-center mb-6 flex-shrink-0">
                        <h2 className={`text-3xl font-extrabold ${styles.text} drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] tracking-wider`}>
                            {styles.title}
                        </h2>
                        <p className={`text-lg text-white mt-2`}>
                           ผู้คุมสอบ: <span className="font-bold">{examinerName} ({examinerTitle})</span>
                        </p>
                         <p className="text-sm font-bold text-gray-400 mt-1">บททดสอบที่ {currentRound} / 3</p>
                    </div>

                    <div className={`my-6 p-4 bg-black/40 border-l-4 rounded-r-lg ${styles.border} flex-shrink-0`}>
                        <p className="text-lg text-white leading-relaxed italic" style={{ whiteSpace: 'pre-wrap' }}>
                           {npcResponse}
                        </p>
                    </div>
                    
                    <div className="flex-shrink-0">
                        {choices.length > 0 &&
                            <p className="text-center text-lg text-yellow-200 font-semibold mb-6">
                                จงเลือกคำตอบของเจ้า:
                            </p>
                        }
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-24 flex-grow">
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-3 mt-4 flex-grow overflow-y-auto pr-2">
                            {choices.map((choice, index) => (
                                <button
                                    key={index}
                                    onClick={() => onChoice(choice)}
                                    className="w-full text-left p-4 bg-red-900/70 text-white rounded-lg shadow-md transform transition-all hover:scale-105 hover:bg-red-800/90 border border-red-700/60 min-h-[4rem]"
                                >
                                    {choice}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PrologueModal;