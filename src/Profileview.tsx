import React, { useState, useEffect } from 'react';
import Tickethistory from './Tickethistory';

function Profileview() {
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [rtime, setRtime] = useState('');
  const [tickets, setTickets] = useState('');
  useEffect(() => {
    // TODO: parse to get url
    const username = 'ak2253'; // TODO: get username from line 10
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
      <div className="profile-name">
        Name:&nbsp;
        {name}
      </div>
      <div className="profile-username">
        Username:&nbsp;
        { user}
      </div>
      <div className="profile-data">
        User Since:&nbsp;
        { rtime}
      </div>
      <div className="profile-total-tickets">
        Total Tickets:&nbsp;
        { tickets}
      </div>
      <Tickethistory />
    </div>
  );
}

export default Profileview;
