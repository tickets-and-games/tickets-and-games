import React, { useState, useEffect } from 'react';
import { List, ListItem } from '@material-ui/core';

function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.transactions);
      });
  }, []);
  return (
    <div className="Leaderboard">
      <h2>Leaderboard of Users</h2>
      <br />
      <b><p>Name - Ticket Count</p></b>
      <br />
      <List>
        {users.map((user) => (
          <ListItem>{user}</ListItem>
        ))}
      </List>
    </div>
  );
}

export default Leaderboard;
