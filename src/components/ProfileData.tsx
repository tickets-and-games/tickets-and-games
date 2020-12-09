import React from 'react';
import { Typography } from '@material-ui/core';

import TimeDisplay from './TimeDisplay';

import { useStyles } from '../styles';

type Profile = {
  is_public: boolean;
  name: string;
  profile_url: string;
  registration_datetime: string;
  text_color: string;
  total_tickets: number;
  username: string;
};

type Props = {
  profile: Profile;
};

function ProfileData(props: Props) {
  const { profile } = props;

  const classes = useStyles();

  return (
    <Typography variant="h5" className={classes.table}>
      <img
        id="profile"
        src={profile.profile_url}
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
        {profile.name}
      </div>
      <div className="profile-username" style={{ color: profile.text_color }}>
        Username:&nbsp;
        {profile.username}
      </div>
      <div className="profile-data">
        User Since:&nbsp;
        {profile.registration_datetime
          ? <TimeDisplay time={profile.registration_datetime} past /> : null}
      </div>
      <div className="profile-total-tickets">
        Total Tickets:&nbsp;
        {profile.total_tickets}
      </div>
    </Typography>
  );
}

export default ProfileData;
