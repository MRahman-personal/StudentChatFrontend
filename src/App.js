import React, { useState, useEffect } from 'react';
import UserInfoForm from './Components/UserInfoForm';
import ChatRoom from './Components/Chatroom';
import './App.css';

const App = () => {
  const [userInfo, setUserInfo] = useState({});
  const [isUserInfoSubmitted, setIsUserInfoSubmitted] = useState(false);

  useEffect(() => {
    const cachedInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (cachedInfo) {
      setUserInfo(cachedInfo);
      setIsUserInfoSubmitted(true);
    }
  }, []);

  const handleUserInfoSubmit = (info) => {
    setUserInfo(info);
    localStorage.setItem('userInfo', JSON.stringify(info));
    setIsUserInfoSubmitted(true);
  };

  const handleReset = () => {
    setUserInfo({});
    localStorage.removeItem('userInfo');
    setIsUserInfoSubmitted(false);
  };

  const handleRefresh = () => {
    console.log('Chat refreshed!');
  };

  return (
    <div className="app">
      {!isUserInfoSubmitted ? (
        <UserInfoForm onSubmit={handleUserInfoSubmit} />
      ) : (
        <div>
          <h2>Student Chat</h2>
          <ChatRoom userInfo={userInfo} onReset={handleReset} />
          <div className="button-container">
            <button onClick={handleReset} className="reset-button">End chat</button>
            <button onClick={handleRefresh} className="refresh-button">Refresh Chat</button>
          </div>
        </div>
      )}
    </div>
  );
}  

export default App;
