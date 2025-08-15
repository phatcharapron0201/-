import React from 'react';
import { Quest, Objective, QuestDifficulty, QuestCategory } from '../types';

const ObjectiveItem: React.FC<{ objective: Objective, isActive: boolean }> = ({ objective, isActive }) => {
    const textColor = isActive ? 'text-yellow-200' : (objective.isCompleted ? 'text-gray-400' : 'text-gray-500');
    const icon = isActive ? '▶' : (objective.isCompleted ? '✔' : '☐');
    const iconColor = isActive ? 'text-yellow-400' : (objective.isCompleted ? 'text-green-400' : 'text-gray-600');

    return (
        <li className={`flex items-start gap-2 transition-colors duration-300 ${isActive ? 'font-semibold' : ''}`}>
            <span className={`w-4 pt-1 ${iconColor}`}>{icon}</span>
            <span className={`${textColor} ${objective.isCompleted ? 'line-through' : ''}`}>
                {objective.description}
            </span>
        </li>
    );
};

const difficultyStyles: Record<QuestDifficulty, { border: string; bg: string; text: string }> = {
    'ง่าย': { border: 'border-green-400', bg: 'bg-green-500/20', text: 'text-green-300' },
    'ปานกลาง': { border: 'border-yellow-400', bg: 'bg-yellow-500/20', text: 'text-yellow-300' },
    'ยาก': { border: 'border-red-400', bg: 'bg-red-500/20', text: 'text-red-300' },
};

const categoryStyles: Record<QuestCategory, string> = {
    'main': 'text-yellow-300',
    'daily': 'text-blue-300',
};
const categoryText: Record<QuestCategory, string> = {
    'main': 'เควสหลัก',
    'daily': 'เควสรายวัน',
};


const QuestCard: React.FC<{ quest: Quest }> = ({ quest }) => {
    const styles = difficultyStyles[quest.difficulty];
    const activeObjectiveIndex = quest.objectives.findIndex(obj => !obj.isCompleted);

    return (
        <div className={`bg-quest-card p-4 rounded-lg border-l-4 ${styles.border} shadow-lg`}>
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h4 className="text-lg font-semibold text-yellow-200">{quest.title}</h4>
                    <span className={`text-xs font-bold ${categoryStyles[quest.category]}`}>{categoryText[quest.category]}</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${styles.bg} ${styles.text}`}>
                        {quest.difficulty}
                    </span>
                </div>
            </div>
            <p className="text-gray-300 text-sm mt-1 mb-3">{quest.description}</p>
            <ul className="space-y-2 text-sm">
                {quest.objectives.map((obj, i) => (
                    <ObjectiveItem 
                        key={i} 
                        objective={obj} 
                        isActive={i === activeObjectiveIndex}
                    />
                ))}
            </ul>
        </div>
    );
};


const QuestTracker: React.FC<{ quests: Quest[] }> = ({ quests }) => {
  const activeQuests = quests.filter(q => q.status === 'active');
  const mainQuests = activeQuests.filter(q => q.category === 'main');
  const dailyQuests = activeQuests.filter(q => q.category === 'daily');


  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in h-full flex flex-col p-4">
        <div className="bg-card-questlog backdrop-blur-sm border-2 border-card-questlog rounded-lg shadow-lg p-6 flex flex-col h-full">
            <h2 className="text-2xl sm:text-3xl font-bold text-yellow-300 mb-6 text-center drop-shadow-md flex-shrink-0">ภารกิจปัจจุบัน</h2>
            <div className="space-y-6 flex-grow overflow-y-auto pr-2">
                {activeQuests.length === 0 ? (
                    <div className="flex items-center justify-center py-10">
                        <p className="text-gray-300 text-lg italic">ไม่มีภารกิจที่ต้องทำในขณะนี้</p>
                    </div>
                ) : (
                    <>
                        {mainQuests.length > 0 && <div className="space-y-4">{mainQuests.map(q => <QuestCard key={q.id} quest={q} />)}</div>}
                        {dailyQuests.length > 0 && <div className="space-y-4">{dailyQuests.map(q => <QuestCard key={q.id} quest={q} />)}</div>}
                    </>
                )}
            </div>
        </div>
    </div>
  );
};

export default QuestTracker;