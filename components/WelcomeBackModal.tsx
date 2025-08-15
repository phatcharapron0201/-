
import React from 'react';
import { IdleReport } from '../types';

interface WelcomeBackModalProps {
  report: IdleReport;
  onClose: () => void;
}

const WelcomeBackModal: React.FC<WelcomeBackModalProps> = ({ report, onClose }) => {
  const hasEvents = report.daysPassed > 0 || report.maidTaskOutcomes.length > 0 || report.births.length > 0 || report.otherEvents.length > 0 || (report.offlineIncome || 0) > 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[100] animate-fade-in p-4">
      <div className="bg-red-950/90 backdrop-blur-lg border-2 border-yellow-400 rounded-xl shadow-2xl w-full max-w-lg relative text-white transform scale-100 animate-jump-in">
        <div className="relative p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-yellow-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] tracking-wider">
              ยินดีต้อนรับกลับ!
            </h2>
            <p className="text-lg text-yellow-100 mt-2">
              ระหว่างที่ท่านไม่อยู่ ได้มีเรื่องราวเกิดขึ้นมากมาย...
            </p>
          </div>

          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
            {report.daysPassed > 0 && (
                <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/50">
                    <h3 className="text-lg font-semibold text-blue-200 mb-2">เวลาผ่านไป:</h3>
                    <p className="text-white">{report.daysPassed} วัน</p>
                </div>
            )}
            
            {report.offlineIncome && report.offlineIncome > 0 && (
                <div className="bg-yellow-900/30 p-4 rounded-lg border border-yellow-500/50">
                    <h3 className="text-lg font-semibold text-yellow-200 mb-2">รายได้ขณะออฟไลน์:</h3>
                    <p className="text-white text-xl font-bold">💰 {report.offlineIncome.toLocaleString()}</p>
                </div>
            )}

            {report.maidTaskOutcomes.length > 0 && (
                <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/50">
                    <h3 className="text-lg font-semibold text-green-200 mb-2">ผลลัพธ์จากงานที่มอบหมาย:</h3>
                     <ul className="space-y-1 list-disc list-inside text-white">
                        {report.maidTaskOutcomes.map((outcome, i) => <li key={i}>{outcome}</li>)}
                    </ul>
                </div>
            )}
            
            {report.births.length > 0 && (
                 <div className="bg-pink-900/30 p-4 rounded-lg border border-pink-500/50">
                    <h3 className="text-lg font-semibold text-pink-200 mb-2">การถือกำเนิดใหม่:</h3>
                     <ul className="space-y-1 list-disc list-inside text-white">
                        {report.births.map((birth, i) => <li key={i}>{birth}</li>)}
                    </ul>
                </div>
            )}

            {report.otherEvents.length > 0 && (
                <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/50">
                    <h3 className="text-lg font-semibold text-purple-200 mb-2">เหตุการณ์อื่นๆ:</h3>
                    <ul className="space-y-1 list-disc list-inside text-white">
                        {report.otherEvents.map((event, i) => <li key={i}>{event}</li>)}
                    </ul>
                </div>
            )}
            
            {!hasEvents && (
                 <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-600/50">
                    <p className="text-gray-300 italic text-center">ทุกอย่างดูสงบสุขดี...</p>
                </div>
            )}
          </div>
          
          <button
            onClick={onClose}
            className="w-full mt-8 py-3 bg-gradient-to-b from-yellow-600 to-yellow-500 text-red-900 font-bold rounded-lg shadow-lg transform transition-transform hover:scale-105 border-2 border-yellow-400"
          >
            รับทราบ
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBackModal;
