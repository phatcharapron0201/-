import React from 'react';
import { PlayerProfile, CareerPath } from '../types';

export type ViewType = 'map' | 'characters' | 'profile' | 'overview' | 'shop' | 'conversation' | 'guide' | 'management' | 'secret_command' | 'inventory' | 'court';

interface MenuBarProps {
  player: PlayerProfile;
  onNavigate: (view: ViewType) => void;
  activeView: ViewType;
}

const MenuBar: React.FC<MenuBarProps> = ({ player, onNavigate, activeView }) => {
    const baseStyle = "flex-1 flex flex-col items-center justify-center px-1 transition-colors duration-200 text-sm font-semibold";
    const activeStyle = "bg-yellow-400/20 text-yellow-200";
    const inactiveStyle = "text-gray-200 hover:bg-yellow-400/10 hover:text-yellow-300";
    const currentActiveView = activeView === 'conversation' ? null : activeView;

    const allViews: { id: ViewType; label: string; icon: JSX.Element; condition?: boolean }[] = [
        { id: 'overview', label: 'ภาพรวม', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>, condition: player.career !== CareerPath.Empress },
        { id: 'court', label: 'ราชสำนัก', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 19.143A2 2 0 013 17.429V12a2 2 0 012-2h14a2 2 0 012 2v5.429a2 2 0 01-2 1.714L12 16l-7 3.143zM5 10V7a2 2 0 012-2h10a2 2 0 012 2v3M9 10V7M15 10V7" /></svg>, condition: player.career === CareerPath.Empress },
        { id: 'map', label: 'สถานที่', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13v-6m0 6l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 3v6m6-6v6" /></svg> },
        { id: 'characters', label: 'ตัวละคร', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-1.78-4.125" /></svg> },
        { id: 'shop', label: 'ร้านค้า', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg> },
        { id: 'secret_command', label: 'ลิขิตสวรรค์', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
        { id: 'management', label: 'จัดการ', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>, condition: player.career !== CareerPath.Empress },
        { id: 'profile', label: 'โปรไฟล์', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
    ];
    
    const visibleViews = allViews.filter(view => view.condition !== false);

    return (
        <nav className="flex-shrink-0 bg-bars backdrop-blur-sm border-t-2 border-bars shadow-lg flex justify-around h-16 sm:h-20" role="navigation" aria-label="Main navigation">
            {visibleViews.map(view => (
                <button 
                    key={view.id}
                    onClick={() => onNavigate(view.id)} 
                    className={`${baseStyle} ${currentActiveView === view.id ? activeStyle : inactiveStyle}`}
                    aria-current={currentActiveView === view.id ? 'page' : undefined}
                    aria-label={view.label}
                    title={view.label}
                >
                    {view.icon}
                </button>
            ))}
        </nav>
    );
};

export default MenuBar;