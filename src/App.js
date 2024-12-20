import React, { useState, useEffect } from 'react';
import UserInfoForm from './Components/UserInfoForm';
import ChatRoom from './Components/Chatroom';
import './App.css';

const App = () => {
  const [userInfo, setUserInfo] = useState({});
  const [chatMessages, setChatMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [isUserInfoSubmitted, setIsUserInfoSubmitted] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const cachedInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (cachedInfo) {
      setUserInfo(cachedInfo);
      setIsUserInfoSubmitted(true);
      fetchChatMessages();
      fetchUsers();
    }
  }, []);

  const fetchChatMessages = async () => {
    handleRefresh()
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`https://studentchat-userservice-c7a8h5guhacxf3bv.eastus-01.azurewebsites.net/api/users`);
      if (!response.ok) throw new Error('Failed to fetch user data');
      const usersData = await response.json();
      setUsers(usersData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserInfoSubmit = async (info) => {
    setUserInfo(info);
    localStorage.setItem('userInfo', JSON.stringify(info));

    try {
      const response = await fetch(`https://studentchat-userservice-c7a8h5guhacxf3bv.eastus-01.azurewebsites.net/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
      });

      if (!response.ok) throw new Error('Failed to create user');
      setIsUserInfoSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    setUserInfo({});
    setChatMessages([]);
    localStorage.removeItem('userInfo');
    setIsUserInfoSubmitted(false);
  };

  const handleLikeMessage = async (id) => {
    try {
      const response = await fetch(`https://studentchat-chatservice-d3f5bhd7bqbgfkhd.eastus-01.azurewebsites.net/api/chat/like/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to like message');

      const updatedMessage = await response.json();
      setChatMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === id ? { ...msg, likes: updatedMessage.likes } : msg
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefresh = async () => {
    try {
      const chatResponse = await fetch('https://studentchat-chatservice-d3f5bhd7bqbgfkhd.eastus-01.azurewebsites.net/api/chat/messages');
      if (!chatResponse.ok) throw new Error('Failed to refresh chat messages');
      const newMessages = await chatResponse.json();
      setChatMessages(newMessages);

      const notificationsResponse = await fetch(`https://studentchat-chatservice-d3f5bhd7bqbgfkhd.eastus-01.azurewebsites.net/api/chat/notifications/${userInfo.id}`);
      if (!notificationsResponse.ok) throw new Error('Failed to refresh notifications');
      const notifications = await notificationsResponse.json();

      const transformedNotifications = notifications.map((notification, index) => ({
        id: `notif-${index}`,
        message: notification, 
      }));
      setNotifications(transformedNotifications);

    } catch (error) {
      console.error(error);
    }
  };

  const handleSendMessage = async (message) => {
    try {
      const response = await fetch('https://studentchat-chatservice-d3f5bhd7bqbgfkhd.eastus-01.azurewebsites.net/api/chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      if (!response.ok) throw new Error('Failed to send message');

      const savedMessage = await response.json();
      setChatMessages((prevMessages) => [...prevMessages, savedMessage]);
    } catch (error) {
      console.error(error);
    }
  };

  const buildChatMessages = () => {
    return chatMessages.map((msg) => {
      const user = users.find((u) => u.id === msg.userId);
      return {
        id: msg.id,
        user: user ? user.name : 'Unknown',
        userYear: user?.year || 'Unknown',
        userDegree: user?.degree || 'Unknown',
        text: msg.message,
        likes: msg.likes,
        timestamp: msg.timestamp,
      };
    });
  };

  return (
    <div className="app">
      {!isUserInfoSubmitted ? (
        <UserInfoForm onSubmit={handleUserInfoSubmit} />
      ) : (
        <div>
          <h2>Student Chat</h2>
          <ChatRoom
            userInfo={userInfo}
            chatMessages={buildChatMessages()}
            onSendMessage={handleSendMessage}
            users = {users}
            onReset={handleReset}
            handleLike={handleLikeMessage}
            handleRefresh={handleRefresh}
            notifications={notifications}
          />
          <div className="button-container">
            <button onClick={handleReset} className="reset-button">End chat</button>
            <button onClick={handleRefresh} className="refresh-button">Refresh Chat</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
