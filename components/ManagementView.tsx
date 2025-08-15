



import React from 'react';
import { PlayerProfile, NPC, FactionId, ImperialRank, QinRank, CareerPath, Rank, Investigation } from '../types';
import { FACTIONS } from '../constants';

interface ManagementViewProps {
    player: PlayerProfile;
    npcs: NPC[];
    onJoinFaction: (factionId: FactionId) => void;
    onFactionAction: (actionType: string) => void;
    onOpenMaidManagement: () => void;
    onOpenHeirManagement: () => void;
    onStartInvestigation: () => void;
    activeInvestigation: Investigation | null;
}

const FactionCard: React.FC<{
    faction: (typeof FACTIONS)[0],
    leader?: NPC,
    onJoin: () => void,
    isJoined: boolean,
    canJoin: boolean,
}> = ({ faction, leader, onJoin, isJoined, canJoin }) => {
    return (
        <div className={`p-4 rounded-lg shadow-lg flex flex-col h-full transition-all duration-300
            ${isJoined 
                ? 'bg-yellow-900/40 border-2 border-yellow-400' 
                : 'bg-red-900/70 border border-yellow-700/50'
            }`}
        >
            <h3 className="text-2xl font-bold text-yellow-200">{faction.name}</h3>
            {leader && (
                 <div className="flex items-center gap-2 mt-2">
                    {leader.imageUrl && <img src={leader.imageUrl} alt={leader.name} className="w-10 h-10 rounded-full object-cover border-2 border-yellow-800" />}
                    <div>
                        <p className="text-sm text-yellow-100">ผู้นำ: {leader.name}</p>
                        <p className="text-xs text-gray-300">{leader.title}</p>
                    </div>
                </div>
            )}
            <p className="text-sm text-yellow-100/80 mt-3 flex-grow">{faction.description}</p>
            {canJoin && (
                <button
                    onClick={onJoin}
                    className="w-full mt-4 bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                    เข้าร่วมฝ่าย
                </button>
            )}
        </div>
    );
};

const ManagementView: React.FC<ManagementViewProps> = ({ player, npcs, onJoinFaction, onFactionAction, onOpenMaidManagement, onOpenHeirManagement, onStartInvestigation, activeInvestigation }) => {
    
    const currentFaction = FACTIONS.find(f => f.id === player.factionId);
    
    const imperialRankRequired = player.career === CareerPath.ImperialConsort ? ImperialRank.Zhaoyi : QinRank.Liangdi;
    const rankList: Rank[] = player.career === CareerPath.ImperialConsort ? Object.values(ImperialRank) : Object.values(QinRank);
    const playerRankIndex = rankList.indexOf(player.rank);
    const requiredRankIndex = rankList.indexOf(imperialRankRequired);
    const hasManagementAccess = playerRankIndex >= requiredRankIndex;

    const rulerId = player.career === CareerPath.ImperialConsort ? 'xuanzong' : 'qin_wang';
    const heirs = npcs.filter(npc => npc.fatherId === rulerId && npc.gender === 'male' && npc.isAlive).sort((a, b) => b.heirPoints - a.heirPoints);
    const playerHeirs = heirs.filter(npc => npc.motherId === `player_${player.name}`);


    return (
        <div className="w-full max-w-6xl mx-auto p-4 animate-fade-in h-full flex flex-col">
            <div className="bg-red-950/60 backdrop-blur-xl border-2 border-main rounded-lg shadow-lg p-6 flex flex-col h-full">
                <h1 className="text-3xl sm:text-4xl font-bold text-yellow-300 mb-6 text-center drop-shadow-md flex-shrink-0">
                    อำนาจและอิทธิพล
                </h1>
                
                <div className="flex-grow overflow-y-auto pr-2 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                     <div>
                        <h2 className="text-2xl font-semibold text-yellow-100 mb-4">การจัดการวัง/จวน</h2>
                        <div className="space-y-6">
                             <div className="p-4 rounded-lg bg-yellow-900/40 border-2 border-yellow-400">
                                <h3 className="text-xl font-bold text-yellow-100 mb-2">กรมวังฝ่ายใน</h3>
                                {hasManagementAccess ? (
                                    <div className="space-y-4">
                                        <p className="text-sm text-yellow-100">ในฐานะผู้มีตำแหน่งสูง ท่านได้รับสิทธิ์ในการเข้าถึงการบริหารจัดการฝ่ายใน</p>
                                        <div className="grid grid-cols-3 gap-3 text-center">
                                            <div className="bg-black/20 p-2 rounded-md">
                                                <p className="text-xs text-gray-300">การเงิน</p>
                                                <p className="text-lg font-bold">{player.managementStats.finances}</p>
                                            </div>
                                            <div className="bg-black/20 p-2 rounded-md">
                                                <p className="text-xs text-gray-300">ขวัญกำลังใจ</p>
                                                <p className="text-lg font-bold">{player.managementStats.morale}</p>
                                            </div>
                                            <div className="bg-black/20 p-2 rounded-md">
                                                <p className="text-xs text-gray-300">ความเป็นระเบียบ</p>
                                                <p className="text-lg font-bold">{player.managementStats.order}</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                     <div className="text-center py-4">
                                        <p className="text-gray-300 font-bold text-lg">🔒 ถูกล็อค</p>
                                        <p className="text-sm text-gray-400 mt-2">คุณต้องมีตำแหน่งตั้งแต่ <span className="font-semibold text-white">{imperialRankRequired}</span> ขึ้นไปเพื่อเข้าถึงระบบนี้</p>
                                     </div>
                                )}
                            </div>

                            <div className="p-4 rounded-lg bg-indigo-900/40 border-2 border-indigo-400">
                                <h3 className="text-xl font-bold text-indigo-100 mb-2">การศึกษาทายาท</h3>
                                 {playerHeirs.length > 0 ? (
                                    <div>
                                        <p className="text-sm text-indigo-100">ดูแลและวางแผนการศึกษาเพื่ออนาคตของทายาทของคุณ</p>
                                         <button onClick={onOpenHeirManagement} className="w-full mt-3 text-center bg-indigo-800 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                                            จัดการศึกษาทายาท
                                        </button>
                                    </div>
                                ) : (
                                     <div className="text-center py-4">
                                        <p className="text-sm text-gray-400">คุณยังไม่มีทายาท</p>
                                     </div>
                                )}
                            </div>

                             <div className="p-4 rounded-lg bg-teal-900/40 border-2 border-teal-400">
                                <h3 className="text-xl font-bold text-teal-100 mb-2">การสืบสวนคดี</h3>
                                {activeInvestigation ? (
                                    <div>
                                        <p className="text-sm text-teal-100 font-bold">กำลังสืบสวนคดี:</p>
                                        <p className="text-lg text-white">{activeInvestigation.caseTitle}</p>
                                        <p className="text-xs text-gray-300 mt-2">ใช้ปุ่มลอยที่มุมขวาเพื่อดูรายละเอียด</p>
                                    </div>
                                ) : (
                                    <div className="text-center py-4">
                                        <p className="text-sm text-gray-300">ยังไม่มีคดีที่ต้องสืบสวน</p>
                                        <button onClick={onStartInvestigation} className="w-full mt-3 text-center bg-teal-800 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                                            เริ่มการสืบสวนคดีใหม่
                                        </button>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>

                    {/* Right Column */}
                     <div>
                        <h2 className="text-2xl font-semibold text-yellow-100 mb-4">การเมืองและราชบัลลังก์</h2>
                         <div className="space-y-6">
                            {/* Faction System */}
                            <div>
                                <h3 className="text-xl font-bold text-yellow-100 mb-2">ฝ่ายอำนาจ</h3>
                                {!currentFaction || currentFaction.id === 'neutral' ? (
                                    <div>
                                        <p className="text-center text-yellow-100 mb-4">คุณยังไม่ได้สังกัดฝ่ายใด</p>
                                        <div className="grid grid-cols-1 gap-4">
                                            {FACTIONS.filter(f => f.id !== 'neutral').map(faction => (
                                                <FactionCard 
                                                    key={faction.id}
                                                    faction={faction}
                                                    leader={npcs.find(n => n.id === faction.leaderId)}
                                                    onJoin={() => onJoinFaction(faction.id)}
                                                    isJoined={false}
                                                    canJoin={true}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                     <div>
                                        <FactionCard 
                                            faction={currentFaction}
                                            leader={npcs.find(n => n.id === currentFaction.leaderId)}
                                            onJoin={() => {}}
                                            isJoined={true}
                                            canJoin={false}
                                        />
                                        <div className="mt-4 p-4 rounded-lg bg-black/20">
                                            <h4 className="text-lg font-semibold text-yellow-100 mb-3">กิจกรรมฝ่าย</h4>
                                            <div className="space-y-2">
                                                <button onClick={() => onFactionAction('praise_leader')} className="w-full text-left p-3 rounded-lg bg-green-900/50 hover:bg-green-800/70 border border-green-700/50 transition-colors">
                                                    <p className="font-semibold">ยกย่องผู้นำ</p>
                                                    <p className="text-xs text-gray-300">ใช้ 💰2,000 เพื่อเพิ่มความสัมพันธ์กับผู้นำฝ่าย</p>
                                                </button>
                                                <button onClick={() => onFactionAction('gather_intel')} className="w-full text-left p-3 rounded-lg bg-blue-900/50 hover:bg-blue-800/70 border border-blue-700/50 transition-colors">
                                                    <p className="font-semibold">รวบรวมข่าวกรอง</p>
                                                    <p className="text-xs text-gray-300">ใช้ 💰5,000 เพื่อสืบข่าวฝ่ายตรงข้าม</p>
                                                </button>
                                                <button onClick={() => onFactionAction('donate_faction')} className="w-full text-left p-3 rounded-lg bg-yellow-900/50 hover:bg-yellow-800/70 border border-yellow-700/50 transition-colors">
                                                    <p className="font-semibold">บริจาคให้ฝ่าย</p>
                                                    <p className="text-xs text-gray-300">ใช้ 💰10,000 เพื่อเพิ่มบารมีและอิทธิพล</p>
                                                </button>
                                                <button onClick={() => onFactionAction('sabotage_rival')} className="w-full text-left p-3 rounded-lg bg-red-900/50 hover:bg-red-800/70 border border-red-700/50 transition-colors">
                                                    <p className="font-semibold">บ่อนทำลายฝ่ายศัตรู</p>
                                                    <p className="text-xs text-gray-300">ใช้ 💰25,000 เพื่อลดอิทธิพลของฝ่ายศัตรู (เสี่ยง)</p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Heir Succession */}
                             <div>
                                <h3 className="text-xl font-bold text-yellow-100 mb-2 mt-4">ลำดับการสืบทอด</h3>
                                <div className="p-4 rounded-lg bg-black/20 space-y-3">
                                    {heirs.length > 0 ? (
                                        heirs.map((heir, index) => {
                                            const mother = npcs.find(n => n.id === heir.motherId);
                                            const isPlayerHeir = playerHeirs.some(ph => ph.id === heir.id);
                                            return (
                                                <div key={heir.id} className={`p-3 rounded-md ${isPlayerHeir ? 'bg-green-900/50 border-l-4 border-green-400' : 'bg-gray-800/50'}`}>
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center gap-3">
                                                            <span className="font-bold text-lg text-yellow-300">{index + 1}</span>
                                                            <div>
                                                                <p className="font-semibold text-white">{heir.name}</p>
                                                                <p className="text-xs text-gray-300">มารดา: {mother?.name || 'ไม่ทราบ'}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-bold text-lg text-yellow-100">{heir.heirPoints}</p>
                                                            <p className="text-xs text-gray-300">คะแนนสืบทอด</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p className="text-center text-gray-400 italic">ยังไม่มีทายาท</p>
                                    )}
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagementView;