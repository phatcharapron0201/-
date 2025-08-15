


import React, { useState, useRef, useEffect, useMemo } from 'react';
import { PlayerProfile, NPC, ChatMessage, MapLocation } from '../types';
import LoadingSpinner from './LoadingSpinner';
import FormattedDialogue from './FormattedDialogue';

interface ConversationViewProps {
  player: PlayerProfile;
  conversationLocation: MapLocation;
  participants: NPC[];
  history: ChatMessage[];
  onSendMessage: (message: string) => void;
  onEndConversation: () => void;
  isLoading: boolean;
  onDismissParticipant: (npcId: string) => void;
  onInviteMore: () => void;
  specialAction: { type: string; label: string; questId: string; } | null;
  onSpecialAction: (type: string, questId: string) => void;
  onOpenCustomOrderModal: () => void;
  onExecuteSecretCommand: (command: string) => void;
  onPlayerHealRequest: () => void;
}

const NpcAvatar: React.FC<{ name: string, imageUrl?: string }> = ({ name, imageUrl }) => {
    if (imageUrl) {
        return (
            <div className="w-10 h-10 rounded-full flex-shrink-0 shadow-md overflow-hidden border-2 border-yellow-800/60">
                <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
            </div>
        )
    }

    const initial = name.charAt(0).toUpperCase() || '?';
    
    // Simple hash function for consistent color
    const hashCode = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    };
    
    const colors = [
        'bg-yellow-800', 'bg-red-800', 'bg-blue-800', 
        'bg-purple-800', 'bg-green-800', 'bg-indigo-800'
    ];
    const color = colors[Math.abs(hashCode(name)) % colors.length];

    return (
        <div className={`w-10 h-10 rounded-full ${color} flex-shrink-0 flex items-center justify-center text-yellow-200 font-bold shadow-md`} title={name}>
            {initial}
        </div>
    );
};

interface MessageBubbleProps {
  msg: ChatMessage;
  player: PlayerProfile;
  isGroupChat: boolean;
  npc?: NPC;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ msg, player, isGroupChat, npc }) => {
    const senderIsPlayer = msg.sender === 'player';
    
    if (msg.sender === 'system') {
        return (
            <div className="py-2 px-4 text-center">
                <p className="text-xs text-yellow-200/70 italic bg-black/20 rounded-full px-4 py-1 inline-block">
                    {msg.text}
                </p>
            </div>
        );
    }
    
    const senderName = senderIsPlayer ? player.name : msg.senderName;
    const imageUrl = senderIsPlayer ? player.imageUrl : npc?.imageUrl;

    if (senderIsPlayer) {
        return (
             <div className="flex items-end gap-2 justify-end">
                <div className="flex flex-col items-end max-w-xs md:max-w-md">
                    <div className="px-4 py-2 rounded-2xl text-white bg-green-800/50 rounded-br-none">
                        <p className="text-base" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 px-2">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>
                <NpcAvatar name={senderName || '?'} imageUrl={imageUrl} />
            </div>
        );
    }

    // NPC Message
    return (
        <div className="flex items-end gap-2 justify-start">
            <NpcAvatar name={senderName || '?'} imageUrl={imageUrl} />
            <div className="flex flex-col items-start max-w-xs md:max-w-md">
                <p className="font-semibold text-base mb-1 text-purple-300">{senderName}</p>
                <div className="px-4 py-2 rounded-2xl text-white bg-indigo-900/50 rounded-bl-none">
                    <div className="text-base" style={{ whiteSpace: 'pre-wrap' }}>
                        <FormattedDialogue text={msg.text} />
                    </div>
                </div>
                <div className="text-xs text-gray-500 mt-1 px-2">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
        </div>
    );
};


const ConversationView: React.FC<ConversationViewProps> = ({ 
    player, 
    conversationLocation, 
    participants, 
    history, 
    onSendMessage, 
    onEndConversation, 
    isLoading, 
    onDismissParticipant, 
    onInviteMore,
    specialAction,
    onSpecialAction,
    onOpenCustomOrderModal,
    onExecuteSecretCommand,
    onPlayerHealRequest
}) => {
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const isUserScrolledUpRef = useRef(false);
    const [playerMessage, setPlayerMessage] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    
    const participantsMap = useMemo(() => new Map(participants.map(p => [p.id, p])), [participants]);
    const isWithMerchant = participants.length === 1 && participants[0].id === 'merchant_li';
    const isGroupChat = participants.length > 1;

    const canRequestHeal = participants.length === 1 && participants[0].id === 'physician_zhang' && player.health !== 'healthy';

    useEffect(() => {
        const container = chatContainerRef.current;
        if (container && !isUserScrolledUpRef.current) {
            container.scrollTop = container.scrollHeight;
        }
    }, [history, isLoading]);

    const handleScroll = () => {
        const container = chatContainerRef.current;
        if (container) {
            const isAtBottom = container.scrollHeight - container.clientHeight <= container.scrollTop + 5;
            isUserScrolledUpRef.current = !isAtBottom;
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!playerMessage.trim() || isLoading) return;

        if (playerMessage.startsWith('/')) {
            onExecuteSecretCommand(playerMessage.substring(1));
        } else {
            onSendMessage(playerMessage);
        }

        setPlayerMessage('');
        if(textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    };
    
    const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPlayerMessage(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    }

    return (
        <div className="w-full max-w-4xl mx-auto animate-fade-in flex flex-col p-4 h-full">
            <div className="bg-black/30 backdrop-blur-xl border-2 border-main rounded-lg shadow-2xl flex flex-col h-full overflow-hidden">
                {/* Header (Fixed) */}
                <div className="p-4 border-b-2 border-yellow-600/50 flex-shrink-0">
                    <div className="flex justify-between items-start mb-3">
                         <div>
                            <h2 className="text-2xl font-semibold text-yellow-200">{conversationLocation.name}</h2>
                            <p className="text-sm text-gray-300">{isGroupChat ? 'การสนทนากลุ่ม' : 'การสนทนาส่วนตัว'}</p>
                         </div>
                         <div className="flex gap-2">
                             <button
                                onClick={onEndConversation}
                                className="px-3 py-1.5 bg-red-800/80 text-white font-semibold text-xs rounded-lg transition-colors border border-red-600/80 hover:bg-red-700"
                            >
                                จบการสนทนา
                            </button>
                         </div>
                    </div>
                   
                    <div className="flex flex-wrap gap-2 items-center">
                         <span className='text-sm text-gray-300 mr-2'>สนทนากับ:</span>
                        {participants.map(guest => (
                            <div key={guest.id} className="bg-red-900/60 pl-2 pr-3 py-1 rounded-full flex items-center gap-2 border border-yellow-700/50">
                                {guest.imageUrl && (
                                    <img src={guest.imageUrl} alt={guest.name} className="w-6 h-6 rounded-full object-cover" />
                                )}
                                <span className="font-semibold text-white text-sm flex items-center">
                                    {guest.name}
                                    {guest.isPregnant && <span className="ml-2 text-base" title="กำลังตั้งครรภ์">🤰</span>}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Log (Scrollable) */}
                <div ref={chatContainerRef} onScroll={handleScroll} className="relative flex-grow p-4 overflow-y-auto bg-black/10">
                    <div 
                        className="absolute inset-0 bg-cover bg-center opacity-20"
                        style={{ backgroundImage: "url('https://i.pinimg.com/736x/e2/0a/3e/e20a3e1c0ee9777d3f6d4e9a6c23e866.jpg')" }}
                    ></div>
                    <div className="relative flex flex-col space-y-4">
                         {history.map((msg, index) => (
                             <MessageBubble key={`${msg.timestamp}_${index}`} msg={msg} player={player} isGroupChat={isGroupChat} npc={msg.senderId ? participantsMap.get(msg.senderId) : undefined}/>
                         ))}
                    
                        {isLoading && (
                           <div className="relative flex items-end gap-2 justify-start mt-4">
                               <NpcAvatar name="..." />
                               <div className="max-w-xs md:max-w-md p-3 rounded-2xl bg-indigo-900/60 rounded-bl-none">
                                   <LoadingSpinner />
                               </div>
                           </div>
                        )}
                    </div>
                </div>
                
                {/* Action/Input Area (Fixed) */}
                <div className="flex flex-col p-4 border-t-2 border-yellow-600/50 flex-shrink-0 bg-black/30">
                     {specialAction && (
                        <div className="mb-2">
                            <button
                                type="button"
                                onClick={() => onSpecialAction(specialAction.type, specialAction.questId)}
                                className="w-full bg-gradient-to-r from-green-700 to-green-600 text-white font-bold py-2 px-4 rounded-lg transition-all shadow-md hover:from-green-600 hover:to-green-500 animate-pulse border border-green-400"
                            >
                                {specialAction.label}
                            </button>
                        </div>
                    )}
                    {canRequestHeal && (
                         <div className="mb-2">
                            <button
                                type="button"
                                onClick={onPlayerHealRequest}
                                className="w-full bg-gradient-to-r from-blue-700 to-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all shadow-md hover:from-blue-600 hover:to-blue-500 animate-pulse border border-blue-400"
                            >
                                ขอรับการรักษา
                            </button>
                        </div>
                    )}
                     <form onSubmit={handleSubmit} className="flex items-end gap-2">
                        {isWithMerchant && (
                            <button
                                type="button"
                                onClick={onOpenCustomOrderModal}
                                disabled={isLoading}
                                className="h-12 flex-shrink-0 bg-purple-800 text-white font-semibold rounded-lg transition-colors duration-200 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-4"
                                title="สั่งทำไอเทมพิเศษ"
                            >
                                สั่งทำ
                            </button>
                        )}
                        <textarea
                            ref={textareaRef}
                            value={playerMessage}
                            onChange={handleTextareaInput}
                            placeholder="พูดคุย... (ใช้ / เพื่อใช้คำสั่งลับ)"
                            disabled={isLoading}
                            className="flex-grow bg-black/20 border-2 border-yellow-600/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors text-white placeholder-gray-400 resize-none max-h-40"
                            aria-label="พิมพ์ข้อความโต้ตอบ"
                            rows={1}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }
                            }}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !playerMessage.trim()}
                            className="h-12 w-12 flex-shrink-0 bg-gradient-to-br from-yellow-600 to-yellow-500 text-red-900 font-semibold rounded-full transition-all duration-200 ease-in-out transform hover:scale-105 disabled:from-gray-600 disabled:to-gray-500 disabled:text-white disabled:cursor-not-allowed disabled:scale-100 shadow-md flex items-center justify-center"
                            aria-label="ส่งข้อความ"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ConversationView;