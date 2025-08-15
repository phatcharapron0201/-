
import React from 'react';
import { NPC, JunRank } from '../types';
import { JUN_RANKS } from '../constants';

type ManageAction = 'promote' | 'demote' | 'imprison';

interface MaleConsortManagementModalProps {
  npcs: NPC[];
  onManage: (consort: NPC, action: ManageAction) => void;
  onExecute: (consort: NPC) => void;
  onClose: () => void;
}

const MaleConsortManagementModal: React.FC<MaleConsortManagementModalProps> = ({ npcs, onManage, onExecute, onClose }) => {
  const consorts = npcs.filter(n => JUN_RANKS.some(rank => n.title.startsWith(rank.split(' ')[0])) && n.isAlive);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 animate-fade-in p-4">
      <div className="bg-red-950/80 backdrop-blur-md border-2 border-main rounded-lg shadow-2xl p-2 w-full max-w-4xl relative text-white max-h-[90vh] flex flex-col">
        <div className="bg-red-800/60 rounded-md p-6 relative flex-grow flex flex-col min-h-0">
          <button onClick={onClose} className="absolute top-2 right-3 text-yellow-200 hover:text-white text-3xl z-10">&times;</button>
          <h2 className="text-2xl sm:text-3xl font-bold text-yellow-300 drop-shadow-md text-center mb-6 flex-shrink-0">จัดการราชบุรุษฝ่ายใน</h2>
          <div className="flex-grow overflow-y-auto pr-2 space-y-4">
            {consorts.map(consort => {
              const currentRankIndex = JUN_RANKS.indexOf(consort.title as JunRank);
              const canPromote = currentRankIndex >= 0 && currentRankIndex < JUN_RANKS.length - 3; // Cannot promote to Junhou or Taishangjun
              const canDemote = currentRankIndex > 0;
              
              return (
                <div key={consort.id} className="p-4 bg-black/30 border border-yellow-700/50 rounded-lg flex flex-col sm:flex-row items-center gap-4">
                  <img src={consort.imageUrl} alt={consort.name} className="w-24 h-24 object-cover rounded-full border-2 border-yellow-600/50" />
                  <div className="flex-grow text-center sm:text-left">
                    <p className="text-xl font-bold text-yellow-100">{consort.name}</p>
                    <p className="text-md text-yellow-200">{consort.title}</p>
                    <p className="text-sm text-pink-300">ความโปรดปราน: {consort.favorability}</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full sm:w-auto">
                    <button onClick={() => onManage(consort, 'promote')} disabled={!canPromote} className="p-2 text-xs bg-green-700 hover:bg-green-600 rounded disabled:bg-gray-600 disabled:cursor-not-allowed">เลื่อนขั้น</button>
                    <button onClick={() => onManage(consort, 'demote')} disabled={!canDemote} className="p-2 text-xs bg-yellow-700 hover:bg-yellow-600 rounded disabled:bg-gray-600 disabled:cursor-not-allowed">ลดขั้น</button>
                    <button onClick={() => onManage(consort, 'imprison')} className="p-2 text-xs bg-blue-700 hover:bg-blue-600 rounded">กักขัง</button>
                    <button onClick={() => onExecute(consort)} className="p-2 text-xs bg-red-800 hover:bg-red-700 rounded">ประหาร</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaleConsortManagementModal;
