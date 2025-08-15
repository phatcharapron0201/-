

import React, { useState } from 'react';
import { PlayerProfile, MapLocation, NPC, Quest, QuestEntity, ObjectiveType, CareerPath } from '../types';

interface MapViewProps {
    player: PlayerProfile;
    locations: MapLocation[];
    npcs: NPC[];
    quests: Quest[];
    questEntities: QuestEntity[];
    onGoToLocation: (locationId: string) => void;
    onSearchLocation: (locationId: string) => void;
    onTalkToNpc: (npc: NPC) => void;
    onInviteToLocation: (location: MapLocation) => void;
    onOpenMaidRecruitment: () => void;
    onOpenSecretCommand: (preset?: string) => void;
    onDeleteLocation: (locationId: string) => void;
    onAddLocation: (name: string, description: string) => void;
}

const LocationCard: React.FC<{
    location: MapLocation,
    isCurrentLocation: boolean,
    npcsAtLocation: NPC[],
    itemsToFind: QuestEntity[],
    onGoToLocation: (id: string) => void,
    onSearchLocation: (id: string) => void,
    onInviteToLocation: (loc: MapLocation) => void,
    handleNpcInteraction: (npc: NPC) => void,
    onDeleteLocation: (id: string) => void,
    onOpenMaidRecruitment: () => void;
}> = ({ location, isCurrentLocation, npcsAtLocation, itemsToFind, onGoToLocation, onSearchLocation, onInviteToLocation, handleNpcInteraction, onDeleteLocation, onOpenMaidRecruitment }) => (
    <div
        key={location.id}
        onClick={!isCurrentLocation ? () => onGoToLocation(location.id) : undefined}
        className={`
            bg-card-location rounded-lg shadow-lg transition-all duration-300
            border-2 ${isCurrentLocation ? 'border-card-location scale-[1.02] shadow-[0_0_15px_rgba(255,255,0,0.6)]' : 'border-card-location/50 hover:border-card-location hover:shadow-xl hover:-translate-y-1 cursor-pointer'}
            relative overflow-hidden flex flex-col min-h-[19rem]
        `}
    >
        <div className="p-4 flex-grow flex flex-col">
            <div className="flex-grow">
                {isCurrentLocation && (
                    <div className="absolute top-0 right-0 bg-yellow-400 text-purple-900 text-xs font-bold px-3 py-1 rounded-bl-lg shadow-md z-10">
                        คุณอยู่ที่นี่
                    </div>
                )}
                <h2 className="text-lg sm:text-xl font-bold text-yellow-200 mb-2">{location.name}</h2>
                <p className="text-yellow-100/80 text-sm mb-4">{location.description}</p>
                
                <div>
                    <h3 className="text-sm font-semibold text-gray-300 mb-2">ตัวละครที่อยู่ที่นี่:</h3>
                    <div className="flex flex-wrap gap-2 items-center">
                        {npcsAtLocation.length > 0 ? (
                            npcsAtLocation.map(npc => (
                                <button
                                    key={npc.id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if(isCurrentLocation) handleNpcInteraction(npc);
                                    }}
                                    disabled={!isCurrentLocation}
                                    className={`text-xs text-yellow-100 px-2 py-1 rounded-md transition-colors ${
                                        isCurrentLocation
                                        ? 'bg-purple-800/70 hover:bg-purple-700 border border-purple-600 cursor-pointer'
                                        : 'bg-purple-900/70 cursor-default'
                                    }`}
                                    title={isCurrentLocation ? `พูดคุยกับ ${npc.name}`: ''}
                                >
                                    {npc.name}
                                </button>
                            ))
                        ) : (
                            <p className="text-xs text-gray-400 italic">ไม่มีผู้ใดอยู่</p>
                        )}
                    </div>
                </div>
            </div>
            
            <div className="pt-4 border-t border-yellow-200/40 mt-auto flex-shrink-0">
                {!isCurrentLocation ? (
                    <button
                        onClick={(e) => { e.stopPropagation(); onGoToLocation(location.id); }}
                        className="w-full bg-green-800/80 hover:bg-green-700 text-white font-bold py-2 px-3 rounded-lg transition-colors"
                    >
                        เดินทาง
                    </button>
                ) : (
                    <div className="flex items-stretch gap-2">
                        {location.id === 'maid_market' ? (
                            <button
                                onClick={(e) => { e.stopPropagation(); onOpenMaidRecruitment(); }}
                                className="flex-1 bg-teal-800/80 hover:bg-teal-700 text-white font-bold py-2 px-3 rounded-lg transition-colors"
                            >
                                ว่าจ้างสาวใช้
                            </button>
                        ) : (
                            <>
                                {itemsToFind.length > 0 ? (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onSearchLocation(location.id); }}
                                        className="flex-1 bg-blue-800/80 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-lg transition-colors duration-200 border border-blue-600/80 animate-pulse flex items-center justify-center gap-2"
                                    >
                                        <span className="text-xl">{itemsToFind[0].emoji}</span>
                                        <span>สำรวจ</span>
                                    </button>
                                ) : (
                                     <button
                                        onClick={(e) => { e.stopPropagation(); onInviteToLocation(location); }}
                                        className="flex-1 bg-purple-800/80 hover:bg-purple-700 text-white font-bold py-2 px-3 rounded-lg transition-colors"
                                    >
                                        เชิญมาพบ
                                    </button>
                                )}
                                <button
                                    onClick={(e) => { e.stopPropagation(); onDeleteLocation(location.id); }}
                                    className="flex-shrink-0 bg-red-800/80 hover:bg-red-700 text-white font-bold p-3 rounded-lg transition-colors"
                                    title={`ลบ ${location.name}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    </div>
);


interface AddLocationModalProps {
    onAdd: (name: string, description: string) => void;
    onClose: () => void;
}
  
const AddLocationModal: React.FC<AddLocationModalProps> = ({ onAdd, onClose }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && description.trim()) {
            onAdd(name, description);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 animate-fade-in p-4">
            <div className="bg-red-950/80 backdrop-blur-md border-2 border-main rounded-lg shadow-2xl p-6 w-full max-w-lg relative text-white">
                <button onClick={onClose} className="absolute top-2 right-3 text-yellow-200 hover:text-white text-3xl z-10">&times;</button>
                <h2 className="text-2xl font-bold text-yellow-300 mb-4">เพิ่มสถานที่ใหม่</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="loc-name" className="block text-yellow-200 mb-1">ชื่อสถานที่</label>
                        <input id="loc-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-red-900/80 border-2 border-yellow-500/50 rounded-lg p-2 text-white" required />
                    </div>
                    <div>
                        <label htmlFor="loc-desc" className="block text-yellow-200 mb-1">คำอธิบาย</label>
                        <textarea id="loc-desc" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-red-900/80 border-2 border-yellow-500/50 rounded-lg p-2 text-white h-24" required />
                    </div>
                    <button type="submit" className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg">เพิ่ม</button>
                </form>
            </div>
        </div>
    );
};


export const MapView: React.FC<MapViewProps> = ({
    player,
    locations,
    npcs,
    quests,
    questEntities,
    onGoToLocation,
    onSearchLocation,
    onTalkToNpc,
    onInviteToLocation,
    onOpenMaidRecruitment,
    onOpenSecretCommand,
    onDeleteLocation,
    onAddLocation
}) => {
    const [filter, setFilter] = useState<'all' | 'imperial' | 'qin' | 'other'>('all');
    const [showAddModal, setShowAddModal] = useState(false);

    const activeFindObjectives = quests
        .filter(q => q.status === 'active')
        .flatMap(q => q.objectives)
        .filter(o => o.type === ObjectiveType.FIND && !o.isCompleted);

    const imperialLocationIds = [
        'player_chamber', 'gate', 'garden', 'study', 'kunning_palace', 'yanxi_palace',
        'guifei_chamber', 'yikun_palace', 'taifeng_palace', 'kitchen', 'infirmary',
        'laundry_house', 'training_ground', 'winter_palace', 'art_pavilion', 'moon_lake',
        'stargazing_tower', 'guest_house', 'imperial_treasury', 'imperial_temple',
        'courtesan_pavilion', 'silk_workshop', 'yonghe_palace', 'royal_market', 'imperial_prison'
    ];
    
    const qinMansionLocationIds = [
        'qin_mansion', 'qin_player_chamber', 'wang_chenghui_chamber', 'jia_ruren_chamber', 'ying_yingshi_chamber'
    ];

    const filteredLocations = locations.filter(location => {
        const isImperial = imperialLocationIds.includes(location.id);
        const isQin = qinMansionLocationIds.includes(location.id);
        const isMaidMarket = location.id === 'maid_market';
        const isFamilyMansion = location.id === 'family_mansion';
        const isRoyalMarket = location.id === 'royal_market';

        // Always show these important locations regardless of filter
        if (isMaidMarket || isFamilyMansion || isRoyalMarket) return true;

        switch (filter) {
            case 'imperial': return isImperial;
            case 'qin': return isQin;
            case 'other': return !isImperial && !isQin;
            case 'all':
            default:
                // If player is in a specific career, only show relevant locations unless 'all' is explicitly selected
                if (player.career === CareerPath.ImperialConsort) return isImperial || isMaidMarket || isFamilyMansion;
                if (player.career === CareerPath.QinConsort) return isQin || isMaidMarket || isFamilyMansion;
                return true; // if career is not set or something else, show all
        }
    });

    const FilterButton: React.FC<{
        filterType: 'all' | 'imperial' | 'qin' | 'other';
        currentFilter: string;
        onClick: (filter: 'all' | 'imperial' | 'qin' | 'other') => void;
        children: React.ReactNode;
    }> = ({ filterType, currentFilter, onClick, children }) => {
        const isActive = currentFilter === filterType;
        return (
            <button
                onClick={() => onClick(filterType)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                    isActive ? 'bg-yellow-400 text-purple-900 shadow-md' : 'bg-red-900/60 text-yellow-100 hover:bg-red-800'
                }`}
            >
                {children}
            </button>
        );
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-4 animate-fade-in">
            {showAddModal && <AddLocationModal onAdd={onAddLocation} onClose={() => setShowAddModal(false)} />}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-yellow-300 drop-shadow-md">แผนที่</h1>
                <div className="flex flex-wrap gap-2 justify-center">
                    <FilterButton filterType="all" currentFilter={filter} onClick={setFilter}>ทั้งหมด</FilterButton>
                    <FilterButton filterType="imperial" currentFilter={filter} onClick={setFilter}>วังหลวง</FilterButton>
                    <FilterButton filterType="qin" currentFilter={filter} onClick={setFilter}>จวนอ๋อง</FilterButton>
                    <FilterButton filterType="other" currentFilter={filter} onClick={setFilter}>อื่นๆ</FilterButton>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredLocations.map(location => {
                    const npcsAtLocation = npcs.filter(npc => npc.locationId === location.id && npc.isAlive);
                    const itemsToFind = questEntities.filter(entity => {
                        const objective = activeFindObjectives.find(o => o.targetId === entity.id);
                        return objective && objective.locationId === location.id;
                    });
                    
                    return (
                        <LocationCard
                            key={location.id}
                            location={location}
                            isCurrentLocation={player.locationId === location.id}
                            npcsAtLocation={npcsAtLocation}
                            itemsToFind={itemsToFind}
                            onGoToLocation={onGoToLocation}
                            onSearchLocation={onSearchLocation}
                            onInviteToLocation={onInviteToLocation}
                            handleNpcInteraction={onTalkToNpc}
                            onDeleteLocation={onDeleteLocation}
                            onOpenMaidRecruitment={onOpenMaidRecruitment}
                        />
                    );
                })}
            </div>
            <div className="mt-6 flex justify-center gap-4">
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
                >
                    เพิ่มสถานที่
                </button>
                <button
                    onClick={() => onOpenSecretCommand('มีเหตุการณ์สำคัญเกิดขึ้นที่')}
                    className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg"
                >
                    สร้างเหตุการณ์
                </button>
            </div>
        </div>
    );
};