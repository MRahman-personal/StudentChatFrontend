import React from 'react';

const MemberInfoPopup = ({ member, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>{member.name}'s Info</h3>
        <p><strong>Major:</strong> {member.major}</p>
        <p><strong>Year:</strong> {member.year}</p>
        <p><strong>Degree Program:</strong> {member.degree}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MemberInfoPopup;
