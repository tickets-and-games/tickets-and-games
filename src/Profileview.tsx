import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, makeStyles } from '@material-ui/core';
import TicketHistory from './TicketHistory';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    top: '40px',
    backgroundColor: '#ADD8E6',
    width: '70%',
    textAlign: 'center',
    margin: 'auto',
  },
}));

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
  const classes = useStyles();
  return (
    <div className="Profile">
      <Paper className={classes.root}>
        <br />
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
        <br />
      </Paper>
    </div>
  );
}

export default Profileview;
