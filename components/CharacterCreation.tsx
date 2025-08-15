
import React, { useState } from 'react';
import { PlayerProfile, CareerPath, Shichen, Season, FamilyId } from '../types';
import { INITIAL_NPCS, NOBLE_FAMILIES } from '../constants';

interface CharacterCreationProps {
  onCharacterCreate: (profile: PlayerProfile) => void;
}

const APPEARANCE_OPTIONS = [
    'https://i.pinimg.com/736x/45/86/20/4586206a57395fdb87c9ef8c2f216832.jpg',
    'https://i.pinimg.com/1200x/be/96/bf/be96bf326261afccdd1e239d1611986c.jpg',
    'https://i.pinimg.com/1200x/8e/5e/45/8e5e455787215813b3a6dd38baa5db60.jpg',
    'https://i.pinimg.com/736x/04/9c/54/049c544049c7fe186f78d5c7517a1fd3.jpg',
    'https://i.pinimg.com/736x/16/eb/e8/16ebe86d3b7d8e5c296be25678dbc907.jpg',
    'https://i.pinimg.com/736x/31/07/aa/3107aa3e7249222d86198a4b055568f5.jpg',
    'https://i.pinimg.com/736x/a7/2f/3f/a72f3f131d5af2d3d1b8900d1ac2b350.jpg',
    'https://i.pinimg.com/1200x/07/d6/6b/07d66b02800eed6016866b0b0f139e4c.jpg',
];

const CURRENT_GAME_VERSION = 4;

const CharacterCreation: React.FC<CharacterCreationProps> = ({ onCharacterCreate }) => {
  const [name, setName] = useState('');
  const [selectedFamilyId, setSelectedFamilyId] = useState<FamilyId | ''>('');
  const [selectedCareer, setSelectedCareer] = useState<CareerPath | ''>('');
  const [selectedAge, setSelectedAge] = useState<number>(16);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');
  const [error, setError] = useState('');
  
  const careerChoices = [
    { path: CareerPath.Empress, title: "จักรพรรดินี" },
    { path: CareerPath.ImperialConsort, title: "พระสนมในวังหลวง" },
    { path: CareerPath.QinConsort, title: "พระชายาในจวนฉินอ๋อง" },
  ];
  
  const ageOptions = Array.from({ length: 41 }, (_, i) => 16 + i); // 16 to 56

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (INITIAL_NPCS.some(npc => npc.name === name.trim())) {
        setError(`ชื่อ "${name.trim()}" เป็นชื่อของตัวละครในเกมอยู่แล้ว โปรดเลือกชื่ออื่น`);
        return;
    }

    if (name.trim() && selectedCareer && selectedFamilyId && selectedImageUrl) {
        const selectedFamily = NOBLE_FAMILIES.find(f => f.id === selectedFamilyId);
        if (!selectedFamily) return;
        
        // Base profile shared by all careers
        let baseProfile: Omit<PlayerProfile, 'career' | 'rank' | 'locationId' | 'militaryPower'> & { militaryPower?: number } = {
            name: name.trim(),
            imageUrl: selectedImageUrl,
            familyId: selectedFamilyId,
            age: selectedAge,
            level: 1,
            rankPoints: 0,
            inventory: [],
            charm: 10,
            intelligence: 10,
            power: 5,
            prestige: 5,
            jealousyLevel: 0,
            money: 50,
            isPregnant: false, conceptionDate: null, fatherId: null, secretLover: null,
            isImprisoned: false, isDivorced: false, health: 'healthy',
            skillPoints: 1, unlockedSkills: [], prologueCompleted: false,
            mealsTakenToday: { breakfast: false, lunch: false, dinner: false },
            currentTime: '辰' as Shichen, gameDay: 1, currentSeason: Season.Spring,
            lastTimeUpdate: Date.now(), lastIncomeCollectionTimestamp: Date.now(),
            dailyQuestsCompletedToday: 0, lastActivityDate: new Date().toISOString().split('T')[0],
            maids: [], activeMaidAssignments: {},
            managementStats: { finances: 50, morale: 50, order: 50 },
            factionId: 'neutral',
            factionInfluence: { neutral: 0, empress_faction: 0, noble_consort_faction: 0 },
            version: CURRENT_GAME_VERSION,
        };

        if (selectedFamily.bonus.stat === 'money') {
            baseProfile.money += selectedFamily.bonus.value;
        } else if (['charm', 'intelligence', 'power', 'prestige'].includes(selectedFamily.bonus.stat)) {
             baseProfile[selectedFamily.bonus.stat as 'charm' | 'intelligence' | 'power' | 'prestige'] += selectedFamily.bonus.value;
        }

        let finalProfile: PlayerProfile;

        switch (selectedCareer) {
            case CareerPath.Empress:
                finalProfile = {
                    ...(baseProfile as PlayerProfile),
                    charm: baseProfile.charm + 40,
                    intelligence: baseProfile.intelligence + 40,
                    power: baseProfile.power + 45,
                    prestige: baseProfile.prestige + 95,
                    money: baseProfile.money + 50000,
                    career: CareerPath.Empress,
                    rank: "จักรพรรดินี",
                    locationId: 'empress_chamber',
                    prologueCompleted: true, // No prologue for empress
                    militaryPower: 10000,
                };
                break;
            case CareerPath.QinConsort:
                 finalProfile = {
                    ...(baseProfile as PlayerProfile),
                    career: CareerPath.QinConsort,
                    rank: "คุณหนู",
                    locationId: 'qin_player_chamber',
                    charm: baseProfile.charm + 5,
                    prestige: baseProfile.prestige + 5,
                    money: baseProfile.money + 100,
                    militaryPower: 0,
                };
                break;
            case CareerPath.ImperialConsort:
            default:
                 finalProfile = {
                    ...(baseProfile as PlayerProfile),
                    career: CareerPath.ImperialConsort,
                    rank: "คุณหนู",
                    locationId: 'player_chamber',
                    militaryPower: 0,
                };
                break;
        }
      onCharacterCreate(finalProfile);
    }
  };

  const selectedFamily = NOBLE_FAMILIES.find(f => f.id === selectedFamilyId);

  return (
     <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
      <div className="bg-black/50 backdrop-blur-xl border-2 border-main rounded-lg shadow-2xl p-2 w-full max-w-4xl animate-fade-in">
        <div className="bg-black/30 rounded-md p-8 max-h-[90vh] overflow-y-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-yellow-300 mb-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">สร้างลิขิตชีวิต</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {error && <p className="bg-red-500/50 text-white p-3 rounded-md mb-4 text-center">{error}</p>}
                
                {/* Step 1: Name */}
                <div>
                    <label htmlFor="char-name" className="block text-lg sm:text-xl font-semibold text-yellow-200 mb-2">1. จารึกนามของเจ้า</label>
                    <input id="char-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="กรอกชื่อของคุณ..." className="w-full bg-black/30 border-2 border-yellow-500/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors text-white placeholder-gray-400" required />
                </div>
                
                {/* Step 2: Dropdowns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                         <label htmlFor="career-select" className="block text-lg sm:text-xl font-semibold text-yellow-200 mb-2">2. เลือกเส้นทาง</label>
                         <select id="career-select" value={selectedCareer} onChange={e => setSelectedCareer(e.target.value as CareerPath)} className="w-full bg-black/30 border-2 border-yellow-500/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors text-white" required>
                            <option value="" disabled>-- เลือกเส้นทาง --</option>
                            {careerChoices.map(c => <option key={c.path} value={c.path}>{c.title}</option>)}
                         </select>
                    </div>
                    <div>
                         <label htmlFor="family-select" className="block text-lg sm:text-xl font-semibold text-yellow-200 mb-2">3. เลือกตระกูล</label>
                         <select id="family-select" value={selectedFamilyId || ''} onChange={e => setSelectedFamilyId(e.target.value as FamilyId)} className="w-full bg-black/30 border-2 border-yellow-500/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors text-white" required>
                            <option value="" disabled>-- เลือกตระกูล --</option>
                            {NOBLE_FAMILIES.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                         </select>
                    </div>
                     <div>
                         <label htmlFor="age-select" className="block text-lg sm:text-xl font-semibold text-yellow-200 mb-2">4. เลือกอายุ</label>
                         <select id="age-select" value={selectedAge} onChange={e => setSelectedAge(parseInt(e.target.value))} className="w-full bg-black/30 border-2 border-yellow-500/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors text-white" required>
                            {ageOptions.map(age => <option key={age} value={age}>{age} ปี</option>)}
                         </select>
                    </div>
                </div>
                
                {selectedFamily && (
                    <div className="p-4 border-2 border-yellow-800/80 bg-black/20 rounded-lg text-left transition-all duration-300">
                        <h3 className="text-lg sm:text-xl font-bold text-yellow-200">{selectedFamily.name}</h3>
                        <p className="text-sm text-yellow-100/80 mt-1">{selectedFamily.description}</p>
                        <p className="text-sm font-bold text-green-300 mt-2">โบนัส: {selectedFamily.bonus.stat} +{selectedFamily.bonus.value}</p>
                    </div>
                )}
                
                {/* Step 3: Appearance */}
                 <div>
                    <label className="block text-lg sm:text-xl font-semibold text-yellow-200 mb-3">5. เลือกรูปลักษณ์</label>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
                        {APPEARANCE_OPTIONS.map(url => (
                            <button type="button" key={url} onClick={() => setSelectedImageUrl(url)} className={`rounded-lg overflow-hidden border-4 transition-all duration-200 ${selectedImageUrl === url ? 'border-yellow-400 scale-110' : 'border-transparent hover:border-yellow-600/50'}`}>
                                <img src={url} alt="Character appearance" className="w-full h-24 sm:h-32 object-cover" />
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* Submit */}
                <button type="submit" disabled={!name.trim() || !selectedCareer || !selectedFamilyId || !selectedImageUrl} className="w-full mt-4 bg-gradient-to-r from-yellow-600 to-yellow-400 text-red-900 font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:from-gray-500 disabled:to-gray-400 disabled:cursor-not-allowed disabled:scale-100 shadow-lg text-lg">
                    เริ่มต้นลิขิตชีวิต
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default CharacterCreation;
