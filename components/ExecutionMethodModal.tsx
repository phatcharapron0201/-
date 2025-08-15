
import React from 'react';
import { NPC } from '../types';

export type ExecutionMethod = 'silk' | 'poison' | 'behead' | 'dismember';

interface ExecutionMethodModalProps {
  target: NPC;
  onSelect: (method: ExecutionMethod) => void;
  onClose: () => void;
}

const methods: { id: ExecutionMethod; name: string; description: string; }[] = [
    { id: 'silk', name: 'ประทานผ้าแพร่', description: 'มอบผ้าแพร่ขาวให้แขวนคอปลิดชีพตนเอง เป็นการประหารที่ไว้หน้าที่สุด' },
    { id: 'poison', name: 'ประทานสุราพิษ', description: 'มอบสุราจอกงามที่เจือยาพิษร้ายแรง ให้จบชีวิตอย่างเงียบงัน' },
    { id: 'behead', name: 'สั่งตัดหัว', description: 'บทลงโทษที่เฉียบขาดและน่าหวาดหวั่นต่อผู้พบเห็น' },
    { id: 'dismember', name: 'ห้าม้าแยกร่าง', description: 'การประหารที่โหดเหี้ยมที่สุดสำหรับผู้ทรยศแผ่นดิน' },
];

const ExecutionMethodModal: React.FC<ExecutionMethodModalProps> = ({ target, onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-fade-in p-4">
      <div className="bg-gray-900/90 backdrop-blur-lg border-2 border-red-800 rounded-xl shadow-2xl w-full max-w-xl relative text-white transform scale-100 animate-jump-in">
        <button onClick={onClose} className="absolute top-2 right-3 text-gray-400 hover:text-white text-3xl z-10">&times;</button>
        <div className="relative p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-red-400 drop-shadow-md tracking-wider">
              เลือกวิธีการประหาร
            </h2>
            <p className="text-lg text-gray-300 mt-2">
              สำหรับ <span className="font-bold text-white">{target.name}</span>
            </p>
          </div>
          <div className="space-y-3">
            {methods.map(method => (
              <button
                key={method.id}
                onClick={() => onSelect(method.id)}
                className="w-full text-left p-4 bg-red-900/70 text-white rounded-lg shadow-md transform transition-all hover:scale-105 hover:bg-red-800/90 border border-red-700/60"
              >
                <h3 className="font-semibold text-lg text-red-200">{method.name}</h3>
                <p className="text-xs text-gray-300 mt-1">{method.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutionMethodModal;
