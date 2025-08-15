



import React, { useState, useMemo } from 'react';
import { PlayerProfile, NPC, EducationFocus } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { HEIR_PRAISE_COST } from '../constants';

interface PraiseHeirViewProps {
    child: NPC;
    player: PlayerProfile;
    onPraise: () => void;
    onBack: () => void;
    isLoading: boolean;
}

const PraiseHeirView: React.FC<PraiseHeirViewProps> = ({ child, player, onPraise, onBack, isLoading }) => {
    const canAfford = player.money >= HEIR_PRAISE_COST.money && player.prestige >= HEIR_PRAISE_COST.prestige;
    return (
         <div>
            <button onClick={onBack} className="text-sm text-yellow-200 hover:underline mb-4">
                &larr; กลับ
            </button>
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-yellow-100">ยกย่อง {child.name}</h3>
                <p className="text-gray-300">ใช้เส้นสายและบารมีของคุณเพื่อกล่าวชื่นชมทายาทต่อเบื้องสูง เพิ่มคะแนนสืบทอดของพวกเขา</p>
            </div>
             <div className="my-6 p-4 bg-black/40 border-l-4 border-yellow-600/50 rounded-r-lg">
                <p className="text-lg text-white leading-relaxed">
                    การกระทำนี้จะใช้:
                </p>
                <ul className="list-disc list-inside text-white mt-2 space-y-1">
                    <li className={player.money < HEIR_PRAISE_COST.money ? 'text-red-400' : ''}>
                        เงิน: 💰 {HEIR_PRAISE_COST.money.toLocaleString()}
                    </li>
                     <li className={player.prestige < HEIR_PRAISE_COST.prestige ? 'text-red-400' : ''}>
                        บารมี: ✨ {HEIR_PRAISE_COST.prestige.toLocaleString()}
                    </li>
                </ul>
            </div>
            {isLoading ? (
                <div className="flex justify-center py-4">
                    <LoadingSpinner />
                </div>
            ) : (
                 <button 
                    onClick={onPraise}
                    disabled={!canAfford}
                    className="w-full bg-yellow-600 hover:bg-yellow-500 text-red-900 font-bold py-3 px-4 rounded-lg transition-colors text-lg disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                    {canAfford ? 'ยืนยันการยกย่อง' : 'ทรัพยากรไม่เพียงพอ'}
                </button>
            )}
        </div>
    )
}


interface ArrangeEducationViewProps {
    child: NPC;
    playerMoney: number;
    onArrange: (focus: EducationFocus) => void;
    onBack: () => void;
}

const educationOptions: { id: EducationFocus, name: string, description: string, cost: number, icon: string }[] = [
    { id: 'arts', name: 'ศิลปะและอักษรศาสตร์', description: 'เน้นเพิ่มพูนเสน่ห์และสติปัญญา', cost: 5000, icon: '🎨' },
    { id: 'politics', name: 'การเมืองและกลยุทธ์', description: 'เน้นเพิ่มพูนสติปัญญาและบารมี', cost: 7500, icon: '⚖️' },
    { id: 'warfare', name: 'การทหารและการต่อสู้', description: 'เน้นเพิ่มพูนอำนาจและสติปัญญา', cost: 6000, icon: '⚔️' },
    { id: 'etiquette', name: 'มารยาทขั้นพื้นฐาน', description: 'เรียนรู้พื้นฐานทั่วไป เพิ่มสถานะเล็กน้อย', cost: 1000, icon: '📖' },
    { id: 'commerce', name: 'การค้าและเศรษฐศาสตร์', description: 'ฝึกฝนด้านการเงิน เพิ่มสติปัญญาและบารมี', cost: 8000, icon: '💰' },
    { id: 'medicine', name: 'การแพทย์และสมุนไพร', description: 'เรียนรู้การรักษา เพิ่มสติปัญญาและเสน่ห์', cost: 7000, icon: '🌿' },
];

const ArrangeEducationView: React.FC<ArrangeEducationViewProps> = ({ child, playerMoney, onArrange, onBack }) => {
    return (
        <div>
            <button onClick={onBack} className="text-sm text-yellow-200 hover:underline mb-4">
                &larr; กลับไปรายชื่อทายาท
            </button>
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-yellow-100">จัดหลักสูตรให้ {child.name}</h3>
                <p className="text-gray-300">เลือกแนวทางการศึกษาสำหรับทายาท การเลือกจะให้โบนัสทันทีและกำหนดทิศทางการเรียนรู้ในระยะยาว</p>
            </div>
            <div className="space-y-3">
                {educationOptions.map(opt => {
                    const canAfford = playerMoney >= opt.cost;
                    return (
                        <button
                            key={opt.id}
                            onClick={() => onArrange(opt.id)}
                            disabled={!canAfford}
                            className={`w-full text-left p-4 rounded-lg border transition-all flex items-start gap-4 disabled:opacity-60 disabled:cursor-not-allowed ${canAfford ? 'bg-green-900/50 border-green-700/50 hover:bg-green-800/70' : 'bg-gray-800/50 border-gray-700/50'}`}
                        >
                            <span className="text-3xl mt-1">{opt.icon}</span>
                            <div>
                                <div className="flex justify-between font-semibold">
                                    <span>{opt.name}</span>
                                    <span className={canAfford ? 'text-yellow-300' : 'text-red-400'}>💰 {opt.cost.toLocaleString()}</span>
                                </div>
                                <p className="text-xs text-gray-300 mt-1">{opt.description}</p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};


interface HeirManagementModalProps {
  player: PlayerProfile;
  npcs: NPC[];
  onArrangeEducation: (childId: string, focus: EducationFocus, cost: number) => void;
  onPraiseHeir: (childId: string) => Promise<boolean>;
  onClose: () => void;
}

type HeirView = 'list' | 'educate' | 'praise';

const HeirManagementModal: React.FC<HeirManagementModalProps> = ({ player, npcs, onArrangeEducation, onPraiseHeir, onClose }) => {
    const [view, setView] = useState<HeirView>('list');
    const [selectedChild, setSelectedChild] = useState<NPC | null>(null);
    const [isPraiseLoading, setIsPraiseLoading] = useState(false);

    const playerHeirs = useMemo(() => {
        return npcs.filter(npc => (npc.motherId === `player_${player.name}` || npc.fatherId === `player_${player.name}`) && npc.age >= 3);
    }, [npcs, player.name]);

    const handleArrange = (focus: EducationFocus) => {
        if (!selectedChild) return;
        const option = educationOptions.find(o => o.id === focus);
        if (!option) return;
        
        onArrangeEducation(selectedChild.id, focus, option.cost);
        setView('list'); 
        setSelectedChild(null);
    };

    const handlePraise = async () => {
        if (!selectedChild) return;
        setIsPraiseLoading(true);
        const success = await onPraiseHeir(selectedChild.id);
        if (success) {
            setView('list');
            setSelectedChild(null);
        }
        setIsPraiseLoading(false);
    }
    
    const renderContent = () => {
        switch (view) {
            case 'educate':
                return selectedChild && <ArrangeEducationView child={selectedChild} playerMoney={player.money} onArrange={handleArrange} onBack={() => setView('list')} />;
            case 'praise':
                return selectedChild && <PraiseHeirView child={selectedChild} player={player} onPraise={handlePraise} onBack={() => setView('list')} isLoading={isPraiseLoading} />;
            case 'list':
            default:
                 return (
                    <div>
                        {playerHeirs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {playerHeirs.map(child => (
                                    <div key={child.id} className="p-4 bg-indigo-900/40 border border-indigo-700/60 rounded-lg">
                                        <div className="flex items-start gap-4 mb-3">
                                            <img src={child.imageUrl} alt={child.name} className="w-20 h-20 rounded-md object-cover border-2 border-indigo-400/50" />
                                            <div>
                                                <p className="font-bold text-lg text-indigo-200">{child.name} ({child.age} ปี)</p>
                                                <p className="text-sm text-gray-300">{child.title}</p>
                                                 <p className="text-sm text-yellow-300 mt-1 font-bold">
                                                    คะแนนสืบทอด: {child.heirPoints}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-xs text-center mb-3">
                                            <div className="bg-black/20 p-1 rounded">เสน่ห์: <span className="font-bold">{child.charm}</span></div>
                                            <div className="bg-black/20 p-1 rounded">ปัญญา: <span className="font-bold">{child.intelligence}</span></div>
                                            <div className="bg-black/20 p-1 rounded">อำนาจ: <span className="font-bold">{child.power}</span></div>
                                            <div className="bg-black/20 p-1 rounded">บารมี: <span className="font-bold">{child.prestige}</span></div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <button 
                                                onClick={() => { setSelectedChild(child); setView('educate'); }}
                                                className="w-full bg-indigo-700 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg text-sm"
                                            >
                                                จัดหลักสูตร
                                            </button>
                                             <button 
                                                onClick={() => { setSelectedChild(child); setView('praise'); }}
                                                className="w-full bg-yellow-700 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg text-sm"
                                            >
                                                ยกย่อง
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="italic text-gray-400 text-center mt-10">คุณไม่มีทายาทที่อายุถึงเกณฑ์ (3 ปี) สำหรับการศึกษา</p>
                        )}
                    </div>
                );
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 animate-fade-in p-4">
            <div className="bg-red-950/80 backdrop-blur-md border-2 border-main rounded-lg shadow-2xl p-2 w-full max-w-4xl relative text-white max-h-[90vh] flex flex-col">
                <div className="bg-red-800/60 rounded-md p-6 relative flex-grow flex flex-col min-h-0">
                    <button onClick={onClose} className="absolute top-2 right-3 text-yellow-200 hover:text-white text-3xl z-10">&times;</button>
                    <h2 className="text-2xl sm:text-3xl font-bold text-yellow-300 drop-shadow-md text-center mb-6 flex-shrink-0">
                        จัดการศึกษาทายาท
                    </h2>
                    
                    <div className="flex-grow overflow-y-auto pr-2">
                       {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeirManagementModal;