import React, { useState } from 'react';
import './Styles.css';
import {
  Box, Button, ButtonGroup, Paper, Typography,
} from '@material-ui/core';

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

  return (
    <div className="Coinflip">
      <Paper className="gradient-border" style={{ background: '#310000', color: 'white' }}>
        <br />
        <Typography variant="h3">
          Coinflip
        </Typography>
        <br />
        <Typography variant="h5"> Enter an amount you would like to wager. </Typography>
        <Typography variant="h5">If you win, you win your bet amount. If you lose, you lose all your tickets you bet. </Typography>
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
          <ButtonGroup variant="text" color="default" aria-label="text primary button group">
            <Button variant="contained" type="button" style={{ right: '10px' }} onClick={onHeads}>Heads</Button>
            <Button variant="contained" type="button" onClick={onTails}>Tails</Button>
          </ButtonGroup>
        </Box>
        <br />
        <br />
        <p>{message}</p>
      </Paper>
    </div>
  );
}
export default Coinflip;
