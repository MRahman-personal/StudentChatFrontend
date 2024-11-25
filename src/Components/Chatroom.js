import React, { useState } from 'react';

const ChatRoom = ({ userInfo, onReset }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { user: 'Alice', text: 'Hey everyone! Looking forward to this course!', likes: 0 },
    { user: 'Bob', text: 'Has anyone started the assignment yet?', likes: 0 },
    { user: 'Charlie', text: 'I found some great resources for the project.', likes: 0 },
    { user: 'Diana', text: 'Let’s form a study group!', likes: 0 },
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, { user: userInfo.name, text: message, likes: 0 }]);
      setMessage('');
    }
  };

  const handleLikeMessage = (index) => {
    const newMessages = [...messages];
    newMessages[index].likes += 1; 
    setMessages(newMessages);
  };

  const handleMemberClick = (member) => {
    setSelectedUser(member);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedUser(null);
  };

  return (
    <div className="chatroom">
      
      <div className="sidebar">
        <h3>Members</h3>
        {['Alice', 'Bob', 'Charlie', 'Diana'].map((member) => (
          <div key={member} onClick={() => handleMemberClick(member)}>
            {member}
          </div>
        ))}
      </div>
      <div className="chatbox">
        
        <div className="message-list">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              <strong>{msg.user}: </strong>
              {msg.text}
              <div>
                <button onClick={() => handleLikeMessage(index)}>Like</button>
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
        </form>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>{selectedUser}</h2>
            <p>Major: Computer Science</p>
            <p>Year: Senior</p>
            <p>Degree: BS</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
