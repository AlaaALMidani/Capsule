import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';

function Notification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const dataFromBackend = [
        { id: 1, content: 'Notification 1', read: false },
        { id: 2, content: 'Notification 2', read: false },
        { id: 3, content: 'Notification 3', read: true },
        { id: 4, content: 'Notification 4', read: true }
      ];
      setNotifications(dataFromBackend);
    }, 1000);
  }, []);

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center mt-10 p-5">

      {/* Notification Items */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-4 space-y-4">
        {notifications.length === 0 ? (
          <div className="w-full h-16 flex items-center justify-center text-gray-600">
            There are no new notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-center justify-between p-4 rounded-lg transition duration-200 
                ${notification.read ? 'bg-gray-200' : 'bg-green-100 border border-green-300'}`}
            >
              <span>{notification.content}</span>
              {!notification.read && <span className="text-green-500 font-bold">New</span>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notification;