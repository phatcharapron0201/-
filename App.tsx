
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { PlayerProfile, Quest, NPC, Rank, ObjectiveType, InventoryItem, ConversationHistories, ChatMessage, MapLocation, QuestEntity, QuestDifficulty, QuestStatus, Shichen, QuestCategory, PunishmentEvent, PunishmentChoice, NotificationData, NotificationType, EventContext, ItemType, StatType, PlayerPunishmentChoice, Emotion, CareerPath, ImperialRank, QinRank, SpecialConversationState, SkillId, PrologueState, SecretLover, InduceMiscarriageResult, Season, IdleReport, StruggleForLifeResult, DialogueResult, PrinceVisitAnnouncement, MessageResult, GeminiServiceResponse, SecretCommandResult, NpcDialogueOutcome, Investigation, IncomingMessageState, GeneratedItem, Maid, MaidTask, ActiveConversation, GroupDialogueResult, ConversationRumorResult, SlanderHeirResult, FactionId, JealousyChoice, RoyalAudienceAgenda, RoyalAudienceResult, GroupDialogueResponse, EducationFocus, SlanderResult, PrologueStepResult, JunRank } from './types';
import { INITIAL_NPCS, IMPERIAL_RANKS, QIN_RANKS, MAP_LOCATIONS, FAVORABILITY_RANK_MAP, IMPERIAL_RANK_REQUIREMENTS, QIN_RANK_REQUIREMENTS, SHICHEN_CYCLE, POTENTIAL_IMPERIAL_VISITS, POTENTIAL_QIN_VISITS, SHOP_ITEMS, QUEST_ITEM_SELL_VALUES, IMPERIAL_RANK_ACCUMULATED_POINTS, QIN_RANK_ACCUMULATED_POINTS, SEASONS, POTENTIAL_LOVER_IDS, STATIC_QUESTS, FEAST_BASE_COST, FEAST_COST_PER_GUEST, FEAST_FAVORABILITY_REWARD, FEAST_PRESTIGE_REWARD, AVAILABLE_MAIDS_FOR_HIRE, MAID_TASKS, MESSENGER_COST, NOBLE_FAMILIES, FACTIONS, MALE_HEIR_IMAGES, FEMALE_HEIR_IMAGES, PLAYER_TREATMENT_COSTS, HEIR_PRAISE_COST, RANDOM_FEMALE_NPC_IMAGES, RANDOM_MALE_NPC_IMAGES, EMPRESS_LOCATIONS, EMPRESS_NPCS, EMPRESS_QUESTS, JUN_RANKS, MINISTER_TITLES } from './constants';
import { generateQuest, generateDialogue, generatePunishmentEvent, generateSlanderOutcome, generateScenarioConversation, summarizeConversation, generateNpcChild, generatePrologueConversation, generateInduceMiscarriageOutcome, generateStruggleForLifeOutcome, generateMessageOutcome, executeSecretCommand, generateRandomRumorEvent, startInvestigationEvent, generateNpcInitiatedMessage, generateNpcReplyToIncomingMessage, generateCustomItem, generateGroupDialogue, generateRumorFromConversation, generateSlanderHeirOutcome, generateRoyalAudienceOutcome, generateHeirEducationReport, generateMaidRumor, generateSpyReport, generatePraiseHeirOutcome } from './services/geminiService';
import CharacterProfile, { Inventory } from './components/CharacterProfile';
import QuestTracker from './components/QuestLog';
import LoadingSpinner from './components/LoadingSpinner';
import NotificationContainer from './components/Notification';
import CharacterCreation from './components/CharacterCreation';
import { MapView } from './components/MapView';
import MenuBar, { ViewType as MenuBarViewType } from './components/MenuBar';
import CharactersView from './components/CharactersView';
import FlippingJadeTokenModal from './components/FlippingJadeTokenModal';
import ImperialEdictModal from './components/ImperialEdictModal';
import GuideModal from './components/GuideModal';
import FloatingActionButton from './components/FloatingActionButton';
import Auth from './components/Auth';
import ConversationView from './components/ConversationView';
import JealousyPromptModal from './components/JealousyPromptModal';
import PunishmentModal from './components/PunishmentModal';
import QuestCompletionModal from './components/QuestCompletionModal';
import StatusBar from './components/StatusBar';
import ShopView from './components/ShopView';
import GiftModal from './components/GiftModal';
import PlayerPunishmentModal from './components/PlayerPunishmentModal';
import SlanderModal from './components/SlanderModal';
import PregnancyConfirmationModal from './components/PregnancyConfirmationModal';
import ChildbirthModal from './components/ChildbirthModal';
import BirthAnnouncementModal from './components/BirthAnnouncementModal';
import DeathModal from './components/DeathModal';
import SpecialConversationModal from './components/SpecialConversationModal';
import DeathConfirmationModal from './components/DeathConfirmationModal';
import NpcBirthAnnouncementModal from './components/NpcBirthAnnouncementModal';
import PrologueModal from './components/PrologueModal';
import AffairConfirmationModal from './components/AffairConfirmationModal';
import DarkActionModal from './components/DarkActionModal';
import DivorceAnnouncementModal from './components/DivorceAnnouncementModal';
import InviteNpcToLocationModal from './components/InviteNpcToLocationModal';
import PalaceOverview from './components/PalaceOverview';
import PrinceVisitModal from './components/PrinceVisitModal';
import HostFeastModal from './components/HostFeastModal';
import MaidManagementModal from './components/MaidManagementModal';
import MaidRecruitmentModal from './components/MaidRecruitmentModal';
import SendMessageModal from './components/SendMessageModal';
import OfficialRankModal from './components/OfficialRankModal';
import SisterRivalAnnouncementModal from './components/SisterRivalAnnouncementModal';
import RescueEdictModal from './components/RescueEdictModal';
import InvestigationModal from './components/InvestigationModal';
import IncomingMessageModal from './components/IncomingMessageModal';
import CustomItemOrderModal from './components/CustomItemOrderModal';
import ConfirmCustomItemModal from './components/ConfirmCustomItemModal';
import WelcomeBackModal from './components/WelcomeBackModal';
import GroupChatSetupModal from './components/GroupChatSetupModal';
import ManagementView from './components/ManagementView';
import SecretCommandInputModal from './components/SecretCommandInputModal';
import HeirManagementModal from './components/HeirManagementModal';
import UpdateLogModal from './components/UpdateLogModal';
import MaleConsortManagementModal from './components/MaleConsortManagementModal';
import SelectNightlyConsortModal from './components/SelectNightlyConsortModal';
import { CourtView } from './components/CourtView';
import ExecutionMethodModal, { ExecutionMethod } from './components/ExecutionMethodModal';


type MainView = 'map' | 'characters' | 'shop' | 'overview' | 'management' | 'court';
type ModalView = 'profile' | 'inventory' | 'guide';
type AnyView = MainView | ModalView | 'conversation'; 
type SpecialAction = { type: string; label: string; questId: string };
type InviteMode = 'talk' | 'educate' | 'feast';

const CURRENT_GAME_VERSION = 4;

interface GameState {
    player: PlayerProfile;
    quests: Quest[];
    npcs: NPC[];
    mapLocations: MapLocation[];
    questEntities: QuestEntity[];
    conversationHistories: ConversationHistories;
    lastRumorDay: number;
    lastDailyQuestTime: number;
    globalEventLog: string[];
    activeInvestigation: Investigation | null;
    version: number;
}


const calculateSalary = (rank: Rank, career: CareerPath): number => {
    if (rank === "คุณหนู") return 0;
    if (career === CareerPath.Empress) return 100000;
    const rankList: Rank[] = career === CareerPath.QinConsort ? QIN_RANKS : IMPERIAL_RANKS;
    const rankIndex = rankList.indexOf(rank);
    if (rankIndex === -1) return 1000;
    return Math.floor(1000 * Math.pow(1.1, rankIndex));
};

const calculateOfferingRewards = (rank: Rank, career: CareerPath): { money: number; prestige: number } => {
    const rankList: Rank[] = career === CareerPath.QinConsort ? QIN_RANKS : IMPERIAL_RANKS;
    const rankIndex = rankList.indexOf(rank);
    if (rankIndex === -1) return { money: 10000, prestige: 200 };

    const money = Math.floor(10000 * Math.pow(1.1, rankIndex));
    const prestige = Math.floor(200 * Math.pow(1.2, rankIndex));
    return { money, prestige };
};

// Type guard to check if a string is a valid Rank
function isRank(value: any): value is Rank {
    const allRanks: string[] = [...Object.values(ImperialRank), ...Object.values(QinRank), ...Object.values(JunRank), "คุณหนู", "จักรพรรดินี"];
    return allRanks.includes(value);
}

const calculateOfflineProgress = async (
    player: PlayerProfile, 
    npcs: NPC[],
    tasks: MaidTask[],
): Promise<{ updatedPlayer: PlayerProfile, updatedNpcs: NPC[], report: IdleReport, triggerPlayerBirth: boolean }> => {
    
    // Check if the real-world day has changed since the last activity.
    const lastDate = player.lastActivityDate ? new Date(player.lastActivityDate) : new Date();
    const today = new Date();
    // Compare dates only, ignoring time.
    const isNewDay = lastDate.toDateString() !== today.toDateString();

    if (!isNewDay) {
        // If it's the same real-world day, don't apply random day-skip progress.
        // Just update the timestamp for the next session.
        return { 
            updatedPlayer: { ...player, lastTimeUpdate: Date.now() },
            updatedNpcs: npcs,
            report: { daysPassed: 0, maidTaskOutcomes: [], births: [], otherEvents: [] },
            triggerPlayerBirth: false
        };
    }

    // It's a new day, so advance game time by 1-3 days as requested.
    const daysPassed = Math.floor(Math.random() * 3) + 1;
    
    // Simulate a new "current time" for checking timestamp-based events like maid tasks.
    const simulatedTimePassedMs = daysPassed * 24 * 60 * 60 * 1000; 
    const simulatedNow = (player.lastTimeUpdate || Date.now()) + simulatedTimePassedMs;
    const actualNow = Date.now();

    let newPlayer = { ...player };
    
    // 1. Time Calculation
    newPlayer.gameDay += daysPassed;
    
    const daysSinceStartOfSeason = (player.gameDay - 1) % 30;
    const newTotalDaysInSeason = daysSinceStartOfSeason + daysPassed;
    const seasonsPassed = Math.floor(newTotalDaysInSeason / 30);
    if (seasonsPassed > 0) {
        const currentSeasonIndex = SEASONS.indexOf(player.currentSeason);
        newPlayer.currentSeason = SEASONS[(currentSeasonIndex + seasonsPassed) % SEASONS.length];
    }
    
    // 2. Report Initialization
    const report: IdleReport = {
        daysPassed,
        maidTaskOutcomes: [],
        births: [],
        otherEvents: [],
        offlineIncome: 0
    };
    
    // 3. Offline Income
    const dailySalary = calculateSalary(player.rank, player.career);
    const income = dailySalary * daysPassed;
    if (income > 0) {
        report.offlineIncome = income;
        newPlayer.money += income;
    }

    // 4. Maid tasks
    const updatedAssignments = { ...player.activeMaidAssignments };
    for (const maidId in player.activeMaidAssignments) {
        const assignment = player.activeMaidAssignments[maidId];
        // Use the simulated time to check if the task is complete
        if (assignment.endDate <= simulatedNow) {
            const task = tasks.find(t => t.id === assignment.taskId);
            const maid = player.maids.find(m => m.id === maidId);
            if(task && maid) {
                report.maidTaskOutcomes.push(`${maid.name} ทำภารกิจ "${task.name}" สำเร็จ`);
            }
            delete updatedAssignments[maidId];
        }
    }
    newPlayer.activeMaidAssignments = updatedAssignments;
    
    // 5. NPC & Player Pregnancies
    let updatedNpcs = [...npcs];
    let triggerPlayerBirth = false;
    let newChildren: NPC[] = [];

    for (let i = 0; i < updatedNpcs.length; i++) {
        let npc = updatedNpcs[i];
        if (npc.isPregnant && npc.conceptionDate) {
            if (newPlayer.gameDay >= npc.conceptionDate + 9) {
                const father = npcs.find(n => n.id === npc.fatherId) || INITIAL_NPCS.find(n => n.id === npc.fatherId);
                if (father) {
                    const response = await generateNpcChild(npc, father);
                    if (response.success) {
                        const { childName, gender } = response.data;
                        const isRoyalHeir = father.id === 'xuanzong' || father.id === 'qin_wang';
                        const childTitle = isRoyalHeir ? (gender === 'male' ? 'องค์ชาย' : 'องค์หญิง') : (gender === 'male' ? 'คุณชาย' : 'คุณหนู');
                        const imagePool = gender === 'male' ? MALE_HEIR_IMAGES : FEMALE_HEIR_IMAGES;
                        const randomImageUrl = imagePool[Math.floor(Math.random() * imagePool.length)];
                        
                        const newChild: NPC = {
                            id: `npc_child_${childName.toLowerCase().replace(/\s/g, '_')}_${Date.now()}`,
                            name: childName, title: childTitle, imageUrl: randomImageUrl, age: 0, health: 'healthy',
                            isAlive: true, emotion: Emotion.Neutral, favorability: 0, dialogue: `(ทารกน้อยมองคุณตาแป๋ว)`,
                            locationId: npc.locationId, careerAffiliation: npc.careerAffiliation, motherId: npc.id, fatherId: npc.fatherId,
                            gender: gender, heirPoints: isRoyalHeir ? 50 : 10, charm: 5, intelligence: 5, power: 5, prestige: isRoyalHeir ? 10 : 2,
                        };
                        newChildren.push(newChild);

                        report.births.push(`${npc.name} ได้ให้กำเนิด ${childTitle} ${childName} ขณะที่คุณไม่อยู่!`);
                        
                        // Update mother in the array
                        updatedNpcs[i] = { ...npc, isPregnant: false, conceptionDate: null, lastGaveBirthDay: newPlayer.gameDay };
                    }
                }
            }
        }
    }
    updatedNpcs.push(...newChildren);


    if (newPlayer.isPregnant && newPlayer.conceptionDate) {
        if (newPlayer.gameDay >= newPlayer.conceptionDate + 9) {
            triggerPlayerBirth = true;
        }
    }

    // Finalize player update
    newPlayer.lastTimeUpdate = actualNow; // Use the real current time for the next session's starting point
    newPlayer.lastActivityDate = new Date().toISOString().split('T')[0];
    newPlayer.mealsTakenToday = { breakfast: false, lunch: false, dinner: false }; // Reset meals for the new day(s)
    
    return { updatedPlayer: newPlayer, updatedNpcs, report, triggerPlayerBirth };
};


export const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<string | null>(() => localStorage.getItem('last_logged_in_user'));
    const [player, setPlayer] = useState<PlayerProfile | null>(null);
    const [quests, setQuests] = useState<Quest[]>([]);
    const [npcs, setNpcs] = useState<NPC[]>(INITIAL_NPCS);
    const [mapLocations, setMapLocations] = useState<MapLocation[]>(MAP_LOCATIONS);
    const [questEntities, setQuestEntities] = useState<QuestEntity[]>([]);
    const [conversationHistories, setConversationHistories] = useState<ConversationHistories>({});
    
    // Unified conversation state
    const [activeConversation, setActiveConversation] = useState<ActiveConversation | null>(null);

    const [mainView, setMainView] = useState<MainView>('overview');
    const [activeModal, setActiveModal] = useState<ModalView | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<NotificationData[]>([]);
    const notificationIdRef = useRef(0);
    const [lastRumorDay, setLastRumorDay] = useState<number>(0);
    
    const [showJadeTokenModal, setShowJadeTokenModal] = useState<boolean>(false);
    const [questGenerationCooldown, setQuestGenerationCooldown] = useState<boolean>(false);
    const [rankUpInfo, setRankUpInfo] = useState<{ from: Rank; to: Rank; } | null>(null);
    const [lastDailyQuestTime, setLastDailyQuestTime] = useState<number>(0);
    const [jealousyPrompt, setJealousyPrompt] = useState<NPC | null>(null);
    const [punishmentEvent, setPunishmentEvent] = useState<(PunishmentEvent & {accuser: NPC}) | null>(null);
    const [completedQuestModal, setCompletedQuestModal] = useState<Quest | null>(null);
    const [currentEventContext, setCurrentEventContext] = useState<EventContext | null>(null);
    const [giftingTarget, setGiftingTarget] = useState<NPC | null>(null);
    const [punishingNpc, setPunishingNpc] = useState<NPC | null>(null);
    const [slanderingNpc, setSlanderingNpc] = useState<NPC | null>(null);
    
    // New system states
    const [onlinePlayerCount, setOnlinePlayerCount] = useState(0);
    const [specialConversation, setSpecialConversation] = useState<SpecialConversationState | null>(null);
    const [showPregnancyConfirm, setShowPregnancyConfirm] = useState<NPC | null>(null);
    const [showChildbirth, setShowChildbirth] = useState(false);
    const [showBirthAnnouncement, setShowBirthAnnouncement] = useState(false);
    const [showDeathModal, setShowDeathModal] = useState(false);
    const [deathConfirmation, setDeathConfirmation] = useState<{ message: string; isGroupChat: boolean; } | null>(null);
    const [specialQuestAction, setSpecialQuestAction] = useState<SpecialAction | null>(null);
    const [globalEventLog, setGlobalEventLog] = useState<string[]>([]);
    const [npcBirthAnnouncement, setNpcBirthAnnouncement] = useState<{ motherName: string; childName: string; childTitle: string; announcement: string; } | null>(null);
    const [prologueState, setPrologueState] = useState<PrologueState | null>(null);
    const [showOfficialRankModal, setShowOfficialRankModal] = useState<{ newRank: Rank } | null>(null);
    const [sisterRivalAnnouncement, setSisterRivalAnnouncement] = useState<{ sisterName: string; newRank: Rank; } | null>(null);
    
    // Modal controls for inviting NPCs
    const [inviteToLocation, setInviteToLocation] = useState<MapLocation | null>(null);
    const [inviteMode, setInviteMode] = useState<InviteMode>('talk');
    
    // Palace Overview states
    const [activityCooldowns, setActivityCooldowns] = useState<Record<string, number>>({});
    const [princeVisitAnnouncement, setPrinceVisitAnnouncement] = useState<PrinceVisitAnnouncement | null>(null);
    const [isHostingFeast, setIsHostingFeast] = useState<boolean>(false);
    const [isManagingMaids, setIsManagingMaids] = useState<boolean>(false);
    const [isRecruitingMaids, setIsRecruitingMaids] = useState<boolean>(false);
    const [sendMessageTarget, setSendMessageTarget] = useState<NPC | null>(null);
    const [selectedMaidId, setSelectedMaidId] = useState<string | null>(null);
    const [welcomeBackReport, setWelcomeBackReport] = useState<IdleReport | null>(null);


    // Dark systems state
    const [affairProposal, setAffairProposal] = useState<NPC | null>(null);
    const [darkActionTarget, setDarkActionTarget] = useState<NPC | null>(null);
    const [divorceAnnouncement, setDivorceAnnouncement] = useState<boolean>(false);
    const [rescueAnnouncement, setRescueAnnouncement] = useState<{ rescuerName: string; newCareer: CareerPath; newRank: Rank; } | null>(null);

    // Investigation System State
    const [activeInvestigation, setActiveInvestigation] = useState<Investigation | null>(null);
    const [isInvestigationModalOpen, setIsInvestigationModalOpen] = useState(false);

    // Incoming Message System State
    const [incomingMessageState, setIncomingMessageState] = useState<IncomingMessageState | null>(null);

    // Custom Item Crafting State
    const [isOrderingCustomItem, setIsOrderingCustomItem] = useState<boolean>(false);
    const [pendingCustomItem, setPendingCustomItem] = useState<Omit<InventoryItem, 'instanceId'> | null>(null);

    // Group Chat State
    const [isSettingUpGroupChat, setIsSettingUpGroupChat] = useState<boolean>(false);
    const [secretCommandInputState, setSecretCommandInputState] = useState<{ isOpen: boolean; preset: string }>({ isOpen: false, preset: '' });
    const [isHeirManagementModalOpen, setIsHeirManagementModalOpen] = useState<boolean>(false);
    const [showUpdateLog, setShowUpdateLog] = useState<boolean>(false);

    // PWA Install Prompt State
    const [installPromptEvent, setInstallPromptEvent] = useState<any>(null);

    // Empress Career State
    const [isManagingConsorts, setIsManagingConsorts] = useState<boolean>(false);
    const [isSelectingNightlyConsort, setIsSelectingNightlyConsort] = useState<boolean>(false);
    const [isSettingUpCourtSession, setIsSettingUpCourtSession] = useState<boolean>(false);
    const [executionTarget, setExecutionTarget] = useState<NPC | null>(null);


    const showNotification = useCallback((notificationData: {message: string, type?: NotificationType}) => {
        const newId = notificationIdRef.current++;
        const newNotification = {
            id: newId,
            message: notificationData.message,
            type: notificationData.type || 'info',
        };
        setNotifications(prev => [...prev, newNotification]);
    }, []);

    const addGlobalEvent = useCallback((event: string) => {
        setGlobalEventLog(prevLog => [`[วันที่ ${player?.gameDay}] ${event}`, ...prevLog.slice(0, 49)]);
    }, [player?.gameDay]);


    const getLocationName = useCallback((locationId: string): string => {
        return mapLocations.find(l => l.id === locationId)?.name || 'ไม่ทราบตำแหน่ง';
    }, [mapLocations]);


    const updatePlayerStats = useCallback((statChanges: Partial<Pick<PlayerProfile, 'charm' | 'intelligence' | 'power' | 'prestige' | 'money' | 'jealousyLevel'>>) => {
        const statLabels: Record<string, string> = {
            charm: 'เสน่ห์',
            intelligence: 'สติปัญญา',
            power: 'อำนาจ',
            prestige: 'บารมี',
            money: 'เงิน',
            jealousyLevel: 'ความริษยา'
        };

        setPlayer(p => {
            if (!p) return null;
            let updatedPlayer = { ...p };
            for (const key in statChanges) {
                const statKey = key as keyof typeof statChanges;
                const value = statChanges[statKey];
                if (typeof value === 'number' && typeof updatedPlayer[statKey] === 'number') {
                    (updatedPlayer[statKey] as number) += value;
                     if (value !== 0) {
                        const label = statLabels[statKey] || statKey;
                        showNotification({ message: `${label} ${value > 0 ? '+' : ''}${value.toLocaleString()}` });
                    }
                }
            }
            return updatedPlayer;
        });
    }, [showNotification]);

    const updateNpcFavorability = useCallback((npcId: string, change: number) => {
        if (change === 0) return;
        setNpcs(prevNpcs => {
            const npcIndex = prevNpcs.findIndex(n => n.id === npcId);
            if (npcIndex === -1) return prevNpcs;
            
            const npc = prevNpcs[npcIndex];
            const updatedNpc = { ...npc, favorability: npc.favorability + change };
            
            const newNpcs = [...prevNpcs];
            newNpcs[npcIndex] = updatedNpc;
            return newNpcs;
        });
        
        const npc = npcs.find(n => n.id === npcId);
        if(npc) {
            showNotification({ message: `ความพึงพอใจของ ${npc.name} ${change > 0 ? '+' : ''}${change}` });
        }
    }, [npcs, showNotification]);

    const processRewards = useCallback((rewards: string[]) => {
        if (!rewards || rewards.length === 0) return;
    
        let rankPointsChange = 0;
        const otherStatChanges: Partial<PlayerProfile> = {};
    
        rewards.forEach(rewardStr => {
            const parts = rewardStr.split(' ');
            const value = parseInt(parts[parts.length - 1].replace(/,/g, ''));
            const statStr = parts.slice(0, -1).join(' ').trim();
    
            if (isNaN(value)) return;
    
            if (statStr.startsWith('ความพึงพอใจของ')) {
                const npcName = statStr.replace('ความพึงพอใจของ', '').trim();
                const npc = npcs.find(n => n.name === npcName);
                if (npc) {
                    updateNpcFavorability(npc.id, value);
                }
            } else {
                switch (statStr) {
                    case 'คะแนนบารมี':
                        rankPointsChange += value;
                        break;
                    case 'เงิน':
                    case 'ตำลึง':
                        otherStatChanges.money = (otherStatChanges.money || 0) + value;
                        break;
                    case 'ค่าเสน่ห์':
                        otherStatChanges.charm = (otherStatChanges.charm || 0) + value;
                        break;
                    case 'ค่าสติปัญญา':
                        otherStatChanges.intelligence = (otherStatChanges.intelligence || 0) + value;
                        break;
                    case 'ค่าอำนาจ':
                        otherStatChanges.power = (otherStatChanges.power || 0) + value;
                        break;
                    case 'ค่าบารมี':
                        otherStatChanges.prestige = (otherStatChanges.prestige || 0) + value;
                        break;
                    default:
                        console.warn(`Unknown reward type: ${statStr}`);
                }
            }
        });
    
        if (Object.keys(otherStatChanges).length > 0) {
            updatePlayerStats(otherStatChanges);
        }
    
        if (rankPointsChange !== 0) {
            setPlayer(p => p ? { ...p, rankPoints: p.rankPoints + rankPointsChange } : null);
            showNotification({ message: `คะแนนบารมี ${rankPointsChange > 0 ? '+' : ''}${rankPointsChange}` });
        }
    }, [npcs, updateNpcFavorability, updatePlayerStats, showNotification]);

    const handleStartConversation = useCallback((participants: NPC[], locationId?: string) => {
        if (!player || participants.length === 0) return;
    
        const conversationId = participants.map(p => p.id).sort().join('_');
        const conversationLocationId = locationId || participants[0].locationId;
    
        setActiveConversation({
            id: conversationId,
            locationId: conversationLocationId,
            participants: participants,
        });
    }, [player]);

    // --- NEW HANDLERS ---
    const handleTakeMeal = (meal: 'breakfast' | 'lunch' | 'dinner') => {
        if (!player) return;
    
        const updatedMeals = { ...player.mealsTakenToday, [meal]: true };
        
        setPlayer(p => {
            if (!p) return null;
            return {
                ...p,
                mealsTakenToday: updatedMeals,
                intelligence: p.intelligence + 5,
            };
        });
    
        const mealTranslations = {
            breakfast: 'อาหารเช้า',
            lunch: 'อาหารกลางวัน',
            dinner: 'อาหารเย็น'
        };
        
        showNotification({ message: `คุณได้รับประทาน${mealTranslations[meal]}แล้ว สติปัญญา +5` });
        addGlobalEvent(`ได้พักผ่อนและรับประทาน${mealTranslations[meal]} ทำให้รู้สึกสดชื่นขึ้น`);
    };
    
    const handleEducateHeir = () => {
        setIsHeirManagementModalOpen(true);
    };

    const handleSummonMaid = () => {
        if (!player) return;
        const personalMaidId = player.career === CareerPath.ImperialConsort ? 'personal_maid_xiaozhu' : 'personal_maid_xiaolian';
        const maid = npcs.find(n => n.id === personalMaidId);
        if (maid) {
            setNpcs(prevNpcs => prevNpcs.map(n => n.id === maid.id ? { ...n, locationId: player.locationId } : n));
            handleStartConversation([maid], player.locationId);
        } else {
            showNotification({ message: 'ไม่พบสาวใช้ส่วนตัวของคุณ' });
        }
    };
    
    const handleRoyalAudience = async (agenda: RoyalAudienceAgenda, rivalId?: string): Promise<RoyalAudienceResult | null> => {
        if (!player || !ruler) return null;
    
        const rivalToReport = rivalId ? npcs.find(n => n.id === rivalId) : undefined;
    
        const response = await generateRoyalAudienceOutcome(player, ruler, agenda, rivalToReport);
    
        if (response.success) {
            const { outcomeMessage, rewards } = response.data;
            showNotification({ message: outcomeMessage, type: 'event' });
            addGlobalEvent(outcomeMessage);
            processRewards(rewards);
            return response.data;
        } else {
            showNotification({ message: 'เกิดข้อผิดพลาดในการเข้าเฝ้า' });
            return null;
        }
    };

    const handleGoToLocation = (locationId: string) => {
        if (!player) return;
        let newTimeIndex = SHICHEN_CYCLE.findIndex(s => s.name === player.currentTime) + 1;
        let newGameDay = player.gameDay;
        let newSeason = player.currentSeason;
        
        if (newTimeIndex >= SHICHEN_CYCLE.length) {
            newTimeIndex = 0;
            newGameDay++;
            if ((newGameDay - 1) % 30 === 0) {
                const currentSeasonIndex = SEASONS.indexOf(player.currentSeason);
                newSeason = SEASONS[(currentSeasonIndex + 1) % SEASONS.length];
            }
        }
        
        const newTime = SHICHEN_CYCLE[newTimeIndex].name;
    
        setPlayer(p => p ? { ...p, locationId: locationId, currentTime: newTime, gameDay: newGameDay, currentSeason: newSeason, lastTimeUpdate: Date.now() } : null);
        showNotification({ message: `เดินทางไปยัง ${getLocationName(locationId)}` });
    };

    const handleTravelAndTalk = (npc: NPC) => {
        if (!player) return;
        setPlayer(p => p ? { ...p, locationId: npc.locationId } : null);
        handleStartConversation([npc], npc.locationId);
    };

    const handleTalkToNpc = (npc: NPC) => {
        handleStartConversation([npc], npc.locationId);
    };

    const handleEndConversation = useCallback(async () => {
        if (!activeConversation) return;
    
        const isGroupChat = activeConversation.participants.length > 1;
        const conversationId = activeConversation.id;
    
        const history = conversationHistories[conversationId];
        if (history && history.length > 2) {
            const summaryResponse = await summarizeConversation(history);
            if (summaryResponse.success) {
                const summary = summaryResponse.data;
                setNpcs(prevNpcs =>
                    prevNpcs.map(npc => {
                        if (activeConversation.participants.some(p => p.id === npc.id)) {
                            return { ...npc, memory: summary };
                        }
                        return npc;
                    })
                );
            }
        }
    
        setActiveConversation(null);
    
        setConversationHistories(prev => {
            const newHistories = { ...prev };
            delete newHistories[conversationId];
            return newHistories;
        });
    
        if (isGroupChat) {
            const daysToAdvance = Math.floor(Math.random() * 3) + 1; // 1 to 3 days
            
            setPlayer(p => {
                if (!p) return null;
                
                let newGameDay = p.gameDay + daysToAdvance;
                let newSeason = p.currentSeason;
                
                const daysSinceStartOfSeason = (p.gameDay - 1) % 30;
                const newTotalDaysInSeason = daysSinceStartOfSeason + daysToAdvance;
                const seasonsPassed = Math.floor(newTotalDaysInSeason / 30);
                if (seasonsPassed > 0) {
                    const currentSeasonIndex = SEASONS.indexOf(p.currentSeason);
                    newSeason = SEASONS[(currentSeasonIndex + seasonsPassed) % SEASONS.length];
                }
                
                addGlobalEvent(`หลังจากสนทนากันอย่างออกรส เวลาได้ล่วงเลยไป ${daysToAdvance} วัน`);
    
                return {
                    ...p,
                    gameDay: newGameDay,
                    currentSeason: newSeason,
                    lastTimeUpdate: Date.now()
                };
            });
        }
    }, [activeConversation, conversationHistories, addGlobalEvent]);

    const sisterRival = useMemo(() => {
        if (!player || !player.familyId) return null;
        return npcs.find(n => n.familyId === player.familyId && n.familyRole === 'sister' && n.isRival) || null;
    }, [player, npcs]);
    
    const { rankList, rankRequirements } = useMemo(() => {
        if (!player || player.career === CareerPath.Empress) {
            return { rankList: [], rankRequirements: {} as Record<string, number> };
        }
        const isQin = player.career === CareerPath.QinConsort;
        return {
            rankList: isQin ? QIN_RANKS : IMPERIAL_RANKS,
            rankRequirements: isQin ? QIN_RANK_REQUIREMENTS : IMPERIAL_RANK_REQUIREMENTS,
        };
    }, [player]);

    const handleSendMessage = useCallback(async (message: string) => {
        if (!player || !activeConversation) return;
        setIsLoading(true);
    
        const newPlayerMessage: ChatMessage = { sender: 'player', senderName: player.name, text: message, timestamp: Date.now() };
    
        const currentHistory = [...(conversationHistories[activeConversation.id] || []), newPlayerMessage];
        setConversationHistories(prev => ({
            ...prev,
            [activeConversation.id]: currentHistory,
        }));
    
        const isGroupChat = activeConversation.participants.length > 1;
    
        let response: GeminiServiceResponse<DialogueResult | GroupDialogueResult>;
        
        if (isGroupChat) {
            response = await generateGroupDialogue(player, activeConversation.participants, message, currentHistory, currentEventContext, globalEventLog, activeInvestigation, activeConversation.dialogueContext);
        } else {
            const npc = activeConversation.participants[0];
            response = await generateDialogue(player, npc, npcs, message, currentHistory, quests.filter(q => q.status === 'active'), currentEventContext, globalEventLog, rankList, activeInvestigation, sisterRival, activeConversation.dialogueContext);
        }
        
        if (response.success) {
            if (isGroupChat) {
                const result = response.data as GroupDialogueResult;
                const newNpcMessages: ChatMessage[] = result.responses.map((res: GroupDialogueResponse) => ({
                    sender: 'npc', senderId: res.npcId, senderName: npcs.find(n => n.id === res.npcId)?.name || 'Unknown', text: res.dialogue, timestamp: Date.now()
                }));
                
                setConversationHistories(prev => ({ ...prev, [activeConversation.id]: [...currentHistory, ...newNpcMessages] }));
    
                setNpcs(prevNpcs => {
                    let updatedNpcs = [...prevNpcs];
                    result.responses.forEach(res => {
                        const npcIndex = updatedNpcs.findIndex(n => n.id === res.npcId);
                        if (npcIndex !== -1) {
                            updatedNpcs[npcIndex] = { ...updatedNpcs[npcIndex], emotion: res.newEmotion, favorability: updatedNpcs[npcIndex].favorability + res.favorabilityChange, };
                        }
                    });
                    return updatedNpcs;
                });
    
            } else { // Solo chat
                const result = response.data as DialogueResult;
                const npc = activeConversation.participants[0];
                let dialogueText = result.dialogue || "...";
                
                // More robustly parse and handle special event tags
                const tagRegex = /\[(PROPOSE_HEIR|PROPOSE_AFFAIR|DEATH_EVENT|MISCARRIAGE_EVENT|RESCUE_PLAYER)\]/g;
                const tags = [...dialogueText.matchAll(tagRegex)].map(match => match[1]);
                dialogueText = dialogueText.replace(tagRegex, '').trim();

                if (tags.includes('PROPOSE_HEIR')) {
                    setShowPregnancyConfirm(npc);
                }
                if (tags.includes('PROPOSE_AFFAIR')) {
                    setAffairProposal(npc);
                }
                if (tags.includes('DEATH_EVENT')) {
                    setDeathConfirmation({ message: dialogueText, isGroupChat: false });
                }
                if (tags.includes('MISCARRIAGE_EVENT') && player.isPregnant) {
                    setPlayer(p => p ? { ...p, isPregnant: false, conceptionDate: null, fatherId: null, health: 'sick' } : null);
                    showNotification({ message: "คุณรู้สึกเจ็บปวดอย่างรุนแรงและสูญเสียลูกในครรภ์...", type: 'event' });
                    addGlobalEvent("ประสบอุบัติเหตุร้ายแรงจนแท้งบุตร");
                }
                if (tags.includes('RESCUE_PLAYER') && player.isDivorced) {
                    const rescuerCareer = npc.id === 'xuanzong' ? CareerPath.ImperialConsort : CareerPath.QinConsort;
                    const newRank = rescuerCareer === CareerPath.ImperialConsort ? ImperialRank.Gongren : QinRank.Yingshi;
                    setPlayer(p => p ? { ...p, isDivorced: false, career: rescuerCareer, rank: newRank, locationId: rescuerCareer === CareerPath.ImperialConsort ? 'player_chamber' : 'qin_player_chamber' } : null);
                    setRescueAnnouncement({ rescuerName: npc.name, newCareer: rescuerCareer, newRank });
                }

                const newNpcMessage: ChatMessage = { sender: 'npc', senderId: npc.id, senderName: npc.name, text: dialogueText, timestamp: Date.now() };
    
                setConversationHistories(prev => ({ ...prev, [activeConversation.id]: [...currentHistory, newNpcMessage] }));
                
                if (result.favorabilityChange) updateNpcFavorability(npc.id, result.favorabilityChange);
                setNpcs(prevNpcs => prevNpcs.map(n => n.id === npc.id ? { ...n, emotion: result.newEmotion || n.emotion } : n));
            }
        } else {
            showNotification({ message: 'NPC ไม่สามารถตอบสนองได้ในขณะนี้' });
        }
        
        setCurrentEventContext(null);
        setIsLoading(false);
    
    }, [player, activeConversation, conversationHistories, currentEventContext, globalEventLog, activeInvestigation, npcs, quests, rankList, sisterRival, showNotification, updateNpcFavorability, addGlobalEvent]);
    
    const handleInviteNpc = (npcToInvite: NPC) => {
        if (!player) return;
        setNpcs(prevNpcs => prevNpcs.map(npc => 
            npc.id === npcToInvite.id ? { ...npc, locationId: player.locationId } : npc
        ));
        
        // Advance time
        const newTimeIndex = SHICHEN_CYCLE.findIndex(s => s.name === player.currentTime) + 1;
        const newTime = SHICHEN_CYCLE[newTimeIndex % SHICHEN_CYCLE.length].name;
        
        setPlayer(p => p ? { ...p, currentTime: newTime, lastTimeUpdate: Date.now() } : null);
        
        showNotification({ message: `${npcToInvite.name} กำลังเดินทางมาพบคุณ` });
        addGlobalEvent(`${player.name} ได้เชิญ ${npcToInvite.name} มาพบที่ ${getLocationName(player.locationId)}`);
        setInviteToLocation(null);
    };

    const handleCreateCustomItem = async (description: string) => {
        if (!player) return;
        setIsLoading(true);
        setIsOrderingCustomItem(false);
        const response = await generateCustomItem(player, description);
        if (response.success) {
            const newItemData = response.data;
            const newItem: Omit<InventoryItem, 'instanceId'> = {
                id: `custom_${newItemData.name.replace(/\s/g, '_')}_${Date.now()}`,
                ...newItemData,
                type: 'gift', // Custom items are gifts by default
            };
            setPendingCustomItem(newItem);
        } else {
            showNotification({ message: "พ่อค้าไม่สามารถสร้างของชิ้นนี้ได้ในตอนนี้" });
        }
        setIsLoading(false);
    };

    const handleConfirmCustomItemPurchase = () => {
        if (!player || !pendingCustomItem || !pendingCustomItem.price) return;
        
        if (player.money >= pendingCustomItem.price) {
            const newItemInstance: InventoryItem = {
                ...pendingCustomItem,
                instanceId: `${pendingCustomItem.id}_${Date.now()}`
            };
            
            setPlayer(p => p ? {
                ...p,
                money: p.money - (pendingCustomItem.price || 0),
                inventory: [...p.inventory, newItemInstance]
            } : null);
            
            showNotification({ message: `คุณได้รับ "${pendingCustomItem.name}"!` });
            addGlobalEvent(`${player.name} ได้สั่งทำ "${pendingCustomItem.name}" จากพ่อค้าในราคา ${pendingCustomItem.price} ตำลึง`);
        } else {
            showNotification({ message: "เงินของคุณไม่เพียงพอ" });
        }
        
        setPendingCustomItem(null);
    };
    
    const handleExecuteSecretCommand = async (command: string) => {
        if (!player) return;
        setIsLoading(true);
        setSecretCommandInputState({ isOpen: false, preset: '' });

        const response = await executeSecretCommand(command, player, npcs, conversationHistories[activeConversation?.id || ''] || []);

        if (response.success) {
            const result = response.data;
            
            // Apply all state changes from the result
            setPlayer(p => p ? ({ ...p, ...result.playerUpdate }) : null);

            setNpcs(currentNpcs => {
                let updatedNpcs = [...currentNpcs];
                
                // Delete NPCs
                if (result.deletedNpcIds) {
                    updatedNpcs = updatedNpcs.filter(npc => !result.deletedNpcIds?.includes(npc.id));
                }

                // Update NPCs
                if (result.updatedNpcs) {
                    result.updatedNpcs.forEach(update => {
                        const index = updatedNpcs.findIndex(npc => npc.id === update.id);
                        if (index !== -1) {
                            updatedNpcs[index] = { ...updatedNpcs[index], ...update };
                        }
                    });
                }
                
                // Add new NPCs
                if (result.newNpcs) {
                    const newNpcObjects: NPC[] = result.newNpcs.map(newNpcData => {
                        const randomImage = newNpcData.gender === 'male' 
                            ? RANDOM_MALE_NPC_IMAGES[Math.floor(Math.random() * RANDOM_MALE_NPC_IMAGES.length)]
                            : RANDOM_FEMALE_NPC_IMAGES[Math.floor(Math.random() * RANDOM_FEMALE_NPC_IMAGES.length)];
                        
                        return {
                            id: newNpcData.id || `npc_${newNpcData.name.replace(/\s/g, '_')}_${Date.now()}`,
                            health: 'healthy',
                            isAlive: true,
                            heirPoints: 0,
                            ...newNpcData,
                            imageUrl: newNpcData.imageUrl || randomImage,
                        };
                    });
                    updatedNpcs.push(...newNpcObjects);
                }

                return updatedNpcs;
            });
            
            // Locations
            if (result.newLocations) setMapLocations(prev => [...prev, ...result.newLocations!]);
            if (result.deletedLocationIds) setMapLocations(prev => prev.filter(loc => !result.deletedLocationIds!.includes(loc.id)));

            // Quests
            if (result.newQuests) setQuests(prev => [...prev, ...result.newQuests!]);
            if (result.deletedQuestIds) setQuests(prev => prev.filter(q => !result.deletedQuestIds!.includes(q.id)));

            // Narrative and notifications
            addGlobalEvent(`[ลิขิตสวรรค์] ${result.narrativeOutcome}`);
            if (result.notification) showNotification({ message: result.notification, type: 'event' });
            
            if (result.npcDialogues && activeConversation) {
                const newChatMessages: ChatMessage[] = result.npcDialogues.map((dialogue, index) => {
                    const speaker = npcs.find(n => n.id === dialogue.npcId) || result.newNpcs?.find(n => n.id === dialogue.npcId);
                    return {
                        sender: 'npc',
                        senderId: dialogue.npcId,
                        senderName: speaker?.name || dialogue.npcId,
                        text: dialogue.dialogue,
                        timestamp: Date.now() + index 
                    };
                });

                setConversationHistories(prev => ({
                    ...prev,
                    [activeConversation.id]: [
                        ...(prev[activeConversation.id] || []),
                        ...newChatMessages
                    ]
                }));
            } else {
                result.npcDialogues?.forEach(dialogue => {
                    addGlobalEvent(`${dialogue.npcId}: "${dialogue.dialogue}"`);
                });
            }


            // Trigger events
            if (result.triggerChildbirth) {
                if (result.triggerChildbirth.forPlayer) {
                    // Set the fatherId from the command result onto the player state
                    // This is crucial for the subsequent handleNameChild function to work correctly.
                    setPlayer(p => {
                        if (!p) return null;
                        return { ...p, fatherId: result.triggerChildbirth!.fatherId };
                    });
                    setShowChildbirth(true);
                }
                // (NPC childbirth is handled by a different mechanism, but could be added here if needed)
            }

        } else {
            showNotification({ message: "โชคชะตาไม่ตอบรับคำสั่งของท่าน" });
        }
        setIsLoading(false);
    };

    // --- BUTTON HANDLERS ---
    const handlePurchaseItem = (item: Omit<InventoryItem, 'instanceId'>) => {
        if (!player || !item.price || player.money < item.price) {
            showNotification({ message: 'เงินไม่เพียงพอ' });
            return;
        }
        const newItem: InventoryItem = {
            ...item,
            instanceId: `${item.id}_${Date.now()}`
        };
        setPlayer(p => p ? {
            ...p,
            money: p.money - (item.price || 0),
            inventory: [...p.inventory, newItem]
        } : null);
        showNotification({ message: `ซื้อ ${item.name} สำเร็จ!` });
        addGlobalEvent(`ได้ซื้อ ${item.name} จากตลาดหลวง`);
    };

    const handleGiveGift = (item: InventoryItem, targetNpc: NPC) => {
        if (!player) return;

        const newInventory = player.inventory.filter(i => i.instanceId !== item.instanceId);
        setPlayer(p => p ? { ...p, inventory: newInventory } : null);

        let favorabilityGain = item.favorabilityEffect || 0;
        if (targetNpc.preferences?.some(pref => item.name.includes(pref) || item.description.includes(pref))) {
            favorabilityGain = Math.floor(favorabilityGain * 1.5);
            showNotification({ message: `${targetNpc.name} ดูจะชอบของชิ้นนี้เป็นพิเศษ!` });
        }

        updateNpcFavorability(targetNpc.id, favorabilityGain);
        addGlobalEvent(`มอบ ${item.name} ให้กับ ${targetNpc.name}`);
        setGiftingTarget(null);
    };

    const handleSendMessageConfirm = async (targetNpc: NPC, message: string, item?: InventoryItem, money?: number) => {
        if (!player) return;
        setIsLoading(true);
        const rivals = npcs.filter(n => n.favorability < -500 && n.id !== player.name && n.id !== targetNpc.id);
        const response = await generateMessageOutcome(player, targetNpc, rivals, message, item, money);

        if (response.success) {
            const { outcomeMessage, favorabilityChange } = response.data;
            showNotification({ message: outcomeMessage, type: 'event' });
            addGlobalEvent(outcomeMessage);
            if (favorabilityChange) updateNpcFavorability(targetNpc.id, favorabilityChange);

            setPlayer(p => {
                if (!p) return null;
                let updatedInventory = p.inventory;
                if (item) {
                    updatedInventory = p.inventory.filter(i => i.instanceId !== item.instanceId);
                }
                return {
                    ...p,
                    money: p.money - (MESSENGER_COST + (money || 0)),
                    inventory: updatedInventory,
                };
            });
        } else {
            showNotification({ message: "เกิดข้อผิดพลาดในการส่งสาร" });
        }
        setIsLoading(false);
        setSendMessageTarget(null);
    };

    const handleConfirmSlander = async (rumor: string, targetNpc: NPC) => {
        if (!player) return;
        setIsLoading(true);
        
        const isHeir = targetNpc.gender === 'male' && (targetNpc.fatherId === 'xuanzong' || targetNpc.fatherId === 'qin_wang');

        let response: GeminiServiceResponse<SlanderResult | SlanderHeirResult>;

        if (isHeir) {
            response = await generateSlanderHeirOutcome(player, targetNpc, rumor);
        } else {
            response = await generateSlanderOutcome(player, targetNpc, rumor);
        }

        if (response.success) {
            const result = response.data;
            showNotification({ message: result.outcomeMessage, type: 'event' });
            addGlobalEvent(result.outcomeMessage);

            if ('playerStatChanges' in result) { // SlanderResult
                updatePlayerStats(result.playerStatChanges);
                updateNpcFavorability(targetNpc.id, result.targetFavorabilityChange);
            } else if ('heirPointsChange' in result) { // SlanderHeirResult
                setNpcs(prev => prev.map(n => n.id === targetNpc.id ? { ...n, heirPoints: Math.max(0, n.heirPoints + result.heirPointsChange) } : n));
            }
        } else {
            showNotification({ message: 'การใส่ร้ายล้มเหลว' });
        }
        setIsLoading(false);
        setSlanderingNpc(null);
    };

    const handleConfirmPlayerPunishment = (choice: PlayerPunishmentChoice, targetNpc: NPC) => {
        if (!player) return;
        showNotification({ message: choice.consequence.message, type: 'event' });
        addGlobalEvent(`${player.name} ได้ลงโทษ ${targetNpc.name}: ${choice.text}`);

        if (choice.consequence.statChange) {
            updatePlayerStats(choice.consequence.statChange);
        }
        updateNpcFavorability(targetNpc.id, choice.favorabilityLoss);
        setPlayer(p => p ? { ...p, rankPoints: p.rankPoints + choice.rankPointsGain } : null);
        showNotification({ message: `คะแนนบารมี +${choice.rankPointsGain}` });

        setPunishingNpc(null);
    };

    const handleConfirmDarkAction = async (targetNpc: NPC) => {
        if (!player) return;
        setIsLoading(true);
        const response = await generateInduceMiscarriageOutcome(player, targetNpc);
        if (response.success) {
            const result = response.data;
            showNotification({ message: result.outcomeMessage, type: 'event' });
            addGlobalEvent(`[การกระทำมืด] ${result.outcomeMessage}`);
            updatePlayerStats(result.playerStatChanges);
            if (result.success) {
                setNpcs(prev => prev.map(n => n.id === targetNpc.id ? { ...n, isPregnant: false, conceptionDate: null } : n));
            }
        } else {
            showNotification({ message: 'การกระทำของคุณล้มเหลวอย่างน่าอนาถ' });
        }
        setIsLoading(false);
        setDarkActionTarget(null);
    };
    
    const handleStartGroupChat = useCallback((selectedNpcs: NPC[]) => {
        if (!player) return;
    
        const participants = isSettingUpCourtSession ? [ ...selectedNpcs] : selectedNpcs;
        if (participants.length === 0) return;

        const locationId = isSettingUpCourtSession ? 'empress_throne_hall' : player.locationId;
        const conversationId = participants.map(n => n.id).sort().join('_');
        
        const initialMessage: ChatMessage = {
            sender: 'system',
            text: isSettingUpCourtSession ? `การประชุมเริ่มขึ้นกับ ${participants.map(n=>n.name).join(', ')}` :`การสนทนากลุ่มเริ่มขึ้นกับ ${participants.map(n => n.name).join(', ')}`,
            timestamp: Date.now(),
        };
    
        setConversationHistories(prev => ({
            ...prev,
            [conversationId]: [initialMessage],
        }));
    
        handleStartConversation(participants, locationId);
        setIsSettingUpGroupChat(false);
        setIsSettingUpCourtSession(false);
    }, [player, handleStartConversation, isSettingUpCourtSession]);
    

    const handleStartInvestigation = async () => {
        if (!player) return;
        setIsLoading(true);
        const response = await startInvestigationEvent(player, npcs);
        if (response.success) {
            const newInvestigation = { ...response.data, clues: [] }; // Initialize with empty clues
            setActiveInvestigation(newInvestigation);
            showNotification({ message: `เริ่มการสืบสวนคดีใหม่: ${newInvestigation.caseTitle}`, type: 'event' });
            addGlobalEvent(`ได้เริ่มการสืบสวนคดี: ${newInvestigation.caseTitle}`);
        } else {
            showNotification({ message: 'ไม่สามารถเริ่มการสืบสวนได้ในขณะนี้' });
        }
        setIsLoading(false);
    };
    
    const handleAddLocation = (name: string, description: string) => {
        const command = `สร้างสถานที่ใหม่ชื่อ "${name}" พร้อมคำอธิบาย "${description}"`;
        handleExecuteSecretCommand(command);
    };
    
    const handleJoinFaction = useCallback((factionId: FactionId) => {
        if (!player) return;
        const faction = FACTIONS.find(f => f.id === factionId);
        if (!faction) return;
    
        if (!window.confirm(`คุณแน่ใจหรือไม่ว่าจะเข้าร่วม ${faction.name}? การตัดสินใจนี้จะมีผลผูกพัน`)) {
            return;
        }
    
        setPlayer(p => p ? { ...p, factionId } : null);
        showNotification({ message: `คุณได้เข้าร่วม ${faction.name}!`, type: 'event' });
        addGlobalEvent(`${player.name} ได้ตัดสินใจเข้าร่วม ${faction.name}`);
    }, [player, showNotification, addGlobalEvent]);
    
    const handleFactionAction = (actionType: string) => {
        if (!player || !player.factionId || player.factionId === 'neutral') return;
        const faction = FACTIONS.find(f => f.id === player.factionId);
        if (!faction || !faction.leaderId) return;
    
        const costs: Record<string, number> = {
            'praise_leader': 2000,
            'gather_intel': 5000,
            'donate_faction': 10000,
            'sabotage_rival': 25000
        };
    
        const cost = costs[actionType];
        if (cost !== undefined && player.money < cost) {
            showNotification({ message: "เงินไม่พอ" });
            return;
        }
        
        setPlayer(p => p ? { ...p, money: p.money - (cost || 0) } : null);
        
        let command = '';
        switch (actionType) {
            case 'praise_leader':
                command = `ฉันยกย่อง ${npcs.find(n => n.id === faction.leaderId)?.name} ผู้นำฝ่ายของฉัน เพื่อเพิ่มความสัมพันธ์และอิทธิพล`;
                break;
            case 'gather_intel':
                command = `ฉันใช้เงินเพื่อรวบรวมข่าวกรองเกี่ยวกับฝ่ายศัตรูในนามของ ${faction.name}`;
                break;
            case 'donate_faction':
                command = `ฉันบริจาคเงิน 10,000 ตำลึงให้กับ ${faction.name} เพื่อเพิ่มบารมีและอิทธิพลของฝ่าย`;
                break;
            case 'sabotage_rival':
                command = `ฉันพยายามบ่อนทำลายฝ่ายศัตรูในนามของ ${faction.name}`;
                break;
            default:
                return;
        }
        handleExecuteSecretCommand(command);
    };
    
    const handleRecruitMaid = (maidTemplate: Omit<Maid, 'id' | 'loyalty'>) => {
        if (!player || player.money < maidTemplate.recruitmentCost) {
            showNotification({ message: "เงินไม่พอ" });
            return;
        }
        if (player.maids.some(m => m.name === maidTemplate.name)) {
            showNotification({ message: `คุณว่าจ้าง ${maidTemplate.name} แล้ว` });
            return;
        }
        const newMaid: Maid = {
            ...maidTemplate,
            id: `maid_${maidTemplate.name}_${Date.now()}`,
            loyalty: 50,
        };
        setPlayer(p => p ? {
            ...p,
            money: p.money - maidTemplate.recruitmentCost,
            maids: [...p.maids, newMaid]
        } : null);
        showNotification({ message: `ว่าจ้าง ${maidTemplate.name} สำเร็จ!` });
        addGlobalEvent(`ได้ว่าจ้างสาวใช้คนใหม่: ${maidTemplate.name}`);
    };
    
    const handleAssignMaidTask = (maidId: string, taskId: string) => {
        if (!player) return;
        const maid = player.maids.find(m => m.id === maidId);
        const task = MAID_TASKS.find(t => t.id === taskId);
        if (!maid || !task) return;
    
        const endDate = Date.now() + task.durationHours * 60 * 60 * 1000;
        
        setPlayer(p => p ? {
            ...p,
            activeMaidAssignments: {
                ...p.activeMaidAssignments,
                [maidId]: { taskId, endDate }
            }
        } : null);
        showNotification({ message: `มอบหมายงาน "${task.name}" ให้กับ ${maid.name} แล้ว` });
        addGlobalEvent(`ได้มอบหมายงาน "${task.name}" ให้กับ ${maid.name}`);
    };
    
    const handleFireMaid = (maidId: string) => {
        if (!player) return;
        const maidName = player.maids.find(m => m.id === maidId)?.name || 'สาวใช้';
        if (!window.confirm(`คุณแน่ใจหรือไม่ว่าจะไล่ ${maidName} ออก?`)) return;
        
        setPlayer(p => {
            if (!p) return null;
            const newMaids = p.maids.filter(m => m.id !== maidId);
            const newAssignments = { ...p.activeMaidAssignments };
            delete newAssignments[maidId];
            return {
                ...p,
                maids: newMaids,
                activeMaidAssignments: newAssignments
            };
        });
        showNotification({ message: `ไล่ ${maidName} ออกแล้ว` });
        addGlobalEvent(`ได้ไล่ ${maidName} ออกจากการรับใช้`);
    };

    const handleUseItem = (instanceId: string) => {
        if (!player) return;

        const itemIndex = player.inventory.findIndex(i => i.instanceId === instanceId);
        if (itemIndex === -1) return;

        const item = player.inventory[itemIndex];
        if (item.type !== 'consumable' && item.type !== 'artifact') return;

        if (item.effect) {
            updatePlayerStats({ [item.effect.stat]: item.effect.value });
        }

        const newInventory = [...player.inventory];
        newInventory.splice(itemIndex, 1);

        setPlayer(p => p ? { ...p, inventory: newInventory } : null);
        showNotification({ message: `ใช้ ${item.name} สำเร็จ!` });
        addGlobalEvent(`ได้ใช้ ${item.name} เพื่อเพิ่มค่าสถานะ`);
    };

    // --- EMPRESS CAREER HANDLERS ---
    const handleHoldCourt = () => {
        setIsSettingUpCourtSession(true);
    };

    const handleManageConsortAction = (consort: NPC, action: 'promote' | 'demote' | 'imprison') => {
        if (!player || player.career !== CareerPath.Empress) return;
        
        const currentRankIndex = JUN_RANKS.indexOf(consort.title as JunRank);
        let command = '';

        switch(action) {
            case 'promote':
                if (currentRankIndex >= 0 && currentRankIndex < JUN_RANKS.length - 3) {
                    const nextRank = JUN_RANKS[currentRankIndex + 1];
                    command = `เลื่อนยศให้ ${consort.name} จาก ${consort.title} เป็น ${nextRank}`;
                } else {
                    showNotification({ message: `${consort.name} อยู่ในตำแหน่งสูงสุดที่สามารถแต่งตั้งได้แล้ว` });
                    return;
                }
                break;
            case 'demote':
                 if (currentRankIndex > 0) {
                    const prevRank = JUN_RANKS[currentRankIndex - 1];
                    command = `ลดขั้น ${consort.name} จาก ${consort.title} เป็น ${prevRank}`;
                } else {
                    showNotification({ message: `${consort.name} อยู่ในตำแหน่งต่ำสุดแล้ว` });
                    return;
                }
                break;
            case 'imprison':
                command = `สั่งขัง ${consort.name} ในตำหนักเย็น`;
                break;
        }
        if (command) {
            handleExecuteSecretCommand(command);
            setIsManagingConsorts(false);
        }
    };

    const handleOpenExecutionModal = (consort: NPC) => {
        setIsManagingConsorts(false);
        setExecutionTarget(consort);
    };

    const handleSelectExecutionMethod = (method: ExecutionMethod) => {
        if (!executionTarget) return;
        let commandText = '';
        switch(method) {
            case 'silk':
                commandText = `ประหาร ${executionTarget.name} ด้วยการประทานผ้าแพร่ให้แขวนคอตาย`;
                break;
            case 'poison':
                commandText = `ประหาร ${executionTarget.name} ด้วยการประทานสุราพิษ`;
                break;
            case 'behead':
                commandText = `สั่งตัดหัวประหาร ${executionTarget.name}`;
                break;
            case 'dismember':
                commandText = `สั่งประหาร ${executionTarget.name} ด้วยวิธีห้าม้าแยกร่าง`;
                break;
        }
        handleExecuteSecretCommand(commandText);
        setExecutionTarget(null);
    };

    const handleSelectNightlyConsort = (consort: NPC) => {
         if (!player || player.career !== CareerPath.Empress) return;
         handleStartConversation([consort], 'empress_chamber');
         setIsSelectingNightlyConsort(false);
    };

    const handleSellItem = (instanceId: string) => {
        if (!player) return;

        const itemIndex = player.inventory.findIndex(i => i.instanceId === instanceId);
        if (itemIndex === -1) return;

        const item = player.inventory[itemIndex];
        let sellPrice = 0;
        if (item.type === 'quest') {
            const quest = quests.find(q => q.id === item.questId);
            if (quest) {
                sellPrice = QUEST_ITEM_SELL_VALUES[quest.difficulty] || 0;
            }
        } else {
            sellPrice = Math.floor((item.price || 0) / 2);
        }

        if (sellPrice <= 0) {
            showNotification({ message: `ไม่สามารถขาย ${item.name} ได้` });
            return;
        }

        const newInventory = [...player.inventory];
        newInventory.splice(itemIndex, 1);

        setPlayer(p => p ? { 
            ...p, 
            inventory: newInventory,
            money: p.money + sellPrice
        } : null);
        
        showNotification({ message: `ขาย ${item.name} ได้เงิน ${sellPrice} ตำลึง` });
        addGlobalEvent(`ได้ขาย ${item.name} และได้รับเงิน ${sellPrice} ตำลึง`);
    };

    const handleHostFeast = (selectedNpcs: NPC[]) => {
        if (!player) return;

        const totalCost = FEAST_BASE_COST + selectedNpcs.length * FEAST_COST_PER_GUEST;
        if (player.money < totalCost) {
            showNotification({ message: "เงินไม่พอสำหรับจัดงานเลี้ยง" });
            return;
        }

        setPlayer(p => p ? { ...p, money: p.money - totalCost, prestige: p.prestige + FEAST_PRESTIGE_REWARD } : null);

        const guestNames = selectedNpcs.map(n => n.name).join(', ');
        const command = `ฉันได้จัดงานเลี้ยงขึ้นที่ตำหนักของฉัน โดยเชิญ ${guestNames} มาร่วมงานเลี้ยง ทุกคนต่างชื่นชมในความใจกว้างของฉัน และความสัมพันธ์ของเราก็ดีขึ้น`;
        
        handleExecuteSecretCommand(command);

        selectedNpcs.forEach(npc => {
            updateNpcFavorability(npc.id, FEAST_FAVORABILITY_REWARD);
        });

        showNotification({ message: `จัดงานเลี้ยงสำเร็จ! บารมี +${FEAST_PRESTIGE_REWARD}`, type: 'event' });
        addGlobalEvent(`${player.name} ได้จัดงานเลี้ยงครั้งใหญ่และเชิญแขกคนสำคัญมากมาย`);
        setIsHostingFeast(false);
    };
    
    const handleNameChild = (name: string, gender: 'male' | 'female') => {
        if (!player || !player.fatherId) return;

        const father = npcs.find(n => n.id === player.fatherId);
        if (!father) {
            console.error("Father not found for childbirth");
            return;
        }

        const isRoyalHeir = father.id === 'xuanzong' || father.id === 'qin_wang';
        const childTitle = isRoyalHeir 
            ? (gender === 'male' ? 'องค์ชาย' : 'องค์หญิง') 
            : (gender === 'male' ? 'คุณชาย' : 'คุณหนู');
            
        const imagePool = gender === 'male' ? MALE_HEIR_IMAGES : FEMALE_HEIR_IMAGES;
        const randomImageUrl = imagePool[Math.floor(Math.random() * imagePool.length)];

        const newChild: NPC = {
            id: `npc_child_${name.toLowerCase().replace(/\s/g, '_')}_${Date.now()}`,
            name: name,
            title: childTitle,
            imageUrl: randomImageUrl,
            age: 0,
            health: 'healthy',
            isAlive: true,
            emotion: Emotion.Neutral,
            favorability: 100,
            dialogue: `(ทารกน้อยมองคุณตาแป๋ว)`,
            locationId: player.locationId,
            careerAffiliation: player.career === CareerPath.ImperialConsort ? [CareerPath.ImperialConsort] : [CareerPath.QinConsort],
            motherId: `player_${player.name}`,
            fatherId: player.fatherId,
            gender: gender,
            heirPoints: isRoyalHeir ? 100 : 20,
            charm: Math.floor(Math.random() * 10) + 5,
            intelligence: Math.floor(Math.random() * 10) + 5,
            power: Math.floor(Math.random() * 10) + 5,
            prestige: isRoyalHeir ? Math.floor(Math.random() * 10) + 10 : Math.floor(Math.random() * 5) + 2,
        };

        setNpcs(prev => [...prev, newChild]);
        setPlayer(p => p ? { 
            ...p, 
            isPregnant: false, 
            conceptionDate: null, 
            fatherId: null, 
            lastGaveBirthDay: p.gameDay 
        } : null);

        showNotification({ message: `คุณได้ให้กำเนิด ${childTitle} ${name}!`, type: 'event' });
        addGlobalEvent(`${player.name} ได้ให้กำเนิด ${childTitle} ${name} ทายาทของ ${father.name}`);
        setShowBirthAnnouncement(false);
    };

    const handlePunishmentChoice = (choice: PunishmentChoice) => {
        if (!player || !punishmentEvent) return;
        const { accuser } = punishmentEvent;
        showNotification({ message: choice.consequence.message, type: 'event' });
        addGlobalEvent(choice.consequence.message);
        updatePlayerStats(choice.consequence.statChange);
        updateNpcFavorability(accuser.id, choice.consequence.favorabilityChange);
        setPunishmentEvent(null);
    };

    const handleJealousyChoice = (choice: JealousyChoice) => {
        if (!player || !jealousyPrompt) return;
        setPlayer(p => p ? ({ ...p, jealousyLevel: choice.level, intelligence: p.intelligence + choice.initialIntelligenceGain }) : null);
        showNotification({ message: `ความริษยาของคุณอยู่ที่ระดับ ${choice.level}/10` });
        addGlobalEvent(`รู้สึก ${choice.text.toLowerCase()} เมื่อได้ยินว่าฝ่าบาทไปหา ${jealousyPrompt.name}`);
        const targetNpc = jealousyPrompt;
        setJealousyPrompt(null);
        if (choice.level >= 7) {
            setSpecialConversation({
                scenarioType: 'jealousy',
                npc: targetNpc,
                currentRound: 1,
                storySummary: `Player is feeling intense jealousy towards ${targetNpc.name}.`,
                choices: ["เยาะเย้ยนางเรื่องที่ฝ่าบาทมาหา", "ถามนางตรงๆ ว่ารู้สึกอย่างไร", "เมินเฉยและเดินจากไป"],
                npcResponse: `คุณได้พบกับ ${targetNpc.name} โดยบังเอิญ... บรรยากาศดูตึงเครียด นางมองมาที่คุณด้วยสายตาเย็นชา`,
            });
        }
    };

    const handleSpecialConversationChoice = async (choiceText: string) => {
        if (!player || !specialConversation) return;
        setIsLoading(true);

        const response = await generateScenarioConversation(player, specialConversation, choiceText);

        if (response.success) {
            const { npcResponse, choices } = response.data;
            const isFinalRound = specialConversation.currentRound + 1 >= 4;
            
            if (isFinalRound) {
                setSpecialConversation(null);
                showNotification({ message: "เหตุการณ์ได้จบลงแล้ว...", type: 'event' });
            } else {
                setSpecialConversation(prev => prev ? ({
                    ...prev,
                    currentRound: prev.currentRound + 1,
                    storySummary: `${prev.storySummary}\nPlayer chose: ${choiceText}\nNPC responded: ${npcResponse}`,
                    npcResponse,
                    choices,
                }) : null);
            }
        } else {
            showNotification({ message: "เกิดข้อผิดพลาดในการสนทนา" });
            setSpecialConversation(null);
        }

        setIsLoading(false);
    };

    const handleExplore = (locationId: string) => {
        if (!player) return;

        const activeFindObjective = quests
            .filter(q => q.status === 'active')
            .flatMap(q => q.objectives)
            .find(o => o.type === ObjectiveType.FIND && !o.isCompleted && o.locationId === locationId);
        
        if (activeFindObjective && activeFindObjective.targetId) {
            const questItem = SHOP_ITEMS.find(item => item.id === activeFindObjective.targetId) || { id: activeFindObjective.targetId, name: 'ของในภารกิจ', description: 'ของสำคัญสำหรับภารกิจ', emoji: '🔍', type: 'quest' };
            const newItemInstance: InventoryItem = {
                ...questItem,
                instanceId: `${questItem.id}_${Date.now()}`,
                questId: quests.find(q => q.objectives.includes(activeFindObjective))?.id,
            };
            setPlayer(p => p ? { ...p, inventory: [...p.inventory, newItemInstance] } : null);
            showNotification({ message: `คุณพบ "${newItemInstance.name}"!` });
            addGlobalEvent(`ค้นพบ ${newItemInstance.name} ที่ ${getLocationName(locationId)}`);
        } else {
            showNotification({ message: 'ไม่พบอะไรที่น่าสนใจ' });
        }
    };

    // --- NEW HANDLERS FOR MISSING MODALS ---
    const handleAccuseCulprit = (accusedNpcId: string) => {
        if (!activeInvestigation) return;
        const isCorrect = accusedNpcId === activeInvestigation.trueCulpritId;
        const culpritName = npcs.find(n => n.id === accusedNpcId)?.name || 'ผู้ต้องสงสัย';
        if (isCorrect) {
            showNotification({ message: `ถูกต้อง! ${culpritName} คือคนร้ายตัวจริง!`, type: 'event' });
            addGlobalEvent(`ไขคดี ${activeInvestigation.caseTitle} ได้สำเร็จ`);
            processRewards(['คะแนนบารมี +200', 'ค่าสติปัญญา +50', 'เงิน +1000']);
        } else {
            showNotification({ message: `คุณชี้ตัวผิด! ทำให้เสียชื่อเสียง`, type: 'event' });
            addGlobalEvent(`ล้มเหลวในการไขคดี ${activeInvestigation.caseTitle} โดยกล่าวหาผิดคน`);
            updatePlayerStats({ prestige: -50 });
        }
        setActiveInvestigation(null);
        setIsInvestigationModalOpen(false);
    };

    const handleReplyToIncomingMessage = async (replyText: string) => {
        if (!player || !incomingMessageState) return;
        setIncomingMessageState(prev => prev ? ({ ...prev, playerReply: replyText }) : null);
        const response = await generateNpcReplyToIncomingMessage(player, { ...incomingMessageState, playerReply: replyText });
        if (response.success) {
            const { npcReply, rewards } = response.data;
            setIncomingMessageState(prev => prev ? ({ ...prev, npcFinalResponse: npcReply, rewards: rewards }) : null);
            processRewards(rewards);
            addGlobalEvent(`ได้รับข้อความตอบกลับจาก ${incomingMessageState.npcName}`);
        } else {
            showNotification({ message: 'ไม่ได้รับการตอบกลับ' });
            setIncomingMessageState(null);
        }
    };

    const handleCloseIncomingMessage = (wasIgnored: boolean) => {
        if (wasIgnored && incomingMessageState) {
            addGlobalEvent(`เลือกที่จะเพิกเฉยต่อข้อความจาก ${incomingMessageState.npcName}`);
        }
        setIncomingMessageState(null);
    };

    const handleArrangeEducation = (childId: string, focus: EducationFocus, cost: number) => {
        if (!player || player.money < cost) {
            showNotification({ message: "เงินไม่พอ" });
            return;
        }
        setPlayer(p => p ? { ...p, money: p.money - cost, lastHeirEducationDay: p.gameDay } : null);
        const statGains: Record<string, number> = { charm: 2, intelligence: 2, power: 2, prestige: 2 };
        switch (focus) {
            case 'arts': statGains.charm += 5; statGains.intelligence += 3; break;
            case 'politics': statGains.intelligence += 5; statGains.prestige += 3; break;
            case 'warfare': statGains.power += 5; statGains.intelligence += 3; break;
            case 'etiquette': statGains.charm += 3; statGains.prestige += 3; break;
            case 'commerce': statGains.intelligence += 4; statGains.prestige += 4; break;
            case 'medicine': statGains.intelligence += 4; statGains.charm += 4; break;
        }
        setNpcs(prev => prev.map(npc => {
            if (npc.id === childId) {
                return {
                    ...npc,
                    educationFocus: focus,
                    charm: (npc.charm || 0) + statGains.charm,
                    intelligence: (npc.intelligence || 0) + statGains.intelligence,
                    power: (npc.power || 0) + statGains.power,
                    prestige: (npc.prestige || 0) + statGains.prestige,
                    heirPoints: npc.heirPoints + 10,
                };
            }
            return npc;
        }));
        const childName = npcs.find(n => n.id === childId)?.name || 'ทายาท';
        showNotification({ message: `จัดหลักสูตร "${focus}" ให้ ${childName} สำเร็จ`, type: 'event' });
        addGlobalEvent(`ได้ลงทุนในการศึกษาของ ${childName} โดยเน้นด้าน ${focus}`);
    };
    
    const handlePraiseHeir = async (childId: string): Promise<boolean> => {
        if (!player || !ruler) return false;
        if (player.money < HEIR_PRAISE_COST.money || player.prestige < HEIR_PRAISE_COST.prestige) {
            showNotification({ message: "เงินหรือบารมีไม่พอ" });
            return false;
        }
        const heir = npcs.find(n => n.id === childId);
        if (!heir) return false;
        setPlayer(p => p ? { ...p, money: p.money - HEIR_PRAISE_COST.money, prestige: p.prestige - HEIR_PRAISE_COST.prestige } : null);
        const response = await generatePraiseHeirOutcome(player, ruler, heir);
        if (response.success) {
            const result = response.data;
            showNotification({ message: result.outcomeMessage, type: 'event' });
            addGlobalEvent(result.outcomeMessage);
            processRewards(result.rewards);
            if (result.heirPointsGain) {
                setNpcs(prev => prev.map(n => n.id === childId ? { ...n, heirPoints: n.heirPoints + result.heirPointsGain! } : n));
            }
            return true;
        } else {
            showNotification({ message: 'การยกย่องล้มเหลว' });
            return false;
        }
    };


    // --- AUTH & DATA MANAGEMENT ---

    const handleLogin = (username: string) => {
        localStorage.setItem('last_logged_in_user', username);
        setCurrentUser(username);
    };

    const handleLogout = () => {
        localStorage.removeItem('last_logged_in_user');
        setCurrentUser(null);
        setPlayer(null);
        setQuests([]);
        setNpcs(INITIAL_NPCS);
        setMapLocations(MAP_LOCATIONS);
        setQuestEntities([]);
        setConversationHistories({});
        setGlobalEventLog([]);
        setActiveInvestigation(null);
        setActiveConversation(null);
        setMainView('overview');
        setActiveModal(null);
    };

    const handleDeleteAccount = useCallback(() => {
        if (!currentUser) return;
        const users = JSON.parse(localStorage.getItem('game_users') || '{}');
        delete users[currentUser];
        localStorage.setItem('game_users', JSON.stringify(users));
        localStorage.removeItem(`game_save_${currentUser}`);
        handleLogout();
    }, [currentUser]);

    const handleCharacterCreate = (profile: PlayerProfile) => {
        setPlayer(profile);
        setQuestEntities([]);
        setConversationHistories({});
        setActiveInvestigation(null);
        setLastRumorDay(0);
        setLastDailyQuestTime(0);

        if (profile.career === CareerPath.Empress) {
            setQuests(EMPRESS_QUESTS);
            setNpcs(EMPRESS_NPCS);
            setMapLocations(EMPRESS_LOCATIONS);
            setGlobalEventLog([`[วันที่ 1] ${profile.name} ได้ขึ้นครองราชย์เป็นจักรพรรดินีแห่งแผ่นดิน`]);
            setMainView('court');
        } else {
            setQuests(STATIC_QUESTS.filter(q => q.careerAffiliation?.includes(profile.career)));
            setNpcs(INITIAL_NPCS);
            setMapLocations(MAP_LOCATIONS);
            setGlobalEventLog([`[วันที่ 1] ${profile.name} ได้เริ่มต้นการเดินทางในฐานะคุณหนูจาก ${NOBLE_FAMILIES.find(f => f.id === profile.familyId)?.name}`]);
            setMainView('overview');
        }
    };

    const handlePrologueChoice = async (choiceText: string) => {
        if (!player || !prologueState) return;
        setIsLoading(true);

        const response: GeminiServiceResponse<PrologueStepResult> = await generatePrologueConversation(
            player,
            prologueState.careerPath,
            prologueState.currentRound + 1,
            `${prologueState.storySummary}\nPlayer chose: ${choiceText}`,
            choiceText
        );

        if (response.success) {
            const { npcResponse, choices, isFinalRound } = response.data;
            if (isFinalRound) {
                setPlayer(p => p ? { ...p, prologueCompleted: true } : null);
                setPrologueState(null);
                showNotification({ message: 'บทนำสิ้นสุดลงแล้ว ขอให้โชคดีในวังหลัง!', type: 'event' });
                addGlobalEvent('เสร็จสิ้นการทดสอบและได้เข้าวังอย่างเป็นทางการ');
            } else {
                setPrologueState(prev => prev ? ({
                    ...prev,
                    currentRound: prev.currentRound + 1,
                    storySummary: `${prev.storySummary}\nPlayer chose: ${choiceText}\nNPC responded: ${npcResponse}`,
                    npcResponse,
                    choices,
                }) : null);
            }
        } else {
            showNotification({ message: 'เกิดข้อผิดพลาดในบทนำ โปรดลองอีกครั้ง' });
            setPrologueState(null);
            setPlayer(p => p ? { ...p, prologueCompleted: true } : null);
        }

        setIsLoading(false);
    };

    useEffect(() => {
        const startPrologue = async () => {
            if (!player || player.prologueCompleted || prologueState) return;

            setIsLoading(true);
            const career = player.career;
            const response = await generatePrologueConversation(player, career, 1, `The player ${player.name} begins their examination to become a ${career}.`);
            
            if (response.success) {
                const { npcResponse, choices } = response.data;
                setPrologueState({
                    careerPath: career,
                    examinerName: career === CareerPath.ImperialConsort ? '嬷嬷จาง' : 'พ่อบ้านสวี',
                    examinerTitle: career === CareerPath.ImperialConsort ? '嬷嬷อาวุโส' : 'พ่อบ้านใหญ่',
                    currentRound: 1,
                    storySummary: `The player ${player.name} begins their examination. The examiner says: ${npcResponse}`,
                    choices,
                    npcResponse,
                });
            } else {
                showNotification({ message: "ไม่สามารถเริ่มบทนำได้ ข้ามไปยังเนื้อเรื่องหลัก" });
                setPlayer(p => p ? { ...p, prologueCompleted: true } : null);
            }
            setIsLoading(false);
        };
    
        startPrologue();
    }, [player, showNotification]);

    useEffect(() => {
        if (!currentUser) return;
    
        const loadGame = async () => {
            const savedData = localStorage.getItem(`game_save_${currentUser}`);
            if (savedData) {
                try {
                    let gameState: GameState = JSON.parse(savedData);
                    
                    if (!gameState.version || gameState.version < CURRENT_GAME_VERSION) {
                        console.log(`Migrating data from version ${gameState.version || 'undefined'} to ${CURRENT_GAME_VERSION}`);
                        
                        let player = gameState.player;
                        // Version 3 migrations
                        if ((gameState.version || 0) < 3) {
                            if (!player.managementStats) player.managementStats = { finances: 50, morale: 50, order: 50 };
                            if (!player.factionId) player.factionId = 'neutral';
                            if (!player.factionInfluence) player.factionInfluence = { neutral: 0, empress_faction: 0, noble_consort_faction: 0 };
                            if (!player.lastIncomeCollectionTimestamp) player.lastIncomeCollectionTimestamp = Date.now();
                            if (!player.maids) player.maids = [];
                            if (!player.activeMaidAssignments) player.activeMaidAssignments = {};
                        }

                        // Version 4 migration for Empress dashboard
                        if ((gameState.version || 0) < 4) {
                             if (player.career === CareerPath.Empress && player.militaryPower === undefined) {
                                player.militaryPower = 10000;
                            } else if (player.militaryPower === undefined) {
                                player.militaryPower = 0;
                            }
                        }
    
                        player.version = CURRENT_GAME_VERSION;
                        gameState.player = player;
                        gameState.version = CURRENT_GAME_VERSION;
                        setShowUpdateLog(true); 
                    }
    
                    const { updatedPlayer, updatedNpcs, report, triggerPlayerBirth } = await calculateOfflineProgress(gameState.player, gameState.npcs || INITIAL_NPCS, MAID_TASKS);
                    
                    setPlayer(updatedPlayer);
                    setNpcs(updatedNpcs);
    
                    if (report.daysPassed > 0 || report.maidTaskOutcomes.length > 0 || report.births.length > 0 || (report.offlineIncome || 0) > 0) {
                        setWelcomeBackReport(report);
                    }
                    if (triggerPlayerBirth) {
                        setShowChildbirth(true);
                    }
                    
                    setQuests(gameState.quests || []);
                    setMapLocations(gameState.mapLocations || MAP_LOCATIONS);
                    setQuestEntities(gameState.questEntities || []);
                    setConversationHistories(gameState.conversationHistories || {});
                    setLastRumorDay(gameState.lastRumorDay || 0);
                    setLastDailyQuestTime(gameState.lastDailyQuestTime || 0);
                    setGlobalEventLog(gameState.globalEventLog || []);
                    setActiveInvestigation(gameState.activeInvestigation || null);
                } catch (error) {
                    console.error("Failed to parse save data. Resetting.", error);
                    localStorage.removeItem(`game_save_${currentUser}`);
                    setPlayer(null);
                }
            } else {
                setPlayer(null);
            }
        };
    
        loadGame();
    }, [currentUser]);

    useEffect(() => {
        if (!currentUser || !player) return;
        const gameState: GameState = { player, quests, npcs, mapLocations, questEntities, conversationHistories, lastRumorDay, lastDailyQuestTime, globalEventLog, activeInvestigation, version: CURRENT_GAME_VERSION };
        localStorage.setItem(`game_save_${currentUser}`, JSON.stringify(gameState));
    }, [ currentUser, player, quests, npcs, mapLocations, questEntities, conversationHistories, lastRumorDay, lastDailyQuestTime, globalEventLog, activeInvestigation ]);
    
    const invitableNpcs = useMemo(() => {
        if (!player) return [];
        return npcs.filter(npc => npc.isAlive && !npc.isImprisoned && npc.age >= 16);
    }, [npcs, player]);

    const ministersAndAdvisors = useMemo(() => {
        if (!player || player.career !== CareerPath.Empress) return [];
        return npcs.filter(n => MINISTER_TITLES.includes(n.title) && n.isAlive);
    }, [npcs, player]);


    const invitableNpcsForFeast = useMemo(() => npcs.filter(npc => npc.age >= 16), [npcs]);

    const loveInterest = useMemo(() => {
        if (!player || player.career === CareerPath.Empress) return undefined;
        const targetId = player.career === CareerPath.ImperialConsort ? 'xuanzong' : 'qin_wang';
        return npcs.find(n => n.id === targetId);
    }, [npcs, player]);
    
    const ruler = useMemo(() => {
        if (!player || player.career === CareerPath.Empress) return undefined;
        const rulerId = player.career === CareerPath.ImperialConsort ? 'xuanzong' : 'qin_wang';
        return npcs.find(n => n.id === rulerId);
    }, [npcs, player]);

    useEffect(() => {
        if (!player || player.career === CareerPath.Empress) return;
        if (player.rank === 'คุณหนู') {
            if (loveInterest && loveInterest.favorability >= 2000) {
                const firstRank = player.career === CareerPath.ImperialConsort ? ImperialRank.Gongren : QinRank.Yingshi;
                setPlayer(p => p ? { ...p, rank: firstRank, rankPoints: p.rankPoints + (loveInterest.favorability - 2000) } : null);
                setShowOfficialRankModal({ newRank: firstRank });
                showNotification({ message: `คุณได้รับการแต่งตั้งอย่างเป็นทางการ!`, type: 'event' });
                addGlobalEvent(`${player.name} ได้รับการแต่งตั้งเป็น ${firstRank} หลังจากพิสูจน์ความภักดี`);
            }
            return;
        }
        const checkPromotion = (currentProfile: PlayerProfile): PlayerProfile => {
            const currentRankList = currentProfile.career === CareerPath.ImperialConsort ? IMPERIAL_RANKS : QIN_RANKS;
            const currentRequirements = currentProfile.career === CareerPath.ImperialConsort ? IMPERIAL_RANK_REQUIREMENTS : QIN_RANK_REQUIREMENTS;
            const currentRankIndex = currentRankList.indexOf(currentProfile.rank);

            if (currentRankIndex === -1 || currentRankIndex >= currentRankList.length - 1) {
                return currentProfile; // Not a promotable rank or already at max rank
            }

            const pointsForNextRank = currentRequirements[currentProfile.rank as keyof typeof currentRequirements];
            if (currentProfile.rankPoints >= pointsForNextRank) {
                const fromRank = currentProfile.rank;
                const toRank = currentRankList[currentRankIndex + 1];
                setRankUpInfo({ from: fromRank, to: toRank });
                addGlobalEvent(`${currentProfile.name} ได้รับการเลื่อนตำแหน่งเป็น ${toRank}!`);
                
                // Return updated profile
                return {
                    ...currentProfile,
                    rank: toRank,
                    rankPoints: currentProfile.rankPoints - pointsForNextRank,
                    level: currentProfile.level + 1,
                };
            }

            return currentProfile;
        };

        setPlayer(p => {
            if (!p) return null;
            return checkPromotion(p);
        });

    }, [player?.rankPoints, player?.rank, player?.career, loveInterest, showNotification, addGlobalEvent]);
    
    const checkDailyEvents = useCallback(() => {
        if (!player || !ruler) return;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayTimestamp = today.getTime();

        if (lastDailyQuestTime < todayTimestamp) {
            setLastDailyQuestTime(todayTimestamp);
            showNotification({message: "มีภารกิจรายวันใหม่ให้ทำแล้ว!", type: 'event'});
        }

        if (player.gameDay > lastRumorDay) {
            setLastRumorDay(player.gameDay);

            if (Math.random() < 0.2) { // 20% chance per day for jealousy event
                const potentialVisits = player.career === CareerPath.ImperialConsort ? POTENTIAL_IMPERIAL_VISITS : POTENTIAL_QIN_VISITS;
                const visitedNpcId = potentialVisits[Math.floor(Math.random() * potentialVisits.length)];
                const visitedNpc = npcs.find(n => n.id === visitedNpcId);
                if (visitedNpc) {
                    setJealousyPrompt(visitedNpc);
                }
            }
            
            if (Math.random() < 0.1) { // 10% chance for punishment event
                const rivalNpcs = npcs.filter(n => n.favorability < -500 && n.id !== 'xuanzong' && n.id !== 'qin_wang');
                if (rivalNpcs.length > 0) {
                     generatePunishmentEvent(player, rivalNpcs).then(response => {
                        if (response.success) {
                            const accuser = rivalNpcs[Math.floor(Math.random() * rivalNpcs.length)];
                            setPunishmentEvent({ ...response.data, accuser, accuserId: accuser.id });
                        }
                    });
                }
            }
        }
    }, [player, ruler, npcs, lastDailyQuestTime, lastRumorDay, showNotification]);

    useEffect(() => {
        checkDailyEvents();
        const interval = setInterval(checkDailyEvents, 60000); // Check every minute
        return () => clearInterval(interval);
    }, [checkDailyEvents]);
    
     useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setInstallPromptEvent(e);
        };
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }, []);

    const handleInstall = () => {
        if (installPromptEvent) {
            installPromptEvent.prompt();
            installPromptEvent.userChoice.then((choiceResult: { outcome: 'accepted' | 'dismissed' }) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                setInstallPromptEvent(null);
            });
        }
    };
    
    const handleNavigate = (view: MenuBarViewType) => {
        switch (view) {
            case 'profile': setActiveModal('profile'); break;
            case 'inventory': setActiveModal('inventory'); break;
            case 'guide': setActiveModal('guide'); break;
            case 'secret_command': setSecretCommandInputState({ isOpen: true, preset: '' }); break;
            default:
                if (mainView !== view) {
                    setMainView(view as MainView);
                }
        }
    };

    if (!currentUser) {
        return <Auth onLogin={handleLogin} installPromptEvent={installPromptEvent} onInstall={handleInstall} />;
    }

    if (!player) {
        return <CharacterCreation onCharacterCreate={handleCharacterCreate} />;
    }

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <NotificationContainer notifications={notifications} onClose={(id) => setNotifications(prev => prev.filter(n => n.id !== id))} />
            
            {/* Modals with high z-index */}
            {welcomeBackReport && <WelcomeBackModal report={welcomeBackReport} onClose={() => setWelcomeBackReport(null)} />}
            {showUpdateLog && <UpdateLogModal onClose={() => setShowUpdateLog(false)} />}
            {prologueState && <PrologueModal state={prologueState} onChoice={handlePrologueChoice} isLoading={isLoading} />}
            {rankUpInfo && <ImperialEdictModal fromRank={rankUpInfo.from} toRank={rankUpInfo.to} playerName={player.name} onClose={() => setRankUpInfo(null)} />}
            {showOfficialRankModal && <OfficialRankModal newRank={showOfficialRankModal.newRank} playerName={player.name} onClose={() => setShowOfficialRankModal(null)} />}
            {sisterRivalAnnouncement && <SisterRivalAnnouncementModal sisterName={sisterRivalAnnouncement.sisterName} newRank={sisterRivalAnnouncement.newRank} onClose={() => setSisterRivalAnnouncement(null)} />}
            {rescueAnnouncement && <RescueEdictModal player={player} announcement={rescueAnnouncement} onClose={() => setRescueAnnouncement(null)} />}
            {divorceAnnouncement && <DivorceAnnouncementModal player={player} onClose={() => setDivorceAnnouncement(false)} />}
            {jealousyPrompt && <JealousyPromptModal visitedNpcName={jealousyPrompt.name} onSelect={handleJealousyChoice} onClose={() => setJealousyPrompt(null)} />}
            {punishmentEvent && <PunishmentModal event={punishmentEvent} onChoose={handlePunishmentChoice} onClose={() => setPunishmentEvent(null)} />}
            {completedQuestModal && <QuestCompletionModal quest={completedQuestModal} onClose={() => setCompletedQuestModal(null)} />}
            {giftingTarget && <GiftModal inventory={player.inventory} targetNpc={giftingTarget} onGive={handleGiveGift} onClose={() => setGiftingTarget(null)} />}
            {punishingNpc && <PlayerPunishmentModal player={player} targetNpc={punishingNpc} onPunish={handleConfirmPlayerPunishment} onClose={() => setPunishingNpc(null)} />}
            {slanderingNpc && <SlanderModal targetNpc={slanderingNpc} onSlander={handleConfirmSlander} onClose={() => setSlanderingNpc(null)} isLoading={isLoading} />}
            {showPregnancyConfirm && <PregnancyConfirmationModal npc={showPregnancyConfirm} onConfirm={() => { setPlayer(p => p ? { ...p, isPregnant: true, conceptionDate: p.gameDay, fatherId: showPregnancyConfirm.id } : null); setShowPregnancyConfirm(null); }} onCancel={() => setShowPregnancyConfirm(null)} />}
            {showChildbirth && <ChildbirthModal onProceed={() => { setShowChildbirth(false); setShowBirthAnnouncement(true); }} />}
            {showBirthAnnouncement && <BirthAnnouncementModal onNameChild={handleNameChild} onClose={() => setShowBirthAnnouncement(false)} allNpcs={npcs} />}
            {showDeathModal && <DeathModal onRebirth={() => {}} onReincarnate={() => {}} />}
            {deathConfirmation && <DeathConfirmationModal message={deathConfirmation.message} onConfirm={() => { setShowDeathModal(true); setDeathConfirmation(null); }} onCancel={() => { setDeathConfirmation(null); }} />}
            {specialConversation && <SpecialConversationModal state={specialConversation} onChoice={handleSpecialConversationChoice} isLoading={isLoading} />}
            {npcBirthAnnouncement && <NpcBirthAnnouncementModal announcement={npcBirthAnnouncement} onClose={() => setNpcBirthAnnouncement(null)} />}
            {affairProposal && <AffairConfirmationModal npc={affairProposal} onConfirm={() => { setPlayer(p => p ? ({ ...p, secretLover: { npcId: affairProposal.id, npcName: affairProposal.name, secrecyLevel: 10 } }) : null); setAffairProposal(null); }} onCancel={() => setAffairProposal(null)} />}
            {darkActionTarget && <DarkActionModal player={player} targetNpc={darkActionTarget} onConfirm={handleConfirmDarkAction} onClose={() => setDarkActionTarget(null)} isLoading={isLoading} />}
            {princeVisitAnnouncement && <PrinceVisitModal announcement={princeVisitAnnouncement} onAccept={() => {}} onDecline={() => {}} />}
            {inviteToLocation && <InviteNpcToLocationModal location={inviteToLocation} npcs={invitableNpcs} onInvite={handleInviteNpc} onClose={() => setInviteToLocation(null)} />}
            {(isSettingUpGroupChat || isSettingUpCourtSession) && <GroupChatSetupModal npcs={isSettingUpCourtSession ? ministersAndAdvisors : invitableNpcs} modalTitle={isSettingUpCourtSession ? 'เลือกผู้เข้าร่วมประชุม' : undefined} onStartGroupChat={handleStartGroupChat} onClose={() => { setIsSettingUpGroupChat(false); setIsSettingUpCourtSession(false); }} />}
            {isHostingFeast && <HostFeastModal npcs={invitableNpcsForFeast} playerMoney={player.money} onHostFeast={handleHostFeast} onClose={() => setIsHostingFeast(false)} />}
            {isManagingMaids && <MaidManagementModal player={player} tasks={MAID_TASKS} onAssignTask={handleAssignMaidTask} onFireMaid={handleFireMaid} onClose={() => setIsManagingMaids(false)} selectedMaidId={selectedMaidId} onSelectMaid={setSelectedMaidId} />}
            {isRecruitingMaids && <MaidRecruitmentModal playerMoney={player.money} playerMaids={player.maids} onRecruit={handleRecruitMaid} onClose={() => setIsRecruitingMaids(false)} />}
            {sendMessageTarget && <SendMessageModal player={player} targetNpc={sendMessageTarget} onSend={handleSendMessageConfirm} onClose={() => setSendMessageTarget(null)} isLoading={isLoading} />}
            {isInvestigationModalOpen && activeInvestigation && <InvestigationModal investigation={activeInvestigation} npcs={npcs} onAccuse={handleAccuseCulprit} onClose={() => setIsInvestigationModalOpen(false)} />}
            {incomingMessageState && <IncomingMessageModal state={incomingMessageState} onReply={handleReplyToIncomingMessage} onClose={handleCloseIncomingMessage} />}
            {isOrderingCustomItem && <CustomItemOrderModal onOrder={handleCreateCustomItem} onClose={() => setIsOrderingCustomItem(false)} isLoading={isLoading} />}
            {pendingCustomItem && <ConfirmCustomItemModal item={pendingCustomItem} onConfirm={handleConfirmCustomItemPurchase} onCancel={() => setPendingCustomItem(null)} />}
            {secretCommandInputState.isOpen && <SecretCommandInputModal onExecute={handleExecuteSecretCommand} onClose={() => setSecretCommandInputState({ isOpen: false, preset: '' })} isLoading={isLoading} presetCommand={secretCommandInputState.preset} />}
            {isHeirManagementModalOpen && <HeirManagementModal player={player} npcs={npcs} onArrangeEducation={handleArrangeEducation} onPraiseHeir={handlePraiseHeir} onClose={() => setIsHeirManagementModalOpen(false)} />}
            {isManagingConsorts && <MaleConsortManagementModal npcs={npcs} onManage={handleManageConsortAction} onExecute={handleOpenExecutionModal} onClose={() => setIsManagingConsorts(false)} />}
            {executionTarget && <ExecutionMethodModal target={executionTarget} onSelect={handleSelectExecutionMethod} onClose={() => setExecutionTarget(null)} />}
            {isSelectingNightlyConsort && <SelectNightlyConsortModal consorts={npcs.filter(n => JUN_RANKS.some(rank => n.title.startsWith(rank.split(' ')[0])))} onSelect={handleSelectNightlyConsort} onClose={() => setIsSelectingNightlyConsort(false)} />}

            {activeModal === 'profile' && <CharacterProfile profile={player} loveInterest={loveInterest} rankList={rankList} rankRequirements={rankRequirements} onClose={() => setActiveModal(null)} onLogout={handleLogout} onDeleteAccount={handleDeleteAccount} onOpenGuide={() => setActiveModal('guide')} installPromptEvent={installPromptEvent} onInstall={handleInstall} onOpenInventory={() => setActiveModal('inventory')} />}
            {activeModal === 'inventory' && <Inventory inventory={player.inventory} quests={quests} onUseItem={handleUseItem} onSellItem={handleSellItem} onClose={() => setActiveModal(null)} />}
            {activeModal === 'guide' && <GuideModal onClose={() => setActiveModal(null)} />}
            
            <StatusBar player={player} onlinePlayerCount={onlinePlayerCount} rankList={rankList} rankRequirements={rankRequirements} onOpenSecretCommand={(p) => setSecretCommandInputState({ isOpen: true, preset: p || '' })} />
            
            <main className="flex-grow overflow-y-auto">
                 {activeConversation ? (
                    <ConversationView 
                        player={player} 
                        conversationLocation={mapLocations.find(loc => loc.id === activeConversation.locationId) || mapLocations[0]}
                        participants={activeConversation.participants} 
                        history={conversationHistories[activeConversation.id] || []}
                        onSendMessage={handleSendMessage} 
                        onEndConversation={handleEndConversation}
                        isLoading={isLoading}
                        onDismissParticipant={()=>{}}
                        onInviteMore={()=>{}}
                        specialAction={specialQuestAction}
                        onSpecialAction={() => {}}
                        onOpenCustomOrderModal={() => setIsOrderingCustomItem(true)}
                        onExecuteSecretCommand={handleExecuteSecretCommand}
                        onPlayerHealRequest={() => {}}
                    />
                ) : (
                    <>
                        {mainView === 'overview' && player.prologueCompleted && <PalaceOverview player={player} quests={quests} npcs={npcs} globalEventLog={globalEventLog} onPracticeArts={()=>{}} onRest={()=>{}} onSummonMaid={handleSummonMaid} onOpenFeastModal={() => setIsHostingFeast(true)} activityCooldowns={activityCooldowns} onOpenMaidManagement={() => setIsManagingMaids(true)} onTakeMeal={handleTakeMeal} onEducateHeir={handleEducateHeir} onDonate={() => {}} ruler={ruler} onRoyalAudience={handleRoyalAudience} />}
                        {mainView === 'map' && <MapView player={player} locations={mapLocations} npcs={npcs} quests={quests} questEntities={questEntities} onGoToLocation={handleGoToLocation} onSearchLocation={handleExplore} onTalkToNpc={handleTalkToNpc} onInviteToLocation={(loc) => setInviteToLocation(loc)} onOpenMaidRecruitment={() => setIsRecruitingMaids(true)} onOpenSecretCommand={(p) => setSecretCommandInputState({ isOpen: true, preset: p || '' })} onDeleteLocation={(id) => handleExecuteSecretCommand(`ลบสถานที่ ${id}`)} onAddLocation={handleAddLocation} />}
                        {mainView === 'characters' && <CharactersView player={player} npcs={npcs} locations={mapLocations} onTravelAndTalk={handleTravelAndTalk} onOpenPunishModal={setPunishingNpc} onOpenSlanderModal={setSlanderingNpc} onOpenDarkActionModal={setDarkActionTarget} onSecretMeeting={()=>{}} onProposeAffair={()=>{}} onOpenGiftModal={setGiftingTarget} onOpenSendMessageModal={setSendMessageTarget} rankList={rankList} onOpenGroupChatSetup={() => setIsSettingUpGroupChat(true)} />}
                        {mainView === 'shop' && <ShopView playerMoney={player.money} onPurchase={handlePurchaseItem} />}
                        {mainView === 'management' && <ManagementView player={player} npcs={npcs} onJoinFaction={handleJoinFaction} onFactionAction={handleFactionAction} onOpenMaidManagement={() => setIsManagingMaids(true)} onOpenHeirManagement={() => setIsHeirManagementModalOpen(true)} onStartInvestigation={handleStartInvestigation} activeInvestigation={activeInvestigation} />}
                        {mainView === 'court' && player.career === CareerPath.Empress && <CourtView player={player} npcs={npcs} onHoldCourt={handleHoldCourt} onOpenConsortManagement={() => setIsManagingConsorts(true)} onOpenNightlyConsortSelection={() => setIsSelectingNightlyConsort(true)} />}
                    </>
                 )}
            </main>
            
            {!activeConversation && (
                <MenuBar player={player} onNavigate={handleNavigate} activeView={activeModal || mainView} />
            )}
            
            <FloatingActionButton onOpenInvestigation={() => setIsInvestigationModalOpen(true)} isInvestigationActive={!!activeInvestigation} />
        </div>
    );
};
