import React from 'react';
import { Maid } from '../types';
import { AVAILABLE_MAIDS_FOR_HIRE } from '../constants';

interface MaidRecruitmentModalProps {
  playerMoney: number;
  playerMaids: Maid[];
  onRecruit: (maidTemplate: Omit<Maid, 'id' | 'loyalty'>) => void;
  onClose: () => void;
}

const tierStyles = {
    'สามัญ': 'border-gray-500 bg-gray-800/50 text-gray-200',
    'ชำนาญ': 'border-blue-500 bg-blue-800/50 text-blue-200',
    'ยอดฝีมือ': 'border-purple-500 bg-purple-800/50 text-purple-200 animate-pulse'
};

const MaidRecruitmentModal: React.FC<MaidRecruitmentModalProps> = ({ playerMoney, playerMaids, onRecruit, onClose }) => {

    const hiredMaidNames = new Set(playerMaids.map(m => m.name));

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 animate-fade-in p-4">
            <div className="bg-red-950/80 backdrop-blur-md border-2 border-main rounded-lg shadow-2xl p-2 w-full max-w-4xl relative text-white max-h-[90vh] flex flex-col">
                <div className="bg-red-800/60 rounded-md p-6 relative flex-grow flex flex-col min-h-0">
                    <button onClick={onClose} className="absolute top-2 right-3 text-yellow-200 hover:text-white text-3xl z-10">&times;</button>
                    
                    <div className="text-center mb-6 flex-shrink-0">
                        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-300 drop-shadow-md">ตลาดนางกำนัล</h2>
                        <p className="text-yellow-100 mt-2">"ท่านหญิง... โปรดเลือกสาวใช้ที่ท่านถูกใจได้เลยเจ้าค่ะ"</p>
                        <p className="text-sm text-gray-300 mt-2">เงินของคุณ: 💰 {playerMoney.toLocaleString()}</p>
                    </div>

                    <div className="flex-grow overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {AVAILABLE_MAIDS_FOR_HIRE.map((maid, index) => {
                            const isHired = hiredMaidNames.has(maid.name);
                            const canAfford = playerMoney >= maid.recruitmentCost;
                            const isDisabled = isHired || !canAfford;

                            return (
                                <div key={index} className={`p-4 border-2 rounded-lg flex flex-col text-left transition-all duration-200 ${tierStyles[maid.tier]}`}>
                                    <div className='flex-grow'>
                                        <div className="flex justify-between items-baseline">
                                            <h3 className={`text-xl font-bold`}>{maid.name}</h3>
                                            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-black/30">{maid.tier}</span>
                                        </div>
                                        <p className="text-sm text-gray-300 mt-2">{maid.description}</p>
                                        {maid.skill && <p className="text-sm text-yellow-300 mt-1 font-semibold">ความสามารถ: {maid.skill}</p>}
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-white/10 text-sm">
                                        <div className="flex justify-between"><span>ค่าจ้างรายเดือน:</span> <span>💰{maid.wage}</span></div>
                                        <div className="flex justify-between font-bold mt-1"><span>ค่าแรกเข้า:</span> <span>💰{maid.recruitmentCost}</span></div>
                                        <button 
                                            onClick={() => onRecruit(maid)}
                                            disabled={isDisabled}
                                            className="w-full mt-4 bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-3 rounded-lg transition-colors disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
                                        >
                                            {isHired ? "ว่าจ้างแล้ว" : canAfford ? "ว่าจ้าง" : "เงินไม่พอ"}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaidRecruitmentModal;