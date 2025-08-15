


import React from 'react';
import { PlayerProfile, Shichen, Rank, Season } from '../types';
import { SHICHEN_CYCLE } from '../constants';

interface StatusBarProps {
    player: PlayerProfile;
    onlinePlayerCount: number;
    rankList: Rank[];
    rankRequirements: Record<string, number>;
    onOpenSecretCommand: (preset?: string) => void;
}

const StatusBar: React.FC<StatusBarProps> = ({ player, onlinePlayerCount, rankList, rankRequirements, onOpenSecretCommand }) => {
    const nextRankIndex = rankList.indexOf(player.rank) + 1;
    const nextRank = nextRankIndex < rankList.length ? rankList[nextRankIndex] : null;
    const pointsNeeded = nextRank ? rankRequirements[player.rank] : player.rankPoints;
    const progressPercent = nextRank ? (player.rankPoints / pointsNeeded) * 100 : 100;
    const timeInfo = SHICHEN_CYCLE.find(s => s.name === player.currentTime);
    
    const pregnancyMonths = player.isPregnant && player.conceptionDate 
        ? player.gameDay - player.conceptionDate
        : 0;

    const seasonIcons: Record<Season, string> = {
        [Season.Spring]: '🌸',
        [Season.Summer]: '☀️',
        [Season.Autumn]: '🍁',
        [Season.Winter]: '❄️',
    };

    return (
        <header className="flex-shrink-0 bg-bars backdrop-blur-sm border-b-2 border-bars shadow-lg p-2 px-3 flex items-center justify-between text-white">
            <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-2 flex-wrap">
                    <button onClick={() => onOpenSecretCommand()} className="font-bold text-yellow-200 text-xs sm:text-base hover:text-yellow-100 transition-colors" title="กระซิบคำสั่งลับต่อโชคชะตา">
                        Lv. {player.level} {player.name}
                    </button>
                    <span className="text-xs bg-black/30 px-2 py-0.5 rounded-md border border-white/20">{player.rank}</span>
                     {player.isPregnant && (
                        <span className="text-xs bg-pink-800/70 text-pink-200 px-2 py-0.5 rounded-md border border-pink-500/50 animate-pulse">
                            🤰 ตั้งครรภ์ {pregnancyMonths} เดือน
                        </span>
                    )}
                    {player.health === 'sick' && (
                        <span className="text-xs bg-orange-800/70 text-orange-200 px-2 py-0.5 rounded-md border border-orange-500/50 animate-pulse" title="ร่างกายอ่อนแอ">
                            🤒 ป่วย
                        </span>
                    )}
                     {player.health === 'gravely_ill' && (
                        <span className="text-xs bg-red-900/80 text-red-200 px-2 py-0.5 rounded-md border border-red-600/50 animate-pulse" title="อาการสาหัส">
                            💀 ป่วยหนัก
                        </span>
                    )}
                    {player.isImprisoned && (
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-md border border-gray-500 animate-pulse" title="ถูกกักขัง">
                            ⛓️ ถูกกักขัง
                        </span>
                    )}
                    {player.isDivorced && (
                        <span className="text-xs bg-red-900 text-red-300 px-2 py-0.5 rounded-md border border-red-700 animate-pulse" title="ถูกหย่าร้าง">
                            💔 หย่าร้าง
                        </span>
                    )}
                </div>
                {player.rank !== "คุณหนู" && (
                    <div className="flex items-center gap-1.5 mt-1">
                        <div className="text-xs text-yellow-100">บารมี</div>
                        <div className="flex-1">
                            <div className="bg-red-900/50 rounded-full h-4 w-full overflow-hidden border border-yellow-600/50 relative">
                                <div
                                    className="bg-gradient-to-r from-yellow-500 to-orange-400 h-full transition-all duration-500"
                                    style={{ width: `${progressPercent}%` }}
                                ></div>
                                 <div className="absolute inset-0 flex items-center justify-center text-[0.6rem] font-bold text-white/90" style={{ textShadow: '0 0 2px black' }}>
                                    {player.rankPoints.toFixed(0)}/{nextRank ? pointsNeeded.toLocaleString() : 'MAX'}
                                 </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-col items-end pl-2 ml-2 border-l border-yellow-500/30">
                 <div className="flex items-center gap-2 text-xs text-gray-300 mb-1">
                     <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                           <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                       </svg>
                       <span>{onlinePlayerCount} ออนไลน์</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-2 text-xs font-semibold text-yellow-100">
                    <span title={player.currentSeason}>{seasonIcons[player.currentSeason]}</span>
                    <span>วันที่ {player.gameDay}</span>
                    {timeInfo && (
                        <div className="flex items-center gap-1" title={`ยาม${timeInfo.name} (${timeInfo.period})`}>
                            <span>{timeInfo.icon}</span>
                            <span>ยาม{timeInfo.name}</span>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-1.5 text-yellow-300 bg-black/30 px-2 py-1 rounded-md border border-white/20 mt-1">
                    <span className="text-base">💰</span>
                    <span className="text-sm font-bold">{player.money.toLocaleString()}</span>
                </div>
            </div>
        </header>
    );
}

export default StatusBar;