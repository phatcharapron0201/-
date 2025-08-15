import React from 'react';
import { NPC, PunishmentEvent, PunishmentChoice } from '../types';

interface PunishmentModalProps {
  event: PunishmentEvent & { accuser: NPC };
  onChoose: (choice: PunishmentChoice) => void;
  onClose: () => void;
}

const severityStyles = {
    'เบา': { text: 'text-green-300', border: 'border-green-500/50' },
    'ปานกลาง': { text: 'text-yellow-300', border: 'border-yellow-500/50' },
    'รุนแรง': { text: 'text-red-400', border: 'border-red-500/50' },
};

const PunishmentModal: React.FC<PunishmentModalProps> = ({ event, onChoose, onClose }) => {
    const { accuser, accusation, severity, choices } = event;
    const styles = severityStyles[severity];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-fade-in p-4">
            <div className="bg-red-950/90 backdrop-blur-lg border-2 border-red-500/80 rounded-xl shadow-2xl w-full max-w-xl relative text-white transform scale-100 animate-jump-in max-h-[90vh] flex flex-col">
                 <button onClick={onClose} className="absolute top-2 right-3 text-red-200 hover:text-white text-3xl z-10">&times;</button>
                 <div className="relative p-8 flex flex-col flex-grow overflow-hidden">
                    <div className="text-center mb-6 flex-shrink-0">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-red-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] tracking-wider">
                            เกิดเรื่องแล้ว!
                        </h2>
                        <p className="text-lg text-red-100 mt-2">
                           คุณถูก <span className="font-bold text-white">{accuser.name} ({accuser.title})</span> เรียกพบ
                        </p>
                    </div>

                    <div className={`my-6 p-4 bg-black/40 border-l-4 rounded-r-lg ${styles.border} flex-shrink-0`}>
                        <p className="text-lg text-white leading-relaxed italic">
                            "{accusation}"
                        </p>
                        <p className={`text-right font-bold mt-2 ${styles.text}`}>
                            - {accuser.name} -
                        </p>
                    </div>

                    <p className="text-center text-lg text-yellow-200 font-semibold mb-6 flex-shrink-0">
                        คุณจะตอบโต้อย่างไร?
                    </p>

                    <div className="flex flex-col items-center gap-3 mt-4 flex-grow overflow-y-auto pr-2">
                        {choices.map((choice, index) => (
                            <button
                                key={index}
                                onClick={() => onChoose(choice)}
                                className="w-full text-left p-4 bg-red-900/70 text-white rounded-lg shadow-md transform transition-all hover:scale-105 hover:bg-red-800/90 border border-red-700/60"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">{choice.text}</span>
                                    <span className="text-sm text-green-300 font-bold">
                                        {choice.consequence.initialIntelligenceGain ? `ปัญญา ${choice.consequence.initialIntelligenceGain > 0 ? '+' : ''}${choice.consequence.initialIntelligenceGain}` : ''}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PunishmentModal;