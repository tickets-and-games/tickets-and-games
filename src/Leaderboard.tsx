import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/leaderboard')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.transactions);
      });
  }, []);
  return (
    <div className="Leaderboard">
      <ol>
        {users.map((user) => (
          <li>{user}</li>
        ))}
      </ol>
    </div>
  );
}

export default Leaderboard;
