
import React from 'react';
import { MAID_TASKS } from '../constants';

interface IdleTaskModalProps {
  onAssign: (taskId: string, taskName: string) => void;
  onClose: () => void;
}

const IdleTaskModal: React.FC<IdleTaskModalProps> = ({ onAssign, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 animate-fade-in p-4">
      <div className="bg-red-950/80 backdrop-blur-md border-2 border-yellow-400 rounded-lg shadow-2xl p-2 w-full max-w-lg relative text-white max-h-[80vh] flex flex-col">
        <div className="bg-red-800/60 rounded-md p-6 relative flex-grow flex flex-col min-h-0">
          <button onClick={onClose} className="absolute top-2 right-3 text-yellow-200 hover:text-white text-3xl z-10">&times;</button>
          
          <div className="text-center mb-6 flex-shrink-0">
              <h2 className="text-3xl font-bold text-yellow-300 drop-shadow-md">มอบหมายงานให้สาวใช้</h2>
              <p className="text-yellow-100 mt-2">
                เลือกงานให้สาวใช้ทำระหว่างที่คุณไม่อยู่
              </p>
          </div>

          <div className="flex-grow overflow-y-auto pr-2">
            <div className="space-y-3">
              {MAID_TASKS.map(task => (
                <button
                  key={task.id}
                  onClick={() => onAssign(task.id, task.name)}
                  className="w-full p-4 bg-green-900/70 border border-green-600/50 rounded-lg flex flex-col text-left transition-all duration-200 hover:bg-green-800 hover:border-green-500 hover:scale-105"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-100 font-semibold text-lg">{task.name}</span>
                    <span className="text-xs text-gray-300">{task.durationHours} ชั่วโมง</span>
                  </div>
                  <p className="text-sm text-gray-200 mt-1">{task.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdleTaskModal;