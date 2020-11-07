import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [currentUser, setNewUser] = useState([]);
  
  useEffect(() => {
    fetch('/leaderboard').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  return (
    <div className="Leaderboard">
      <ol>
        <li>address</li>
      </ol>
    </div>
  );
}

export default Leaderboard;
