import React, { useState } from 'react';
import { IncomingMessageState } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface IncomingMessageModalProps {
  state: IncomingMessageState;
  onReply: (replyText: string) => void;
  onClose: (wasIgnored: boolean) => void;
}

const NpcAvatar: React.FC<{ name: string }> = ({ name }) => {
    const initial = name.charAt(0).toUpperCase() || '?';
    const hashCode = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    };
    const colors = ['bg-yellow-800', 'bg-red-800', 'bg-blue-800', 'bg-purple-800', 'bg-green-800', 'bg-indigo-800'];
    const color = colors[Math.abs(hashCode(name)) % colors.length];
    return <div className={`w-12 h-12 rounded-full ${color} flex-shrink-0 flex items-center justify-center text-yellow-200 font-bold shadow-md text-xl`} title={name}>{initial}</div>;
};


const IncomingMessageModal: React.FC<IncomingMessageModalProps> = ({ state, onReply, onClose }) => {
    const [replyText, setReplyText] = useState('');
    const { npcName, initialMessage, playerReply, npcFinalResponse, rewards } = state;

    const isLoading = !!playerReply && !npcFinalResponse;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyText.trim() || isLoading) return;
        onReply(replyText);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[100] animate-fade-in p-4">
            <div className="bg-red-950/90 backdrop-blur-lg border-2 border-yellow-500/80 rounded-xl shadow-2xl w-full max-w-lg relative text-white transform scale-100 animate-jump-in max-h-[90vh] flex flex-col">
                <div className="relative p-6 sm:p-8 flex flex-col flex-grow overflow-hidden">
                    
                    {/* Header */}
                    <div className="text-center mb-6 flex-shrink-0">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-yellow-300 drop-shadow-md tracking-wider">
                            สาส์นส่วนตัว
                        </h2>
                    </div>

                    {/* Conversation Body (Scrollable) */}
                    <div className="flex-grow space-y-4 overflow-y-auto pr-2">
                        {/* NPC Initial Message */}
                        <div className="flex items-start gap-3">
                            <NpcAvatar name={npcName} />
                            <div className="flex flex-col items-start">
                                <p className="font-semibold text-base mb-1 text-purple-300">{npcName}</p>
                                <div className="px-4 py-2 rounded-2xl rounded-bl-none bg-indigo-900/80 text-white">
                                    <p className="text-base" style={{ whiteSpace: 'pre-wrap' }}>{initialMessage}</p>
                                </div>
                            </div>
                        </div>

                        {/* Player Reply */}
                        {playerReply && !isLoading && (
                            <div className="flex items-start gap-3 justify-end">
                                <div className="flex flex-col items-end">
                                    <div className="px-4 py-2 rounded-2xl rounded-br-none bg-green-800/90 text-white">
                                        <p className="text-base" style={{ whiteSpace: 'pre-wrap' }}>{playerReply}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Loading Spinner */}
                        {isLoading && (
                            <div className="flex items-start gap-3">
                                <NpcAvatar name={npcName} />
                                <div className="px-4 py-2 rounded-2xl rounded-bl-none bg-indigo-900/80">
                                    <LoadingSpinner />
                                </div>
                            </div>
                        )}

                        {/* NPC Final Response */}
                        {npcFinalResponse && (
                             <div className="flex items-start gap-3">
                                <NpcAvatar name={npcName} />
                                <div className="flex flex-col items-start">
                                     <p className="font-semibold text-base mb-1 text-purple-300">{npcName}</p>
                                    <div className="px-4 py-2 rounded-2xl rounded-bl-none bg-indigo-900/80 text-white">
                                        <p className="text-base" style={{ whiteSpace: 'pre-wrap' }}>{npcFinalResponse}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                         {/* Rewards */}
                        {rewards && rewards.length > 0 && (
                            <div className="pt-4 mt-4 border-t border-yellow-700/50">
                                <h4 className="text-lg font-semibold text-yellow-200 mb-2 text-center">รางวัลที่ได้รับ:</h4>
                                <ul className="space-y-1 text-center">
                                    {rewards.map((reward, index) => (
                                        <li key={index} className="text-green-300 bg-green-800/30 px-3 py-1 rounded-full inline-block text-sm">
                                            ✨ {reward}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    
                    {/* Footer / Input Area */}
                    <div className="mt-6 flex-shrink-0">
                        {!playerReply ? (
                             <form onSubmit={handleSubmit} className="space-y-4">
                                <textarea
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    placeholder="พิมพ์คำตอบของคุณ..."
                                    className="w-full h-24 bg-red-900/80 border-2 border-yellow-500/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors text-white placeholder-gray-400"
                                    required
                                />
                                <div className="flex gap-4">
                                     <button
                                        type="button"
                                        onClick={() => onClose(true)}
                                        className="w-1/3 py-2 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg shadow-lg"
                                    >
                                        เพิกเฉย
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!replyText.trim()}
                                        className="w-2/3 py-2 bg-green-700 hover:bg-green-600 text-white font-bold rounded-lg shadow-lg disabled:bg-gray-500 disabled:cursor-not-allowed"
                                    >
                                        ตอบกลับ
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <button
                                onClick={() => onClose(false)}
                                disabled={isLoading}
                                className="w-full mt-4 py-3 bg-gradient-to-b from-yellow-600 to-yellow-500 text-red-900 font-bold rounded-lg shadow-lg disabled:from-gray-600 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'รอการตอบกลับ...' : 'ปิดหน้าต่าง'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IncomingMessageModal;