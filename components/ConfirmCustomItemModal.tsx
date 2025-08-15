
import React from 'react';
import { InventoryItem } from '../types';

interface ConfirmCustomItemModalProps {
  item: Omit<InventoryItem, 'instanceId'>;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmCustomItemModal: React.FC<ConfirmCustomItemModalProps> = ({ item, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-fade-in p-4">
            <div className="bg-red-950/90 backdrop-blur-lg border-2 border-yellow-500/80 rounded-xl shadow-2xl w-full max-w-lg relative text-white transform scale-100 animate-jump-in">
                 <div className="relative p-8 text-center">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-yellow-300 drop-shadow-md tracking-wider mb-4">
                        ข้อเสนอจากพ่อค้า
                    </h2>
                    <p className="text-lg text-yellow-100 mt-2 mb-6">
                       "ข้าสามารถสร้างของชิ้นนี้ให้ท่านได้..."
                    </p>
                    
                    <div className="p-4 my-4 bg-black/30 border border-yellow-700/50 rounded-lg text-left">
                        <div className="flex items-center gap-4">
                            <span className="text-5xl">{item.emoji}</span>
                            <div>
                                <h3 className="text-xl font-bold text-yellow-200">{item.name}</h3>
                                {item.favorabilityEffect && (
                                    <p className="text-sm text-pink-300 font-semibold">
                                        เพิ่มความพึงพอใจ +{item.favorabilityEffect}
                                    </p>
                                )}
                            </div>
                        </div>
                        <p className="text-sm text-gray-300 mt-3 italic">
                            {item.description}
                        </p>
                    </div>

                     <p className="text-xl font-bold text-yellow-200 my-6">
                        ราคา: 💰 {item.price?.toLocaleString()}
                    </p>

                    <div className="flex justify-around mt-8">
                        <button
                            onClick={onConfirm}
                            className="px-8 py-3 bg-gradient-to-b from-green-600 to-green-500 text-white font-bold rounded-lg shadow-lg transform transition-transform hover:scale-110 border-2 border-green-400"
                        >
                            ตกลง
                        </button>
                        <button
                            onClick={onCancel}
                            className="px-8 py-3 bg-gradient-to-b from-red-800 to-red-700 text-white font-bold rounded-lg shadow-lg transform transition-transform hover:scale-110 border-2 border-red-600"
                        >
                            ปฏิเสธ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmCustomItemModal;
