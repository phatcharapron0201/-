import { NPC, ImperialRank, QinRank, Emotion, MapLocation, Shichen, InventoryItem, QuestDifficulty, CareerPath, Rank, SkillTreeId, Skill, SkillId, Season, Quest, ObjectiveType, QuestStatus, QuestCategory, Maid, MaidTask, MaidSkill, Family, Faction, FactionId, JunRank } from './types';

export const IMPERIAL_RANKS: Rank[] = Object.values(ImperialRank);
export const QIN_RANKS: Rank[] = Object.values(QinRank);
export const JUN_RANKS: Rank[] = Object.values(JunRank);
export const SEASONS: Season[] = [Season.Spring, Season.Summer, Season.Autumn, Season.Winter];
export const MINISTER_TITLES: string[] = [
    'อัครมหาเสนาบดี',
    'ราชเลขาธิการ',
    'ผู้ตรวจการแผ่นดิน',
    'เสนาบดีกรมขุนนาง',
    'เสนาบดีกรมคลัง',
    'เสนาบดีกรมพิธีการ',
    'เสนาบดีกรมกลาโหม',
    'เสนาบดีกรมยุติธรรม',
    'เสนาบดีกรมโยธาธิการ',
    'มหาจอมทัพ',
    'ผู้บัญชาการองครักษ์หลวง',
    'ราชครู'
];

export const ROYAL_TITLES = {
    male: {
        title: 'ฝ่ายชาย',
        categories: {
            direct: {
                title: 'ครอบครัวสายตรง',
                ranks: [
                    { name: 'ไท่ซ่างหวง (太上皇)', description: 'พระเจ้าหลวง หรือ อดีตฮ่องเต้ที่สละราชสมบัติแล้ว เป็นพระบิดาของฮ่องเต้องค์ปัจจุบัน' },
                    { name: 'ไท่จื่อ (太子)', description: 'องค์รัชทายาท ผู้ที่จะได้สืบทอดราชบัลลังก์ต่อจากฮ่องเต้' },
                    { name: 'หวงจื่อ (皇子)', description: 'องค์ชาย พระโอรสของฮ่องเต้ สามารถแต่งตั้งเป็นอ๋องได้' },
                    { name: 'ชินอ๋อง (亲王)', description: 'องค์ชายบรรดาศักดิ์ขั้นสูงสุด โดยทั่วไปคือพระโอรสของฮ่องเต้' },
                    { name: 'จวิ้นอ๋อง (郡王)', description: 'องค์ชายบรรดาศักดิ์รองลงมา โดยทั่วไปคือพระโอรสขององค์รัชทายาท' },
                ]
            },
            spouses: {
                 title: 'คู่สมรส',
                 ranks: [
                    { name: 'หวงฟู่ (皇夫)', description: 'พระราชสวามีของจักรพรรดินีผู้ครองราชย์ มีศักดิ์เทียบเท่าฮองเฮา' },
                    { name: 'ฟู่หม่า (驸马)', description: 'ราชบุตรเขย หรือ สวามีขององค์หญิง' },
                 ]
            }
        }
    },
    female: {
        title: 'ฝ่ายหญิง',
        categories: {
            direct: {
                title: 'ครอบครัวสายตรงและพระญาติ',
                ranks: [
                    { name: 'ไท่หวงไท่โฮ่ว (太皇太后)', description: 'สมเด็จพระอัยยิกาเจ้า หรือ ย่าของฮ่องเต้องค์ปัจจุบัน' },
                    { name: 'ไท่โฮ่ว (太后)', description: 'พระพันปีหลวง หรือ แม่ของฮ่องเต้องค์ปัจจุบัน' },
                    { name: 'ต้าจ่างกงจู่ (大長公主)', description: 'องค์หญิงอาวุโส พระปิตุจฉา (ป้า) ของฮ่องเต้องค์ปัจจุบัน' },
                    { name: 'จ่างกงจู่ (長公主)', description: 'องค์หญิง พระเชษฐภคินี (พี่สาว) หรือพระขนิษฐา (น้องสาว) ของฮ่องเต้องค์ปัจจุบัน' },
                    { name: 'ไท่จื่อเฟย (太子妃)', description: 'พระชายาเอกในองค์รัชทายาท' },
                    { name: 'กงจู่ (公主)', description: 'องค์หญิง พระธิดาของฮ่องเต้' },
                    { name: 'จวิ้นจู่ (郡主)', description: 'องค์หญิงบรรดาศักดิ์รอง พระธิดาขององค์รัชทายาท' },
                ]
            }
        }
    }
};

export const NOBLEMAN_TITLES = {
    civil: {
        title: 'ฝ่ายบริหารพลเรือน (ขุนนางบุ๋น)',
        ranks: [
            { name: 'อัครมหาเสนาบดี (丞相 - Chéngxiàng)', description: 'หัวหน้าขุนนางทั้งหมด, ที่ปรึกษาใกล้ชิดที่สุดของฮ่องเต้/จักรพรรดินี มีอำนาจในการบริหารราชการแผ่นดินทั้งหมด (ระดับอำนาจ: สูงสุด)' },
            { name: 'ราชเลขาธิการ (中書令 - Zhōngshū Lìng)', description: 'รับผิดชอบการร่างราชโองการและเอกสารสำคัญของราชสำนัก เป็นตำแหน่งที่กุมความลับและมีอิทธิพลอย่างสูง (ระดับอำนาจ: สูงมาก)' },
            { name: 'ผู้ตรวจการแผ่นดิน (御史大夫 - Yùshǐ Dàfū)', description: 'หัวหน้าหน่วยงานตรวจสอบการทำงานของขุนนางทั่วทั้งแผ่นดิน มีอำนาจในการถอดถอนและลงโทษขุนนางที่ทุจริต (ระดับอำนาจ: สูงมาก)' },
            { name: 'เสนาบดีกรมขุนนาง (吏部尚書 - Lì Bù Shàngshū)', description: 'ดูแลการแต่งตั้ง, เลื่อนขั้น, และปลดขุนนางทั้งหมด (ระดับอำนาจ: สูง)' },
            { name: 'เสนาบดีกรมคลัง (戶部尚書 - Hù Bù Shàngshū)', description: 'จัดการด้านการเงิน, ภาษี, และงบประมาณแผ่นดิน (ระดับอำนาจ: สูง)' },
            { name: 'เสนาบดีกรมพิธีการ (禮部尚書 - Lǐ Bù Shàngshū)', description: 'จัดการพระราชพิธี, การสอบขุนนาง, และการทูต (ระดับอำนาจ: สูง)' },
            { name: 'เสนาบดีกรมกลาโหม (兵部尚書 - Bīng Bù Shàngshū)', description: 'บริหารจัดการกองทัพ, กำลังพล, และยุทธปัจจัย (เป็นฝ่ายบุ๋นที่คุมฝ่ายบู๊) (ระดับอำนาจ: สูง)' },
            { name: 'เสนาบดีกรมยุติธรรม (刑部尚書 - Xíng Bù Shàngshū)', description: 'ดูแลกฎหมาย, ศาล, และการลงโทษนักโทษ (ระดับอำนาจ: สูง)' },
            { name: 'เสนาบดีกรมโยธาธิการ (工部尚書 - Gōng Bù Shàngshū)', description: 'รับผิดชอบโครงการก่อสร้างของหลวง เช่น กำแพงเมือง, พระราชวัง, คลอง (ระดับอำนาจ: สูง)' },
            { name: 'รองเสนาบดี (侍郎 - Shìláng)', description: 'ผู้ช่วยเสนาบดีประจำกรมต่างๆ (ระดับอำนาจ: กลาง)' },
            { name: 'บัณฑิตสำนักฮั่นหลิน (翰林学士 - Hànlín Xuéshì)', description: 'กลุ่มปราชญ์และนักวิชาการระดับสูงของราชสำนัก ทำหน้าที่ให้คำปรึกษาและบันทึกประวัติศาสตร์ (ระดับอำนาจ: กลาง, แต่มีเกียรติสูง)' },
            { name: 'เจ้าเมือง/ผู้ว่าการ (知府 - Zhīfǔ)', description: 'ผู้ปกครองเมืองหลวงหรือเมืองสำคัญต่างๆ (ระดับอำนาจ: กลาง)' },
        ]
    },
    military: {
        title: 'ฝ่ายทหาร (ขุนนางบู๊)',
        ranks: [
            { name: 'มหาจอมทัพ (大将军 - Dà Jiāngjūn)', description: 'ผู้บัญชาการทหารสูงสุดของแผ่นดิน ปกติจะแต่งตั้งในยามศึกสงครามครั้งใหญ่ (ระดับอำนาจ: สูงสุด)' },
            { name: 'ผู้บัญชาการองครักษ์หลวง (禁军统领 - Jìnjūn Tǒnglǐng)', description: 'ผู้บัญชาการกองกำลังทหารที่อารักขาพระราชวังและองค์จักรพรรดิ/จักรพรรดินี (ระดับอำนาจ: สูงมาก)' },
            { name: 'แม่ทัพพิทักษ์ทิศ (镇东将军 - Zhèndōng Jiāngjūn)', description: 'แม่ทัพใหญ่ที่ประจำการอยู่ตามชายแดนทิศต่างๆ (เช่น ทิศบูรพา, ประจิม) (ระดับอำนาจ: สูง)' },
            { name: 'รองแม่ทัพ (副将 - Fùjiàng)', description: 'ผู้ช่วยของแม่ทัพใหญ่ (ระดับอำนาจ: กลาง)' },
            { name: 'ผู้กอง/นายพัน (校尉 - Xiàowèi)', description: 'ผู้บังคับบัญชากองกำลังทหารหน่วยย่อย (ระดับอำนาจ: กลาง)' },
        ]
    },
    court: {
        title: 'ฝ่ายในและข้าราชสำนัก',
        ranks: [
            { name: 'หัวหน้าขันที / เสนาบดีกรมวัง (内务府总管 - Nèiwùfǔ Zǒngguǎn)', description: 'ผู้ดูแลกิจการทั้งหมดในวังหลัง เป็นผู้มีอำนาจและอิทธิพลอย่างสูงในหมู่ขันทีและนางกำนัล (ระดับอำนาจ: สูง)' },
            { name: 'หมอหลวงประจำพระองค์ (御医 - Yùyī)', description: 'แพทย์หลวงที่ถวายการรักษาราชวงศ์โดยตรง (ระดับอำนาจ: กลาง, แต่สำคัญมาก)' },
            { name: 'หัวหน้าห้องเครื่อง (御膳房总管 - Yùshànfáng Zǒngguǎn)', description: 'ผู้ควบคุมดูแลการทำเครื่องเสวยทั้งหมด (ระดับอำนาจ: กลาง)' },
        ]
    },
    special: {
        title: 'ยศศักดิ์และตำแหน่งพิเศษ',
        ranks: [
            { name: 'ราชครู (太傅 - Tàifù)', description: 'พระอาจารย์ผู้ถวายการสอนองค์รัชทายาท เป็นที่เคารพนับถืออย่างสูง (ระดับอำนาจ: มีเกียรติสูงสุด)' },
            { name: 'กง (公 - Gōng)', description: 'ยศระดับ "ดยุค" สำหรับเชื้อพระวงศ์หรือขุนนางความดีความชอบสูงสุด (ระดับอำนาจ: มีเกียรติสูงมาก)' },
            { name: 'โหว (侯 - Hóu)', description: 'ยศระดับ "มาร์ควิส" สำหรับขุนนางความดีความชอบระดับสูง (ระดับอำนาจ: มีเกียรติสูง)' },
        ]
    }
};

export const FEMALE_HEIR_IMAGES: string[] = [
    'https://i.pinimg.com/1200x/0e/b8/37/0eb837384c6950adf9483063b0458f9e.jpg',
    'https://i.pinimg.com/1200x/51/ef/23/51ef23fc40eb17f65f1c6f9e2dc9cd6a.jpg',
    'https://i.pinimg.com/736x/fe/a4/b9/fea4b98c5ed26e6402a724ac9b75bb0f.jpg',
    'https://i.pinimg.com/736x/a0/1a/81/a01a81ff857ed61a9520ad2719e929a3.jpg',
    'https://i.pinimg.com/736x/26/e5/8e/26e58e0b682817c4c7feefe4326e344b.jpg',
    'https://i.pinimg.com/736x/04/1b/e6/041be64b648edd708911096ae6ec30a2.jpg',
    'https://i.pinimg.com/736x/84/0b/2d/840b2d27f78d1a24e2b19e9869dd065b.jpg',
    'https://i.pinimg.com/736x/41/41/94/414194a4f0b8140a7e40027c76a807dc.jpg',
    'https://i.pinimg.com/1200x/0a/49/0e/0a490eca4081b1467763bdfff42cb5f7.jpg'
];

export const MALE_HEIR_IMAGES: string[] = [
    'https://i.pinimg.com/736x/5e/4d/79/5e4d79fdd4e622c66549c4a52dadd733.jpg',
    'https://i.pinimg.com/736x/2b/b9/cc/2bb9ccdc52526fa8388fab08f9bc10e4.jpg',
    'https://i.pinimg.com/736x/c0/0f/db/c00fdb5c1d3a76aa02804ff7703e3847.jpg',
    'https://i.pinimg.com/736x/9e/89/97/9e8997dbd54b306af0bc87b02b3f437f.jpg',
    'https://i.pinimg.com/736x/df/e7/d7/dfe7d782da3121f3c390be5b3d33b522.jpg',
    'https://i.pinimg.com/736x/93/74/02/9374023e17f3ee190e900648c5dd20de.jpg',
    'https://i.pinimg.com/736x/c2/4b/e1/c24be11b3b088753e7e1f86d182b5a99.jpg',
    'https://i.pinimg.com/736x/a2/a2/37/a2a23783f27fbf8c8adf5cecd61b6886.jpg',
    'https://i.pinimg.com/736x/2c/95/4e/2c954e0bb3dfd1707c859d80a45d663d.jpg'
];

// --- FACTION SYSTEM CONSTANTS ---
export const FACTIONS: Faction[] = [
    { id: 'neutral', name: 'ฝ่ายเป็นกลาง', description: 'ยังไม่ได้เข้าร่วมฝ่ายใด', leaderId: '' },
    { id: 'empress_faction', name: 'ฝ่ายฮองเฮา', description: 'ฝ่ายอำนาจที่ยิ่งใหญ่ที่สุดในวังหลัง นำโดยฮองเฮาผู้สง่างามแต่แฝงไปด้วยความอำมหิต', leaderId: 'shangguan_huanghou' },
    { id: 'noble_consort_faction', name: 'ฝ่ายพระสนมเอก', description: 'ฝ่ายอำนาจที่กำลังรุ่งเรือง นำโดยเหอเจาจวิน กุ้ยเฟยผู้เป็นที่โปรดปราน', leaderId: 'guifei' },
];

// --- FAMILY SYSTEM CONSTANTS ---
export const NOBLE_FAMILIES: Family[] = [
    {
        id: 'li_clan',
        name: 'ตระกูลหลี่',
        description: 'ตระกูลบัณฑิตและขุนนางใหญ่ที่มีชื่อเสียงด้านสติปัญญาและความรอบรู้มาหลายชั่วอายุคน',
        bonus: { stat: 'intelligence', value: 15 }
    },
    {
        id: 'zhao_clan',
        name: 'ตระกูลจ้าว',
        description: 'ตระกูลแม่ทัพผู้เกรียงไกร ปกป้องชายแดนของแผ่นดินมาอย่างยาวนาน มีชื่อเสียงด้านพละกำลังและอำนาจทางการทหาร',
        bonus: { stat: 'power', value: 10 }
    },
    {
        id: 'wang_clan',
        name: 'ตระกูลหวัง',
        description: 'ตระกูลพ่อค้าที่มั่งคั่งที่สุดในแผ่นดิน มีเส้นสายและอิทธิพลทางการค้ากว้างขวาง เริ่มต้นด้วยทุนทรัพย์ที่เหนือกว่าผู้อื่น',
        bonus: { stat: 'money', value: 500 }
    },
    {
        id: 'su_clan',
        name: 'ตระกูลซู',
        description: 'ตระกูลศิลปินและกวี มีชื่อเสียงด้านความสามารถทางศิลปะ ดนตรี และการเข้าสังคม เป็นที่ชื่นชมในความงามและเสน่ห์',
        bonus: { stat: 'charm', value: 20 }
    },
    {
        id: 'chen_clan',
        name: 'ตระกูลเฉิน',
        description: 'หนึ่งในตระกูลขุนนางเก่าแก่ที่สุดของแผ่นดิน แม้อำนาจจะลดลง แต่บารมีและเกียรติยศยังคงเป็นที่ยอมรับนับถือ',
        bonus: { stat: 'prestige', value: 15 }
    }
];

// --- NPC HEALTH SYSTEM ---
export const NPC_TREATMENT_COSTS: Record<'sick' | 'gravely_ill', number> = {
    sick: 2000,
    gravely_ill: 10000,
};

export const PLAYER_TREATMENT_COSTS: Record<'sick' | 'gravely_ill', number> = {
    sick: 5000,
    gravely_ill: 20000,
};


// --- FEAST SYSTEM CONSTANTS ---
export const FEAST_BASE_COST = 5000;
export const FEAST_COST_PER_GUEST = 1000;
export const FEAST_PRESTIGE_REWARD = 100;
export const FEAST_FAVORABILITY_REWARD = 200;

// --- HEIR SYSTEM CONSTANTS ---
export const HEIR_PRAISE_COST = {
    money: 10000,
    prestige: 50
};

// --- MESSENGER SYSTEM CONSTANTS ---
export const MESSENGER_COST = 500;
export const INTERCEPTION_BASE_CHANCE = 0.1; // 10% base chance

export const IMPERIAL_RANK_REQUIREMENTS: Record<ImperialRank, number> = {
    [ImperialRank.Gongren]: 130,
    [ImperialRank.Cainu]: 325,
    [ImperialRank.Yunu]: 650,
    [ImperialRank.Baolin]: 1040,
    [ImperialRank.Cairen]: 1560,
    [ImperialRank.Meiren]: 2340,
    [ImperialRank.Jieyu]: 3250,
    [ImperialRank.Chongyuan]: 4550,
    [ImperialRank.Chongrong]: 5850,
    [ImperialRank.Chongyi]: 7150,
    [ImperialRank.Xiuyuan]: 9100,
    [ImperialRank.Xiurong]: 11050,
    [ImperialRank.Xiuyi]: 13000,
    [ImperialRank.Zhaoyuan]: 16250,
    [ImperialRank.Zhaorong]: 19500,
    [ImperialRank.Zhaoyi]: 26000,
    [ImperialRank.Xianfei]: 39000,
    [ImperialRank.Defei]: 52000,
    [ImperialRank.Shufei]: 65000,
    [ImperialRank.Guifei]: 100000,
    [ImperialRank.HuangGuifei]: 200000,
    [ImperialRank.Huanghou]: 500000,
    [ImperialRank.Taihou]: Infinity,
};

export const QIN_RANK_REQUIREMENTS: Record<QinRank, number> = {
    [QinRank.Yingshi]: 150,
    [QinRank.Ruren]: 400,
    [QinRank.Baoyi]: 800,
    [QinRank.Fengyi]: 1500,
    [QinRank.Shunü]: 2500,
    [QinRank.Zhaoxun]: 4000,
    [QinRank.Wanyi]: 6000,
    [QinRank.Chenghui]: 8500,
    [QinRank.Jinghua]: 12000,
    [QinRank.Zhaohua]: 16000,
    [QinRank.Liangyuan]: 22000,
    [QinRank.Shuyuan]: 30000,
    [QinRank.Liangdi]: 50000,
    [QinRank.Cefei]: 80000,
    [QinRank.Wangfei]: 200000,
    [QinRank.Taifei]: Infinity,
};

export const IMPERIAL_RANK_ACCUMULATED_POINTS: Record<ImperialRank, number> = {
    [ImperialRank.Gongren]: 0,
    [ImperialRank.Cainu]: 130,
    [ImperialRank.Yunu]: 455,
    [ImperialRank.Baolin]: 1105,
    [ImperialRank.Cairen]: 2145,
    [ImperialRank.Meiren]: 3705,
    [ImperialRank.Jieyu]: 6045,
    [ImperialRank.Chongyuan]: 9295,
    [ImperialRank.Chongrong]: 13845,
    [ImperialRank.Chongyi]: 19695,
    [ImperialRank.Xiuyuan]: 26845,
    [ImperialRank.Xiurong]: 35945,
    [ImperialRank.Xiuyi]: 46995,
    [ImperialRank.Zhaoyuan]: 59995,
    [ImperialRank.Zhaorong]: 76245,
    [ImperialRank.Zhaoyi]: 95745,
    [ImperialRank.Xianfei]: 121745,
    [ImperialRank.Defei]: 160745,
    [ImperialRank.Shufei]: 212745,
    [ImperialRank.Guifei]: 277745,
    [ImperialRank.HuangGuifei]: 377745,
    [ImperialRank.Huanghou]: 577745,
    [ImperialRank.Taihou]: 1077745,
};

export const QIN_RANK_ACCUMULATED_POINTS: Record<QinRank, number> = {
    [QinRank.Yingshi]: 0,
    [QinRank.Ruren]: 150,
    [QinRank.Baoyi]: 550,
    [QinRank.Fengyi]: 1350,
    [QinRank.Shunü]: 2850,
    [QinRank.Zhaoxun]: 5350,
    [QinRank.Wanyi]: 9350,
    [QinRank.Chenghui]: 15350,
    [QinRank.Jinghua]: 23850,
    [QinRank.Zhaohua]: 35850,
    [QinRank.Liangyuan]: 51850,
    [QinRank.Shuyuan]: 73850,
    [QinRank.Liangdi]: 103850,
    [QinRank.Cefei]: 153850,
    [QinRank.Wangfei]: 233850,
    [QinRank.Taifei]: 433850,
};

export const FAVORABILITY_RANK_MAP: Record<string, number> = {
  xuanzong: 1.5,
  xuantaihou: 1.0,
  shangguan_huanghou: 1.2,
  qin_wang: 1.5, // Prince Qin favorability multiplier
};

// NPCs the Emperor might visit, triggering jealousy events
export const POTENTIAL_IMPERIAL_VISITS: string[] = ['shangguan_huanghou', 'guifei', 'li_jieyu', 'su_jieyu', 'gao_xiyue'];
export const POTENTIAL_QIN_VISITS: string[] = ['wang_chenghui', 'jia_ruren', 'ying_yingshi'];
export const POTENTIAL_LOVER_IDS: string[] = ['xuanzong', 'qin_wang', 'fucha_fuheng', 'guard_feilong', 'poet_li', 'physician_zhang', 'captain_chen'];


export const QUEST_ITEM_SELL_VALUES: Record<QuestDifficulty, number> = {
    'ง่าย': 150,
    'ปานกลาง': 400,
    'ยาก': 1000,
};

export const MAP_LOCATIONS: MapLocation[] = [
    // Imperial Palace Locations
    { id: 'player_chamber', name: 'ตำหนักส่วนตัว (วังหลวง)', description: 'ที่พำนักส่วนตัวของคุณในเขตวังหลวง ตกแต่งอย่างเรียบง่ายแต่สง่างาม' },
    { id: 'gate', name: 'ประตูวังหลวง', description: 'ประตูทางเข้าหลักสู่พระราชวังอันกว้างใหญ่และโอ่อ่า' },
    { id: 'garden', name: 'สวนหลวง', description: 'สวนที่เต็มไปด้วยดอกไม้นานาพรรณและศาลาริมน้ำสำหรับพักผ่อนหย่อนใจ' },
    { id: 'study', name: 'ห้องทรงพระอักษร (วังหลวง)', description: 'สถานที่ที่ฮ่องเต้ใช้เวลาทำงานและอ่านตำรา มีบรรยากาศเงียบสงบและน่าเกรงขาม' },
    { id: 'kunning_palace', name: 'ตำหนักคุนหนิง', description: 'ตำหนักของฮองเฮา โอ่อ่าสง่างามและแฝงไปด้วยอำนาจที่แท้จริงของฝ่ายใน' },
    { id: 'yanxi_palace', name: 'ตำหนักเหยียนสี่', description: 'ตำหนักที่เคยรุ่งเรือง ปัจจุบันเงียบสงบแต่ยังคงความงดงาม เหมาะสำหรับสนมที่รักความสันติ' },
    { id: 'guifei_chamber', name: 'ตำหนักเหอเจาจวิน', description: 'ตำหนักส่วนตัวของพระสนมเอก ตกแต่งอย่างหรูหราและงดงาม' },
    { id: 'yikun_palace', name: 'ตำหนักอี้คุน', description: 'ตำหนักของเต๋อเฟย เกาซีเยว่ สง่างามแต่แฝงไปด้วยความเศร้าสร้อย' },
    { id: 'taifeng_palace', name: 'ตำหนักไท่เฟิ่ง', description: 'ตำหนักส่วนพระองค์ของไทเฮา โอ่อ่าและเงียบสงบ แฝงไปด้วยอำนาจบารมี' },
    { id: 'kitchen', name: 'โรงครัวหลวง', description: 'สถานที่ที่วุ่นวายและเต็มไปด้วยกลิ่นหอมของอาหารเลิศรสที่เตรียมสำหรับราชวงศ์' },
    { id: 'infirmary', name: 'โรงหมอหลวง', description: 'สถานที่สำหรับดูแลรักษาอาการเจ็บป่วยของคนในวัง เต็มไปด้วยกลิ่นสมุนไพร' },
    { id: 'laundry_house', name: 'เรือนซักล้าง', description: 'สถานที่ทำงานของเหล่านางกำนัลและขันทีชั้นผู้น้อย เต็มไปด้วยเสียงพูดคุยและไอน้ำ' },
    { id: 'training_ground', name: 'ลานประลองยุทธ์', description: 'สถานที่ฝึกซ้อมขององครักษ์หลวง เสียงตะโกนและเสียงกระทบของอาวุธดังอยู่เสมอ' },
    { id: 'winter_palace', name: 'ตำหนักเหมันต์นิรันดร์', description: 'ตำหนักที่เงียบสงัดและอยู่ห่างไกล ว่ากันว่าเป็นที่พำนักของสนมที่ถูกลืม' },
    { id: 'art_pavilion', 'name': 'หอศิลป์หลวง', 'description': 'สถานที่งดงามสำหรับฝึกฝนศิลปะแขนงต่างๆ เช่น ดนตรี, หมากล้อม, และการเขียนอักษร' },
    { id: 'moon_lake', name: 'ทะเลสาบจันทรา', description: 'ทะเลสาบกว้างใหญ่ใจกลางเขตพระราชฐานชั้นใน มีศาลากลางน้ำสำหรับชมจันทร์' },
    { id: 'stargazing_tower', name: 'หอสังเกตการณ์ดาว', description: 'หอคอยสูงเสียดฟ้าสำหรับดูดาวและทำนายโชคชะตาของราชวงศ์ เป็นสถานที่ที่เงียบสงบและเต็มไปด้วยความลับ' },
    { id: 'guest_house', name: 'เรือนรับรองนานาชาติ', description: 'ที่พำนักของทูตและแขกบ้านแขกเมืองจากต่างแคว้น เต็มไปด้วยวัฒนธรรมที่แปลกตาและการเจรจาทางการเมือง' },
    { id: 'imperial_treasury', name: 'คลังสมบัติหลวง', description: 'สถานที่เก็บทรัพย์สินมีค่าและของบรรณาการจากทั่วสารทิศ มีทหารยามเฝ้าอยู่หนาแน่น' },
    { id: 'imperial_temple', name: 'วัดหลวงต้าเซียง', description: 'วัดขนาดใหญ่ที่เป็นศูนย์รวมจิตใจของคนในวัง เสียงสวดมนต์และกลิ่นธูปควันเทียนไม่เคยจางหาย' },
    { id: 'courtesan_pavilion', name: 'หอนางโลมบุปผางาม', description: 'สถานที่แห่งความบันเทิงชั้นสูง เป็นแหล่งรวมข่าวลือและความลับชั้นยอดของเหล่าขุนนาง' },
    { id: 'silk_workshop', name: 'โรงทอผ้าไหมหลวง', description: 'สถานที่ผลิตผ้าไหมและอาภรณ์ชั้นเลิศสำหรับราชวงศ์ เสียงกี่ทอผ้าดังประสานกันตลอดทั้งวัน' },
    { id: 'yonghe_palace', name: 'ตำหนักหย่งเหอ', description: 'ตำหนักที่เงียบสงบ สง่างาม เหมาะสำหรับผู้ที่รักความสันโดษ' },
    { id: 'royal_market', name: 'ตลาดหลวง', description: 'ตลาดที่คึกคักเป็นศูนย์กลางการค้าขายของมีค่าและของหายากจากทั่วทั้งอาณาจักร' },
    { id: 'imperial_prison', name: 'คุกหลวง', description: 'สถานที่คุมขังนักโทษที่เย็นเยียบและน่าหวาดกลัว มีเพียงเสียงคร่ำครวญและโซ่ตรวนเท่านั้นที่ทำลายความเงียบ' },
    { id: 'maid_market', name: 'ตลาดนางกำนัล', description: 'สถานที่สำหรับว่าจ้างสาวใช้และนางกำนัลเพื่อมาช่วยงานในตำหนัก มีแม่สื่อคอยแนะนำหญิงสาวที่มีความสามารถหลากหลาย' },
    // Prince Qin's Mansion Locations
    { id: 'qin_mansion', name: 'จวนฉินอ๋อง', description: 'จวนที่พักของฉินอ๋องหยางจิ้น โอ่อ่าแต่แฝงด้วยความเยือกเย็นเหมือนเจ้าของ' },
    { id: 'qin_player_chamber', name: 'เรือนส่วนตัว (จวนฉินอ๋อง)', description: 'ที่พักของคุณในจวนฉินอ๋อง ถึงจะไม่ใหญ่โตแต่ก็อบอุ่น' },
    { id: 'wang_chenghui_chamber', name: 'เรือนหวังเจาจวิน', description: 'เรือนพักของหวังเจาจวิน ตกแต่งอย่างมีรสนิยม' },
    { id: 'jia_ruren_chamber', name: 'เรือนเจียหมิงอวี้', description: 'เรือนพักของเจียหมิงอวี้ เรียบง่ายแต่อบอุ่น' },
    { id: 'ying_yingshi_chamber', name: 'เรือนอิงหลานฮวา', description: 'เรือนพักของอิงหลานฮวา มีขนาดเล็กที่สุดในบรรดาเรือนสนม' },
    // New Family Mansion Location
    { id: 'family_mansion', name: 'คฤหาสน์ตระกูล', description: 'ที่พำนักของตระกูลของคุณ ที่ซึ่งคุณสามารถกลับมาเยี่ยมเยียนครอบครัวได้' },
];


export const INITIAL_NPCS: NPC[] = [
  // --- Imperial Consort Path NPCs ---
  {
    id: "xuanzong",
    name: "หยางจง",
    title: "ฮ่องเต้",
    imageUrl: "https://i.pinimg.com/736x/67/6e/61/676e618cc4ae65d8b7e14b5ce0c83a44.jpg",
    age: 28,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Neutral,
    favorability: 0,
    heirPoints: 0,
    dialogue: "เจ้าคือสตรีที่ถูกคัดเลือกคนใหม่สินะ... จงปฏิบัติตามกฎของวังหลังให้ดี อย่าสร้างปัญหาให้ข้า",
    locationId: "study",
    careerAffiliation: [CareerPath.ImperialConsort, CareerPath.QinConsort],
    motherId: "xuantaihou",
    memory: "ข้าคือฮ่องเต้แห่งต้าถัง ข้าต้องแบกรับภาระของแผ่นดิน แม้ว่าฉินอ๋อง (หยางจิ้น) จะเป็นน้องชายร่วมมารดาเดียวกับข้า แต่นิสัยที่รักอิสระและมุทะลุของเขาก็สร้างปัญหาให้ข้าปวดหัวอยู่เสมอ เสด็จแม่ (ไทเฮา) มักจะเข้าข้างเขาเสมอ ทำให้ข้าต้องระมัดระวังในการตัดสินใจเรื่องต่างๆ ที่เกี่ยวกับเขา",
    preferences: ["ประวัติศาสตร์", "การทหาร", "บทกวีที่แสดงความภักดี", "สตรีที่ฉลาดและมีไหวพริบ"],
  },
  {
    id: "shangguan_huanghou",
    name: "ซ่างกวน ชิงเหลียน",
    title: "ฮองเฮา",
    imageUrl: "https://i.pinimg.com/1200x/a0/ad/90/a0ad90a581a84b4dca2e210011ab3072.jpg",
    age: 26,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Neutral,
    favorability: -500,
    heirPoints: 0,
    dialogue: "ในที่สุดก็ได้พบกันเสียที... หวังว่าเจ้าจะเข้าใจกฎระเบียบของวังหลังเป็นอย่างดีนะ",
    locationId: "kunning_palace",
    careerAffiliation: [CareerPath.ImperialConsort, CareerPath.QinConsort],
    memory: "",
    preferences: ["ผ้าไหมชั้นเลิศ", "เครื่องประดับหยก", "การควบคุมอำนาจ", "การแสดงความเคารพ"],
  },
  {
    id: "xuantaihou",
    name: "เซวียนไทเฮา",
    title: "ไทเฮา",
    imageUrl: "https://i.pinimg.com/736x/cf/14/58/cf145830278fb3cae8df9c289af6f409.jpg",
    age: 50,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Neutral,
    favorability: 0,
    heirPoints: 0,
    dialogue: "ตำหนักไท่เฟิ่งของข้าสงบสุขดี... เจ้ามีธุระอันใด?",
    locationId: "taifeng_palace",
    careerAffiliation: [CareerPath.ImperialConsort, CareerPath.QinConsort],
    memory: "ข้าคือไทเฮา มารดาของฮ่องเต้ (หยางจง) และฉินอ๋อง (หยางจิ้น) แม้ว่าหยางจงจะเป็นฮ่องเต้ที่ดี แต่ข้าก็อดเป็นห่วงหยางจิ้น ลูกคนเล็กที่รักอิสระและมักจะทำอะไรตามใจตัวเองไม่ได้ ข้าต้องคอยดูแลความสัมพันธ์ของทั้งสองและประคับประคองราชบัลลังก์ให้มั่นคง",
    preferences: ["ชาสมุนไพร", "การสวดมนต์", "ความสงบ", "การเชื่อฟัง"],
  },
  {
    id: "guifei",
    name: "เหอเจาจวิน",
    title: "กุ้ยเฟย",
    imageUrl: "https://i.pinimg.com/736x/67/e2/e4/67e2e4d6c9a08c29e3465704bf697cd4.jpg",
    age: 22,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Neutral,
    favorability: 0,
    heirPoints: 0,
    dialogue: "หืม... เจ้าเป็นใครกัน เหตุใดจึงมาเดินป้วนเปี้ยนแถวนี้?",
    locationId: "guifei_chamber",
    careerAffiliation: [CareerPath.ImperialConsort, CareerPath.QinConsort],
    memory: "",
    preferences: ["เครื่องประดับที่หรูหรา", "เสื้อผ้าที่งดงาม", "การเต้นรำ", "คำเยินยอ"],
  },
  {
    id: "gao_xiyue",
    name: "เกาซีเยว่",
    title: "เต๋อเฟย",
    imageUrl: "https://i.pinimg.com/1200x/0f/ed/13/0fed13c3f250db9dfbaf27fa5b35107b.jpg",
    age: 25,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Neutral,
    favorability: 0,
    heirPoints: 0,
    dialogue: "วังหลวงแห่งนี้ช่างกว้างใหญ่... แต่บางครั้งก็รู้สึกเหมือนเป็นกรงทองที่ขังความฝันไว้ข้างใน",
    locationId: "yikun_palace",
    careerAffiliation: [CareerPath.QinConsort, CareerPath.ImperialConsort], // IMPORTANT: Only appears in Qin Consort path
    memory: "ความรักในวัยเยาว์กับฉินอ๋อง (หยางจิ้น) ที่ต้องพรากจากกันเพราะโชคชะตา นางถูกคัดเลือกเข้าวัง ส่วนเขาต้องไปออกรบ ยังคงเหลือความผูกพันที่ลึกซึ้งอยู่ ความสัมพันธ์ของผู้เล่นกับฉินอ๋องทำให้นางนึกถึงตัวเอง",
    preferences: ["บทกวีเกี่ยวกับความคิดถึง", "ของจากชายแดน", "เรื่องราวความรักที่ไม่ได้สมหวัง"],
  },
  {
    id: "li_jieyu",
    name: "หลินจื่อจิน",
    title: "เจี๋ยอวี๋",
    imageUrl: "https://i.pinimg.com/736x/b4/0a/7a/b40a7a86660650869fad9d12c2857a71.jpg",
    age: 23,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Neutral,
    favorability: 0,
    heirPoints: 0,
    dialogue: "ตำหนักหย่งเหอของข้าเงียบสงบดีนัก... เจ้ามาเยี่ยมเยียนข้างั้นรึ?",
    locationId: "yonghe_palace",
    careerAffiliation: [CareerPath.ImperialConsort, CareerPath.QinConsort],
    memory: "",
    preferences: ["บทกวี", "การเขียนอักษร", "ดอกไม้", "การสนทนาที่ลึกซึ้ง"],
  },
  {
    id: "su_jieyu",
    name: "ซูฮวาเยว่",
    title: "เจี๋ยอวี๋",
    imageUrl: "https://i.pinimg.com/736x/2c/6b/fd/2c6bfd8590e193da8790d7ff65ee5510.jpg",
    age: 29,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Neutral,
    favorability: 0,
    heirPoints: 0,
    dialogue: "เจ้ามาที่นี่ทำไม? ตำหนักที่ถูกลืมเลือนเช่นนี้ไม่มีอะไรให้เจ้าหรอก... เว้นแต่เจ้าจะอยากฟังเรื่องราวของคนที่เคยรุ่งเรืองแล้วร่วงหล่น",
    locationId: "winter_palace",
    careerAffiliation: [CareerPath.ImperialConsort, CareerPath.QinConsort],
    memory: "",
    preferences: ["สุราแรง", "เรื่องราวในอดีต", "ความซื่อสัตย์", "ของขวัญที่แสดงความเห็นใจ"],
  },
  {
    id: "fucha_fuheng",
    name: "ฟู่ฉาฟู่เหิง",
    title: "องครักษ์ส่วนพระองค์",
    imageUrl: "https://i.pinimg.com/736x/6f/cf/0b/6fcf0b3a97a61c3fb5fac826fafea8e7.jpg",
    age: 27,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Neutral,
    favorability: 0,
    heirPoints: 0,
    dialogue: "(ฟู่ฉาฟู่เหิงยืนนิ่งอย่างสงบ คอยอารักขาท่านอยู่ไม่ห่าง เขาโค้งคำนับให้เล็กน้อยเมื่อเห็นท่านมองมา)",
    locationId: "player_chamber",
    careerAffiliation: [CareerPath.ImperialConsort, CareerPath.QinConsort],
    memory: "",
    preferences: ["การฝึกซ้อม", "ความภักดี", "เกราะที่ดี", "ความเงียบ"],
  },
  {
    id: "personal_maid_xiaozhu",
    name: "เสี่ยวจู",
    title: "สาวใช้ส่วนตัว",
    imageUrl: "https://i.pinimg.com/1200x/bb/30/e8/bb30e87098854989a9587a65473b9b98.jpg",
    age: 18,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Joy,
    favorability: 200,
    heirPoints: 0,
    dialogue: "ท่านหญิง! เสี่ยวจูพร้อมรับใช้เจ้าค่ะ มีสิ่งใดให้ข้ารับใช้หรือไม่ หรืออยากจะฟังข่าวในวังหลวงบ้างเจ้าคะ?",
    locationId: "player_chamber",
    careerAffiliation: [CareerPath.ImperialConsort],
    memory: "",
    preferences: ["เรื่องซุบซิบ", "ปิ่นปักผมสวยๆ", "คำชม"],
  },
  // --- Qin Consort Path NPCs ---
  {
    id: "qin_wang",
    name: "หยางจิ้น",
    title: "ฉินอ๋อง",
    imageUrl: "https://i.pinimg.com/1200x/44/db/9d/44db9ddca641d6340ed4b52919f770f1.jpg",
    age: 26,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Neutral,
    favorability: 0,
    heirPoints: 0,
    dialogue: "เจ้าคือคนใหม่ที่เข้ามาอยู่ในจวนข้าสินะ... จำไว้ว่าจวนแห่งนี้มีกฎของมัน อย่าได้สร้างความวุ่นวาย",
    locationId: "qin_mansion",
    careerAffiliation: [CareerPath.QinConsort, CareerPath.ImperialConsort],
    motherId: "xuantaihou",
    memory: "ข้าคือฉินอ๋อง ผู้บัญชาการกองทัพ ข้าเบื่อหน่ายกฎระเบียบในวังหลวง แม้ว่าฮ่องเต้ (หยางจง) จะเป็นพี่ชายร่วมมารดาเดียวกับข้า แต่เขาก็เป็นคนที่น่าเบื่อและเคร่งครัดเกินไป เสด็จแม่ (ไทเฮา) คือคนเดียวที่เข้าใจข้าอย่างแท้จริง ข้าชื่นชอบอิสระและการสู้รบมากกว่าการเมืองในราชสำนักที่น่ารำคาญ ข้ารู้ดีว่าสตรีในจวนของข้าคือพระชายาของข้า ไม่ใช่ของเสด็จพี่... แม้ว่าเรื่องราวในจวนจะน่าปวดหัวไม่ต่างจากวังหลวงก็ตาม ในฐานะเชื้อพระวงศ์ ข้าจะไม่ใช้คำพูดอย่าง 'พะยะค่ะ' กับพระชายาของข้า หรือผู้ที่มียศต่ำกว่าข้าโดยเด็ดขาด",
    preferences: ["สุราดีๆ", "ดนตรีไพเราะ", "สตรีที่น่าสนใจและมีไหวพริบ", "เรื่องตลก", "ความแปลกใหม่และความตื่นเต้น"],
  },
  {
    id: "wang_chenghui",
    name: "หวังเจาจวิน",
    title: "เฉิงฮุย",
    imageUrl: "https://i.pinimg.com/736x/ab/f8/84/abf884bee699d72207ed27386c8ec396.jpg",
    age: 21,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Neutral,
    favorability: -200,
    heirPoints: 0,
    dialogue: "เจ้าคือคนใหม่สินะ... จวนอ๋องมีกฎระเบียบของตัวเอง ทำตัวให้อยู่ในที่ของเจ้าแล้วเราจะอยู่กันอย่างสงบ",
    locationId: "wang_chenghui_chamber",
    careerAffiliation: [CareerPath.QinConsort, CareerPath.ImperialConsort],
    memory: "",
    preferences: ["เครื่องประดับทองคำ", "การเอาชนะ", "ข่าวลือเกี่ยวกับคู่แข่ง"],
  },
  {
    id: "jia_ruren",
    name: "เจียหมิงอวี้",
    title: "หรูเหริน",
    imageUrl: "https://i.pinimg.com/1200x/16/44/97/164497cea2841c88d578d50015e20c6c2.jpg",
    age: 19,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Joy,
    favorability: 0,
    heirPoints: 0,
    dialogue: "ยินดีต้อนรับสู่จวนอ๋องนะ ในที่สุดข้าก็มีเพื่อนคุยเสียที!",
    locationId: "jia_ruren_chamber",
    careerAffiliation: [CareerPath.QinConsort, CareerPath.ImperialConsort],
    memory: "",
    preferences: ["ขนมหวาน", "เสื้อผ้าสีสันสดใส", "การพูดคุย", "ของขวัญเล็กๆน้อยๆ"],
  },
  {
    id: "ying_yingshi",
    name: "อิงหลานฮวา",
    title: "อิ้งซื่อ",
    imageUrl: "https://i.pinimg.com/1200x/08/f3/4b/08f34bbfb02c8c8ca2a229bf46a1d47d.jpg",
    age: 17,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Jealousy,
    favorability: -500,
    heirPoints: 0,
    dialogue: "ท่านอ๋องไม่เคยพาใครเข้าจวนมานานแล้ว... เจ้าคงมีดีอะไรกระมัง",
    locationId: "ying_yingshi_chamber",
    careerAffiliation: [CareerPath.QinConsort, CareerPath.ImperialConsort],
    memory: "",
    preferences: ["การได้รับความสนใจ", "การเปรียบเทียบกับผู้อื่น"],
  },
  {
    id: "butler_xu",
    name: "สวีเจี๋ย",
    title: "พ่อบ้านจวนอ๋อง",
    imageUrl: "https://i.pinimg.com/736x/cc/78/96/cc7896f29cedeabe6027f89d794463b8.jpg",
    age: 45,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Neutral,
    favorability: 0,
    heirPoints: 0,
    dialogue: "จวนอ๋องมีกฎระเบียบที่ต้องปฏิบัติตามอย่างเคร่งครัด หวังว่าท่านหญิงจะเข้าใจ",
    locationId: "qin_mansion",
    careerAffiliation: [CareerPath.QinConsort, CareerPath.ImperialConsort],
    memory: "",
    preferences: ["ความเป็นระเบียบ", "การตรงต่อเวลา", "ของกำนัลเล็กน้อย (สินบน)"],
  },
  {
    id: "guard_feilong",
    name: "เฟยหลง",
    title: "องครักษ์ส่วนตัว",
    imageUrl: "https://i.pinimg.com/1200x/c3/cf/ea/c3cfea3d5ab66f1931c2420499516da1.jpg",
    age: 25,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Neutral,
    favorability: 0,
    heirPoints: 0,
    dialogue: "... (เขายืนนิ่งไม่พูดอะไร เพียงแต่โค้งคำนับให้ท่านเล็กน้อย)",
    locationId: "qin_mansion",
    careerAffiliation: [CareerPath.QinConsort, CareerPath.ImperialConsort],
    memory: "",
    preferences: ["ดาบคม", "ชุดเกราะใหม่", "สุราดีๆ"],
  },
  {
    id: "head_maid_zhang",
    name: "จางมามา",
    title: "หัวหน้าสาวใช้",
    imageUrl: "https://i.pinimg.com/736x/99/90/af/9990af412e3c75d81d1a30187209b296.jpg",
    age: 40,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Neutral,
    favorability: -50,
    heirPoints: 0,
    dialogue: "งานในจวนอ๋องมีมากมายนัก ท่านหญิงต้องการสิ่งใดก็เรียกใช้สาวใช้ได้ แต่อย่าสร้างความวุ่นวายเป็นพอ",
    locationId: "qin_mansion",
    careerAffiliation: [CareerPath.QinConsort, CareerPath.ImperialConsort],
    memory: "",
    preferences: ["ผ้าเช็ดหน้าสะอาด", "หวีไม้จันทน์", "เงินรางวัล"],
  },
  {
    id: "personal_maid_xiaolian",
    name: "เสี่ยวเหลียน",
    title: "สาวใช้ส่วนตัว",
    imageUrl: "https://i.pinimg.com/736x/61/20/67/612067add569d94a40c0d8bcc4201a66.jpg",
    age: 18,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Joy,
    favorability: 200,
    heirPoints: 0,
    dialogue: "ท่านหญิง! เสี่ยวเหลียนอยู่นี่แล้วเจ้าค่ะ มีอะไรให้รับใช้หรือเจ้าคะ? หรือว่า...อยากจะฟังเรื่องที่เขาคุยกันในจวนอ๋องเจ้าคะ?",
    locationId: "qin_player_chamber",
    careerAffiliation: [CareerPath.QinConsort],
    memory: "",
    preferences: ["เรื่องซุบซิบ", "ปิ่นปักผมสวยๆ", "คำชม"],
  },
  // --- Global NPCs (available in both paths) ---
   {
    id: "qing_er",
    name: "ชิงเอ๋อร์",
    title: "นางกำนัล",
    imageUrl: "https://i.pinimg.com/736x/9a/ba/29/9aba29b7e52cfd3361986ace020fcc03.jpg",
    age: 19,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Neutral,
    favorability: 0,
    heirPoints: 0,
    dialogue: "สวนหลวงนี่สวยงามจริงๆ นะเพคะ แต่บางครั้งก็รู้สึกว้าเหว่... ท่านหญิงมาเดินเล่นหรือเพคะ?",
    locationId: "garden",
    careerAffiliation: [CareerPath.ImperialConsort, CareerPath.QinConsort],
    memory: "",
    preferences: ["เมล็ดพันธุ์ดอกไม้หายาก", "ริบบิ้นผ้าไหม", "เรื่องราวความรัก"],
  },
  {
    id: "eunuch_gao",
    name: "เกาลิ่วซื่อ",
    title: "หัวหน้าขันที",
    imageUrl: "https://i.pinimg.com/1200x/73/3d/75/733d75e0d7d3ee0a3534ce234b792af3.jpg",
    age: 55,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Neutral,
    favorability: 0,
    heirPoints: 0,
    dialogue: "ฝ่าบาททรงงานหนักเพื่อบ้านเมือง พวกเราต้องรับใช้อย่างสุดความสามารถ เจ้ามีเรื่องด่วนอันใดหรือไม่?",
    locationId: "study",
    careerAffiliation: [CareerPath.ImperialConsort, CareerPath.QinConsort],
    memory: "",
    preferences: ["โสมบำรุงกำลัง", "พัด", "การแสดงความเคารพต่อฮ่องเต้"],
  },
  {
    id: "physician_zhang",
    name: "หมอหลวงจาง",
    title: "หมอหลวง",
    imageUrl: "https://i.pinimg.com/736x/54/ab/05/54ab05f1d49a7b280009b7d4ba0aa139.jpg",
    age: 62,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Neutral,
    favorability: 0,
    heirPoints: 0,
    dialogue: "สุขภาพเป็นสิ่งสำคัญที่สุดในวังหลวงแห่งนี้ เจ้าต้องการให้ข้าช่วยดูอาการอะไรหรือไม่?",
    locationId: "infirmary",
    careerAffiliation: [CareerPath.ImperialConsort, CareerPath.QinConsort],
    memory: "",
    preferences: ["สมุนไพรหายาก", "ตำราแพทย์โบราณ", "การสนทนาเกี่ยวกับสุขภาพ"],
  },
  {
    id: "maid_ahmei",
    name: "อาเหมย",
    title: "นางกำนัล",
    imageUrl: "https://i.pinimg.com/736x/3d/aa/b7/3daab79ab15e697d73f7bc82efacb8a9.jpg",
    age: 20,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Neutral,
    favorability: 0,
    heirPoints: 0,
    dialogue: "งานซักล้างนี่มันน่าเบื่อจริงๆ... แต่ก็ได้ยินเรื่องราวต่างๆ ในวังมากมายเลยนะ เจ้าอยากฟังเรื่องอะไรไหมล่ะ?",
    locationId: "laundry_house",
    careerAffiliation: [CareerPath.ImperialConsort, CareerPath.QinConsort],
    memory: "",
    preferences: ["ของกินเล่น", "สบู่หอม", "เรื่องเล่าสนุกๆ"],
  },
  {
    id: "teacher_bai",
    name: "อาจารย์หญิงไป๋",
    title: "อาจารย์สอนศิลปะ",
    imageUrl: "https://i.pinimg.com/736x/dc/5b/f1/dc5bf15c37b5e0c3a7a41e340366b8e1.jpg",
    age: 38,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Neutral,
    favorability: 0,
    heirPoints: 0,
    dialogue: "สมาธิคือหัวใจของศิลปะทุกแขนง... เจ้ามาที่นี่เพื่อฝึกฝนหรือเพียงเพื่อเดินเล่น?",
    locationId: "art_pavilion",
    careerAffiliation: [CareerPath.ImperialConsort, CareerPath.QinConsort],
    memory: "",
    preferences: ["พู่กันชั้นเลิศ", "กระดาษซวนคุณภาพสูง", "แท่นฝนหมึก"],
  },
  {
    id: "guard_zhao",
    name: "องครักษ์จ้าว",
    title: "องครักษ์ประตูวัง",
    imageUrl: "https://i.pinimg.com/736x/c0/3a/1f/c03a1f726177a2404c9effb8bb45b241.jpg",
    age: 30,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Neutral,
    favorability: 0,
    heirPoints: 0,
    dialogue: "ประตูวังหลวงคือปราการด่านแรก โปรดแสดงตนและแจ้งจุดประสงค์ในการมา",
    locationId: "gate",
    careerAffiliation: [CareerPath.ImperialConsort, CareerPath.QinConsort],
    memory: "",
    preferences: ["เหล้าดี", "เนื้อแห้ง", "การไม่สร้างปัญหา"],
  },
   {
    id: "head_chef_wang",
    name: "หัวหน้าแม่ครัวหวัง",
    title: "หัวหน้าห้องเครื่อง",
    imageUrl: "https://i.pinimg.com/736x/e1/11/1f/e1111f29c62ff917d9b22bce464b3f9d.jpg",
    age: 48,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Neutral,
    favorability: 0,
    heirPoints: 0,
    dialogue: "โรงครัวหลวงต้องเตรียมเครื่องเสวยเลิศรสที่สุด! เจ้ามาที่นี่ต้องการสิ่งใด? อย่ามาเกะกะถ้าไม่มีธุระ",
    locationId: "kitchen",
    careerAffiliation: [CareerPath.ImperialConsort, CareerPath.QinConsort],
    memory: "",
    preferences: ["วัตถุดิบแปลกใหม่", "เครื่องเทศจากต่างแดน", "ตำราอาหาร"],
  },
  {
    id: "monk_huiyuan",
    name: "หลวงจีนฮุ่ยหยวน",
    title: "เจ้าอาวาส",
    imageUrl: "https://i.pinimg.com/1200x/86/27/22/862722b319cd10818ce1b4d041b9f59e.jpg",
    age: 68,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Neutral,
    favorability: 0,
    heirPoints: 0,
    dialogue: "วัดหลวงคือสถานที่แห่งความสงบ... จิตใจของเจ้ากำลังว้าวุ่นอยู่หรือ?",
    locationId: "imperial_temple",
    careerAffiliation: [CareerPath.ImperialConsort, CareerPath.QinConsort],
    memory: "",
    preferences: ["ลูกประคำ", "คัมภีร์ธรรมะ", "การทำบุญ"],
  },
  {
    id: "ambassador_marco",
    name: "มาร์โค",
    title: "ทูตจากแดนไกล",
    imageUrl: "https://i.pinimg.com/1200x/05/f4/17/05f417142740c995f0fd719a42595010.jpg",
    age: 35,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Neutral,
    favorability: 0,
    heirPoints: 0,
    dialogue: "วังของท่านช่างยิ่งใหญ่งดงาม! ข้ามาที่นี่เพื่อเจริญสัมพันธไมตรี หวังว่าเราจะเป็นมิตรที่ดีต่อกัน",
    locationId: "guest_house",
    careerAffiliation: [CareerPath.ImperialConsort, CareerPath.QinConsort],
    memory: "",
    preferences: ["สุราต่างแดน", "แผนที่", "เรื่องเล่าการผจญภัย"],
  },
  {
    id: "captain_chen",
    name: "ผู้กองเฉิน",
    title: "หัวหน้าองครักษ์",
    imageUrl: "https://i.pinimg.com/1200x/1c/8b/67/1c8b6718f414c4cd5de6c6b727412a23.jpg",
    age: 32,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Neutral,
    favorability: 0,
    heirPoints: 0,
    dialogue: "ลานประลองยุทธ์ไม่ใช่ที่เดินเล่น! หากไม่มีธุระก็อย่าเข้ามาเกะกะการฝึกซ้อม",
    locationId: "training_ground",
    careerAffiliation: [CareerPath.ImperialConsort, CareerPath.QinConsort],
    memory: "",
    preferences: ["การประลอง", "ยาฟื้นฟูกำลัง", "การยอมรับในฝีมือ"],
  },
  {
    id: "poet_li",
    name: "กวีหลี่",
    title: "กวีพเนจร",
    imageUrl: "https://i.pinimg.com/1200x/e7/1f/5c/e71f5cccd93adf83dce5b7eedeb3fc44.jpg",
    age: 41,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Neutral,
    favorability: 0,
    heirPoints: 0,
    dialogue: "โอ้... ทะเลสาบจันทราในยามนี้ช่างงามล้ำ... เหมาะแก่การแต่งกลอนยิ่งนัก",
    locationId: "moon_lake",
    careerAffiliation: [CareerPath.ImperialConsort, CareerPath.QinConsort],
    memory: "",
    preferences: ["กระดาษและหมึก", "แรงบันดาลใจ", "ผู้ฟังที่ดี"],
  },
  {
    id: "astronomer_xie",
    name: "โหรเซี่ย",
    title: "นักดาราศาสตร์หลวง",
    imageUrl: "https://i.pinimg.com/736x/d8/74/f9/d874f925ce3bbcc41e6563f27a6131b6.jpg",
    age: 58,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Neutral,
    favorability: 0,
    heirPoints: 0,
    dialogue: "ดวงดาวบนฟากฟ้า... กุมชะตาของทุกชีวิตในแผ่นดินนี้ไว้ เจ้าสนใจจะดูดาวฤกษ์ของตนหรือไม่?",
    locationId: "stargazing_tower",
    careerAffiliation: [CareerPath.ImperialConsort, CareerPath.QinConsort],
    memory: "",
    preferences: ["แผนภูมิดวงดาว", "กล้องดูดาว", "การสนทนาเรื่องปรัชญา"],
  },
  {
    id: "keeper_zheng",
    name: "เจิ้งกงกง",
    title: "ผู้ดูแลคลังสมบัติ",
    imageUrl: "https://i.pinimg.com/736x/9f/c5/a6/9fc5a6ebb7ddf7b3c5b78e9aff1324e6.jpg",
    age: 51,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Neutral,
    favorability: 0,
    heirPoints: 0,
    dialogue: "คลังสมบัติหลวงไม่ใช่ที่ที่ใครจะเข้าออกได้ตามใจชอบ! เจ้ามีราชโองการหรือไม่?",
    locationId: "imperial_treasury",
    careerAffiliation: [CareerPath.ImperialConsort, CareerPath.QinConsort],
    memory: "",
    preferences: ["สมุดบัญชี", "ลูกคิด", "ของมีค่าที่เงางาม"],
  },
  {
    id: "madame_jin",
    name: "มาดามจิน",
    title: "เจ้าของหอนางโลม",
    imageUrl: "https://i.pinimg.com/736x/ba/a6/38/baa638945b969f869fdd6f994582abbc.jpg",
    age: 43,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Neutral,
    favorability: 0,
    heirPoints: 0,
    dialogue: "หอนางโลมของข้ายินดีต้อนรับแขกทุกท่าน... ที่มีเงินมากพอน่ะนะ ฮิๆ",
    locationId: "courtesan_pavilion",
    careerAffiliation: [CareerPath.ImperialConsort, CareerPath.QinConsort],
    memory: "",
    preferences: ["เงิน", "ความลับของขุนนาง", "เครื่องประดับที่ดูแพง"],
  },
  {
    id: "master_lin",
    name: "อาจารย์หลิน",
    title: "หัวหน้าโรงทอผ้า",
    imageUrl: "https://i.pinimg.com/1200x/ee/53/a3/ee53a372562368f6bb77eafba99a56fc.jpg",
    age: 46,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Neutral,
    favorability: 0,
    heirPoints: 0,
    dialogue: "ผ้าไหมทุกเส้นด้ายที่ทอ ณ ที่นี้ มีไว้สำหรับราชวงศ์เท่านั้น... เจ้ามาดูงานหรือ?",
    locationId: "silk_workshop",
    careerAffiliation: [CareerPath.ImperialConsort, CareerPath.QinConsort],
    memory: "",
    preferences: ["สีย้อมผ้าหายาก", "ดิ้นทองคำ", "ลวดลายปักใหม่ๆ"],
  },
   {
    id: "merchant_li",
    name: "พ่อค้าหลี่",
    title: "พ่อค้า",
    imageUrl: "https://i.pinimg.com/1200x/28/25/96/2825963ddff5956b46d34a602c4de6b2.jpg",
    age: 39,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Neutral,
    favorability: 0,
    heirPoints: 0,
    dialogue: "ยินดีต้อนรับ! สินค้าของข้าล้วนเป็นของดีมีคุณภาพจากทั่วหล้า เชิญเลือกชมได้ตามสบายเลยขอรับ",
    locationId: "royal_market",
    careerAffiliation: [CareerPath.ImperialConsort, CareerPath.QinConsort],
    memory: "",
    preferences: ["กำไร", "สินค้าหายาก", "การต่อรองราคา"],
  },
  {
    id: 'maid_broker_lin',
    name: 'แม่สื่อหลิน',
    title: 'แม่สื่อ',
    imageUrl: "https://i.pinimg.com/736x/c9/29/9d/c9299d7d3a53aeba7f2f68509ce90ef4.jpg",
    age: 42,
    health: 'healthy',
    isAlive: true,
    emotion: Emotion.Neutral,
    favorability: 0,
    heirPoints: 0,
    dialogue: 'ท่านหญิง... กำลังมองหาสาวใช้ที่ไว้ใจได้อยู่หรือเจ้าคะ? ข้ามีเด็กสาวหน้าตาดีมีความสามารถมากมายให้ท่านเลือกสรร ไม่ว่าจะเป็นงานบ้านงานเรือน หรือ...งานที่ต้องการความพิเศษกว่านั้น',
    locationId: 'maid_market',
    careerAffiliation: [CareerPath.ImperialConsort, CareerPath.QinConsort],
    memory: "",
    preferences: ['เงิน', 'การเจรจาที่รวดเร็ว', 'ลูกค้าที่ตัดสินใจเด็ดขาด'],
  },
];

export const SHICHEN_CYCLE: { name: Shichen, period: string, icon: string }[] = [
    { name: '子', period: '23:00-01:00', icon: '🐭' },
    { name: '丑', period: '01:00-03:00', icon: '🐮' },
    { name: '寅', period: '03:00-05:00', icon: '🐯' },
    { name: '卯', period: '05:00-07:00', icon: '🐰' },
    { name: '辰', period: '07:00-09:00', icon: '🐲' },
    { name: '巳', period: '09:00-11:00', icon: '🐍' },
    { name: '午', period: '11:00-13:00', icon: '🐴' },
    { name: '未', period: '13:00-15:00', icon: '🐑' },
    { name: '申', period: '15:00-17:00', icon: '🐵' },
    { name: '酉', period: '17:00-19:00', icon: '🐔' },
    { name: '戌', period: '19:00-21:00', icon: '🐶' },
    { name: '亥', period: '21:00-23:00', icon: '🐷' },
];

export const SHOP_ITEMS: Omit<InventoryItem, 'instanceId'>[] = [
    // Consumables
    {
        id: "ginseng_of_vitality", name: "โสมพันปี", description: "โสมล้ำค่าที่เติบโตบนยอดเขาศักดิ์สิทธิ์ ช่วยเสริมสร้างพลังและบารมี", emoji: "🌿",
        type: "consumable", price: 15000, effect: { stat: "power", value: 50 }
    },
    {
        id: "pearl_of_serenity", name: "ไข่มุกราตรี", description: "ไข่มุกสีดำสนิทที่ส่องประกายแวววาว ช่วยเสริมเสน่ห์ให้ดูงดงามและน่าค้นหา", emoji: "⚫",
        type: "consumable", price: 25000, effect: { stat: "charm", value: 100 }
    },
    {
        id: "scroll_of_sun_tzu", name: "ตำราพิชัยสงคราม", description: "บันทึกกลยุทธ์และภูมิปัญญาโบราณ ช่วยเพิ่มพูนสติปัญญาให้หลักแหลม", emoji: "📜",
        type: "consumable", price: 40000, effect: { stat: "intelligence", value: 150 }
    },
    {
        id: "jade_seal_of_the_dragon", name: "ตราหยกมังกร", description: "ตราหยกที่แกะสลักวิจิตร เป็นสัญลักษณ์แห่งอำนาจ ช่วยเสริมบารมีให้เป็นที่น่าเกรงขาม", emoji: "🐲",
        type: "consumable", price: 80000, effect: { stat: "prestige", value: 250 }
    },
    {
        id: "imperial_edict_forgery", name: "ราชโองการปลอม", description: "กระดาษและหมึกคุณภาพสูงสำหรับปลอมแปลงเอกสารสำคัญ เพิ่มอำนาจในการต่อรอง", emoji: "✍️",
        type: "consumable", price: 180000, effect: { stat: "power", value: 500 }
    },
    {
        id: "scholar_stone", name: "ศิลาบัณฑิต", description: "หินรูปร่างแปลกตาที่ช่วยกระตุ้นความคิดและเสริมสร้างความจำ ทำให้เรียนรู้ได้เร็วยิ่งขึ้น", emoji: "🗿",
        type: "consumable", price: 95000, effect: { stat: "intelligence", value: 300 }
    },
    
    // Gifts
    {
        id: "peony_hairpin", name: "ปิ่นปักผมดอกโบตั๋น", description: "ปิ่นทองคำสลักรูปดอกโบตั๋นงดงาม ของขวัญแสดงความชื่นชม", emoji: "🌸",
        type: "gift", price: 50000, favorabilityEffect: 1000
    },
    {
        id: "exquisite_silk_fan", name: "พัดไหมลายปัก", description: "พัดไหมชั้นเลิศปักลายมงคลด้วยมือ แสดงถึงรสนิยมอันสูงส่ง", emoji: "🌬️",
        type: "gift", price: 65000, favorabilityEffect: 1300
    },
    {
        id: "white_jade_bracelet", name: "กำไลหยกขาว", description: "กำไลหยกขาวเนื้อดีไร้ตำหนิ เป็นสัญลักษณ์ของความบริสุทธิ์และสูงค่า", emoji: "💎",
        type: "gift", price: 75000, favorabilityEffect: 1500
    },
    {
        id: "guqin_of_moonlight", name: "กู่ฉินแสงจันทร์", description: "เครื่องดนตรีกู่ฉินที่ทำจากไม้หายาก ว่ากันว่าเสียงของมันไพเราะราวกับแสงจันทร์", emoji: "🎶",
        type: "gift", price: 120000, favorabilityEffect: 2500
    },
    {
        id: "inkstone_from_duanxi", name: "แท่นฝนหมึกตวนซี", description: "แท่นฝนหมึกชั้นเลิศจากเมืองตวนซี เป็นที่ต้องการของเหล่าปราชญ์และราชวงศ์", emoji: "✒️",
        type: "gift", price: 90000, favorabilityEffect: 1800
    },
    {
        id: "rare_orchid", name: "กล้วยไม้ป่าหายาก", description: "กล้วยไม้พันธุ์หายากที่มีสีสันแปลกตาและส่งกลิ่นหอมจรุงใจ", emoji: "🌺",
        type: "gift", price: 45000, favorabilityEffect: 900
    },
    {
        id: "brocade_sachet", name: "ถุงหอมผ้าตาด", description: "ถุงผ้าตาดปักลายวิจิตร บรรจุเครื่องหอมชั้นดีจากต่างแดน", emoji: "💐",
        type: "gift", price: 30000, favorabilityEffect: 600
    },
    {
        id: "go_board_set", name: "ชุดกระดานหมากล้อม", description: "ชุดกระดานและเม็ดหมากล้อมที่ทำจากหินคุณภาพดี เหมาะสำหรับสหายร่วมเล่น", emoji: "⚫⚪",
        type: "gift", price: 85000, favorabilityEffect: 1700
    },
    {
        id: "foreign_wine", name: "สุราต่างแดน", description: "ไวน์รสเลิศจากดินแดนตะวันตก ของหายากที่น้อยคนในวังจะได้ลิ้มลอง", emoji: "🍷",
        type: "gift", price: 110000, favorabilityEffect: 2200
    },
    {
        id: "golden_thread_robe", name: "เสื้อคลุมปักดิ้นทอง", description: "เสื้อคลุมที่ทอจากผ้าไหมและปักด้วยดิ้นทองคำแท้ เป็นเครื่องแสดงสถานะอันสูงส่ง", emoji: "👘",
        type: "gift", price: 250000, favorabilityEffect: 5000
    },

    // Artifacts
    {
        id: "phoenix_elixir_artifact", name: "ยาอายุวัฒนะหงส์เพลิง", description: "ยาอายุวัฒนะในตำนานที่สกัดจากสมุนไพรหายากนับร้อยชนิด เพิ่มพลังอย่างมหาศาล", emoji: "🔥",
        type: "artifact", price: 1500000, effect: { stat: "power", value: 4000 }
    },
    {
        id: "nine_tailed_fox_essence_artifact", name: "หยดน้ำค้างจิ้งจอกเก้าหาง", description: "ว่ากันว่าเป็นน้ำตาของจิ้งจอกเก้าหาง ผู้ที่ดื่มจะได้รับเสน่ห์อันน่าหลงใหลอย่างถาวร", emoji: "🦊",
        type: "artifact", price: 2200000, effect: { stat: "charm", value: 6000 }
    },
    {
        id: "bodhi_leaf_artifact", name: "ใบโพธิ์จากชมพูทวีป", description: "ใบโพธิ์จากต้นไม้ที่พระพุทธเจ้าตรัสรู้ ช่วยให้ผู้ครอบครองมีสติปัญญาสงบนิ่งและลึกซึ้งดุจปราชญ์", emoji: "🍃",
        type: "artifact", price: 3000000, effect: { stat: "intelligence", value: 8000 }
    },
    {
        id: "qilin_scale_artifact", name: "เกล็ดกิเลน", description: "เกล็ดเดี่ยวจากสัตว์มงคลในตำนาน ส่งเสริมบารมีและเป็นที่เคารพยำเกรงแก่ผู้พบเห็นทั่วทั้งแผ่นดิน", emoji: "🦄",
        type: "artifact", price: 5000000, effect: { stat: "prestige", value: 12000 }
    },
    {
        id: "everlasting_beauty_mirror_artifact", name: "กระจกส่องโฉมนิรันดร์", description: "กระจกทองเหลืองขัดเงา ว่ากันว่ามันจะรักษารูปลักษณ์ของผู้ที่ส่องให้งดงามตลอดไป เพิ่มเสน่ห์อย่างถาวร", emoji: "🪞",
        type: "artifact", price: 7500000, effect: { stat: "charm", value: 15000 }
    },
    {
        id: "shadow_assassin_dagger_artifact", name: "กริชนักฆ่าเงา", description: "กริชที่ซ่อนอยู่ในเงามืด มันจะเพิ่มพลังให้ผู้ครอบครองสามารถเคลื่อนไหวได้อย่างเงียบเชียบและตัดสินใจได้เด็ดขาดยิ่งขึ้น", emoji: "🗡️",
        type: "artifact", price: 6000000, effect: { stat: "power", value: 13000 }
    },
    {
        id: "mandate_of_heaven_scroll_artifact", name: "ม้วนคัมภีร์อาณัติสวรรค์", description: "คัมภีร์โบราณที่กล่าวถึงลิขิตสวรรค์ ผู้ที่ได้ครอบครองจะได้รับบารมีเทียบเท่าเชื้อพระวงศ์", emoji: "🧧",
        type: "artifact", price: 10000000, effect: { stat: "prestige", value: 20000 }
    },
    {
        id: "celestial_zither_artifact", name: "พิณสวรรค์", description: "พิณโบราณที่เสียงของมันสามารถกล่อมเกลาจิตใจให้สงบและเฉียบแหลมได้ในเวลาเดียวกัน เพิ่มสติปัญญาและเสน่ห์อย่างมาก", emoji: "🎼",
        type: "artifact", price: 8500000, effect: { stat: "intelligence", value: 16000 }
    },
];

// --- NEW SYSTEM CONSTANTS ---

export const SKILL_TREES: Record<SkillTreeId, Skill[]> = {
  arts: [
    { id: 'poetry_1', name: 'กวีนิพนธ์ขั้นต้น', description: 'เรียนรู้การแต่งกลอนพื้นฐาน', cost: 1, tree: 'arts', effectDescription: 'ปลดล็อกตัวเลือกบทสนทนาที่เกี่ยวกับบทกวี' },
    { id: 'music_1', name: 'ดนตรีขั้นต้น', description: 'เรียนรู้การเล่นเครื่องดนตรีพื้นฐาน', cost: 1, tree: 'arts', effectDescription: 'เพิ่มค่าเสน่ห์เล็กน้อยเมื่ออยู่ในหอศิลป์' },
    { id: 'calligraphy_1', name: 'คัดอักษรขั้นต้น', description: 'เรียนรู้การเขียนอักษรพู่กันจีน', cost: 1, tree: 'arts', effectDescription: 'สามารถสร้างของขวัญประเภท "ม้วนกลอน" ได้' },
  ],
  subterfuge: [
    { id: 'rumor_mongering_1', name: 'ปล่อยข่าวลือขั้นต้น', description: 'เรียนรู้ศิลปะการปล่อยข่าวเพื่อสร้างความสับสน', cost: 1, tree: 'subterfuge', effectDescription: 'เพิ่มโอกาสสำเร็จในการใส่ร้าย 5%' },
    { id: 'poisoning_1', name: 'ปรุงยาพิษขั้นต้น', description: 'เรียนรู้การใช้สมุนไพรพื้นฐานเพื่อสร้างยาพิษอ่อนๆ', cost: 1, tree: 'subterfuge', effectDescription: 'ปลดล็อกตัวเลือกการวางยาในภารกิจบางอย่าง' },
    { id: 'spying_1', name: 'สอดแนมขั้นต้น', description: 'เรียนรู้การแอบฟังและหาข่าวสาร', cost: 1, tree: 'subterfuge', effectDescription: 'เพิ่มโอกาสได้รับข่าวสารพิเศษจากนางกำนัล' },
  ],
  management: [
    { id: 'accounting_1', name: 'การบัญชีขั้นต้น', description: 'เรียนรู้การจัดการการเงินในตำหนัก', cost: 1, tree: 'management', effectDescription: 'ได้รับเงินเพิ่ม 5% จากเงินเดือน' },
    { id: 'negotiation_1', name: 'เจรจาต่อรองขั้นต้น', description: 'เรียนรู้การต่อรองราคาในตลาด', cost: 1, tree: 'management', effectDescription: 'ได้รับส่วนลด 5% จากร้านค้าหลวง' },
  ]
};

export const AVAILABLE_MAIDS_FOR_HIRE: Omit<Maid, 'id' | 'loyalty'>[] = [
    { name: 'ชุนเถา', tier: 'สามัญ', skill: null, wage: 150, recruitmentCost: 500, description: 'สาวใช้ทั่วไปสำหรับงานจิปาถะในตำหนัก' },
    { name: 'เซี่ยจวี', tier: 'สามัญ', skill: null, wage: 150, recruitmentCost: 500, description: 'สาวใช้ทั่วไปสำหรับงานจิปาถะในตำหนัก' },
    { name: 'ชิวหลัน', tier: 'ชำนาญ', skill: 'herbalism', wage: 400, recruitmentCost: 2000, description: 'มีความรู้ด้านสมุนไพร สามารถหาของหายากได้ดีขึ้น' },
    { name: 'ตงเหมย', tier: 'ชำนาญ', skill: 'rumor_gathering', wage: 450, recruitmentCost: 2500, description: 'หูตากว้างไกล เหมาะกับการสืบข่าวลือในวัง' },
    { name: 'จื่อจิน', tier: 'ชำนาญ', skill: 'embroidery', wage: 350, recruitmentCost: 1800, description: 'มีฝีมือด้านการเย็บปักถักร้อย สามารถสร้างของขวัญชิ้นเล็กๆได้' },
    { name: 'โม่ลี่', tier: 'ยอดฝีมือ', skill: 'espionage', wage: 1200, recruitmentCost: 10000, description: 'ยอดฝีมือด้านการสอดแนม สามารถล้วงความลับที่สำคัญยิ่งได้' },
];

export const MAID_TASKS: MaidTask[] = [
  { id: 'gather_herbs', name: 'เก็บสมุนไพร', description: 'ส่งสาวใช้ไปเก็บสมุนไพรในสวนหลวง อาจพบของหายาก', durationHours: 4, requiredSkill: 'herbalism', outcomeDescription: 'สาวใช้กลับมาพร้อมกับสมุนไพรจำนวนหนึ่ง' },
  { id: 'gather_rumors', name: 'สืบข่าวลือ', description: 'ส่งสาวใช้ไปปะปนกับเหล่านางกำนัลเพื่อฟังข่าวสารล่าสุด', durationHours: 2, requiredSkill: 'rumor_gathering', outcomeDescription: 'สาวใช้ได้ยินข่าวลือที่น่าสนใจมาเล่าให้ฟัง' },
  { id: 'manage_finances', name: 'จัดการการเงิน', description: 'ให้สาวใช้ดูแลบัญชีรายรับรายจ่าย อาจมีรายได้เล็กน้อยจากการประหยัด', durationHours: 8, requiredSkill: 'financials', outcomeDescription: 'สาวใช้สามารถประหยัดเงินให้ท่านได้จำนวนหนึ่ง' },
  { id: 'practice_embroidery', name: 'ฝึกเย็บปัก', description: 'ให้สาวใช้ฝึกฝนการเย็บปัก อาจได้ของขวัญชิ้นเล็กๆ', durationHours: 6, requiredSkill: 'embroidery', outcomeDescription: 'สาวใช้ได้มอบผ้าเช็ดหน้าปักลายงดงามให้ท่าน' },
  { id: 'spy_on_rival', name: 'สอดแนมคู่แข่ง', description: 'ส่งสาวใช้ไปสอดแนมคู่แข่งคนสำคัญ อาจได้ข้อมูลที่เป็นประโยชน์', durationHours: 12, requiredSkill: 'espionage', outcomeDescription: 'สาวใช้ได้ข้อมูลลับเกี่ยวกับตารางเวลาของคู่แข่งมา' },
];

export const STATIC_QUESTS: Quest[] = [
    // --- Imperial Consort Quests ---
    { id: 'imp_01', title: 'ผ้าเช็ดหน้าของนางกำนัล', description: 'ชิงเอ๋อร์ นางกำนัลในสวนหลวงทำผ้าเช็ดหน้าที่แม่ของนางมอบให้หายไป นางดูกังวลมาก ช่วยนางตามหาที', objectives: [{ description: "ค้นหาผ้าเช็ดหน้าที่หายไปในสวนหลวง", type: ObjectiveType.FIND, locationId: 'garden', targetId: 'lost_handkerchief', isCompleted: false }, { description: "นำผ้าเช็ดหน้าไปคืนให้ ชิงเอ๋อร์", type: ObjectiveType.TALK, locationId: 'garden', targetId: 'qing_er', isCompleted: false }], rewards: ["คะแนนบารมี +20", "50 ตำลึง"], status: 'active', difficulty: 'ง่าย', category: 'main', completionSummary: "คุณได้นำผ้าเช็ดหน้าไปคืนให้ชิงเอ๋อร์ นางซาบซึ้งในน้ำใจของคุณมาก", careerAffiliation: [CareerPath.ImperialConsort], prerequisites: [] },
    { id: 'imp_02', title: 'ชาของไทเฮา', description: 'ไทเฮาทรงโปรดชาดอกเก๊กฮวยเป็นพิเศษ แต่ดูเหมือนว่าชาในตำหนักจะหมดแล้ว ช่วยไปหามาจากโรงครัวหลวงให้ที', objectives: [{ description: "ไปที่โรงครัวหลวงเพื่อขอชาดอกเก๊กฮวย", type: ObjectiveType.FIND, locationId: 'kitchen', targetId: 'chrysanthemum_tea', isCompleted: false }, { description: "นำชาไปถวายไทเฮาที่ตำหนักไท่เฟิ่ง", type: ObjectiveType.TALK, locationId: 'taifeng_palace', targetId: 'xuantaihou', isCompleted: false }], rewards: ["คะแนนบารมี +35", "ความพึงพอใจของไทเฮา +100"], status: 'active', difficulty: 'ง่าย', category: 'main', completionSummary: "ไทเฮาทรงพอพระทัยในชาที่นำมาถวาย และได้มอบรางวัลให้เล็กน้อย", careerAffiliation: [CareerPath.ImperialConsort], prerequisites: ['imp_01'] },
    { id: 'imp_03', title: 'ปิ่นปักผมที่หายไป', description: 'หลินจื่อจินทำปิ่นปักผมหยกขาวหายระหว่างเดินเล่นที่ทะเลสาบจันทรา นางกำลังกลุ้มใจมาก', objectives: [{ description: 'ค้นหาปิ่นปักผมหยกขาวที่ทะเลสาบจันทรา', type: ObjectiveType.FIND, locationId: 'moon_lake', targetId: 'jade_hairpin', isCompleted: false }, { description: 'นำปิ่นไปคืนให้หลินจื่อจิน', type: ObjectiveType.TALK, locationId: 'yonghe_palace', targetId: 'li_jieyu', isCompleted: false }], rewards: ['คะแนนบารมี +30', '100 ตำลึง', 'ความพึงพอใจของหลินจื่อจิน +150'], status: 'active', difficulty: 'ง่าย', category: 'main', completionSummary: 'หลินจื่อจินขอบคุณท่านอย่างจริงใจ ความสัมพันธ์ของคุณกับนางดีขึ้นเล็กน้อย', careerAffiliation: [CareerPath.ImperialConsort], prerequisites: ['imp_02'] },
    { id: 'imp_04', title: 'แรงบันดาลใจของกวี', description: 'ฮ่องเต้ทรงโปรดบทกวี แต่ช่วงนี้กวีหลวงดูเหมือนจะขาดแรงบันดาลใจ ลองช่วยเขาดูสิ', objectives: [{ description: 'พูดคุยกับกวีหลี่ที่ทะเลสาบจันทราเพื่อหาทางช่วย', type: ObjectiveType.TALK, locationId: 'moon_lake', targetId: 'poet_li', isCompleted: false }, {description: 'นำบทกวีที่ได้มาไปถวายฮ่องเต้', type: ObjectiveType.TALK, locationId: 'study', targetId: 'xuanzong', isCompleted: false}], rewards: ['คะแนนบารมี +100', 'ความพึงพอใจของฮ่องเต้ +500'], status: 'active', difficulty: 'ปานกลาง', category: 'main', completionSummary: 'ฮ่องเต้ทรงพอพระทัยในบทกวีที่ท่านนำมาถวายอย่างมาก และทรงชื่นชมในความใส่ใจของท่าน', careerAffiliation: [CareerPath.ImperialConsort], prerequisites: ['imp_03'] },
    { id: 'imp_05', title: 'ข่าวลือของกุ้ยเฟย', description: 'มีข่าวลือหนาหูว่าเหอเจาจวินแอบทำบางอย่างไม่เหมาะสมในตำหนักของนาง สืบหาความจริงจากอาเหมย นางกำนัลแผนกซักล้างที่รู้ทุกเรื่อง', objectives: [{ description: 'พูดคุยกับอาเหมยที่เรือนซักล้างเพื่อหาความจริง', type: ObjectiveType.TALK, locationId: 'laundry_house', targetId: 'maid_ahmei', isCompleted: false }, { description: 'ตัดสินใจว่าจะทำอย่างไรกับข้อมูลที่ได้มา (เผชิญหน้ากับกุ้ยเฟย)', type: ObjectiveType.TALK, locationId: 'guifei_chamber', targetId: 'guifei', isCompleted: false }], rewards: ['คะแนนบารมี +150', '300 ตำลึง', 'ความพึงพอใจของกุ้ยเฟย -500'], status: 'active', difficulty: 'ปานกลาง', category: 'main', completionSummary: 'การเผชิญหน้ากับกุ้ยเฟยเป็นไปอย่างดุเดือด แม้ท่านจะแสดงความเหนือกว่าได้ แต่ก็สร้างศัตรูที่น่ากลัวขึ้นมา', careerAffiliation: [CareerPath.ImperialConsort], prerequisites: ['imp_04'] },
    { id: 'imp_06', title: 'สมุนไพรของหมอหลวง', description: "หมอหลวงจางต้องการสมุนไพรหายาก 'หญ้าพันราตรี' ที่ขึ้นอยู่บริเวณหอสังเกตการณ์ดาวเพื่อปรุงยาถวายฝ่าบาท", objectives: [{ description: 'ค้นหาสมุนไพร "หญ้าพันราตรี" ที่หอสังเกตการณ์ดาว', type: ObjectiveType.FIND, locationId: 'stargazing_tower', targetId: 'night_herb', isCompleted: false }, { description: 'นำสมุนไพรไปให้หมอหลวงจางที่โรงหมอ', type: ObjectiveType.TALK, locationId: 'infirmary', targetId: 'physician_zhang', isCompleted: false }], rewards: ['คะแนนบารมี +80', '250 ตำลึง'], status: 'active', difficulty: 'ปานกลาง', category: 'main', completionSummary: 'หมอหลวงจางขอบคุณท่านอย่างยิ่ง การกระทำของท่านอาจช่วยชีวิตฝ่าบาทได้ในอนาคต', careerAffiliation: [CareerPath.ImperialConsort], prerequisites: ['imp_05'] },
    { id: 'imp_07', title: 'ความลับในตำหนักเหมันต์', description: 'ซูฮวาเยว่ สนมที่ถูกลืมในตำหนักเหมันต์นิรันดร์ ดูเหมือนจะเก็บงำความลับบางอย่างของฮองเฮาเอาไว้ ลองไปเยี่ยมเยียนและดูว่าท่านจะล้วงข้อมูลอะไรออกมาได้บ้าง', objectives: [{ description: 'นำสุราดีจากตลาดหลวงไปให้ซูฮวาเยว่', type: ObjectiveType.FIND, locationId: 'royal_market', targetId: 'good_wine', isCompleted: false }, { description: 'พูดคุยกับซูฮวาเยว่ที่ตำหนักเหมันต์นิรันดร์', type: ObjectiveType.TALK, locationId: 'winter_palace', targetId: 'su_jieyu', isCompleted: false }], rewards: ['คะแนนบารมี +250', 'ได้รับข้อมูลลับของฮองเฮา'], status: 'active', difficulty: 'ยาก', category: 'main', completionSummary: 'ท่านได้รับฟังความลับสำคัญจากซูฮวาเยว่ ซึ่งอาจใช้เป็นไพ่ตายในการต่อกรกับฮองเฮาได้ในอนาคต', careerAffiliation: [CareerPath.ImperialConsort], prerequisites: ['imp_06'] },
    { id: 'imp_08', title: 'บทเรียนการเขียนอักษร', description: 'อาจารย์หญิงไป๋ในหอศิลป์หลวงกำลังมองหาลูกศิษย์คนใหม่ ไปแสดงความสามารถด้านการเขียนอักษรของคุณให้อาจารย์ดู', objectives: [{ description: 'พูดคุยกับอาจารย์หญิงไป๋', type: ObjectiveType.TALK, locationId: 'art_pavilion', targetId: 'teacher_bai', isCompleted: false }], rewards: ['ค่าสติปัญญา +15', 'คะแนนบารมี +25'], status: 'active', difficulty: 'ง่าย', category: 'main', completionSummary: 'อาจารย์หญิงไป๋ชื่นชมในความตั้งใจของคุณ และได้สอนเทคนิคที่เป็นประโยชน์ให้', careerAffiliation: [CareerPath.ImperialConsort], prerequisites: ['imp_07'] },
    { id: 'imp_09', title: 'สาส์นลับขององครักษ์', description: 'ฟู่ฉาฟู่เหิง องครักษ์ส่วนพระองค์ของคุณ ต้องการให้คุณช่วยส่งสาส์นลับไปยังผู้กองเฉินที่ลานประลองยุทธ์อย่างเงียบๆ', objectives: [{ description: 'รับสาส์นลับจากฟู่ฉาฟู่เหิง', type: ObjectiveType.TALK, locationId: 'player_chamber', targetId: 'fucha_fuheng', isCompleted: false }, { description: 'นำสาส์นไปส่งให้ผู้กองเฉินที่ลานประลองยุทธ์', type: ObjectiveType.TALK, locationId: 'training_ground', targetId: 'captain_chen', isCompleted: false }], rewards: ['คะแนนบารมี +120', 'ความเชื่อใจจากองครักษ์'], status: 'active', difficulty: 'ปานกลาง', category: 'main', completionSummary: 'คุณทำภารกิจลับสำเร็จลุล่วง ได้รับความไว้วางใจจากเหล่าองครักษ์มากขึ้น', careerAffiliation: [CareerPath.ImperialConsort], prerequisites: ['imp_08'] },
    { id: 'imp_10', title: 'การทุจริตในคลังหลวง', description: 'เจิ้งกงกง ผู้ดูแลคลังสมบัติหลวง สงสัยว่ามีการทุจริตเกิดขึ้น เขาต้องการให้คุณช่วยตรวจสอบบัญชีอย่างลับๆ', objectives: [{ description: 'พูดคุยกับเจิ้งกงกงที่คลังสมบัติหลวง', type: ObjectiveType.TALK, locationId: 'imperial_treasury', targetId: 'keeper_zheng', isCompleted: false }], rewards: ['คะแนนบารมี +300', '1000 ตำลึง', 'ค่าสติปัญญา +50'], status: 'active', difficulty: 'ยาก', category: 'main', completionSummary: 'คุณช่วยเปิดโปงการทุจริตได้สำเร็จ ทำให้เจิ้งกงกงซาบซึ้งใจและเป็นหนี้บุญคุณคุณ', careerAffiliation: [CareerPath.ImperialConsort], prerequisites: ['imp_09'] },

    // --- Qin Consort Quests ---
    { id: 'qin_01', title: 'น้ำใจเล็กน้อย', description: 'คุณสังเกตเห็นว่าองครักษ์เฟยหลงดูไม่สบายใจนัก ลองจัดหาของเล็กๆ น้อยๆ ไปให้เขาดูสิ', objectives: [{ description: "ค้นหาหินลับมีดที่หายไปในลานประลองยุทธ์", type: ObjectiveType.FIND, locationId: 'training_ground', targetId: 'lost_whetstone', isCompleted: false }, { description: 'นำหินลับมีดไปให้เฟยหลง', type: ObjectiveType.TALK, locationId: 'qin_mansion', targetId: 'guard_feilong', isCompleted: false }], rewards: ['คะแนนบารมี +30', 'ความพึงพอใจของเฟยหลง +100'], status: 'active', difficulty: 'ง่าย', category: 'main', completionSummary: 'เฟยหลงรับหินลับมีดไปเงียบๆ แต่สายตาของเขาแสดงความขอบคุณอย่างชัดเจน', careerAffiliation: [CareerPath.QinConsort], prerequisites: [] },
    { id: 'qin_02', title: 'ขนมของเจียหมิงอวี้', description: 'เจียหมิงอวี้บ่นว่าอยากกินขนมดอกกุ้ยฮวาจากตลาดหลวง ช่วยไปซื้อมาให้เธอหน่อย', objectives: [{ description: "ไปที่ตลาดหลวงเพื่อซื้อขนมดอกกุ้ยฮวา", type: ObjectiveType.FIND, locationId: 'royal_market', targetId: 'osmanthus_cake', isCompleted: false }, { description: 'นำขนมไปให้เจียหมิงอวี้', type: ObjectiveType.TALK, locationId: 'jia_ruren_chamber', targetId: 'jia_ruren', isCompleted: false }], rewards: ['คะแนนบารมี +25', '150 ตำลึง', 'ความพึงพอใจของเจียหมิงอวี้ +200'], status: 'active', difficulty: 'ง่าย', category: 'main', completionSummary: 'เจียหมิงอวี้ดีใจมากที่ได้กินขนม เธอดูเป็นมิตรกับคุณมากขึ้น', careerAffiliation: [CareerPath.QinConsort], prerequisites: ['qin_01'] },
    { id: 'qin_03', title: 'คำสั่งของพ่อบ้าน', description: 'พ่อบ้านสวีต้องการให้คุณช่วยตรวจนับผ้าไหมในคลังของจวน', objectives: [{ description: 'ไปที่จวนฉินอ๋องเพื่อพบพ่อบ้านสวี', type: ObjectiveType.TALK, locationId: 'qin_mansion', targetId: 'butler_xu', isCompleted: false }], rewards: ['คะแนนบารมี +40', '200 ตำลึง', 'ความพึงพอใจของพ่อบ้านสวี +150'], status: 'active', difficulty: 'ง่าย', category: 'main', completionSummary: 'พ่อบ้านสวีพยักหน้าอย่างพึงพอใจในความสามารถของคุณ', careerAffiliation: [CareerPath.QinConsort], prerequisites: ['qin_02'] },
    { id: 'qin_04', title: 'ของขวัญแด่อ๋อง', description: 'คุณได้ยินมาว่าฉินอ๋องทรงโปรดการเล่นหมากล้อม ลองหาชุดกระดานหมากล้อมดีๆ จากตลาดหลวงไปถวาย', objectives: [{ description: 'ซื้อชุดกระดานหมากล้อมชั้นดีจากตลาดหลวง', type: ObjectiveType.FIND, locationId: 'royal_market', targetId: 'go_board', isCompleted: false }, { description: 'นำชุดหมากล้อมไปถวายฉินอ๋อง', type: ObjectiveType.TALK, locationId: 'qin_mansion', targetId: 'qin_wang', isCompleted: false }], rewards: ['คะแนนบารมี +120', 'ความพึงพอใจของฉินอ๋อง +800'], status: 'active', difficulty: 'ปานกลาง', category: 'main', completionSummary: 'ฉินอ๋องทรงเลิกคิ้วเล็กน้อยเมื่อเห็นของขวัญ แม้จะไม่ได้ตรัสอะไรมาก แต่แววตาของพระองค์ดูอ่อนโยนลง', careerAffiliation: [CareerPath.QinConsort], prerequisites: ['qin_03'] },
    { id: 'qin_05', title: 'แผนการของหวังเจาจวิน', description: 'สาวใช้เสี่ยวเหลียนแอบได้ยินหวังเจาจวินพูดคุยน่าสงสัยในเรือนของนาง ไปสืบดูว่านางกำลังวางแผนอะไร', objectives: [{ description: 'ค้นหาจดหมายที่น่าสงสัยในเรือนหวังเจาจวิน', type: ObjectiveType.FIND, locationId: 'wang_chenghui_chamber', targetId: 'incriminating_letter', isCompleted: false }, { description: 'นำจดหมายไปแสดงให้ฉินอ๋องดู', type: ObjectiveType.TALK, locationId: 'qin_mansion', targetId: 'qin_wang', isCompleted: false }], rewards: ['คะแนนบารมี +200', 'ความพึงพอใจของหวังเจาจวิน -1000'], status: 'active', difficulty: 'ปานกลาง', category: 'main', completionSummary: 'ฉินอ๋องทรงลงโทษหวังเจาจวินอย่างเงียบๆ และมองท่านด้วยสายตาที่ซับซ้อนยิ่งขึ้น ท่านได้กำจัดคู่แข่งคนสำคัญไปได้อีกหนึ่งคน', careerAffiliation: [CareerPath.QinConsort], prerequisites: ['qin_04'] },
    { id: 'qin_06', title: 'ผ้าเช็ดหน้าที่ลืมไว้', description: 'อิงหลานฮวาทำผ้าเช็ดหน้าตกไว้ที่สวนหลวง นางขี้อายเกินกว่าจะไปหาเอง ช่วยนำไปคืนให้หน่อย', objectives: [{ description: 'ค้นหาผ้าเช็ดหน้าของอิงหลานฮวาในสวนหลวง', type: ObjectiveType.FIND, locationId: 'garden', targetId: 'ying_handkerchief', isCompleted: false }, { description: 'นำผ้าเช็ดหน้าไปคืนให้อิงหลานฮวา', type: ObjectiveType.TALK, locationId: 'ying_yingshi_chamber', targetId: 'ying_yingshi', isCompleted: false }], rewards: ['คะแนนบารมี +40', 'ความพึงพอใจของอิงหลานฮวา +250'], status: 'active', difficulty: 'ง่าย', category: 'main', completionSummary: 'อิงหลานฮวาหน้าแดงและกล่าวขอบคุณท่านเสียงแผ่วเบา ดูเหมือนนางจะไม่ได้มองท่านเป็นศัตรูอีกต่อไป', careerAffiliation: [CareerPath.QinConsort], prerequisites: ['qin_05'] },
    { id: 'qin_07', title: 'สาส์นถึงเกาซีเยว่', description: 'ฉินอ๋องดูมีเรื่องกลุ้มใจ และทรงรำพึงถึงเต๋อเฟยเกาซีเยว่ พระองค์ต้องการให้ท่านนำของดูต่างหน้าชิ้นหนึ่งจากจวนไปมอบให้นางที่วังหลวงอย่างลับๆ', objectives: [{ description: 'รับ "กิ๊บดอกไม้หยก" จากฉินอ๋อง', type: ObjectiveType.TALK, locationId: 'qin_mansion', targetId: 'qin_wang', isCompleted: false }, { description: 'ค้นหา "กิ๊บดอกไม้หยก" ในจวนอ๋อง', type: ObjectiveType.FIND, locationId: 'qin_mansion', targetId: 'jade_flower_clip', isCompleted: false }, { description: 'นำกิ๊บไปมอบให้เต๋อเฟยเกาซีเยว่ที่ตำหนักอี้คุน', type: ObjectiveType.TALK, locationId: 'yikun_palace', targetId: 'gao_xiyue', isCompleted: false }], rewards: ['คะแนนบารมี +350', 'ความพึงพอใจของฉินอ๋อง +1500', 'ความเข้าใจในความสัมพันธ์ของฉินอ๋องและเกาซีเยว่'], status: 'active', difficulty: 'ยาก', category: 'main', completionSummary: 'เกาซีเยว่รับกิ๊บไปทั้งน้ำตา และได้เล่าเรื่องราวในอดีตให้ท่านฟัง ทำให้ท่านเข้าใจความรู้สึกที่ซับซ้อนของฉินอ๋องมากขึ้น', careerAffiliation: [CareerPath.QinConsort], prerequisites: ['qin_06'] },
    { id: 'qin_08', title: 'ความช่วยเหลือจากพ่อบ้าน', description: 'พ่อบ้านสวีมีเรื่องให้ช่วยจัดการอย่างเร่งด่วนเกี่ยวกับเสบียงของจวน', objectives: [{ description: 'ไปพบพ่อบ้านสวีที่จวนฉินอ๋อง', type: ObjectiveType.TALK, locationId: 'qin_mansion', targetId: 'butler_xu', isCompleted: false }], rewards: ['คะแนนบารมี +50', '300 ตำลึง'], status: 'active', difficulty: 'ง่าย', category: 'main', completionSummary: 'คุณช่วยพ่อบ้านสวีแก้ไขปัญหาได้สำเร็จ เขาดูจะนับถือในความสามารถของคุณมากขึ้น', careerAffiliation: [CareerPath.QinConsort], prerequisites: ['qin_07'] },
    { id: 'qin_09', title: 'เสียงกระซิบของสาวใช้', description: 'เสี่ยวเหลียน สาวใช้ส่วนตัวของคุณมีข่าวลือชิ้นใหม่มาเล่าให้ฟังเกี่ยวกับเจียหมิงอวี้', objectives: [{ description: 'พูดคุยกับเสี่ยวเหลียนที่เรือนส่วนตัวของคุณ', type: ObjectiveType.TALK, locationId: 'qin_player_chamber', targetId: 'personal_maid_xiaolian', isCompleted: false }], rewards: ['คะแนนบารมี +20', 'ได้รับข้อมูลเกี่ยวกับเจียหมิงอวี้'], status: 'active', difficulty: 'ง่าย', category: 'main', completionSummary: 'ข่าวลือที่ได้ยินมาอาจเป็นประโยชน์ในการวางแผนครั้งต่อไป', careerAffiliation: [CareerPath.QinConsort], prerequisites: ['qin_08'] },
    { id: 'qin_10', title: 'ของขวัญจากแดนไกล', description: 'ทูตจากแดนไกลในเรือนรับรองมีของแปลกๆ ขาย คุณควรไปดูเผื่อจะมีอะไรที่ฉินอ๋องสนพระทัย', objectives: [{ description: 'พูดคุยกับทูตมาร์โคที่เรือนรับรอง', type: ObjectiveType.TALK, locationId: 'guest_house', targetId: 'ambassador_marco', isCompleted: false }, { description: 'ซื้อ "แผนที่การรบแดนตะวันตก" จากตลาดหลวง', type: ObjectiveType.FIND, locationId: 'royal_market', targetId: 'western_war_map', isCompleted: false }, { description: 'นำแผนที่ไปถวายฉินอ๋อง', type: ObjectiveType.TALK, locationId: 'qin_mansion', targetId: 'qin_wang', isCompleted: false }], rewards: ['คะแนนบารมี +180', 'ความพึงพอใจของฉินอ๋อง +1200'], status: 'active', difficulty: 'ปานกลาง', category: 'main', completionSummary: 'ฉินอ๋องให้ความสนใจแผนที่เป็นอย่างมาก และใช้เวลานานในการพิจารณา พระองค์ชื่นชมในความช่างสังเกตของท่าน', careerAffiliation: [CareerPath.QinConsort], prerequisites: ['qin_09'] },
    // --- NEW QUESTS START HERE ---
    { id: 'imp_11', title: 'ผ้าปักปริศนา', description: 'อาจารย์หลิน หัวหน้าโรงทอผ้า พบผ้าปักลายแปลกๆ ที่มีรหัสลับซ่อนอยู่ นางสงสัยว่าเป็นฝีมือของสายลับและอยากให้ท่านช่วยสืบ', objectives: [{ description: 'พูดคุยกับอาจารย์หลินที่โรงทอผ้า', type: ObjectiveType.TALK, locationId: 'silk_workshop', targetId: 'master_lin', isCompleted: false }, { description: 'หาเบาะแสจากผ้าปักที่โรงทอผ้า', type: ObjectiveType.FIND, locationId: 'silk_workshop', targetId: 'clue_from_embroidery', isCompleted: false }, { description: 'นำเบาะแสไปปรึกษากับองครักษ์จ้าวที่ประตูวัง', type: ObjectiveType.TALK, locationId: 'gate', targetId: 'guard_zhao', isCompleted: false }], rewards: ['คะแนนบารมี +200', '500 ตำลึง', 'ค่าสติปัญญา +40'], status: 'active', difficulty: 'ปานกลาง', category: 'main', completionSummary: 'ท่านได้ไขรหัสลับและช่วยเปิดโปงสายลับได้สำเร็จ อาจารย์หลินและองครักษ์ต่างซาบซึ้งในไหวพริบของท่าน', careerAffiliation: [CareerPath.ImperialConsort], prerequisites: ['imp_10'] },
    { id: 'imp_12', title: 'เสียงพิณแห่งหอนางโลม', description: 'มาดามจิน เจ้าของหอนางโลมบุปผางาม ได้ยินข่าวลือว่ามีขุนนางใหญ่คนหนึ่งเปิดเผยความลับของราชสำนักที่หอนางโลม นางต้องการให้ท่านช่วยสืบหาความจริงอย่างเงียบๆ', objectives: [{ description: 'ซื้อสุราชั้นดีจากตลาดหลวงเพื่อใช้เป็นของกำนัล', type: ObjectiveType.FIND, locationId: 'royal_market', targetId: 'fancy_wine', isCompleted: false }, { description: 'พูดคุยกับมาดามจินที่หอนางโลมบุปผางาม', type: ObjectiveType.TALK, locationId: 'courtesan_pavilion', targetId: 'madame_jin', isCompleted: false }], rewards: ['คะแนนบารมี +350', 'ได้รับข้อมูลลับของขุนนาง'], status: 'active', difficulty: 'ยาก', category: 'main', completionSummary: 'ท่านได้ข้อมูลสำคัญเกี่ยวกับขุนนางทุจริตมาอยู่ในมือ ซึ่งสามารถใช้เป็นเครื่องมือต่อรองทางการเมืองได้ในอนาคต', careerAffiliation: [CareerPath.ImperialConsort], prerequisites: ['imp_11'] },
    { id: 'imp_13', title: 'ของขวัญจากต่างแดน', description: 'ทูตมาร์โคทำของขวัญล้ำค่าที่จะถวายฮ่องเต้หายไปในตลาดหลวง เขาดูกังวลมากเพราะอาจกระทบความสัมพันธ์ระหว่างแคว้น', objectives: [{ description: 'ค้นหาของขวัญที่หายไปในตลาดหลวง', type: ObjectiveType.FIND, locationId: 'royal_market', targetId: 'lost_foreign_gift', isCompleted: false }, { description: 'นำของขวัญไปคืนให้ทูตมาร์โค', type: ObjectiveType.TALK, locationId: 'guest_house', targetId: 'ambassador_marco', isCompleted: false }], rewards: ['คะแนนบารมี +100', 'ความพึงพอใจของฮ่องเต้ +300'], status: 'active', difficulty: 'ปานกลาง', category: 'main', completionSummary: 'ท่านหาของขวัญพบและนำไปคืนให้ทูตมาร์โคได้ทันเวลา ฮ่องเต้ทรงพอพระทัยอย่างยิ่งที่ท่านช่วยรักษาหน้าของราชวงศ์เอาไว้', careerAffiliation: [CareerPath.ImperialConsort], prerequisites: ['imp_12'] },
    { id: 'imp_14', title: 'ความลับของนักโทษ', description: 'มีข่าวลือว่านักโทษคนสำคัญในคุกหลวงกุมความลับที่จะสั่นคลอนบัลลังก์ของฮองเฮาไว้ แต่เขาไม่ยอมพูดกับใครเลย ท่านต้องหาทางเข้าไปพูดคุยกับเขา', objectives: [{ description: 'หาสินบนสำหรับผู้คุมจากตลาดหลวง', type: ObjectiveType.FIND, locationId: 'royal_market', targetId: 'warden_bribe', isCompleted: false }, { description: 'พูดคุยกับนักโทษบัณฑิตที่ถูกลืมในคุกหลวง', type: ObjectiveType.TALK, locationId: 'imperial_prison', targetId: 'the_doomed_scholar', isCompleted: false }], rewards: ['คะแนนบารมี +400', 'ได้รู้จุดอ่อนของฮองเฮา'], status: 'active', difficulty: 'ยาก', category: 'main', completionSummary: 'ท่านได้ล่วงรู้ความลับดำมืดของฮองเฮาจากนักโทษ บัดนี้ท่านมีไพ่ตายที่ทรงพลังที่สุดอยู่ในมือ', careerAffiliation: [CareerPath.ImperialConsort], prerequisites: ['imp_13'] },
    { id: 'imp_15', title: 'สีชาดที่ขาดหาย', description: 'อาจารย์หญิงไป๋กำลังจะวาดภาพถวายฮ่องเต้ แต่สีชาดสำหรับวาดตราประทับกลับหมดลงกะทันหัน นางต้องการให้ท่านช่วยหาสีย้อมพิเศษจากโรงทอผ้ามาแทน', objectives: [{ description: 'หาสีย้อมสีชาดพิเศษที่โรงทอผ้าไหมหลวง', type: ObjectiveType.FIND, locationId: 'silk_workshop', targetId: 'special_crimson_dye', isCompleted: false }, { description: 'นำสีย้อมไปให้อาจารย์หญิงไป๋ที่หอศิลป์หลวง', type: ObjectiveType.TALK, locationId: 'art_pavilion', targetId: 'teacher_bai', isCompleted: false }], rewards: ['คะแนนบารมี +40', 'ค่าเสน่ห์ +10', 'ความพึงพอใจของอาจารย์หญิงไป๋ +150'], status: 'active', difficulty: 'ง่าย', category: 'main', completionSummary: 'ท่านนำสีมาให้อาจารย์ไป๋ได้ทันเวลา นางจึงวาดภาพเสร็จสมบูรณ์และได้กล่าวชื่นชมท่านให้ผู้อื่นฟัง', careerAffiliation: [CareerPath.ImperialConsort], prerequisites: ['imp_14'] },
    { id: 'qin_11', title: 'การแก่งแย่งของเหล่าสาวใช้', description: 'จางมามา หัวหน้าสาวใช้ กำลังปวดหัวกับความขัดแย้งระหว่างสาวใช้สองคนในจวนอ๋อง นางอยากให้ท่านช่วยไกล่เกลี่ย', objectives: [{ description: 'พูดคุยกับจางมามาเพื่อรับฟังปัญหา', type: ObjectiveType.TALK, locationId: 'qin_mansion', targetId: 'head_maid_zhang', isCompleted: false }], rewards: ['คะแนนบารมี +50', 'ค่าอำนาจ +10', 'ความพึงพอใจของจางมามา +200'], status: 'active', difficulty: 'ง่าย', category: 'main', completionSummary: 'ท่านไกล่เกลี่ยความขัดแย้งได้สำเร็จ แสดงให้เห็นถึงความสามารถในการปกครองคน จางมามานับถือท่านมากขึ้น', careerAffiliation: [CareerPath.QinConsort], prerequisites: ['qin_10'] },
    { id: 'qin_12', title: 'ยาพิษในถ้วยชา', description: 'เสี่ยวเหลียน สาวใช้ของคุณแอบเห็นคนของหวังเจาจวินทำตัวน่าสงสัยใกล้กับโรงครัวของจวน นางสงสัยว่าอาจมีการลอบวางยาท่านอ๋อง', objectives: [{ description: 'พูดคุยกับเสี่ยวเหลียนเพื่อฟังรายละเอียด', type: ObjectiveType.TALK, locationId: 'qin_player_chamber', targetId: 'personal_maid_xiaolian', isCompleted: false }, { description: 'ค้นหาเศษขวดยาพิษใกล้โรงครัวหลวง', type: ObjectiveType.FIND, locationId: 'kitchen', targetId: 'poison_vial_remains', isCompleted: false }, { description: 'นำหลักฐานไปทูลฉินอ๋อง', type: ObjectiveType.TALK, locationId: 'qin_mansion', targetId: 'qin_wang', isCompleted: false }], rewards: ['คะแนนบารมี +450', 'ความพึงพอใจของฉินอ๋อง +2500', 'ความพึงพอใจของหวังเจาจวิน -5000'], status: 'active', difficulty: 'ยาก', category: 'main', completionSummary: 'ท่านได้เปิดโปงแผนการอันชั่วร้ายของหวังเจาจวินและช่วยชีวิตฉินอ๋องไว้ได้ พระองค์ทรงซาบซึ้งและเชื่อใจท่านอย่างที่สุด', careerAffiliation: [CareerPath.QinConsort], prerequisites: ['qin_11'] },
];

export const RANDOM_FEMALE_NPC_IMAGES: string[] = [
    'https://i.pinimg.com/1200x/01/1d/f4/011df451db66e86426cd4ff2d5b54f7d.jpg',
    'https://i.pinimg.com/736x/12/be/c0/12bec0e3a52e4be0b83174e7f12bbce5.jpg',
    'https://i.pinimg.com/736x/69/91/a4/6991a4b866a6333c1869484e29a52d23.jpg',
    'https://i.pinimg.com/1200x/d1/3c/b1/d13cb1eced11805eb13979240e206a3f.jpg',
    'https://i.pinimg.com/736x/a3/70/a8/a370a851123bf17a317223ac069183ee.jpg',
    'https://i.pinimg.com/736x/a8/67/56/a86756b4a30ed2a97a1594b571c5d41a.jpg',
    'https://i.pinimg.com/736x/12/f4/29/12f429af2c789d5a15036c711efe5398.jpg',
    'https://i.pinimg.com/1200x/a0/4d/df/a04ddf22ff7ded4662981ac5607ca57c.jpg',
    'https://i.pinimg.com/736x/21/34/d9/2134d9bde97d42246a04523843eea222.jpg',
    'https://i.pinimg.com/1200x/b2/7d/d4/b27dd4cb01d00018a0f2e9053d4a2498.jpg',
    'https://i.pinimg.com/736x/11/29/9a/11299a4449e3c6f15cbcc34700ff8ade.jpg',
    'https://i.pinimg.com/736x/13/8e/f6/138ef6e76c6538a67f94d658d0d7e581.jpg'
];

export const RANDOM_MALE_NPC_IMAGES: string[] = [
    'https://i.pinimg.com/1200x/d8/7c/e9/d87ce940f0b94335e5de65f3f8b6c0fc.jpg',
    'https://i.pinimg.com/1200x/72/e2/c1/72e2c1c8f83b84f7d2458768c4490f35.jpg',
    'https://i.pinimg.com/736x/e4/da/a9/e4daa91ea2190d61016edc5ac35bc981.jpg',
    'https://i.pinimg.com/736x/e1/39/e6/e139e63c3a69e48b83083e1fdbbdcd4d.jpg',
    'https://i.pinimg.com/736x/12/dd/0a/12dd0a1aaf268d317426ba14d1c0c0b3.jpg',
    'https://i.pinimg.com/736x/48/9a/91/489a91c34f65bc37588df34932b34b72.jpg',
    'https://i.pinimg.com/736x/d2/76/24/d27624dc4e35031cf92d36f32fa9ff7e.jpg',
    'https://i.pinimg.com/736x/64/71/96/647196208bc45e1463b7bdebe7425c5b.jpg',
    'https://i.pinimg.com/1200x/7e/01/11/7e011164118140a4246238f495d2e815.jpg',
    'https://i.pinimg.com/736x/84/bf/e4/84bfe4ac2574813fd254d53861c9ed5b.jpg',
    'https://i.pinimg.com/736x/07/d0/2f/07d02fb46d6582a1a171caff5660219d.jpg'
];


// --- EMPRESS CAREER PATH CONSTANTS ---

export const EMPRESS_LOCATIONS: MapLocation[] = [
    { id: 'empress_throne_hall', name: 'ท้องพระโรง', description: 'สถานที่ว่าราชการและตัดสินใจเรื่องสำคัญของแผ่นดิน บัลลังก์หงส์ของท่านตั้งตระหง่านอยู่เหนือทุกสิ่ง' },
    { id: 'empress_chamber', name: 'ตำหนักจักรพรรดินี', description: 'ที่ประทับส่วนพระองค์ของจักรพรรดินี ตกแต่งอย่างหรูหราและเปี่ยมด้วยอำนาจ' },
    { id: 'hall_of_consorts', name: 'หอราชบุรุษ', description: 'ที่พำนักของเหล่าราชบุรุษฝ่ายใน เต็มไปด้วยบุรุษรูปงามจากตระกูลสูงศักดิ์' },
    { id: 'empress_imperial_garden', name: 'สวนหลวงต้องห้าม', description: 'สวนสวรรค์ส่วนพระองค์ มีเพียงท่านและผู้ที่ได้รับอนุญาตเท่านั้นที่เข้ามาได้' },
    { id: 'ministry_of_rites', name: 'กระทรวงพิธีการ', description: 'สถานที่ที่เหล่าขุนนางชั้นผู้ใหญ่ทำงานเพื่อบริหารบ้านเมือง' },
];

export const EMPRESS_NPCS: NPC[] = [
    {
        id: "chancellor_wei",
        name: "เว่ยเจิง",
        title: "อัครมหาเสนาบดี",
        imageUrl: "https://i.pinimg.com/736x/96/3b/2e/963b2eb0702115a3416241b07229ec19.jpg", // Using a wise old man picture
        age: 58,
        health: 'healthy',
        isAlive: true,
        emotion: Emotion.Neutral,
        favorability: 100,
        heirPoints: 0,
        dialogue: "ฝ่าบาท การว่าราชการยามเช้ากำลังจะเริ่มขึ้นพ่ะย่ะค่ะ",
        locationId: "empress_throne_hall",
        careerAffiliation: [CareerPath.Empress],
        memory: "ข้ารับใช้ราชวงศ์มาหลายสมัย ข้าจะถวายความภักดีและคำแนะนำที่ตรงไปตรงมาเพื่อความรุ่งเรืองของแผ่นดินภายใต้การปกครองของฝ่าบาท",
        preferences: ["ความมั่นคงของแผ่นดิน", "การตัดสินใจที่เด็ดขาด", "ความยุติธรรม"],
    },
    {
        id: "consort_li_feng",
        name: "หลี่เฟิง",
        title: JunRank.Fengjun,
        imageUrl: "https://i.pinimg.com/1200x/44/db/9d/44db9ddca641d6340ed4b52919f770f1.jpg", // Reusing a handsome man picture
        age: 22,
        health: 'healthy',
        isAlive: true,
        emotion: Emotion.Admiration,
        favorability: 500,
        heirPoints: 0,
        dialogue: "กระหม่อมพร้อมรับใช้ฝ่าบาทเสมอ... ไม่ว่าจะเป็นเรื่องส่วนตัวหรือเรื่องงาน",
        locationId: "hall_of_consorts",
        careerAffiliation: [CareerPath.Empress],
        memory: "ตระกูลหลี่ของข้าส่งข้าเข้าวังเพื่อรับใช้ฝ่าบาท ข้าจะทำทุกอย่างเพื่อให้ฝ่าบาทพอพระทัยและเพื่อให้ตระกูลของข้ามีอำนาจมากขึ้น",
        preferences: ["ดนตรี", "บทกวี", "การได้รับความโปรดปราน"],
        gender: 'male',
    },
    {
        id: "consort_su_yan",
        name: "ซูเหยียน",
        title: JunRank.Shilang,
        imageUrl: "https://i.pinimg.com/736x/c0/0f/db/c00fdb5c1d3a76aa02804ff7703e3847.jpg", // Another handsome man
        age: 18,
        health: 'healthy',
        isAlive: true,
        emotion: Emotion.Neutral,
        favorability: 0,
        heirPoints: 0,
        dialogue: "กระหม่อมเพิ่งเข้าวังมาไม่นาน ยังต้องเรียนรู้อะไรอีกมาก... ฝ่าบาทโปรดชี้แนะ",
        locationId: "hall_of_consorts",
        careerAffiliation: [CareerPath.Empress],
        memory: "ข้ามาจากตระกูลซูที่เชี่ยวชาญด้านศิลปะ ข้าหวังว่าความสามารถของข้าจะเป็นที่ต้องตาของฝ่าบาท",
        preferences: ["การวาดภาพ", "ความเงียบสงบ"],
        gender: 'male',
    },
];

export const EMPRESS_QUESTS: Quest[] = [
    { id: 'emp_01', title: 'การว่าราชการยามเช้า', description: 'ในฐานะจักรพรรดินี ท่านต้องว่าราชการเพื่อดูแลทุกข์สุขของราษฎรและบริหารบ้านเมือง', objectives: [{ description: "ไปยังท้องพระโรงเพื่อเริ่มการประชุม", type: ObjectiveType.TALK, locationId: 'empress_throne_hall', targetId: 'chancellor_wei', isCompleted: false }], rewards: ["ค่าบารมี +100", "ค่าอำนาจ +50"], status: 'active', difficulty: 'ง่าย', category: 'main', completionSummary: "ท่านได้เข้าร่วมการประชุมขุนนางและได้รับฟังรายงานสถานการณ์บ้านเมือง", careerAffiliation: [CareerPath.Empress], prerequisites: [] },
];