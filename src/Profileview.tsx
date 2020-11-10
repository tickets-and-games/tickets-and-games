import React, { useState, useEffect } from 'react';

function Profileview() {
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [rtime, setRtime] = useState('');
  const [tickets, setTickets] = useState('');
  useEffect(() => {
    // console.log(window.location.href); // TODO: parse to get user id
    const username = 'ak2253'; // TODO: get username from line 5
    const url = 'api/profileview/'.concat(username);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setUser(data.username);
        setRtime(data.registration_datetime);
        setTickets(data.total_tickets);
      });
  }, []);
  return (
    <div className="Profile">
      <div className="profile-name">{name}</div>
      <div className="profile-username">{user}</div>
      <div className="profile-data">{rtime}</div>
      <div className="profile-total-tickets">{tickets}</div>
    </div>
  );
}

export default Profileview;
