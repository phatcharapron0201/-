import React, { useState } from 'react';
import { PlayerProfile, NPC, InventoryItem } from '../types';
import { MESSENGER_COST } from '../constants';
import LoadingSpinner from './LoadingSpinner';

interface SendMessageModalProps {
  player: PlayerProfile;
  targetNpc: NPC;
  onSend: (targetNpc: NPC, message: string, item?: InventoryItem, money?: number) => void;
  onClose: () => void;
  isLoading: boolean;
}

const SendMessageModal: React.FC<SendMessageModalProps> = ({ player, targetNpc, onSend, onClose, isLoading }) => {
    const [message, setMessage] = useState('');
    const [attachedItemId, setAttachedItemId] = useState<string>('');
    const [attachedMoney, setAttachedMoney] = useState<number>(0);

    const giftableItems = player.inventory.filter(item => item.type === 'gift' || item.type === 'artifact');
    const totalCost = MESSENGER_COST + attachedMoney;
    const canAfford = player.money >= totalCost;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || isLoading || !canAfford) return;
        const attachedItem = player.inventory.find(i => i.instanceId === attachedItemId);
        onSend(targetNpc, message, attachedItem, attachedMoney);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-fade-in p-4">
            <div className="bg-red-950/90 backdrop-blur-lg border-2 border-teal-500/80 rounded-xl shadow-2xl w-full max-w-xl relative text-white transform scale-100 animate-jump-in">
                <button onClick={onClose} disabled={isLoading} className="absolute top-2 right-3 text-teal-200 hover:text-white text-3xl z-10 disabled:opacity-50">&times;</button>
                <div className="relative p-8">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-300 drop-shadow-md tracking-wider">
                            ส่งสาส์น
                        </h2>
                        <p className="text-lg text-teal-100 mt-2">
                            ถึง <span className="font-bold text-white">{targetNpc.name}</span>
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center p-8">
                            <LoadingSpinner />
                            <p className="mt-4 text-yellow-200">กำลังส่งสารผ่านคนกลาง...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="message-text" className="block text-sm font-semibold text-gray-200 mb-1">ข้อความ:</label>
                                    <textarea
                                        id="message-text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="เขียนข้อความของคุณที่นี่..."
                                        className="w-full h-28 bg-red-900/80 border-2 border-teal-500/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-colors text-white placeholder-gray-400"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="attach-item" className="block text-sm font-semibold text-gray-200 mb-1">แนบของขวัญ:</label>
                                        <select
                                            id="attach-item"
                                            value={attachedItemId}
                                            onChange={(e) => setAttachedItemId(e.target.value)}
                                            className="w-full bg-red-900/80 border-2 border-teal-500/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-colors text-white"
                                        >
                                            <option value="">-- ไม่แนบ --</option>
                                            {giftableItems.map(item => (
                                                <option key={item.instanceId} value={item.instanceId}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="attach-money" className="block text-sm font-semibold text-gray-200 mb-1">แนบเงิน (ตำลึง):</label>
                                        <input
                                            id="attach-money"
                                            type="number"
                                            value={attachedMoney}
                                            onChange={(e) => setAttachedMoney(Math.max(0, parseInt(e.target.value) || 0))}
                                            className="w-full bg-red-900/80 border-2 border-teal-500/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-colors text-white"
                                            min="0"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 p-3 bg-black/30 rounded-lg text-sm">
                                <div className="flex justify-between">
                                    <span>ค่าส่งสาร:</span>
                                    <span>💰 {MESSENGER_COST.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between font-bold text-yellow-200 mt-1">
                                    <span>รวมค่าใช้จ่าย:</span>
                                    <span className={!canAfford ? 'text-red-400' : ''}>💰 {totalCost.toLocaleString()}</span>
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={!message.trim() || !canAfford}
                                className="w-full mt-6 bg-gradient-to-b from-teal-600 to-teal-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:from-gray-600 disabled:to-gray-500 disabled:text-white/70 disabled:cursor-not-allowed disabled:scale-100 shadow-lg"
                            >
                                {canAfford ? 'ยืนยันการส่ง' : 'เงินไม่พอ'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SendMessageModal;