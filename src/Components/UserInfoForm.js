import React, { useState } from 'react';


const UserInfoForm = ({ onSubmit, onReset }) => {
  const [name, setName] = useState('');
  const [major, setMajor] = useState('');
  const [year, setYear] = useState('');
  const [degree, setDegree] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, major, year, degree });
  };

  return (
    <div className="userinfo-form"> {}
      <form onSubmit={handleSubmit}>
        <h2>Enter Your Info</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Major" value={major} onChange={(e) => setMajor(e.target.value)} required />
        <input type="text" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} required />
        <input type="text" placeholder="Degree Program" value={degree} onChange={(e) => setDegree(e.target.value)} required />
        <button type="submit">Join Chat</button>
      </form>
    </div>
  );
};

export default UserInfoForm;
