import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Styles.css';
import {
  Paper, CircularProgress, Typography,
} from '@material-ui/core';
import TicketHistory from '../components/TicketHistory';
import TicketTransfer from '../components/TicketTransfer';
import ProfileData from '../components/ProfileData';

type Params = {
  userId: string;
};

type Profile = {
  is_public: boolean;
  name: string;
  profile_url: string;
  registration_datetime: string;
  text_color: string;
  total_tickets: number;
  username: string;
};

function Profileview() {
  const [profile, setProfile] = useState<Profile|null>(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams<Params>();
  const requestUrl = userId ? '/api/profile/'.concat(userId) : '/api/profile/';

  useEffect(() => {
    fetch(requestUrl)
      .then((res) => res.json().then((data) => {
        if (res.status === 200) {
          setProfile(data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      }));
  }, [userId]);

  if (loading) {
    return (
      <div className="Profile">
        <Paper className="gradient-border" style={{ background: '#310000', color: `${profile ? profile.text_color : 'white'}` }}>
          <CircularProgress color="secondary" />
        </Paper>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="Profile">
        <Paper className="gradient-border" style={{ background: '#310000', color: 'white' }}>
          <Typography variant="h4" component="h4">
            Profile is private
          </Typography>
          <TicketTransfer />
        </Paper>
      </div>
    );
  }

  return (
    <div className="Profile">
      <Paper className="gradient-border" style={{ background: '#310000', color: 'white' }}>
        <ProfileData profile={profile} />
        <TicketTransfer />
        <TicketHistory />
      </Paper>
    </div>
  );
}

export default Profileview;
