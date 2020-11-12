import React, { useState, useEffect } from 'react';
// import OrderedList from '../OrderedList';
// import ListItem from '../ListItem';
// import mdx from './OrderedList.mdx';
import { OrderedList, ListItem } from 'carbon-components-react';

function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data.transactions);
      });
  }, []);
  return (
    <div className="Leaderboard">
      <h2>Leaderboard of Users</h2>
      <br />
      <b><p>Name - Ticket Count</p></b>
      <OrderedList>
        {users.map((user) => (
          <ListItem>{user}</ListItem>
        ))}
      </OrderedList>
    </div>
  );
}

export default Leaderboard;
