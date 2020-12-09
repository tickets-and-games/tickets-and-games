import React, { Dispatch } from 'react';
import './Styles.css';
import {
  Box, Button, Paper, Typography,
} from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { MessageActions, ADD_MESSAGE } from '../actions/messageActions';

import { useLocalStorage } from '../utils/hooks';
import { humanizeSeconds } from '../utils/time';
import TimeDisplay from '../components/TimeDisplay';

function DailyReward() {
  const [nextReward, setNextReward] = useLocalStorage('next_reward', '');
  const messagesDispatch = useDispatch<Dispatch<MessageActions>>();

  const claim = () => {
    fetch('/api/reward/daily').then((response) => {
      response.json().then((data) => {
        if (response.status === 200) {
          messagesDispatch({
            type: ADD_MESSAGE,
            payload: {
              message: 'Successfully claimed daily reward!',
              type: 'success',
            },
          });
        } else {
          messagesDispatch({
            type: ADD_MESSAGE,
            payload: {
              message: `Reward available ${humanizeSeconds(new Date(data.next_reward), false).toLowerCase()}`,
              type: 'error',
            },
          });
        }
        setNextReward(data.next_reward);
      });
    });
  };

  return (
    <div className="DailyReward">
      <Paper className="gradient-border" style={{ background: '#310000', color: 'white' }}>
        <Typography variant="h3">
          Daily Reward
        </Typography>
        { nextReward ? (
          <Typography variant="h5">
            Next reward:&nbsp;
            <TimeDisplay time={nextReward} past={false} />
          </Typography>
        ) : null}

        <Typography variant="h5"> Come back daily to get 1,000 points! </Typography>
        <Typography variant="h6">Click the claim button to get your daily points!</Typography>
        <Box>
          <Button variant="contained" type="button" onClick={claim}>Claim</Button>
        </Box>
      </Paper>
    </div>
  );
}
export default DailyReward;
