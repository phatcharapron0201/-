
export enum CareerPath {
    ImperialConsort = "พระสนมในวังหลวง",
    QinConsort = "พระชายาในจวนฉินอ๋อง",
    Empress = "จักรพรรดินี",
}

export enum ImperialRank {
    Gongren = "กงเหริน (宫人)",
    Cainu = "ไฉ่หนี่ว์ (采女)",
    Yunu = "อวี้หนี่ว์ (御女)",
    Baolin = "เป่าหลิน (宝林)",
    Cairen = "ไฉเหริน (才人)",
    Meiren = "เหม่ยเหริน (美人)",
    Jieyu = "เจี๋ยอวี๋ (婕妤)",
    Chongyuan = "ชงหยวน (充媛)",
    Chongrong = "ชงหรง (充容)",
    Chongyi = "ชงอี๋ (充仪)",
    Xiuyuan = "ซิวหยวน (修媛)",
    Xiurong = "ซิวหรง (修容)",
    Xiuyi = "ซิวอี๋ (修仪)",
    Zhaoyuan = "เจาหยวน (昭媛)",
    Zhaorong = "เจาหรง (昭容)",
    Zhaoyi = "เจาอี๋ (昭儀)",
    Xianfei = "เสียนเฟย (贤妃)",
    Defei = "เต๋อเฟย (德妃)",
    Shufei = "ซูเฟย (淑妃)",
    Guifei = "กุ้ยเฟย (貴妃)",
    HuangGuifei = "หวงกุ้ยเฟย (皇貴妃)",
    Huanghou = "ฮองเฮา (皇后)",
    Taihou = "ไทเฮา (太后)", // Empress Dowager
}

export enum QinRank {
    Yingshi = "อิ้งซื่อ (媵侍)",
    Ruren = "หรูเหริน (孺人)",
    Baoyi = "เป่าอี๋ (寶衣)",
    Fengyi = "เฟิ่งอี๋ (奉儀)",
    Shunü = "ซูหนี่ว์ (淑女)",
    Zhaoxun = "เจาซวิ่น (昭訓)",
    Wanyi = "หว่านอี๋ (婉儀)",
    Chenghui = "เฉิงฮุย (承徽)",
    Jinghua = "จิงหัว (靜華)",
    Zhaohua = "เจาหัว (昭華)",
    Liangyuan = "เหลียงเยวี่ยน (良媛)",
    Shuyuan = "ซูหยวน (淑媛)",
    Liangdi = "เหลียงตี้ (良娣)",
    Cefei = "เช่อเฟย (側妃)",
    Wangfei = "หวังเฟย (王妃)",
    Taifei = "ไท่เฟย (太妃)", // Dowager Consort
}

export enum JunRank {
    Shilang = "สื่อหลาง (侍郎)",
    Junshi = "จวิ้นซื่อ (俊士)",
    Fengjun = "เฟิ่งจวิน (奉君)",
    Chengyu = "เฉิงอวี้ (承譽)",
    Zhaohui = "เจาฮุย (昭徽)",
    Yingjun = "อิงจวิน (英君)",
    Xianjun = "เสียนจวิน (賢君)",
    Dejun = "เต๋อจวิน (德君)",
    Guijun = "กุ้ยจวิน (貴君)",
    HuangGuijun = "หวงกุ้ยจวิน (皇貴君)",
    Junhou = "จวินโฮ่ว (君后)",
    Taishangjun = "ไท่ซ่างจวิน (太上君)",
}


export type Rank = ImperialRank | QinRank | JunRank | "คุณหนู" | "จักรพรรดินี" | string;

export enum Emotion {
  Neutral = "เป็นกลาง",
  Joy = "ยินดี",
  Love = "รัก",
  Admiration = "ชื่นชม",
  Jealousy = "ริษยา",
  Anger = "โกรธ",
  Hatred = "เกลียดชัง",
  Revenge = "เครียดแค้น",
}

export type FamilyId = 'li_clan' | 'zhao_clan' | 'wang_clan' | 'su_clan' | 'chen_clan';

export interface NPC {
  id: string;
  name: string;
  title: string;
  imageUrl?: string;
  emotion: Emotion;
  favorability: number;
  dialogue: string;
  locationId: string;
  careerAffiliation?: CareerPath[];
  age: number;
  motherId?: string;
  fatherId?: string | null;
  memory?: string; // For persistent memory
  preferences?: string[]; // For personalized gifts
  // NPC Systems
  isPregnant?: boolean;
  conceptionDate?: number | null;
  isImprisoned?: boolean;
  // Qin Consort Visit System
  recentImpression?: number; // For Prince's selection
  // Family System
  familyRole?: 'father' | 'mother' | 'brother' | 'sister';
  familyId?: FamilyId;
  isRival?: boolean;
  lastGaveBirthDay?: number;
  // Life Cycle System
  health: 'healthy' | 'sick' | 'gravely_ill';
  isAlive: boolean;
  gender?: 'male' | 'female';
  childCount?: number;
  heirPoints: number;
  // Stats for heirs/children
  charm?: number;
  intelligence?: number;
  power?: number;
  prestige?: number;
  // Heir Education System
  educationFocus?: EducationFocus | null;
  lastEducationReportDay?: number;
}

export type ItemType = 'quest' | 'consumable' | 'gift' | 'artifact';
export type StatType = 'charm' | 'intelligence' | 'power' | 'prestige';

export interface InventoryItem {
    id: string; // Unique ID for the item type (e.g., 'love_poem')
    instanceId: string; // Unique ID for this specific instance in the inventory
    name: string;
    description: string;
    emoji: string;
    type: ItemType;
    price?: number;
    effect?: {
        stat: StatType;
        value: number;
    };
    favorabilityEffect?: number;
    questId?: string;
}

export interface SecretLover {
    npcId: string;
    npcName: string;
    secrecyLevel: number; // 0-100, where 100 is most secret
}

// Chinese Time System & Seasons
export type Shichen = '子' | '丑' | '寅' | '卯' | '辰' | '巳' | '午' | '未' | '申' | '酉' | '戌' | '亥';
export enum Season {
    Spring = "วสันตฤดู", // Spring
    Summer = "คิมหันตฤดู", // Summer
    Autumn = "สารทฤดู", // Autumn
    Winter = "เหมันตฤดู", // Winter
}

export interface Family {
  id: FamilyId;
  name: string;
  description: string;
  bonus: {
    stat: StatType | 'money';
    value: number;
  };
}

// Faction System Types
export type FactionId = 'neutral' | 'empress_faction' | 'noble_consort_faction';

export interface Faction {
  id: FactionId;
  name: string;
  description: string;
  leaderId: string;
}


export interface PlayerProfile {
  name: string;
  imageUrl?: string;
  familyId?: FamilyId;
  age: number;
  level: number;
  career: CareerPath;
  rank: Rank;
  rankPoints: number;
  locationId: string;
  inventory: InventoryItem[];
  charm: number;
  intelligence: number;
  power: number;
  prestige: number;
  jealousyLevel: number; // 0-10 scale
  money: number;
  // Player Status Systems
  isPregnant: boolean;
  conceptionDate: number | null;
  fatherId: string | null;
  secretLover: SecretLover | null;
  isImprisoned: boolean;
  isDivorced: boolean;
  health: 'healthy' | 'sick' | 'gravely_ill';
  // New Systems
  skillPoints: number;
  unlockedSkills: SkillId[];
  prologueCompleted: boolean;
  mealsTakenToday: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
  // Time and Season
  currentTime: Shichen;
  gameDay: number;
  currentSeason: Season;
  lastTimeUpdate: number;
  lastIncomeCollectionTimestamp?: number;
  // Quest limit system
  dailyQuestsCompletedToday: number;
  lastActivityDate: string; // YYYY-MM-DD format
  // Maid System
  maids: Maid[];
  activeMaidAssignments: Record<string, { taskId: string; endDate: number }>;
  lastGaveBirthDay?: number;
  lastHeirEducationDay?: number;
  // Management System
  managementStats: {
    finances: number; // Represents financial health of the household
    morale: number; // Represents morale of servants and staff
    order: number; // Represents discipline and order
  };
  // Faction System
  factionId?: FactionId;
  factionInfluence?: Record<FactionId, number>;
  version?: number;
  militaryPower: number;
}

export enum ObjectiveType {
  FIND = "FIND",
  TALK = "TALK",
}

export interface Objective {
  description: string;
  type: ObjectiveType;
  locationId: string;
  targetId?: string; // Item ID for FIND, NPC ID for TALK
  isCompleted: boolean;
}

export type QuestDifficulty = 'ง่าย' | 'ปานกลาง' | 'ยาก';
export type QuestStatus = 'active' | 'completed' | 'failed';
export type QuestCategory = 'main' | 'daily';

export interface Quest {
  id: string;
  title: string;
  description: string;
  objectives: Objective[];
  rewards: string[];
  status: QuestStatus;
  difficulty: QuestDifficulty;
  category: QuestCategory;
  completionSummary: string;
  careerAffiliation?: CareerPath[];
  prerequisites?: string[];
}

export interface MapLocation {
    id: string;
    name: string;
    description: string;
}

export interface QuestEntity {
    id: string;
    name: string;
    emoji: string;
    questId: string;
    locationId: string;
}

export interface ChatMessage {
  sender: 'player' | 'npc' | 'system';
  senderId?: string; // NPC's ID for group chat
  senderName?: string; // NPC's name for group chat
  text: string;
  timestamp: number;
}

export type ConversationHistories = Record<string, ChatMessage[]>;

// For Gemini Service Responses
export type GeminiServiceResponse<T> =
  | { success: true; data: T; }
  | { success: false; error: 'quota' | 'generic'; };

export type DialogueResult = {
  dialogue?: string;
  newEmotion?: Emotion;
  favorabilityChange?: number;
  revealedClue?: string; // New field for investigation system
};

export type NewQuestObjectiveData = Omit<Objective, 'isCompleted'> & { emoji?: string };

export type NewQuestData = {
  title: string;
  description:string;
  difficulty: QuestDifficulty;
  category: QuestCategory;
  objectives: NewQuestObjectiveData[];
  rewards: string[];
  completionSummary: string;
};



// Punishment System
export interface PunishmentChoice {
  text: string;
  consequence: {
    statChange: {
      charm?: number;
      intelligence?: number;
      power?: number;
      prestige?: number;
    };
    favorabilityChange: number;
    message: string;
    initialIntelligenceGain?: number;
  };
}

export type PunishmentSeverity = 'เบา' | 'ปานกลาง' | 'รุนแรง';

export interface PunishmentEvent {
  accuserId: string;
  accusation: string;
  severity: PunishmentSeverity;
  choices: PunishmentChoice[];
}

// Notification System
export type NotificationType = 'info' | 'event';
export interface NotificationData {
  id: number;
  message: string;
  type: NotificationType;
}

// Event Context System
export type EventContextType = 'punishment' | 'jealousy' | 'imperial_favor' | 'gift' | 'slander' | 'qin_visit';
export interface EventContext {
    type: EventContextType;
    contextMessage: string;
    timestamp: number;
}

// Player-initiated Punishment
export interface PlayerPunishmentChoice {
  text: string;
  description: string;
  rankPointsGain: number;
  favorabilityLoss: number;
  consequence: {
    message: string;
    statChange?: {
        intelligence?: number;
    };
  };
}

// Slander System
export interface SlanderResult {
  success: boolean;
  outcomeMessage: string;
  playerStatChanges: {
    intelligence: number;
    prestige: number;
  };
  targetFavorabilityChange: number;
}

// Special Conversation System
export interface SpecialConversationState {
  scenarioType: 'jealousy' | 'punishment';
  npc: NPC;
  currentRound: number; // 1 to 4
  storySummary: string;
  choices: string[];
  npcResponse: string;
}

export interface ScenarioConversationResult {
    npcResponse: string;
    choices: string[];
}


// --- PROLOGUE SYSTEM ---
export interface PrologueState {
  careerPath: CareerPath;
  examinerName: string;
  examinerTitle: string;
  currentRound: number;
  storySummary: string;
  choices: string[];
  npcResponse: string;
}

export interface PrologueStepResult {
    npcResponse: string;
    choices: string[];
    isFinalRound: boolean;
}

// --- DARK ACTIONS ---
export interface InduceMiscarriageResult {
    success: boolean;
    discovered: boolean;
    outcomeMessage: string;
    playerStatChanges: {
        intelligence: number;
        power: number;
    };
}

export interface StruggleForLifeResult {
    success: boolean;
    outcomeMessage: string;
    playerStatChanges: {
        charm: number;
        intelligence: number;
        power: number;
        prestige: number;
    };
}


// --- NEW SYSTEM FOUNDATIONS ---

// 2. Skill System
export type SkillTreeId = 'arts' | 'subterfuge' | 'management';
export type SkillId = 
  // Arts
  | 'poetry_1' | 'music_1' | 'calligraphy_1'
  // Subterfuge
  | 'rumor_mongering_1' | 'poisoning_1' | 'spying_1'
  // Management
  | 'accounting_1' | 'negotiation_1';

export interface Skill {
  id: SkillId;
  name: string;
  description: string;
  cost: number;
  tree: SkillTreeId;
  prerequisites?: SkillId[];
  effectDescription: string;
}

// --- IDLE/MAID SYSTEM ---
export type MaidSkill = 'rumor_gathering' | 'herbalism' | 'embroidery' | 'espionage' | 'financials';
export interface Maid {
  id: string; // instanceId
  name: string;
  tier: 'สามัญ' | 'ชำนาญ' | 'ยอดฝีมือ';
  skill: MaidSkill | null;
  loyalty: number; // 0-100
  wage: number;
  description: string;
  recruitmentCost: number;
}

export interface MaidTask {
  id: string;
  name: string;
  description: string;
  durationHours: number;
  requiredSkill: MaidSkill | null;
  outcomeDescription: string; // Describes what a successful outcome looks like
}

export interface IdleReport {
  daysPassed: number;
  maidTaskOutcomes: string[];
  births: string[];
  otherEvents: string[];
  offlineIncome?: number;
}

// --- QIN VISIT SYSTEM ---
export interface PrinceVisitAnnouncement {
  butlerName: string;
  princeName: string;
}

// --- MESSENGER SYSTEM ---
export interface MessageResult {
  success: boolean;
  interceptedBy?: string; // NPC ID of the rival who intercepted it
  outcomeMessage: string;
  favorabilityChange: number;
}

// --- SECRET COMMAND SYSTEM ---
export type NewNpcData = Omit<NPC, 'id'> & { id?: string };

export interface NpcDialogueOutcome {
  npcId: string;
  dialogue: string;
}

export interface SecretCommandResult {
  newNpcs?: NewNpcData[];
  updatedNpcs?: (Partial<NPC> & { id: string })[];
  deletedNpcIds?: string[];
  playerUpdate?: Partial<PlayerProfile>;
  narrativeOutcome: string;
  notification?: string;
  npcDialogues?: NpcDialogueOutcome[];
  newLocations?: MapLocation[];
  deletedLocationIds?: string[];
  newQuests?: Quest[];
  deletedQuestIds?: string[];
  triggerChildbirth?: {
    forPlayer: boolean;
    npcId?: string;
    fatherId: string;
  };
}

// --- INVESTIGATION SYSTEM ---
export interface InvestigationSuspect {
  npcId: string;
  npcName: string;
}

export interface Investigation {
  id: string;
  caseTitle: string;
  caseDescription:string;
  suspects: InvestigationSuspect[];
  clues: string[];
  trueCulpritId: string;
}

// --- RANDOM EVENT SYSTEM ---
export interface RandomRumorResult {
    rumorText: string;
    sourceNpcId: string;
    targetNpcId: string;
    rulerFavorabilityChange: number;
}

// --- INCOMING MESSAGE SYSTEM ---
export interface IncomingMessageState {
    npcId: string;
    npcName: string;
    initialMessage: string;
    playerReply?: string;
    npcFinalResponse?: string;
    rewards?: string[];
}

export interface IncomingMessageReplyResult {
    npcReply: string;
    rewards: string[]; // e.g., ["คะแนนบารมี +20", "ค่าเสน่ห์ +5", "ความพึงพอใจของหยางจิ้น +300"]
}

// --- CUSTOM ITEM SYSTEM ---
export interface GeneratedItem {
    name: string;
    description: string;
    emoji: string;
    price: number;
    favorabilityEffect: number;
}

export interface ActiveConversation {
    id: string; // The key for conversationHistories
    locationId: string;
    participants: NPC[];
    dialogueContext?: string; // For special conversations
}

// --- GROUP CHAT SYSTEM ---
export interface GroupDialogueResponse {
    npcId: string;
    dialogue: string;
    newEmotion: Emotion;
    favorabilityChange: number;
}

export interface GroupDialogueResult {
    responses: GroupDialogueResponse[];
    revealedClue?: string;
}

export interface ConversationRumorResult {
    shouldGenerateRumor: boolean;
    rumorText?: string;
    prestigeChange?: number;
}

// Heir System
export interface SlanderHeirResult {
  success: boolean;
  outcomeMessage: string;
  heirPointsChange: number;
}

export interface JealousyChoice {
    text: string;
    level: number;
    initialIntelligenceGain: number;
    style: string;
}

// --- ROYAL AUDIENCE SYSTEM ---
export type RoyalAudienceAgenda = 'praise' | 'discuss_affairs' | 'report_rival' | 'request_gift' | 'praise_heir';

export interface RoyalAudienceChoice {
    agenda: RoyalAudienceAgenda;
    title: string;
    description: string;
    npcToReportId?: string; // Only for 'report_rival'
    heirToPraiseId?: string; // Only for 'praise_heir'
}

export interface RoyalAudienceResult {
    success: boolean;
    outcomeMessage: string;
    rewards: string[]; // Uses the same reward string format
    heirPointsGain?: number;
}

// --- HEIR EDUCATION SYSTEM ---
export type EducationFocus = 'arts' | 'politics' | 'warfare' | 'etiquette' | 'commerce' | 'medicine';

export interface HeirEducationResult {
    reportText: string; // Narrative summary of the child's progress.
    statGains: {
        charm: number;
        intelligence: number;
        power: number;
        prestige: number;
    };
    heirPointsGain: number;
    specialEvent?: string; // A special event that occurred, e.g., "Impressed a visiting scholar."
}

// --- SUCCESSION SYSTEM ---
export interface SuccessionResult {
    newRulerId: string;
    announcement: string;
    playerNewRank?: Rank;
    playerNewLocationId?: string;
    isGameOver: boolean;
    gameOverMessage?: string;
}
