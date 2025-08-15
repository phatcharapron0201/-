

import React from 'react';
import { PlayerProfile, NPC, PlayerPunishmentChoice, CareerPath, ImperialRank, QinRank } from '../types';
import { IMPERIAL_RANKS } from '../constants';

interface PlayerPunishmentModalProps {
  player: PlayerProfile;
  targetNpc: NPC;
  onPunish: (choice: PlayerPunishmentChoice, targetNpc: NPC) => void;
  onClose: () => void;
}

const getPunishmentChoices = (jealousyLevel: number): PlayerPunishmentChoice[] => {
    const choices: PlayerPunishmentChoice[] = [];

    // Base choices available at all levels
    choices.push({
        text: "ตักเตือนด้วยวาจา",
        description: "สั่งสอนด้วยคำพูดอย่างเยือกเย็น",
        rankPointsGain: Math.round(10 + jealousyLevel * 1.5),
        favorabilityLoss: 2500,
        consequence: {
            message: "คุณได้ตักเตือนนางอย่างเฉียบขาด แสดงถึงอำนาจที่เหนือกว่า",
            statChange: { intelligence: 5 },
        }
    });

    if (jealousyLevel >= 4) {
        choices.push({
            text: "ตบหน้าสั่งสอน",
            description: "ใช้ความรุนแรงเพื่อแสดงให้เห็นว่าใครคือผู้ที่เหนือกว่า",
            rankPointsGain: Math.round(25 + jealousyLevel * 2.5),
            favorabilityLoss: 8000,
            consequence: {
                message: "เสียงฝ่ามือดังก้องไปทั่วบริเวณ นางมองคุณด้วยสายตาที่ทั้งหวาดกลัวและชิงชัง",
                statChange: { intelligence: 2 },
            }
        });
    }
    
    if (jealousyLevel >= 6) {
        choices.push({
            text: "ตบปากสั่งสอน",
            description: "สั่งสอนบทเรียนที่นางจะไม่มีวันลืม ด้วยวาจาที่รุนแรงและอาจรวมถึงการลงมือ",
            rankPointsGain: Math.round(35 + jealousyLevel * 3),
            favorabilityLoss: 12000,
            consequence: {
                message: "คุณตบปากสั่งสอนนาง ทำให้นางหวาดกลัวและเคารพในอำนาจของคุณมากขึ้น",
                statChange: { intelligence: 0 },
            }
        });
    }

    if (jealousyLevel >= 8) {
        choices.push({
            text: "สั่งโบย 20 ที",
            description: "ลงโทษอย่างรุนแรงเพื่อไม่ให้เป็นเยี่ยงอย่าง",
            rankPointsGain: Math.round(50 + jealousyLevel * 4),
            favorabilityLoss: 20000,
            consequence: {
                message: "คุณสั่งลงโทษนางอย่างเลือดเย็น บารมีของคุณเป็นที่น่าเกรงขาม แต่ก็สร้างศัตรูตัวฉกาจขึ้นมา",
                statChange: { intelligence: -5 },
            }
        });
    }
    
    if (jealousyLevel >= 9) {
        choices.push({
            text: "สั่งกักบริเวณในเรือน",
            description: "สั่งกักบริเวณนางในเรือนพักเป็นเวลา 1 เดือน ตัดขาดจากโลกภายนอก",
            rankPointsGain: Math.round(70 + jealousyLevel * 5),
            favorabilityLoss: 30000,
            consequence: {
                message: "คุณสั่งกักบริเวณนางอย่างเด็ดขาด เป็นการกำจัดเสี้ยนหนามไปได้ชั่วคราว",
                statChange: { intelligence: -2 },
            }
        });
    }

    return choices;
};

const getCrossCareerPunishmentChoices = (jealousyLevel: number): PlayerPunishmentChoice[] => {
    const choices: PlayerPunishmentChoice[] = [];

    choices.push({
        text: "สั่งให้คุกเข่า",
        description: "สั่งให้คุกเข่าสำนึกผิดเป็นเวลา 2 ชั่วยาม",
        rankPointsGain: Math.round(15 + jealousyLevel * 2),
        favorabilityLoss: 4000,
        consequence: {
            message: "คุณสั่งให้นางคุกเข่า แสดงให้เห็นถึงอำนาจที่เด็ดขาดของคุณเหนือนาง",
            statChange: { intelligence: 5 },
        }
    });
    
    choices.push({
        text: "สั่งให้คัดคัมภีร์สอนหญิง",
        description: "สั่งให้คัดคัมภีร์สอนหญิง 100 จบ เพื่อให้นางเรียนรู้ที่ทางของตนเอง",
        rankPointsGain: Math.round(20 + jealousyLevel * 2.2),
        favorabilityLoss: 5000,
        consequence: {
            message: "คุณสั่งให้นางคัดคัมภีร์ หวังว่านางจะเข้าใจสถานะของตนเองมากขึ้น",
            statChange: { intelligence: 10 },
        }
    });

    if (jealousyLevel >= 5) {
        choices.push({
            text: "ตบปากสั่งสอน",
            description: "สั่งสอนบทเรียนที่นางจะไม่มีวันลืม",
            rankPointsGain: Math.round(30 + jealousyLevel * 3),
            favorabilityLoss: 10000,
            consequence: {
                message: "คุณตบปากสั่งสอนนาง ทำให้นางหวาดกลัวและเคารพในอำนาจของคุณมากขึ้น",
                statChange: { intelligence: 2 },
            }
        });
    }

    if (jealousyLevel >= 9) {
        choices.push({
            text: "สั่งกักบริเวณในเรือน",
            description: "สั่งกักบริเวณนางในเรือนพักเป็นเวลา 1 เดือน ตัดขาดจากโลกภายนอก",
            rankPointsGain: Math.round(60 + jealousyLevel * 5),
            favorabilityLoss: 25000,
            consequence: {
                message: "คุณสั่งกักบริเวณนางอย่างเด็ดขาด เป็นการกำจัดเสี้ยนหนามไปได้ชั่วคราว",
                statChange: { intelligence: -2 },
            }
        });
    }

    return choices;
};


const PlayerPunishmentModal: React.FC<PlayerPunishmentModalProps> = ({ player, targetNpc, onPunish, onClose }) => {
    // Determine if it's a cross-career punishment
    const isImperialPlayer = player.career === CareerPath.ImperialConsort;
    const playerRankIndex = isImperialPlayer ? IMPERIAL_RANKS.indexOf(player.rank as ImperialRank) : -1;
    const chongyuanIndex = IMPERIAL_RANKS.indexOf(ImperialRank.Chongyuan);
    const isPlayerHighRankImperial = isImperialPlayer && chongyuanIndex !== -1 && playerRankIndex >= chongyuanIndex;
    const isTargetQinConsort = Object.values(QinRank).some(rank => targetNpc.title.startsWith(rank.split(' ')[0]));
    
    const isCrossCareerPunishment = isPlayerHighRankImperial && isTargetQinConsort;

    const choices = isCrossCareerPunishment 
        ? getCrossCareerPunishmentChoices(player.jealousyLevel)
        : getPunishmentChoices(player.jealousyLevel);
    
    const jealousyColors = {
        low: 'text-green-300',
        medium: 'text-yellow-300',
        high: 'text-red-400',
    };
    
    const jealousyStyle = player.jealousyLevel < 4 ? jealousyColors.low : (player.jealousyLevel < 8 ? jealousyColors.medium : jealousyColors.high);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-fade-in p-4">
            <div className="bg-emerald-950/90 backdrop-blur-lg border-2 border-red-500/80 rounded-xl shadow-2xl w-full max-w-xl relative text-white transform scale-100 animate-jump-in max-h-[90vh] flex flex-col">
                 <button onClick={onClose} className="absolute top-2 right-3 text-red-200 hover:text-white text-3xl z-10">&times;</button>
                 <div className="relative p-8 flex flex-col flex-grow overflow-hidden">
                    <div className="text-center mb-6 flex-shrink-0">
                        <h2 className="text-3xl font-extrabold text-red-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] tracking-wider">
                            ลงโทษ
                        </h2>
                        <p className="text-lg text-red-100 mt-2">
                           คุณกำลังจะลงโทษ <span className="font-bold text-white">{targetNpc.name} ({targetNpc.title})</span>
                        </p>
                    </div>

                    <div className="my-6 p-4 bg-black/40 border-l-4 border-red-600/50 rounded-r-lg flex-shrink-0">
                        <p className="text-lg text-white leading-relaxed">
                            ระดับความโกรธแค้นของคุณอยู่ในระดับ <span className={`font-bold ${jealousyStyle}`}>{player.jealousyLevel}/10</span>
                        </p>
                        <p className="text-sm text-gray-300">ระดับความโกรธที่สูงขึ้นจะปลดล็อคการลงโทษที่รุนแรงและให้รางวัลบารมีที่สูงขึ้น</p>
                    </div>

                    <p className="text-center text-lg text-yellow-200 font-semibold mb-6 flex-shrink-0">
                        เลือกวิธีการลงโทษ
                    </p>

                    <div className="flex flex-col items-center gap-3 mt-4 flex-grow overflow-y-auto pr-2">
                        {choices.map((choice, index) => (
                            <button
                                key={index}
                                onClick={() => onPunish(choice, targetNpc)}
                                className="w-full text-left p-4 bg-emerald-900/70 text-white rounded-lg shadow-md transform transition-all hover:scale-105 hover:bg-emerald-800/90 border border-red-700/60"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-lg">{choice.text}</span>
                                    <span className="text-sm text-green-300 font-bold">บารมี +{choice.rankPointsGain}</span>
                                </div>
                                <p className="text-xs text-gray-300 mt-1">{choice.description}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerPunishmentModal;
