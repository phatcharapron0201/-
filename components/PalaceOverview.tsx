


import React, { useEffect, useState } from 'react';
import { PlayerProfile, Quest, NPC, CareerPath, ImperialRank, QinRank, RoyalAudienceChoice, RoyalAudienceAgenda, RoyalAudienceResult } from '../types';
import LoadingSpinner from './LoadingSpinner';

// --- NEW COMPONENT: RoyalAudienceModal ---
interface RoyalAudienceModalProps {
    player: PlayerProfile;
    ruler: NPC;
    rivals: NPC[];
    onClose: () => void;
    onAudience: (agenda: RoyalAudienceAgenda, rivalId?: string) => Promise<RoyalAudienceResult | null>;
}

const RoyalAudienceModal: React.FC<RoyalAudienceModalProps> = ({ player, ruler, rivals, onClose, onAudience }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<RoyalAudienceResult | null>(null);
    const [selectedRivalId, setSelectedRivalId] = useState<string>('');

    const choices: Omit<RoyalAudienceChoice, 'npcToReportId'>[] = [
        { agenda: 'praise', title: 'ยกยอปอปั้น', description: 'ใช้เสน่ห์ของคุณเพื่อทำให้ฝ่าบาทพอพระทัย' },
        { agenda: 'discuss_affairs', title: 'สนทนาเรื่องบ้านเมือง', description: 'แสดงสติปัญญาของคุณในการสนทนาเรื่องสำคัญ' },
        { agenda: 'report_rival', title: 'ฟ้องร้องคู่แข่ง', description: 'กล่าวโทษคู่แข่งเพื่อทำลายชื่อเสียง (มีความเสี่ยงสูง)' },
        { agenda: 'request_gift', title: 'ทูลขอของขวัญ', description: 'ทูลขอรางวัลเล็กน้อยจากฝ่าบาท' }
    ];

    const handleSelect = async (choice: Omit<RoyalAudienceChoice, 'npcToReportId'>) => {
        if (choice.agenda === 'report_rival' && !selectedRivalId) {
            alert('โปรดเลือกคู่แข่งที่จะฟ้องร้อง');
            return;
        }
        setIsLoading(true);
        const apiResult = await onAudience(choice.agenda, selectedRivalId);
        setResult(apiResult);
        setIsLoading(false);
    };
    
    if (result) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-fade-in p-4 modal-backdrop">
                <div className="bg-red-950/60 backdrop-blur-xl border-2 border-main rounded-lg shadow-2xl p-8 w-full max-w-lg relative text-white text-center">
                    <h3 className="text-2xl font-bold text-yellow-200 mb-4">ผลการเข้าเฝ้า</h3>
                    <p className={`text-lg mb-4 ${result.success ? 'text-green-300' : 'text-red-300'}`}>
                        {result.success ? 'สำเร็จ!' : 'ล้มเหลว...'}
                    </p>
                    <p className="text-white bg-black/30 p-4 rounded-md mb-6">{result.outcomeMessage}</p>
                    <button onClick={onClose} className="w-full bg-yellow-600 hover:bg-yellow-500 text-red-900 font-bold py-2 px-4 rounded-lg">ปิด</button>
                </div>
            </div>
        );
    }


    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-fade-in p-4 modal-backdrop">
            <div className="bg-red-950/60 backdrop-blur-xl border-2 border-main rounded-lg shadow-2xl p-2 w-full max-w-2xl relative text-white max-h-[90vh] flex flex-col">
                <div className="bg-red-800/50 rounded-md p-6 relative flex-grow flex flex-col min-h-0">
                    <button onClick={onClose} className="absolute top-2 right-3 text-yellow-200 hover:text-white text-3xl z-10">&times;</button>
                    <div className="text-center mb-6 flex-shrink-0">
                        <h2 className="text-3xl font-bold text-yellow-300 drop-shadow-md">เข้าเฝ้า {ruler.name}</h2>
                        <p className="text-yellow-100 mt-2">เลือกหัวข้อที่จะสนทนา</p>
                    </div>

                    {isLoading ? (
                        <div className="flex-grow flex items-center justify-center">
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <div className="flex-grow overflow-y-auto pr-2 space-y-3">
                            {choices.map(choice => (
                                <div key={choice.agenda} className="bg-red-900/60 p-4 rounded-lg border border-yellow-700/50">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="text-lg font-semibold text-yellow-100">{choice.title}</h4>
                                            <p className="text-xs text-gray-300">{choice.description}</p>
                                        </div>
                                        <button onClick={() => handleSelect(choice)} disabled={choice.agenda === 'report_rival' && !selectedRivalId} className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm disabled:bg-gray-500 disabled:cursor-not-allowed">
                                            เลือก
                                        </button>
                                    </div>
                                    {choice.agenda === 'report_rival' && (
                                        <select
                                            value={selectedRivalId}
                                            onChange={(e) => setSelectedRivalId(e.target.value)}
                                            className="w-full mt-3 bg-red-900/80 border-2 border-yellow-500/50 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors text-white text-sm"
                                        >
                                            <option value="">-- เลือกคู่แข่ง --</option>
                                            {rivals.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                                        </select>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

interface PalaceOverviewProps {
    player: PlayerProfile;
    quests: Quest[];
    npcs: NPC[];
    globalEventLog: string[];
    onPracticeArts: () => void;
    onRest: () => void;
    onSummonMaid: () => void;
    onOpenFeastModal: () => void;
    activityCooldowns: Record<string, number>;
    onOpenMaidManagement: () => void;
    onTakeMeal: (meal: 'breakfast' | 'lunch' | 'dinner') => void;
    onEducateHeir: () => void;
    onDonate: (type: 'kitchen' | 'flood') => void;
    ruler?: NPC;
    onRoyalAudience: (agenda: RoyalAudienceAgenda, rivalId?: string) => Promise<RoyalAudienceResult | null>;
}

const Section: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <div className="bg-card-overview/80 border-2 border-card-overview p-4 rounded-lg">
        <h3 className="text-lg sm:text-xl font-semibold text-yellow-200 border-b border-yellow-200/40 pb-2 mb-3">{title}</h3>
        <div className="space-y-3 text-sm">{children}</div>
    </div>
);

const CooldownButton: React.FC<{ onClick: () => void; cooldown?: number; children: React.ReactNode; isDisabled?: boolean; specialStyle?: string }> = ({ onClick, cooldown = 0, children, isDisabled: externalIsDisabled = false, specialStyle }) => {
    const [timeLeft, setTimeLeft] = useState(Math.ceil((cooldown - Date.now()) / 1000));

    useEffect(() => {
        if (cooldown > Date.now()) {
            const interval = setInterval(() => {
                const newTimeLeft = Math.ceil((cooldown - Date.now()) / 1000);
                if (newTimeLeft > 0) {
                    setTimeLeft(newTimeLeft);
                } else {
                    setTimeLeft(0);
                    clearInterval(interval);
                }
            }, 1000);
            return () => clearInterval(interval);
        } else if (timeLeft !== 0) {
            setTimeLeft(0);
        }
    }, [cooldown]);

    const isDisabled = externalIsDisabled || timeLeft > 0;
    const defaultStyle = "bg-green-900/70 text-white hover:bg-green-800/90 border-green-700/60";
    const disabledStyle = "bg-gray-800/50 text-gray-400 cursor-not-allowed";

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={`w-full text-left p-3 rounded-lg shadow-md transform transition-all border disabled:scale-100 ${isDisabled ? disabledStyle : (specialStyle || defaultStyle)}`}
        >
            <div className="flex justify-between items-center">
                <span className={`font-semibold`}>{children}</span>
                {timeLeft > 0 && <span className="text-xs text-yellow-300">รออีก {timeLeft} วิ</span>}
            </div>
        </button>
    );
};

const RelationshipBar: React.FC<{ npc: NPC }> = ({ npc }) => (
    <div>
        <div className="flex justify-between items-center text-yellow-100 mb-1">
            <div className="flex items-center gap-2">
                {npc.imageUrl && <img src={npc.imageUrl} alt={npc.name} className="w-8 h-8 rounded-full object-cover border-2 border-yellow-800" />}
                <div>
                    <span className="font-semibold block">{npc.name}</span>
                    <span className="text-xs text-gray-300">{npc.title}</span>
                </div>
            </div>
            <span>{npc.favorability}</span>
        </div>
        <div className="bg-red-900/50 rounded-full h-4 w-full overflow-hidden border border-red-700/50">
            <div
                className="bg-gradient-to-r from-pink-500 to-rose-400 h-full transition-all duration-500"
                style={{ width: `${Math.max(0, Math.min(100, (npc.favorability + 10000) / 200))}%` }}
                title={`Favorability: ${npc.favorability}`}
            />
        </div>
    </div>
);

const PalaceOverview: React.FC<PalaceOverviewProps> = (props) => {
    const { player, quests, npcs, globalEventLog, onPracticeArts, onRest, onSummonMaid, onOpenFeastModal, activityCooldowns, onOpenMaidManagement, onTakeMeal, onEducateHeir, onDonate, ruler, onRoyalAudience } = props;
    const [isAudienceModalOpen, setAudienceModalOpen] = useState(false);
    
    const activeQuests = quests.filter(q => q.status === 'active').slice(0, 3);

    const imperialConsorts = npcs
        .filter(npc => 
            npc.careerAffiliation?.includes(CareerPath.ImperialConsort) &&
            (Object.values(ImperialRank).some(rankValue => npc.title.startsWith(rankValue.split(' ')[0])) || npc.title === "พระสนมเอก")
        )
        .sort((a, b) => b.favorability - a.favorability);

    const qinConsorts = npcs
        .filter(npc => 
            npc.careerAffiliation?.includes(CareerPath.QinConsort) &&
            Object.values(QinRank).some(rankValue => npc.title.startsWith(rankValue.split(' ')[0]))
        )
        .sort((a, b) => b.favorability - a.favorability);
        
    const rivalsForAudience = player.career === CareerPath.ImperialConsort ? imperialConsorts : qinConsorts;

    const isBreakfastTime = ['辰', '巳'].includes(player.currentTime);
    const canTakeBreakfast = isBreakfastTime && !player.mealsTakenToday?.breakfast;

    const isLunchTime = ['午'].includes(player.currentTime);
    const canTakeLunch = isLunchTime && !player.mealsTakenToday?.lunch;

    const isDinnerTime = ['酉', '戌'].includes(player.currentTime);
    const canTakeDinner = isDinnerTime && !player.mealsTakenToday?.dinner;
    
    const playerHeirs = npcs.filter(npc => (npc.motherId === `player_${player.name}` || npc.fatherId === `player_${player.name}`) && npc.age >= 3);
    const hasEducatedHeirToday = player.lastHeirEducationDay === player.gameDay;

    return (
        <div className="w-full max-w-6xl mx-auto p-4 animate-fade-in h-full flex flex-col">
            {isAudienceModalOpen && ruler && <RoyalAudienceModal player={player} ruler={ruler} rivals={rivalsForAudience} onClose={() => setAudienceModalOpen(false)} onAudience={onRoyalAudience}/>}

            <div className="bg-red-950/60 backdrop-blur-xl border-2 border-main rounded-lg shadow-lg p-6 flex flex-col h-full">
                <h1 className="text-3xl sm:text-4xl font-bold text-yellow-300 mb-6 text-center drop-shadow-md flex-shrink-0">
                    ภาพรวมวังหลัง
                </h1>
                
                <div className="flex-grow overflow-y-auto pr-2 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6 lg:col-span-2">
                        <Section title="สาส์นข่าวกรอง (Intelligence Report)">
                            <div className="relative h-64 overflow-y-auto pr-2 [mask-image:linear-gradient(to_bottom,transparent,black_5%,black_95%,transparent)]">
                                {globalEventLog.length > 0 ? (
                                    <ul className="space-y-2 list-disc list-inside text-white">
                                        {globalEventLog.map((event, index) => (
                                            <li key={index}>{event}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="italic text-gray-400">ยังไม่มีข่าวสารใดๆ ที่น่าสนใจ</p>
                                )}
                            </div>
                        </Section>

                        <Section title="สรุปภารกิจสำคัญ (Quest Quick-View)">
                            {activeQuests.length > 0 ? (
                                <div className="space-y-3">
                                    {activeQuests.map(q => (
                                        <div key={q.id} className="bg-black/20 p-3 rounded-md">
                                            <h4 className="font-semibold text-yellow-100">{q.title}</h4>
                                            <p className="text-xs text-gray-300">{q.objectives.find(o => !o.isCompleted)?.description}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="italic text-gray-400">ไม่มีภารกิจที่กำลังดำเนินอยู่</p>
                            )}
                        </Section>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <Section title="ภาพรวมความสัมพันธ์">
                             <div className="space-y-4">
                                {player.career === CareerPath.ImperialConsort ? (
                                    <>
                                        <h4 className="text-base font-bold text-yellow-100">วังหลวง (vs ฮ่องเต้)</h4>
                                        {imperialConsorts.length > 0 ? (
                                            imperialConsorts.map(npc => <RelationshipBar key={npc.id} npc={npc} />)
                                        ) : (
                                            <p className="italic text-gray-400 text-xs">ยังไม่มีข้อมูลความสัมพันธ์ในวังหลวง</p>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <h4 className="text-base font-bold text-yellow-100">จวนฉินอ๋อง (vs ฉินอ๋อง)</h4>
                                        {qinConsorts.length > 0 ? (
                                            qinConsorts.map(npc => <RelationshipBar key={npc.id} npc={npc} />)
                                        ) : (
                                            <p className="italic text-gray-400 text-xs">ยังไม่มีข้อมูลความสัมพันธ์ในจวนอ๋อง</p>
                                        )}
                                    </>
                                )}
                            </div>
                        </Section>

                        <Section title="กิจกรรมประจำวัน">
                            <div className="space-y-2">
                                 <CooldownButton onClick={() => setAudienceModalOpen(true)} cooldown={activityCooldowns['audience']} specialStyle="bg-red-800/80 hover:bg-red-700/90 text-white border-red-600/60 font-bold">
                                    เข้าเฝ้า (กิจกรรมพิเศษ)
                                </CooldownButton>
                                {isBreakfastTime && (
                                    <button
                                        onClick={() => onTakeMeal('breakfast')}
                                        disabled={!canTakeBreakfast}
                                        className={`w-full text-left p-3 rounded-lg shadow-md transform transition-all border disabled:scale-100 ${!canTakeBreakfast ? "bg-gray-800/50 text-gray-400 cursor-not-allowed" : "bg-yellow-800/70 hover:bg-yellow-700/90 text-white border-yellow-600/60"}`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold">{player.mealsTakenToday?.breakfast ? "รับประทานอาหารเช้าแล้ว" : "รับประทานอาหารเช้า (ปัญญา +5)"}</span>
                                        </div>
                                    </button>
                                )}
                                {isLunchTime && (
                                    <button
                                        onClick={() => onTakeMeal('lunch')}
                                        disabled={!canTakeLunch}
                                        className={`w-full text-left p-3 rounded-lg shadow-md transform transition-all border disabled:scale-100 ${!canTakeLunch ? "bg-gray-800/50 text-gray-400 cursor-not-allowed" : "bg-yellow-800/70 hover:bg-yellow-700/90 text-white border-yellow-600/60"}`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold">{player.mealsTakenToday?.lunch ? "รับประทานอาหารกลางวันแล้ว" : "รับประทานอาหารกลางวัน (ปัญญา +5)"}</span>
                                        </div>
                                    </button>
                                )}
                                {isDinnerTime && (
                                    <button
                                        onClick={() => onTakeMeal('dinner')}
                                        disabled={!canTakeDinner}
                                        className={`w-full text-left p-3 rounded-lg shadow-md transform transition-all border disabled:scale-100 ${!canTakeDinner ? "bg-gray-800/50 text-gray-400 cursor-not-allowed" : "bg-yellow-800/70 hover:bg-yellow-700/90 text-white border-yellow-600/60"}`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold">{player.mealsTakenToday?.dinner ? "รับประทานอาหารเย็นแล้ว" : "รับประทานอาหารเย็น (ปัญญา +5)"}</span>
                                        </div>
                                    </button>
                                )}
                                <CooldownButton
                                    onClick={onEducateHeir}
                                    isDisabled={hasEducatedHeirToday || playerHeirs.length === 0}
                                    specialStyle="bg-indigo-800/70 hover:bg-indigo-700/90 text-white border-indigo-600/60"
                                >
                                    {playerHeirs.length === 0 ? "คุณไม่มีทายาท" : hasEducatedHeirToday ? "อบรมทายาทแล้ววันนี้" : "อบรมทายาท (รับโบนัสทันที)"}
                                </CooldownButton>
                                <CooldownButton onClick={onSummonMaid} cooldown={activityCooldowns['summon']}>
                                    เรียกสาวใช้ส่วนตัวมาพบ
                                </CooldownButton>
                                <CooldownButton onClick={onOpenMaidManagement} specialStyle="bg-blue-800/70 hover:bg-blue-700/90 text-white border-blue-600/60">
                                    จัดการสาวใช้
                                </CooldownButton>
                                 <CooldownButton onClick={onOpenFeastModal} cooldown={activityCooldowns['feast']} specialStyle="bg-yellow-800/70 hover:bg-yellow-700/90 text-white border-yellow-600/60">
                                    จัดงานเลี้ยง (บารมี/สัมพันธ์)
                                </CooldownButton>
                            </div>
                        </Section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PalaceOverview;