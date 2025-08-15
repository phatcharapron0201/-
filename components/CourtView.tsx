
import React from 'react';
import { PlayerProfile, NPC, JunRank } from '../types';
import { MINISTER_TITLES, JUN_RANKS } from '../constants';

interface CourtViewProps {
    player: PlayerProfile;
    npcs: NPC[];
    onHoldCourt: () => void;
    onOpenConsortManagement: () => void;
    onOpenNightlyConsortSelection: () => void;
}

const DashboardStat: React.FC<{ label: string; value: string | number; icon: string; }> = ({ label, value, icon }) => (
    <div className="bg-black/20 p-4 rounded-lg flex items-center gap-4">
        <div className="text-4xl">{icon}</div>
        <div>
            <p className="text-sm text-gray-300">{label}</p>
            <p className="text-xl font-bold text-white">{typeof value === 'number' ? value.toLocaleString() : value}</p>
        </div>
    </div>
);

export const CourtView: React.FC<CourtViewProps> = ({ player, npcs, onHoldCourt, onOpenConsortManagement, onOpenNightlyConsortSelection }) => {
    const consorts = npcs.filter(n => JUN_RANKS.some(rank => n.title.startsWith(rank.split(' ')[0])) && n.isAlive);
    const ministers = npcs.filter(n => MINISTER_TITLES.includes(n.title) && n.isAlive);

    return (
        <div className="w-full max-w-7xl mx-auto p-4 animate-fade-in h-full flex flex-col">
            <div className="bg-red-950/60 backdrop-blur-xl border-2 border-main rounded-lg shadow-lg p-6 flex flex-col h-full">
                <h1 className="text-3xl sm:text-4xl font-bold text-yellow-300 mb-6 text-center drop-shadow-md flex-shrink-0">
                    ราชสำนักจักรพรรดินี
                </h1>
                
                <div className="flex-grow overflow-y-auto pr-2 grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Left Column: Main Dashboard & Actions */}
                    <div className="lg:col-span-3 space-y-6">
                         {/* Dashboard */}
                        <div className="bg-card-overview/80 border-2 border-card-overview p-4 rounded-lg">
                            <h3 className="text-xl font-semibold text-yellow-200 border-b border-yellow-200/40 pb-2 mb-3">ภาพรวมอาณาจักร</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <DashboardStat label="คลังหลวง" value={player.money} icon="💰" />
                                <DashboardStat label="ขวัญกำลังใจ" value={player.prestige} icon="💖" />
                                <DashboardStat label="กำลังทหาร" value={player.militaryPower} icon="⚔️" />
                                <DashboardStat label="จำนวนราชบุรุษ" value={consorts.length} icon="👥" />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="bg-card-overview/80 border-2 border-card-overview p-4 rounded-lg">
                            <h3 className="text-xl font-semibold text-yellow-200 mb-3">พระราชกรณียกิจ</h3>
                            <div className="space-y-3">
                                <button onClick={onHoldCourt} className="w-full text-left p-4 rounded-lg bg-green-900/70 hover:bg-green-800/90 border border-green-700/60 transition-colors font-semibold text-lg flex items-center gap-3">
                                    <span className="text-2xl">👑</span> ว่าราชการ / เปิดประชุม
                                </button>
                                <button onClick={onOpenConsortManagement} className="w-full text-left p-4 rounded-lg bg-blue-900/70 hover:bg-blue-800/90 border border-blue-700/60 transition-colors font-semibold text-lg flex items-center gap-3">
                                    <span className="text-2xl">⚖️</span> จัดการราชบุรุษ
                                </button>
                                <button onClick={onOpenNightlyConsortSelection} className="w-full text-left p-4 rounded-lg bg-purple-900/70 hover:bg-purple-800/90 border border-purple-700/60 transition-colors font-semibold text-lg flex items-center gap-3">
                                    <span className="text-2xl">🌙</span> เลือกผู้ถวายงานคืนนี้
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Lists */}
                    <div className="lg:col-span-2 space-y-6">
                         <div className="bg-card-overview/80 border-2 border-card-overview p-4 rounded-lg">
                            <h3 className="text-xl font-semibold text-yellow-200 mb-3">ขุนนางที่ปรึกษา</h3>
                            <div className="space-y-3 max-h-64 overflow-y-auto">
                                {ministers.length > 0 ? ministers.map(minister => (
                                    <div key={minister.id} className="flex items-center gap-3 p-2 bg-black/20 rounded">
                                        <img src={minister.imageUrl} alt={minister.name} className="w-12 h-12 rounded-full object-cover"/>
                                        <div>
                                            <p className="font-semibold text-white">{minister.name}</p>
                                            <p className="text-sm text-gray-300">{minister.title}</p>
                                        </div>
                                    </div>
                                )) : <p className="italic text-gray-400">ยังไม่มีขุนนางที่ปรึกษา</p>}
                            </div>
                        </div>

                        <div className="bg-card-overview/80 border-2 border-card-overview p-4 rounded-lg">
                            <h3 className="text-xl font-semibold text-yellow-200 mb-3">ทำเนียบราชบุรุษฝ่ายใน</h3>
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {consorts.length > 0 ? consorts.map(consort => (
                                    <div key={consort.id} className="flex items-center gap-3 p-2 bg-black/20 rounded">
                                        <img src={consort.imageUrl} alt={consort.name} className="w-12 h-12 rounded-full object-cover"/>
                                        <div>
                                            <p className="font-semibold text-white">{consort.name}</p>
                                            <p className="text-sm text-gray-300">{consort.title}</p>
                                            <p className="text-xs text-pink-300">ความโปรดปราน: {consort.favorability}</p>
                                        </div>
                                    </div>
                                )) : <p className="italic text-gray-400">ยังไม่มีราชบุรุษในสังกัด</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
