
import React, { useState } from 'react';
import { SHOP_ITEMS } from '../constants';
import { InventoryItem } from '../types';

interface ShopViewProps {
    playerMoney: number;
    onPurchase: (item: Omit<InventoryItem, 'instanceId'>) => void;
}

type ShopCategory = 'consumable' | 'gift' | 'artifact';

const ShopView: React.FC<ShopViewProps> = ({ playerMoney, onPurchase }) => {
    const [activeTab, setActiveTab] = useState<ShopCategory>('consumable');

    const consumableItems = SHOP_ITEMS.filter(item => item.type === 'consumable');
    const giftItems = SHOP_ITEMS.filter(item => item.type === 'gift');
    const artifactItems = SHOP_ITEMS.filter(item => item.type === 'artifact');
    
    const itemsToShow = (() => {
        switch (activeTab) {
            case 'consumable': return consumableItems;
            case 'gift': return giftItems;
            case 'artifact': return artifactItems;
            default: return [];
        }
    })();
    
    const TabButton: React.FC<{ tabId: ShopCategory; children: React.ReactNode }> = ({ tabId, children }) => (
        <button
            onClick={() => setActiveTab(tabId)}
            className={`flex-1 py-3 text-lg font-semibold transition-colors duration-200 border-b-4 ${
                activeTab === tabId
                ? 'border-yellow-400 text-yellow-300'
                : 'border-transparent text-gray-400 hover:text-yellow-200'
            }`}
        >
            {children}
        </button>
    );

    return (
        <div className="w-full max-w-6xl mx-auto p-4 animate-fade-in h-full flex flex-col">
            <div className="bg-red-950/60 backdrop-blur-xl border-2 border-yellow-500/70 rounded-lg shadow-lg flex flex-col h-full">
                <div className="flex-shrink-0">
                    <div className="p-6">
                        <h1 className="text-3xl sm:text-4xl font-bold text-yellow-300 mb-2 text-center drop-shadow-md">
                            ตลาดหลวง
                        </h1>
                        <p className="text-center text-yellow-100/80 mb-6">ยินดีต้อนรับสู่ตลาดหลวง! แหล่งรวมของล้ำค่าจากทั่วทุกสารทิศ</p>
                    </div>
                    
                    <div className="flex justify-around border-y-2 border-yellow-800/50">
                        <TabButton tabId="consumable">ไอเทมเพิ่มสถานะ</TabButton>
                        <TabButton tabId="gift">ของขวัญ</TabButton>
                        <TabButton tabId="artifact">สมบัติล้ำค่า</TabButton>
                    </div>
                </div>

                <div className="p-6 flex-grow overflow-y-auto">
                    {itemsToShow.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {itemsToShow.map(item => {
                                const canAfford = playerMoney >= (item.price || 0);
                                const isArtifact = item.type === 'artifact';
                                return (
                                    <div key={item.id} className={`
                                        bg-red-900/50 rounded-lg shadow-lg flex flex-col justify-between transition-all duration-300 border-2 
                                        ${isArtifact ? 'border-purple-400 shadow-purple-500/20' : 'border-yellow-700/50'}
                                    `}>
                                        <div className="p-5 flex-grow flex flex-col text-center">
                                            <div className="text-5xl my-4">{item.emoji}</div>
                                            <h2 className={`text-lg font-bold mb-2 ${isArtifact ? 'text-purple-300' : 'text-yellow-200'}`}>{item.name}</h2>
                                            <p className="text-yellow-100/80 text-xs mb-4 flex-grow">{item.description}</p>
                                            {item.effect && (
                                                <p className={`font-semibold text-sm mb-4 capitalize ${isArtifact ? 'text-purple-300' : 'text-green-300'}`}>
                                                    {item.effect.stat} +{item.effect.value}
                                                </p>
                                            )}
                                             {item.favorabilityEffect && (
                                                <p className="text-pink-300 font-semibold text-sm mb-4 capitalize">
                                                    ความพึงพอใจ +{item.favorabilityEffect}
                                                </p>
                                            )}
                                        </div>
                                        <div className="p-4 bg-black/30 mt-auto flex flex-col items-center justify-center gap-2">
                                            <div className="flex items-center gap-2 text-yellow-300 text-lg font-bold">
                                                <span>💰</span>
                                                <span>{item.price?.toLocaleString()}</span>
                                            </div>
                                            <button
                                                onClick={() => onPurchase(item)}
                                                disabled={!canAfford}
                                                className={`w-full font-bold py-2 px-4 rounded-lg transition-colors duration-200 border text-sm ${
                                                    canAfford
                                                    ? `text-white ${isArtifact ? 'bg-purple-800/80 hover:bg-purple-700 border-purple-600/80' : 'bg-green-800/80 hover:bg-green-700 border-green-600/80'}`
                                                    : 'bg-gray-700/50 text-gray-400 border-gray-600/80 cursor-not-allowed'
                                                }`}
                                            >
                                                {canAfford ? 'ซื้อ' : 'เงินไม่พอ'}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                         <div className="flex items-center justify-center py-10">
                            <p className="text-gray-300 text-lg italic">ไม่มีสินค้าในหมวดนี้</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShopView;