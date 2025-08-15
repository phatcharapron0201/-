
import React, { useEffect, useState } from 'react';
import { NotificationData, NotificationType } from '../types';

interface NotificationContainerProps {
  notifications: NotificationData[];
  onClose: (id: number) => void;
}

const typeStyles = {
    info: "bg-green-600/90",
    event: "bg-purple-800/90 border-2 border-purple-400/80 transform scale-105",
};

const NotificationItem: React.FC<{ notification: NotificationData, onClose: (id: number) => void }> = ({ notification, onClose }) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const duration = notification.type === 'event' ? 6000 : 3000;
    
    const closeTimer = setTimeout(() => {
        setExiting(true);
        // Wait for animation to finish before removing from DOM
        setTimeout(() => onClose(notification.id), 500);
    }, duration);

    return () => clearTimeout(closeTimer);
  }, [notification, onClose]);

  const animationClass = exiting ? 'animate-fade-out-right' : 'animate-fade-in-down';

  return (
    <div 
      className={`text-white py-3 px-5 rounded-lg shadow-lg transition-all duration-300 ${typeStyles[notification.type]} ${animationClass}`}
    >
      {notification.message}
    </div>
  );
};


const NotificationContainer: React.FC<NotificationContainerProps> = ({ notifications, onClose }) => {
  return (
    <div className="fixed top-5 right-5 z-[200] flex flex-col items-end gap-3">
      {notifications.map(notification => (
        <NotificationItem 
            key={notification.id} 
            notification={notification} 
            onClose={onClose} 
        />
      ))}
    </div>
  );
};

export default NotificationContainer;