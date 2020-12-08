import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Styles.css';
import {
  Button, Paper, Typography, CircularProgress,
} from '@material-ui/core';
import TicketHistory from '../components/TicketHistory';
import TicketTransfer from '../components/TicketTransfer';
import TimeDisplay from '../components/TimeDisplay';

import { useStyles } from '../styles';

type Params = {
  userId: string;
};

function Profileview() {
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [rtime, setRtime] = useState('');
  const [tickets, setTickets] = useState('');
  const [profileURL, setProfileURL] = useState('');
  const [loading, setLoading] = useState(true);
  const { userId } = useParams<Params>();
  const requestUrl = userId ? '/api/profile/'.concat(userId) : '/api/profile/';

  useEffect(() => {
    fetch(requestUrl)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setUser(data.username);
        setRtime(data.registration_datetime);
        setTickets(data.total_tickets);
        setColor(data.text_color);
        setProfileURL(data.profile_url);
        setLoading(false);
      })
      .catch((error) => (<div className="Profile">{error}</div>));
  }, []);
  const classes = useStyles();
  return (
    <div className="Profile">
      <Paper className="gradient-border" style={{ background: '#310000', color: 'white' }}>
        <br />
        {loading ? <CircularProgress color="secondary" /> : null}
        <Typography variant="h5" className={classes.table}>
          <img
            id="profile"
            src={profileURL}
            alt="profile"
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              borderCollapse: 'separate',
              border: '1px solid white',
            }}
          />
          <div className="profile-name">
            Name:&nbsp;
            {name}
          </div>
          <div className="profile-username">
            Username:&nbsp;
            {user}
          </div>
          <div className="profile-data">
            User Since:&nbsp;
            {rtime ? <TimeDisplay time={rtime} /> : null}
          </div>
          <div className="profile-total-tickets">
            Total Tickets:&nbsp;
            {tickets}
          </div>
          <br />
          <TicketTransfer />
          <br />
          <Button size="large" variant="contained" component={Link} to="/purchase">Purchase Tickets</Button>
          <br />
          <br />
          <TicketHistory />
        </Typography>
        <br />
      </Paper>
    </div>
  );
}

export default Profileview;
