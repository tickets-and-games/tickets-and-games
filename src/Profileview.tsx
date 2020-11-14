import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TicketHistory from './TicketHistory';

type Params = {
  userId: string;
};

function Profileview() {
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [rtime, setRtime] = useState('');
  const [tickets, setTickets] = useState('');
  const { userId } = useParams<Params>();
  const requestUrl = userId ? '/api/profile/'.concat(userId) : '/api/profile';

  useEffect(() => {
    fetch(requestUrl)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setUser(data.username);
        setRtime(data.registration_datetime);
        setTickets(data.total_tickets);
      })
      .catch((error) => (<div className="Profile">{error}</div>));
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
      <TicketHistory />
    </div>
  );
}

export default Profileview;
