import React, { useState } from 'react';
import { PlayerProfile, Maid, MaidTask } from '../types';

interface MaidManagementModalProps {
  player: PlayerProfile;
  tasks: MaidTask[];
  onAssignTask: (maidId: string, taskId: string) => void;
  onFireMaid: (maidId: string) => void;
  onClose: () => void;
  selectedMaidId: string | null;
  onSelectMaid: (id: string | null) => void;
}

const tierStyles = {
    'สามัญ': 'border-gray-500 bg-gray-800/50 text-gray-200',
    'ชำนาญ': 'border-blue-500 bg-blue-800/50 text-blue-200',
    'ยอดฝีมือ': 'border-purple-500 bg-purple-800/50 text-purple-200'
};

const MaidManagementModal: React.FC<MaidManagementModalProps> = ({ player, tasks, onAssignTask, onFireMaid, onClose, selectedMaidId, onSelectMaid }) => {
    const maids = player.maids;
    const activeAssignments = player.activeMaidAssignments;

    const selectedMaid = maids.find(m => m.id === selectedMaidId);
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 animate-fade-in p-4">
            <div className="bg-red-950/80 backdrop-blur-md border-2 border-main rounded-lg shadow-2xl p-2 w-full max-w-4xl relative text-white max-h-[90vh] flex flex-col">
                <div className="bg-red-800/60 rounded-md p-6 relative flex-grow flex flex-col min-h-0">
                    <button onClick={onClose} className="absolute top-2 right-3 text-yellow-200 hover:text-white text-3xl z-10">&times;</button>
                    <h2 className="text-2xl sm:text-3xl font-bold text-yellow-300 drop-shadow-md text-center mb-6 flex-shrink-0">จัดการสาวใช้</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 flex-grow gap-6 min-h-0">
                        {/* Maid List */}
                        <div className="flex flex-col min-h-0">
                            <h3 className="text-xl font-semibold text-yellow-100 mb-3 flex-shrink-0">สาวใช้ของคุณ ({maids.length})</h3>
                            <div className="flex-grow overflow-y-auto pr-2 space-y-3">
                                {maids.length > 0 ? maids.map(maid => {
                                    const assignment = activeAssignments[maid.id];
                                    const task = assignment ? tasks.find(t => t.id === assignment.taskId) : null;
                                    const isSelected = selectedMaidId === maid.id;
                                    
                                    return (
                                        <div key={maid.id} className={`p-3 border rounded-lg transition-all ${isSelected ? 'border-yellow-400 bg-yellow-500/10' : 'border-transparent'}`}>
                                            <div className={`p-3 border-2 rounded-lg ${tierStyles[maid.tier]}`}>
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-bold text-lg">{maid.name}</p>
                                                        <p className="text-xs">{maid.tier} {maid.skill ? `(${maid.skill})` : ''}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm">ภักดี: {maid.loyalty}/100</p>
                                                        <p className="text-xs">ค่าจ้าง: 💰{maid.wage}/เดือน</p>
                                                    </div>
                                                </div>
                                                {task ? (
                                                    <div className="mt-2 text-xs bg-black/30 p-2 rounded">
                                                        <p>กำลังทำ: <span className='font-bold'>{task.name}</span></p>
                                                        <p>เสร็จใน: <span className='font-bold'>{Math.ceil((assignment.endDate - Date.now()) / (1000 * 60))} นาที</span></p>
                                                    </div>
                                                ) : (
                                                    <p className="mt-2 text-xs text-green-300 italic">ว่าง</p>
                                                )}
                                                <div className="flex gap-2 mt-3">
                                                    <button 
                                                        onClick={() => onSelectMaid(maid.id)}
                                                        disabled={!!assignment}
                                                        className="flex-1 text-sm bg-blue-800 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded disabled:bg-gray-600 disabled:cursor-not-allowed">
                                                        มอบหมายงาน
                                                    </button>
                                                    <button onClick={() => onFireMaid(maid.id)} className="text-sm bg-red-800 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded">ไล่ออก</button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }) : <p className="italic text-gray-400 text-center mt-10">คุณยังไม่มีสาวใช้</p>}
                            </div>
                        </div>

                        {/* Task List */}
                        <div className="flex flex-col min-h-0">
                            <h3 className="text-xl font-semibold text-yellow-100 mb-3 flex-shrink-0">
                                {selectedMaid ? `มอบหมายงานให้ ${selectedMaid.name}` : 'เลือกสาวใช้เพื่อมอบหมายงาน'}
                            </h3>
                            <div className="flex-grow overflow-y-auto pr-2 space-y-3">
                               {selectedMaid ? tasks.map(task => {
                                   const hasRequiredSkill = !task.requiredSkill || selectedMaid.skill === task.requiredSkill;
                                   return (
                                        <button key={task.id} 
                                            onClick={() => onAssignTask(selectedMaid.id, task.id)}
                                            className={`w-full text-left p-3 rounded-lg border transition-all ${hasRequiredSkill ? 'bg-green-900/50 border-green-700/50 hover:bg-green-800/70' : 'bg-gray-800/50 border-gray-700/50'}`}
                                        >
                                            <div className="flex justify-between font-semibold">
                                                <span>{task.name}</span>
                                                <span>{task.durationHours} ชม.</span>
                                            </div>
                                            <p className="text-xs text-gray-300 mt-1">{task.description}</p>
                                            {task.requiredSkill && (
                                                <p className={`text-xs mt-1 font-bold ${hasRequiredSkill ? 'text-green-300' : 'text-red-400'}`}>
                                                    ต้องการ: {task.requiredSkill}
                                                </p>
                                            )}
                                        </button>
                                   );
                               }) : (
                                <p className="italic text-gray-400 text-center mt-10">โปรดเลือกสาวใช้ที่ว่างงานจากรายการด้านซ้าย</p>
                               )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaidManagementModal;