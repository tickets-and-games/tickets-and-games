import React, { useState } from 'react';
import './Coinflip.css';
import {
  Box, Button, Paper, Typography,
} from '@material-ui/core';

import { useStyles } from '../styles';

function Coinflip() {
  const [bet, setBet] = useState(0);
  const [message, setMessage] = useState('');

  const onChange = (event) => {
    setBet(event.target.value);
  };

  const play = (side: 'Tails' | 'Heads') => {
    const data = { side, bet };
    fetch('/api/coinflip', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          response.json()
            .then((dataResponse) => {
              const { amount, won } = dataResponse;
              const winText = won ? 'won' : 'lost';
              setMessage(`You ${winText} ${amount} tickets`);
            });
        } else {
          response.json().then((error) => {
            setMessage(`An error occured: ${error.error}`);
          });
        }
      })
      .catch((error) => {
        setMessage(`An error occured: ${error}`);
      });
  };

  function onHeads() {
    play('Heads');
  }

  function onTails() {
    play('Tails');
  }
  // send over data with the head/tail, bet amount

  const classes = useStyles();
  return (
    <div className="Coinflip">
      <Paper className={classes.root}>
        <Typography variant="h3">
          Coinflip
        </Typography>
        <br />
        <Typography variant="h5"> Enter an amount you would like to wager. </Typography>
        <Typography variant="h5">If you win, you double your tickets. If you lose, you lose all your tickets you bet. </Typography>
        <img src="https://image.tutpad.com/tut/0/53/11_MONEDA.gif" alt="coinflip" className="coinflipgif" style={{ height: '200px', width: '400px' }} />
        <br />
        <Typography variant="h6">Place a Bet in Number of Tickets:</Typography>
        <br />
        <input type="text" onChange={onChange} />
        <br />
        <br />
        <Typography variant="h6">Choose heads or tails:</Typography>
        <br />
        <Box>
          <Button variant="contained" type="button" style={{ right: '10px' }} onClick={onHeads}>Heads</Button>
          <Button variant="contained" type="button" onClick={onTails}>Tails</Button>
        </Box>
        <br />
        <br />
        <p>{message}</p>
      </Paper>
    </div>
  );
}
export default Coinflip;
