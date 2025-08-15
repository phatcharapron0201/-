import React, { useState } from 'react';
import { IMPERIAL_RANKS, IMPERIAL_RANK_REQUIREMENTS, QIN_RANKS, QIN_RANK_REQUIREMENTS, JUN_RANKS, NOBLEMAN_TITLES, ROYAL_TITLES } from '../constants';
import { Rank, ImperialRank, QinRank, JunRank } from '../types';

interface AccordionSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ title, isOpen, onToggle, children }) => {
  return (
    <div className="border-b border-yellow-500/30">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left py-4 px-2"
      >
        <h3 className="text-xl sm:text-2xl font-semibold text-yellow-200">{title}</h3>
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-4 pt-0 space-y-2 text-yellow-100/90 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};


const GuideModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [openSection, setOpenSection] = useState<string | null>('gameplay');

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };
    
    const Section: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
        <div className="mb-6">
            <h4 className="text-lg sm:text-xl font-semibold text-white border-b border-yellow-500/30 pb-1 mb-2">{title}</h4>
            <div className="space-y-2 text-yellow-100/80 leading-relaxed text-sm">
                {children}
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 animate-fade-in p-4">
            <div className="bg-red-950/80 backdrop-blur-md border-2 border-main rounded-lg shadow-2xl w-full max-w-4xl relative text-white flex flex-col max-h-[90vh]">
                <button onClick={onClose} className="absolute top-2 right-3 text-yellow-200 hover:text-white text-3xl z-20">&times;</button>
                <h2 className="text-2xl sm:text-3xl font-bold text-yellow-300 p-6 text-center border-b-2 border-yellow-600/50 flex-shrink-0">คู่มือการเล่น</h2>

                <div className="p-6 flex-grow overflow-y-auto">
                    <AccordionSection title="พื้นฐานการเล่น" isOpen={openSection === 'gameplay'} onToggle={() => toggleSection('gameplay')}>
                        <Section title="เนื้อเรื่องหลัก (Main Story)">
                            <p>ยินดีต้อนรับสู่โลกแห่ง "ลิขิตรักตำหนักอ๋อง" ที่ทุกการตัดสินใจของคุณจะเป็นตัวกำหนดโชคชะตา คุณจะได้เริ่มต้นเส้นทางชีวิตผ่านหนึ่งในสามเรื่องราวหลัก:</p>
                            <ul className="list-disc list-inside pl-4 space-y-3 mt-3">
                                <li>
                                    <strong className='text-white'>จักรพรรดินี:</strong> เริ่มต้นในฐานะผู้ปกครองสูงสุดของแผ่นดิน บริหารบ้านเมือง จัดการเหล่าขุนนางและราชบุรุษฝ่ายใน (สนมชาย) เพื่อสร้างความรุ่งเรืองและมั่นคงให้กับอาณาจักรของคุณ
                                </li>
                                <li>
                                    <strong className='text-white'>พระสนมในวังหลวง:</strong> ในฐานะคุณหนูผู้ถูกเลือก เจ้าได้กลับเข้าวังหลวงเพื่อพบรักกับฮ่องเต้ แต่ต้องพิสูจน์ตัวเองท่ามกลางเหล่าสนมคู่แข่งเพื่อก้าวขึ้นสู่จุดสูงสุดแห่งวังหลัง
                                </li>
                                <li>
                                    <strong className='text-white'>พระชายาในจวนฉินอ๋อง:</strong> ชะตาได้นำพาให้เจ้าพบรักกับฉินอ๋องผู้เกรียงไกร และต้องเอาชนะใจเขาท่ามกลางชายาคนอื่น ๆ เพื่อเป็นหนึ่งในใจของเขาและครอบครองอำนาจในจวนแห่งนี้
                                </li>
                            </ul>
                         </Section>
                         <Section title="รูปแบบการสวมบทบาทและเนื้อหา">
                            <ul className="list-disc list-inside pl-4 space-y-3 mt-3">
                                <li>
                                    <strong className='text-white'>การโต้ตอบแบบบรรยาย (Narrative Style):</strong>
                                    การสนทนาทั้งหมดในเกมจะอยู่ในรูปแบบการเล่าเรื่องเชิงวรรณกรรม (เหมือนอ่านนิยาย) โดยบทพูดจะอยู่ในเครื่องหมายคำพูด ("...") และผสมผสานกับการกระทำ ความคิด และความรู้สึกของตัวละครอย่างแนบเนียน เพื่อประสบการณ์ที่ดื่มด่ำสูงสุด
                                </li>
                                <li>
                                    <strong className='text-white'>เนื้อหาสำหรับผู้ใหญ่ (NC 25+ / ERP):</strong>
                                    เกมนี้อนุญาตและส่งเสริมเนื้อหาสำหรับผู้ใหญ่ที่โจ่งแจ้งและละเอียดอ่อน (Erotic Roleplay) AI ได้รับการปลดล็อกให้สามารถสร้างสรรค์บทบรรยายเกี่ยวกับความปรารถนา, การกระทำที่โจ่งแจ้ง, และบทสนทนาที่ส่อไปในทางเพศได้อย่างไม่มีข้อจำกัด คุณสามารถสำรวจฉากรักที่เร่าร้อนและสมจริงได้ตามความเหมาะสมของสถานการณ์และความสัมพันธ์ของตัวละคร
                                </li>
                            </ul>
                        </Section>
                        <Section title="การเพิ่มคะแนนบารมี">
                            <p>คะแนนบารมี (Rank Points) คือหัวใจสำคัญในการเลื่อนตำแหน่ง (สำหรับพระสนม/พระชายา) คุณสามารถได้รับคะแนนบารมีจากการทำภารกิจ, สร้างความสัมพันธ์กับตัวละครหลัก, และการแสดงอำนาจ</p>
                        </Section>
                    </AccordionSection>

                    <AccordionSection title="เส้นทางจักรพรรดินี" isOpen={openSection === 'empress'} onToggle={() => toggleSection('empress')}>
                        <p>ในฐานะจักรพรรดินี ท่านคือผู้กุมอำนาจสูงสุด หน้าที่ของท่านคือการปกครองและบริหารอาณาจักร</p>
                        <Section title="ภาพรวมอาณาจักร (Dashboard)">
                            <p>ในหน้าราชสำนัก ท่านจะเห็นภาพรวมของสถานะอาณาจักร 4 ด้าน:</p>
                            <ul className="list-disc list-inside pl-4">
                                <li><strong>คลังหลวง:</strong> ทรัพย์สินเงินทองทั้งหมดของท่าน</li>
                                <li><strong>ขวัญกำลังใจ:</strong> ค่าบารมี (Prestige) ของท่าน ซึ่งส่งผลต่อความภักดีของขุนนางและราษฎร</li>
                                <li><strong>กำลังทหาร:</strong> แสนยานุภาพทางการทหารของอาณาจักร</li>
                                <li><strong>จำนวนราชบุรุษ:</strong> จำนวนสนมชายทั้งหมดในวังหลัง</li>
                            </ul>
                        </Section>
                         <Section title="ระบบขุนนางและราชบุรุษ">
                            <p>รายชื่อ "ขุนนางที่ปรึกษา" และ "ทำเนียบราชบุรุษฝ่ายใน" ในหน้าราชสำนักจะอัปเดตโดยอัตโนมัติเมื่อท่านใช้ "ลิขิตสวรรค์" เพื่อสร้าง, แต่งตั้ง, หรือเปลี่ยนแปลงสถานะของ NPC ที่เกี่ยวข้อง</p>
                        </Section>
                        <Section title="พระราชกรณียกิจ">
                             <ul className="list-disc list-inside pl-4 space-y-2">
                                <li><strong>ว่าราชการ:</strong> เปิดหน้าต่างให้ท่านเลือกขุนนางเพื่อเข้าร่วมการประชุมในท้องพระโรงผ่านระบบแชทกลุ่ม</li>
                                <li><strong>จัดการราชบุรุษ:</strong> เปิดหน้าต่างสำหรับบริหารจัดการสนมชาย ท่านสามารถเลื่อนยศ, ลดขั้น, กักขัง, หรือแม้กระทั่งประหารชีวิตได้</li>
                                <li><strong>การประหาร:</strong> เมื่อเลือกประหาร จะมีตัวเลือก 4 รูปแบบคือ ประทานผ้าแพร่, ประทานสุราพิษ, สั่งตัดหัว, และห้าม้าแยกร่าง</li>
                                <li><strong>เลือกผู้ถวายงานคืนนี้:</strong> เปิดหน้าต่างให้ท่านเลือกสนมชายคนโปรดเพื่อเข้าเฝ้าเป็นการส่วนพระองค์ในตำหนักจักรพรรดินีผ่านระบบแชทส่วนตัว</li>
                            </ul>
                        </Section>
                    </AccordionSection>

                    <AccordionSection title="ระบบขั้นสูง" isOpen={openSection === 'advanced'} onToggle={() => toggleSection('advanced')}>
                        <Section title="ระบบฝ่ายอิทธิพลและการจัดการ">
                            <p>เมื่อมีตำแหน่งสูงพอ คุณสามารถเลือกเข้าร่วมฝ่ายอำนาจ, ทำกิจกรรมเพื่อเพิ่มอิทธิพล, และบริหารจัดการวังหลังได้</p>
                        </Section>
                        <Section title="ระบบทายาท, การสืบทอด, และการศึกษา">
                            <p>ทายาทคืออนาคตของราชวงศ์! คุณสามารถจัดหลักสูตรการศึกษาและยกย่องทายาทเพื่อเพิ่ม 'คะแนนสืบทอด' หากทายาทของคุณได้ครองบัลลังก์ คุณจะได้รับการเลื่อนตำแหน่งเป็นไทเฮา/ไท่เฟย!</p>
                        </Section>
                        <Section title="ด้านมืดของวังหลัง">
                            <p className="text-red-300 font-bold">คำเตือน: ระบบต่อไปนี้มีความเสี่ยงสูงและอาจนำไปสู่ผลลัพธ์ที่รุนแรง</p>
                            <p>คุณสามารถสร้างความสัมพันธ์ต้องห้าม (คบชู้) หรือลอบทำร้ายคู่แข่งที่ตั้งครรภ์ได้ แต่หากถูกจับได้ อาจหมายถึงจุดจบของคุณ</p>
                        </Section>
                    </AccordionSection>

                    <AccordionSection title="ลำดับขั้น" isOpen={openSection === 'ranks'} onToggle={() => toggleSection('ranks')}>
                        <Section title="ลำดับขั้นพระสนมวังหลวง">
                            <ul className="space-y-1 text-sm">
                                {IMPERIAL_RANKS.map((rank) => (
                                    <li key={rank} className="flex justify-between items-center p-2 bg-red-900/40 rounded-md">
                                        <span className="font-semibold">{rank}</span>
                                        <span className="text-white/80">{IMPERIAL_RANK_REQUIREMENTS[rank as ImperialRank] === Infinity ? 'สูงสุด' : `${IMPERIAL_RANK_REQUIREMENTS[rank as ImperialRank].toLocaleString()} คะแนน`}</span>
                                    </li>
                                ))}
                            </ul>
                        </Section>
                        <Section title="ลำดับขั้นพระชายาจวนอ๋อง">
                           <ul className="space-y-1 text-sm">
                                {QIN_RANKS.map((rank) => (
                                    <li key={rank} className="flex justify-between items-center p-2 bg-red-900/40 rounded-md">
                                        <span className="font-semibold">{rank}</span>
                                        <span className="text-white/80">{QIN_RANK_REQUIREMENTS[rank as QinRank] === Infinity ? 'สูงสุด' : `${QIN_RANK_REQUIREMENTS[rank as QinRank].toLocaleString()} คะแนน`}</span>
                                    </li>
                                ))}
                            </ul>
                        </Section>
                         <Section title="ลำดับขั้นราชบุรุษฝ่ายใน (สนมชาย)">
                           <ul className="space-y-1 text-sm">
                                {JUN_RANKS.map((rank) => (
                                    <li key={rank} className="p-2 bg-red-900/40 rounded-md">
                                        <span className="font-semibold">{rank}</span>
                                    </li>
                                ))}
                            </ul>
                        </Section>
                    </AccordionSection>

                    <AccordionSection title="ตำแหน่งขุนนาง" isOpen={openSection === 'nobleman_titles'} onToggle={() => toggleSection('nobleman_titles')}>
                        {Object.values(NOBLEMAN_TITLES).map(category => (
                            <Section key={category.title} title={category.title}>
                                <ul className="space-y-2 text-sm">
                                    {category.ranks.map(rank => (
                                        <li key={rank.name} className="p-2 bg-red-900/40 rounded-md">
                                            <p className="font-semibold text-white">{rank.name}</p>
                                            <p className="text-white/80 mt-1">{rank.description}</p>
                                        </li>
                                    ))}
                                </ul>
                            </Section>
                        ))}
                    </AccordionSection>

                    <AccordionSection title="ตำแหน่งเชื้อพระวงศ์" isOpen={openSection === 'royal_titles'} onToggle={() => toggleSection('royal_titles')}>
                        {Object.values(ROYAL_TITLES).map(genderGroup => (
                            <div key={genderGroup.title}>
                                <h3 className="text-xl font-bold text-yellow-300 mt-4 mb-2">{genderGroup.title}</h3>
                                {Object.values(genderGroup.categories).map(category => (
                                    <Section key={category.title} title={category.title}>
                                        <ul className="space-y-2 text-sm">
                                            {category.ranks.map(rank => (
                                                <li key={rank.name} className="p-2 bg-red-900/40 rounded-md">
                                                    <p className="font-semibold text-white">{rank.name}</p>
                                                    <p className="text-white/80 mt-1">{rank.description}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </Section>
                                ))}
                            </div>
                        ))}
                    </AccordionSection>
                    
                    <AccordionSection title="ข้อมูลเกม" isOpen={openSection === 'info'} onToggle={() => toggleSection('info')}>
                        <Section title="ระบบเวลาและฤดูกาล">
                            <p>เกมใช้ระบบเวลาและฤดูกาลที่ดำเนินไปอย่างต่อเนื่องแม้คุณจะออฟไลน์ก็ตาม เมื่อคุณกลับเข้ามาในเกม ระบบจะคำนวณความคืบหน้าต่างๆ เช่น รายได้, การตั้งครรภ์ ให้โดยอัตโนมัติ</p>
                        </Section>
                         <Section title="การตายและโชคชะตา">
                            <p>หากตัวละครของคุณโชคร้ายถึงแก่ความตาย คุณสามารถเลือกที่จะ 'เกิดใหม่' เริ่มต้นทั้งหมด หรือ 'กลับชาติมาเกิด' ในร่างเดิมพร้อมบทลงโทษได้</p>
                         </Section>
                    </AccordionSection>
                </div>
            </div>
        </div>
    );
};

export default GuideModal;