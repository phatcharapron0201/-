import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface SecretCommandInputModalProps {
  onExecute: (command: string) => void;
  onClose: () => void;
  isLoading: boolean;
  presetCommand?: string;
}

const SecretCommandInputModal: React.FC<SecretCommandInputModalProps> = ({ onExecute, onClose, isLoading, presetCommand = '' }) => {
    const [command, setCommand] = useState(presetCommand);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!command.trim() || isLoading) return;
        onExecute(command);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[101]" onClick={onClose}>
            <div className="bg-gray-900/85 backdrop-blur-lg border-2 border-purple-500/80 rounded-xl shadow-2xl w-full max-w-lg relative text-white transform scale-100 animate-jump-in" onClick={e => e.stopPropagation()}>
                 <div className="relative p-8">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-extrabold text-purple-300 drop-shadow-md tracking-wider">
                            ลิขิตสวรรค์
                        </h2>
                        <p className="text-md text-purple-100/80 mt-2">
                           กระซิบคำสั่งของคุณต่อโชคชะตา...
                        </p>
                    </div>
                     <div className="my-4 p-3 bg-black/30 border border-purple-400/30 rounded-lg text-xs text-gray-300">
                        <p className="font-semibold text-purple-200 mb-2">ตัวอย่างคำสั่ง:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>เลื่อนตำแหน่งให้ฉันเป็นกุ้ยเฟย</li>
                            <li>มอบเงินให้ฉัน 50,000 ตำลึง</li>
                            <li>สร้าง NPC ใหม่ชื่อ 'แม่ทัพหลี่' ที่ลานประลองยุทธ์</li>
                            <li>ทำให้ฮองเฮาป่วย</li>
                            <li>ลบภารกิจชาของไทเฮา</li>
                        </ul>
                    </div>

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center p-8">
                            <LoadingSpinner />
                            <p className="mt-4 text-yellow-200">ชะตากำลังหมุนเปลี่ยน...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={command}
                                onChange={(e) => setCommand(e.target.value)}
                                placeholder="พิมพ์คำสั่งลับของคุณที่นี่ (ไม่ต้องมี /)"
                                className="w-full bg-gray-800/80 border-2 border-purple-500/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors text-white placeholder-gray-400"
                                required
                                autoFocus
                            />
                            <button
                                type="submit"
                                disabled={!command.trim()}
                                className="w-full mt-6 bg-gradient-to-b from-purple-600 to-purple-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:from-gray-600 disabled:to-gray-500 disabled:text-white/70 disabled:cursor-not-allowed disabled:scale-100 shadow-lg"
                            >
                               บัญชา
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SecretCommandInputModal;