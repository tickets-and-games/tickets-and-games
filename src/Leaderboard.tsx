import React, { useState, useEffect } from 'react';
// import OrderedList from '../OrderedList';
// import ListItem from '../ListItem';
// import mdx from './OrderedList.mdx';

function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((res) => res.json())
      .then((data) => {
        console.log(data.transactions);
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
