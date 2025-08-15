import React, { useState, useEffect, useRef } from 'react';
import { IMPERIAL_RANKS, NOBLE_FAMILIES, QUEST_ITEM_SELL_VALUES, QIN_RANKS } from '../constants';
import { Rank, PlayerProfile, InventoryItem, Quest, QuestDifficulty, ImperialRank, QinRank, NPC } from '../types';

interface CharacterProfileProps {
  profile: PlayerProfile;
  onClose: () => void;
  rankList: Rank[];
  rankRequirements: Record<string, number>;
  loveInterest?: NPC;
  onLogout: () => void;
  onDeleteAccount: () => void;
  onOpenGuide: () => void;
  installPromptEvent: any;
  onInstall: () => void;
  onOpenInventory: () => void;
}

const imperialRankColors: Record<ImperialRank, string> = {
    [ImperialRank.Gongren]: "bg-gray-500", [ImperialRank.Cainu]: "bg-gray-400 text-black",
    [ImperialRank.Yunu]: "bg-teal-700", [ImperialRank.Baolin]: "bg-teal-600",
    [ImperialRank.Cairen]: "bg-green-600", [ImperialRank.Meiren]: "bg-green-500",
    [ImperialRank.Jieyu]: "bg-blue-600", [ImperialRank.Chongyuan]: "bg-indigo-600",
    [ImperialRank.Chongrong]: "bg-indigo-500", [ImperialRank.Chongyi]: "bg-purple-600",
    [ImperialRank.Xiuyuan]: "bg-purple-500", [ImperialRank.Xiurong]: "bg-fuchsia-600",
    [ImperialRank.Xiuyi]: "bg-fuchsia-500", [ImperialRank.Zhaoyuan]: "bg-pink-600",
    [ImperialRank.Zhaorong]: "bg-pink-500", [ImperialRank.Zhaoyi]: "bg-rose-600",
    [ImperialRank.Xianfei]: "bg-red-700", [ImperialRank.Defei]: "bg-red-600",
    [ImperialRank.Shufei]: "bg-orange-600", [ImperialRank.Guifei]: "bg-yellow-400 text-red-900",
    [ImperialRank.HuangGuifei]: "bg-amber-400 text-red-900",
    [ImperialRank.Huanghou]: "bg-yellow-500 text-red-900",
    [ImperialRank.Taihou]: "bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 text-red-900 font-bold border-2 border-yellow-200",
};

const qinRankColors: Record<QinRank, string> = {
    [QinRank.Yingshi]: "bg-stone-500",
    [QinRank.Ruren]: "bg-lime-700",
    [QinRank.Baoyi]: "bg-lime-600",
    [QinRank.Fengyi]: "bg-green-700",
    [QinRank.Shunü]: "bg-green-600",
    [QinRank.Zhaoxun]: "bg-red-700",
    [QinRank.Wanyi]: "bg-red-600",
    [QinRank.Chenghui]: "bg-teal-700",
    [QinRank.Jinghua]: "bg-teal-600",
    [QinRank.Zhaohua]: "bg-cyan-700",
    [QinRank.Liangyuan]: "bg-sky-700",
    [QinRank.Shuyuan]: "bg-blue-700",
    [QinRank.Liangdi]: "bg-indigo-700",
    [QinRank.Cefei]: "bg-violet-700",
    [QinRank.Wangfei]: "bg-amber-500 text-red-900",
    [QinRank.Taifei]: "bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-red-900 font-bold border-2 border-yellow-200",
};

const getRankColor = (rank: Rank): string => {
    if (rank === "คุณหนู") return "bg-pink-300 text-pink-900";
    if (Object.values(ImperialRank).includes(rank as ImperialRank)) {
        return imperialRankColors[rank as ImperialRank];
    }
    if (Object.values(QinRank).includes(rank as QinRank)) {
        return qinRankColors[rank as QinRank];
    }
    return "bg-gray-500";
};

const StatDisplay: React.FC<{ icon: JSX.Element; label: string; value: number; color: string }> = ({ icon, label, value, color }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const prevValue = useRef(value);

    useEffect(() => {
        if (value > prevValue.current) {
            setIsAnimating(true);
            const timer = setTimeout(() => setIsAnimating(false), 500); // Animation duration matches CSS
            return () => clearTimeout(timer);
        }
    }, [value]);

    // This second effect ensures prevValue is updated after the render, including for decreases.
    useEffect(() => {
        prevValue.current = value;
    });

    return (
        <div className={`bg-black/30 p-3 rounded-lg flex items-center transition-transform duration-300 ${isAnimating ? 'stat-update-anim' : ''}`}>
            <div className={`w-10 h-10 flex items-center justify-center rounded-md mr-3 text-white ${color}`}>
                {icon}
            </div>
            <div>
                <div className="text-sm text-yellow-100">{label}</div>
                <div className="text-lg sm:text-xl font-bold text-white">{value.toLocaleString()}</div>
            </div>
        </div>
    );
};

const CharacterProfile: React.FC<CharacterProfileProps> = ({ profile, onClose, rankList, rankRequirements, loveInterest, onLogout, onDeleteAccount, onOpenGuide, installPromptEvent, onInstall, onOpenInventory }) => {
  const nextRankIndex = rankList.indexOf(profile.rank) + 1;
  const nextRank = nextRankIndex < rankList.length ? rankList[nextRankIndex] : null;
  const pointsNeeded = nextRank ? rankRequirements[profile.rank] : profile.rankPoints;
  const progressPercent = nextRank ? (profile.rankPoints / pointsNeeded) * 100 : 100;
  
  const family = profile.familyId ? NOBLE_FAMILIES.find(f => f.id === profile.familyId) : null;
  const favorabilityProgressPercent = loveInterest ? (loveInterest.favorability / 2000) * 100 : 0;
  
  const handleDelete = () => {
    if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบบัญชีนี้อย่างถาวร? การกระทำนี้ไม่สามารถย้อนกลับได้`)) {
        onDeleteAccount();
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 animate-fade-in">
      <div className="bg-black/50 backdrop-blur-xl border-2 border-main rounded-lg shadow-2xl p-2 w-full max-w-md relative text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://i.pinimg.com/1200x/31/0f/20/310f20cb39721c28cda2030be926ab3f.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="rounded-md p-6 relative flex flex-col max-h-[85vh]">
            <button onClick={onClose} className="absolute top-2 right-3 text-yellow-200 hover:text-white text-3xl z-10">&times;</button>
            
            {/* Header (fixed) */}
            <div className="flex-shrink-0">
                <div className="flex flex-col items-center pt-8 pb-4">
                  {profile.imageUrl && (
                    <img src={profile.imageUrl} alt={profile.name} className="w-32 h-32 object-cover rounded-full border-4 border-yellow-400/50 shadow-lg mb-4" />
                  )}
                  <h2 className="text-3xl sm:text-4xl font-bold text-yellow-300 drop-shadow-md mb-2">{family ? `${family.name} ` : ''}{profile.name}</h2>
                  <p className="text-lg sm:text-xl font-semibold text-yellow-100 mb-4">Level {profile.level} | อายุ {profile.age} ปี</p>
                  <div className="text-center">
                    <div className={`mt-2 px-4 py-1 rounded-full text-base sm:text-lg font-semibold shadow-md ${getRankColor(profile.rank)}`}>
                      {profile.rank}
                    </div>
                    <div className="text-sm text-gray-300 mt-2">({profile.career})</div>
                  </div>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-grow overflow-y-auto min-h-0 pr-4 -mr-4">
                {profile.rank === 'คุณหนู' ? (
                    loveInterest && (
                        <div className="mt-4">
                            <h3 className="text-lg sm:text-xl font-semibold text-yellow-200 mb-2">ภารกิจแรก: พิชิตใจ</h3>
                            <p className="text-sm text-center text-gray-200 mb-2">ได้รับความโปรดปรานจาก {loveInterest.name} ให้ครบ 2,000 คะแนน เพื่อรับการแต่งตั้งอย่างเป็นทางการ</p>
                            <div className="bg-red-900/50 rounded-full h-6 w-full overflow-hidden border-2 border-pink-500/50">
                                <div
                                    className="bg-gradient-to-r from-pink-500 to-rose-400 h-full transition-all duration-500"
                                    style={{ width: `${favorabilityProgressPercent}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-sm mt-1 text-pink-200">
                                <span className="font-semibold">{loveInterest.favorability.toLocaleString()} / 2,000</span>
                            </div>
                        </div>
                    )
                ) : (
                    <div className="mt-4">
                      <h3 className="text-lg sm:text-xl font-semibold text-yellow-200 mb-2">ความก้าวหน้าบารมี</h3>
                      <div className="bg-red-900/50 rounded-full h-6 w-full overflow-hidden border-2 border-yellow-600/50">
                        <div
                          className="bg-gradient-to-r from-yellow-500 to-orange-400 h-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm mt-1 text-yellow-100">
                        <span className="font-semibold">{profile.rankPoints.toFixed(0)} / {nextRank ? pointsNeeded.toLocaleString() : 'MAX'}</span>
                        <span>{nextRank ? `สู่ ${nextRank}` : 'สูงสุดแล้ว'}</span>
                      </div>
                    </div>
                )}
                
                <div className="mt-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-yellow-200 mb-3">ค่าสถานะ</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <StatDisplay
                            label="เสน่ห์"
                            value={profile.charm}
                            color="bg-pink-500/80"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2L9.5 8.5 3 11l6.5 2.5L12 22l2.5-6.5L21 11l-6.5-2.5L12 2z" /></svg>}
                        />
                        <StatDisplay
                            label="สติปัญญา"
                            value={profile.intelligence}
                            color="bg-blue-500/80"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>}
                        />
                        <StatDisplay
                            label="อำนาจ"
                            value={profile.power}
                            color="bg-red-600/80"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                        />
                        <StatDisplay
                            label="บารมี"
                            value={profile.prestige}
                            color="bg-purple-500/80"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.49 9.11c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>}
                        />
                    </div>
                </div>
            </div>
            
            {/* Footer (fixed) */}
            <div className="flex-shrink-0 mt-auto pt-4 border-t border-yellow-500/30 space-y-3">
                {installPromptEvent && (
                    <button
                        onClick={onInstall}
                        className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                        ติดตั้งแอปพลิเคชัน
                    </button>
                )}
                <button 
                    onClick={onOpenInventory}
                    className="w-full bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                    เปิดสัมภาระ
                </button>
                <button 
                    onClick={onOpenGuide}
                    className="w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                    คู่มือการเล่น
                </button>
                <button 
                    onClick={onLogout}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                    ออกจากระบบ
                </button>
                <button
                    onClick={handleDelete}
                    className="w-full bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                    ลบบัญชีถาวร
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterProfile;

interface InventoryProps {
  inventory: InventoryItem[];
  quests: Quest[];
  onUseItem: (instanceId: string) => void;
  onSellItem: (instanceId: string) => void;
  onClose: () => void;
}

export const Inventory: React.FC<InventoryProps> = ({ inventory, quests, onUseItem, onSellItem, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 animate-fade-in p-4">
      <div className="bg-black/50 backdrop-blur-xl border-2 border-main rounded-lg shadow-2xl p-2 w-full max-w-4xl relative text-white max-h-[80vh] flex flex-col">
        <div className="bg-black/30 rounded-md p-6 relative flex-grow flex flex-col min-h-0">
          <button onClick={onClose} className="absolute top-2 right-3 text-yellow-200 hover:text-white text-3xl z-10">&times;</button>
          <h2 className="text-2xl sm:text-3xl font-bold text-yellow-300 mb-6 text-center drop-shadow-md flex-shrink-0">สัมภาระ</h2>
          
          <div className="flex-grow overflow-y-auto pr-2">
            {inventory.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {inventory.map(item => {
                  let sellPrice = 0;
                  if (item.type === 'quest') {
                      const quest = quests.find(q => q.id === item.questId);
                      if (quest) {
                          sellPrice = QUEST_ITEM_SELL_VALUES[quest.difficulty] || 0;
                      }
                  } else {
                      sellPrice = Math.floor((item.price || 0) / 2);
                  }

                  const canSell = sellPrice > 0;

                  return (
                    <div key={item.instanceId} className="p-3 bg-black/30 border border-yellow-600/50 rounded-lg flex flex-col text-center" title={item.description}>
                      <div className="text-5xl my-2 flex-grow flex items-center justify-center">{item.emoji}</div>
                      <div className="flex-shrink-0 w-full mt-2">
                          <span className="text-yellow-100 font-semibold text-sm capitalize">{item.name}</span>
                           {(item.type === 'consumable' || item.type === 'artifact') && item.effect && (
                             <p className="text-xs text-green-300 font-bold capitalize mt-1">
                               {item.effect.stat} +{item.effect.value}
                             </p>
                           )}
                           {item.type === 'gift' && item.favorabilityEffect && (
                               <p className="text-xs text-pink-300 font-bold capitalize mt-1">
                                   ความพึงพอใจ +{item.favorabilityEffect}
                               </p>
                           )}
                           
                          <div className="mt-3 w-full flex flex-col space-y-1.5">
                              {item.type === 'consumable' && (
                                <button
                                  onClick={() => onUseItem(item.instanceId)}
                                  className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-1 px-2 text-xs rounded transition-colors"
                                >
                                  ใช้
                                </button>
                              )}
                              {canSell && (
                                  <button
                                      onClick={() => onSellItem(item.instanceId)}
                                      className="w-full bg-yellow-800 hover:bg-yellow-700 text-white font-bold py-1 px-2 text-xs rounded transition-colors"
                                  >
                                      ขาย (💰{sellPrice})
                                  </button>
                              )}
                          </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-center text-gray-300 italic">ในสัมภาระของคุณว่างเปล่า</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};