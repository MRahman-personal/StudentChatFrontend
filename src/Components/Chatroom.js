import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Notifications from './Notifications'; 

const ChatRoom = ({ userInfo, chatMessages, setChatMessages, onSendMessage, handleRefresh, handleLike, onReset, users }) => {
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your message was liked by John" },
    { id: 2, message: "Alice has joined the chat" },
    { id: 3, message: "Your message has been pinned by the admin" },
    { id: 4, message: "New message from Bob" },
    { id: 5, message: "System maintenance scheduled for tonight" }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (message.trim()) {
      const newMessage = {
        userId: userInfo.id,
        message: message.trim(),
        timestamp: new Date().toISOString(),
        likes: 0,
        id: uuidv4(),
      };
      onSendMessage(newMessage);
      setMessage('');
    }
  };

  const handleLikeMessage = async (id) => {
    handleLike(id);
  };

  const handleMemberClick = (user) => {
    setSelectedUser(user);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedUser(null);
  };

  const handleRefreshChatroom = async () => {
    handleRefresh();
  };

  return (
    <div className="chatroom">
      <div className="sidebar">
        <h3>Members</h3>
        {users && users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} onClick={() => handleMemberClick(user)}>
              {user.name}
            </div>
          ))
        ) : (
          <p>No members available</p>
        )}
      </div>
      <div className="chatbox">
        <div className="message-list">
          {chatMessages.map((msg) => (
            <div key={msg.id} className="message">
              <strong>{msg.user}: </strong>
              {msg.text}
              <div>
                <button onClick={() => handleLikeMessage(msg.id)}>Like</button>
                <span>{msg.likes} {msg.likes === 1 ? 'like' : 'likes'}</span>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="message-form">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            required
            className="message-input"
          />
          <button type="submit" className="send-button">Send</button>
          <button type="button" onClick={handleRefreshChatroom} className="refresh-button">Refresh Chat</button>
        </form>
      </div>
      <Notifications data={notifications}/> 
    </div>
  );
};

export default ChatRoom;
