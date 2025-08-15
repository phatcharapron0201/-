

import React, { useState } from 'react';
import { NPC, MapLocation, PlayerProfile, Rank, ImperialRank, QinRank, CareerPath, Emotion } from '../types';
import { IMPERIAL_RANKS, POTENTIAL_LOVER_IDS, QIN_RANKS } from '../constants';

// --- NEW COMPONENT: CharacterActionsModal ---
interface CharacterActionsModalProps {
    player: PlayerProfile;
    npc: NPC;
    onClose: () => void;
    onTravelAndTalk: (npc: NPC) => void;
    onOpenPunishModal: (npc: NPC) => void;
    onOpenSlanderModal: (npc: NPC) => void;
    onOpenDarkActionModal: (npc: NPC) => void;
    onSecretMeeting: (npc: NPC) => void;
    onProposeAffair: (npc: NPC) => void;
    onOpenGiftModal: (npc: NPC) => void;
    onOpenSendMessageModal: (npc: NPC) => void;
    canPunish: boolean;
    canSlander: boolean;
    isRivalHeir: boolean;
    isSecretLover: boolean;
    canProposeAffair: boolean;
    canDoDarkAction: boolean;
}

const ActionButton: React.FC<{ onClick: () => void; disabled?: boolean; title: string; children: React.ReactNode; className: string; }> = ({ onClick, disabled, title, children, className }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        title={title}
        className={`w-full p-3 rounded-lg flex flex-col items-center justify-center transition-all duration-200 text-white font-semibold text-sm shadow-md h-24 ${disabled ? 'bg-gray-700/50 text-gray-400 cursor-not-allowed' : className}`}
    >
        {children}
    </button>
);


const CharacterActionsModal: React.FC<CharacterActionsModalProps> = (props) => {
    const { npc, onClose, player } = props;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 animate-fade-in p-4 modal-backdrop" onClick={onClose}>
            <div className="bg-red-950/60 backdrop-blur-xl border-2 border-main rounded-lg shadow-2xl p-2 w-full max-w-lg relative text-white" onClick={e => e.stopPropagation()}>
                <div className="bg-red-800/50 rounded-md p-6 relative">
                    <button onClick={onClose} className="absolute top-2 right-3 text-yellow-200 hover:text-white text-3xl z-10">&times;</button>
                    
                    <div className="flex items-center gap-4 mb-6">
                        {npc.imageUrl && <img src={npc.imageUrl} alt={npc.name} className="w-20 h-20 object-cover rounded-full border-4 border-yellow-400/50" />}
                        <div>
                            <h2 className="text-2xl font-bold text-yellow-200">{npc.name}</h2>
                            <p className="text-yellow-100">{npc.title}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <ActionButton onClick={() => props.onTravelAndTalk(npc)} title={`เดินทางไปพบ ${npc.name}`} className="bg-blue-700 hover:bg-blue-600">
                             <span>💬</span><span className="mt-1">พูดคุย</span>
                        </ActionButton>
                        <ActionButton onClick={() => props.onOpenGiftModal(npc)} title={`มอบของขวัญให้ ${npc.name}`} className="bg-pink-700 hover:bg-pink-600">
                            <span>🎁</span><span className="mt-1">ของขวัญ</span>
                        </ActionButton>
                        <ActionButton onClick={() => props.onOpenSendMessageModal(npc)} title={`ส่งสารให้ ${npc.name}`} className="bg-teal-700 hover:bg-teal-600">
                             <span>✉️</span><span className="mt-1">ส่งสาร</span>
                        </ActionButton>
                        <ActionButton onClick={() => props.onOpenSlanderModal(npc)} disabled={!props.canSlander && !props.isRivalHeir} title={props.canSlander || props.isRivalHeir ? "สร้างข่าวลือหรือใส่ร้าย" : "ไม่สามารถใส่ร้ายบุคคลนี้ได้"} className="bg-indigo-700 hover:bg-indigo-600">
                             <span>🎭</span><span className="mt-1">{props.isRivalHeir ? "ใส่ร้ายทายาท" : "ใส่ร้าย"}</span>
                        </ActionButton>
                         <ActionButton onClick={() => props.onOpenPunishModal(npc)} disabled={!props.canPunish} title={props.canPunish ? "ลงโทษผู้ที่ยศต่ำกว่าหรือข้ารับใช้" : "คุณไม่สามารถลงโทษบุคคลนี้ได้"} className="bg-orange-800 hover:bg-orange-700">
                             <span>⚖️</span><span className="mt-1">ลงโทษ</span>
                        </ActionButton>
                        <ActionButton onClick={() => props.onOpenDarkActionModal(npc)} disabled={!props.canDoDarkAction} title={props.canDoDarkAction ? "กระทำการบางอย่างในเงามืด..." : "เป้าหมายไม่ได้ตั้งครรภ์"} className="bg-black/80 hover:bg-black text-red-300 border border-red-700">
                            <span>💀</span><span className="mt-1">การกระทำมืด</span>
                        </ActionButton>
                        {props.isSecretLover && (
                            <ActionButton onClick={() => props.onSecretMeeting(npc)} title={`นัดพบ ${npc.name} เป็นการลับ`} className="col-span-3 bg-rose-700 hover:bg-rose-600">
                                <span>❤️‍🔥</span><span className="mt-1">นัดพบเป็นการลับ</span>
                            </ActionButton>
                        )}
                         {props.canProposeAffair && (
                            <ActionButton onClick={() => props.onProposeAffair(npc)} title={`ชวน ${npc.name} มามีความสัมพันธ์ต้องห้าม`} className="col-span-3 bg-rose-700 hover:bg-rose-600 animate-pulse">
                                <span>❤️‍🔥</span><span className="mt-1">ชวนมีความสัมพันธ์ต้องห้าม</span>
                            </ActionButton>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


interface CharactersViewProps {
    player: PlayerProfile;
    npcs: NPC[];
    locations: MapLocation[];
    onTravelAndTalk: (npc: NPC) => void;
    onOpenPunishModal: (npc: NPC) => void;
    onOpenSlanderModal: (npc: NPC) => void;
    onOpenDarkActionModal: (npc: NPC) => void;
    onSecretMeeting: (npc: NPC) => void;
    onProposeAffair: (npc: NPC) => void;
    onOpenGiftModal: (npc: NPC) => void; 
    onOpenSendMessageModal: (npc: NPC) => void;
    rankList: Rank[];
    onOpenGroupChatSetup: () => void;
}

const emotionEmojis: Record<Emotion, string> = {
    [Emotion.Neutral]: '😐',
    [Emotion.Joy]: '😊',
    [Emotion.Love]: '😍',
    [Emotion.Admiration]: '😌',
    [Emotion.Jealousy]: '😒',
    [Emotion.Anger]: '😠',
    [Emotion.Hatred]: '😡',
    [Emotion.Revenge]: '😤',
};


const CharactersView: React.FC<CharactersViewProps> = ({
    player,
    npcs,
    locations,
    onTravelAndTalk,
    onOpenPunishModal,
    onOpenSlanderModal,
    onOpenDarkActionModal,
    onSecretMeeting,
    onProposeAffair,
    onOpenGiftModal,
    onOpenSendMessageModal,
    rankList,
    onOpenGroupChatSetup
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [actionTarget, setActionTarget] = useState<NPC | null>(null);

    const getLocationName = (locationId: string): string => {
        return locations.find(l => l.id === locationId)?.name || 'ไม่ทราบตำแหน่ง';
    };

    const playerRankIndex = rankList.indexOf(player.rank);
    
    const SERVANT_TITLES = [
        "นางกำนัล", "หัวหน้าขันที", "พ่อบ้านจวนอ๋อง", "องครักษ์ส่วนตัว",
        "องครักษ์ประตูวัง", "หัวหน้าสาวใช้", "สาวใช้ส่วนตัว", "หัวหน้าห้องเครื่อง", "หัวหน้าโรงทอผ้า",
        "หัวหน้าองครักษ์", "ผู้ดูแลคลังสมบัติ", "แม่สื่อ"
    ];

    const getNpcRankIndex = (npc: NPC): number => {
        const ranksToCheck: Rank[] = [...Object.values(ImperialRank), ...Object.values(QinRank)];
        for (const rank of ranksToCheck) {
            if (npc.title.startsWith(rank.split(" ")[0])) {
                return rankList.indexOf(rank);
            }
        }
        if (npc.title === "พระสนมเอก") return rankList.indexOf(ImperialRank.Guifei);
        if (npc.title === "หวังเฟย") return rankList.indexOf(QinRank.Wangfei);
        return -1;
    };

    const filteredNpcs = npcs.filter(npc =>
        npc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const logicCache = new Map<string, any>();
    const getNpcLogic = (npc: NPC) => {
        if (logicCache.has(npc.id)) {
            return logicCache.get(npc.id);
        }
        const isDead = !npc.isAlive;
        const npcRankIndex = getNpcRankIndex(npc);
        const isServant = SERVANT_TITLES.includes(npc.title);
        const canPunishByRank = playerRankIndex !== -1 && npcRankIndex !== -1 && playerRankIndex > npcRankIndex;
        const chongyuanIndex = IMPERIAL_RANKS.indexOf(ImperialRank.Chongyuan);
        const isPlayerHighRankImperial = player.career === CareerPath.ImperialConsort && chongyuanIndex !== -1 && playerRankIndex >= chongyuanIndex;
        const isTargetQinConsort = Object.values(QinRank).some(rank => npc.title.startsWith(rank.split(' ')[0]));
        const canPunish = !isDead && (canPunishByRank || isServant || (isPlayerHighRankImperial && isTargetQinConsort));

        const canSlander = !isDead && npc.id !== 'xuanzong' && npc.id !== 'qin_wang' && npc.age >= 16;
        
        const isMainLoveInterest = 
            (player.career === CareerPath.ImperialConsort && npc.id === 'xuanzong') ||
            (player.career === CareerPath.QinConsort && npc.id === 'qin_wang');
        
        const isHeir = npc.gender === 'male' && (npc.fatherId === 'xuanzong' || npc.fatherId === 'qin_wang');
        const isRivalHeir = isHeir && npc.motherId !== `player_${player.name}`;

        const isSecretLover = player.secretLover?.npcId === npc.id;
        const canProposeAffair = !isDead && !player.secretLover && !isMainLoveInterest && POTENTIAL_LOVER_IDS.includes(npc.id) && npc.favorability > 8000;
        const canDoDarkAction = !isDead && npc.isPregnant === true;
        
        const isFamily = npc.familyId === player.familyId && npc.familyRole;

        const result = { isDead, canPunish, canSlander, isRivalHeir, isSecretLover, canProposeAffair, canDoDarkAction, isFamily };
        logicCache.set(npc.id, result);
        return result;
    }

    return (
        <div className="w-full max-w-4xl mx-auto animate-fade-in p-4 h-full flex flex-col">
            {actionTarget && <CharacterActionsModal 
                player={player}
                npc={actionTarget}
                onClose={() => setActionTarget(null)}
                onTravelAndTalk={onTravelAndTalk}
                onOpenPunishModal={onOpenPunishModal}
                onOpenSlanderModal={onOpenSlanderModal}
                onOpenDarkActionModal={onOpenDarkActionModal}
                onSecretMeeting={onSecretMeeting}
                onProposeAffair={onProposeAffair}
                onOpenGiftModal={onOpenGiftModal}
                onOpenSendMessageModal={onOpenSendMessageModal}
                {...getNpcLogic(actionTarget)} 
            />}
            <div className="bg-red-950/60 backdrop-blur-xl border-2 border-main rounded-lg shadow-lg p-6 flex flex-col h-full">
                <div className="flex-shrink-0">
                    <h2 className="text-2xl sm:text-3xl font-bold text-yellow-300 mb-4 text-center drop-shadow-md">รายชื่อตัวละคร</h2>
                    <div className="mb-4 max-w-lg mx-auto">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="ค้นหาชื่อตัวละคร..."
                            className="w-full bg-red-900/80 border-2 border-yellow-500/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors text-white placeholder-gray-400"
                            aria-label="ค้นหาตัวละคร"
                        />
                    </div>
                    <div className="mb-6 text-center">
                        <button
                            onClick={onOpenGroupChatSetup}
                            className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-md"
                        >
                            เริ่มการสนทนากลุ่ม
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow overflow-y-auto pr-2">
                    {filteredNpcs.length > 0 ? filteredNpcs.map(npc => {
                        const { isDead, isSecretLover, isFamily } = getNpcLogic(npc);

                        return (
                            <div key={npc.id} className={`bg-card-character p-4 rounded-lg border border-card-character shadow-md flex flex-col justify-between ${isDead ? 'opacity-50 bg-gray-800' : ''}`}>
                                <div>
                                    <div className="flex items-start gap-4">
                                        {npc.imageUrl && (
                                            <img src={npc.imageUrl} alt={npc.name} className="w-24 h-24 object-cover rounded-lg flex-shrink-0 border-2 border-yellow-800" />
                                        )}
                                        <div className="flex-grow">
                                            <h3 className="text-lg sm:text-xl font-bold text-card-character-title flex items-center gap-2">
                                                {isFamily && <span className="text-lg bg-yellow-200 text-red-900 px-2 rounded-md font-serif-sc" title="สมาชิกในครอบครัว">家</span>}
                                                {npc.name}
                                                {isDead && <span className="text-sm bg-black text-white px-2 rounded-md" title="เสียชีวิตแล้ว">ไว้อาลัย</span>}
                                                {npc.isPregnant && <span className="text-xl" title="กำลังตั้งครรภ์">🤰</span>}
                                                {isSecretLover && <span className="text-xl text-rose-400" title="คนรักลับ">❤️‍🔥</span>}
                                                <span title={npc.emotion}>{emotionEmojis[npc.emotion]}</span>
                                            </h3>
                                            <p className="text-sm text-card-character-body">{npc.title} | อายุ {npc.age} ปี</p>
                                            
                                            <div className="mt-3 text-sm space-y-1 text-card-character-body">
                                                <p><span className="font-semibold text-card-character-label">ความพึงพอใจ:</span> {npc.favorability}</p>
                                                <p><span className="font-semibold text-card-character-label">สถานที่:</span> {getLocationName(npc.locationId)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto pt-4 border-t border-card-character/40">
                                    {isDead ? (
                                        <p className="text-center text-gray-400 font-semibold">จากไปอย่างสงบ</p>
                                    ) : (
                                        <button
                                            onClick={() => setActionTarget(npc)}
                                            title={`โต้ตอบกับ ${npc.name}`}
                                            className="w-full bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-3 text-sm rounded-lg transition-colors"
                                        >
                                            โต้ตอบ
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    }) : (
                        <p className="text-center text-gray-400 italic md:col-span-2">ไม่พบตัวละครที่ตรงกับคำค้นหาของคุณ</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CharactersView;