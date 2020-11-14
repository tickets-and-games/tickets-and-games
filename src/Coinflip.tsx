import React, { useState } from 'react';
import './Coinflip.css';
import { Button, Paper, makeStyles } from '@material-ui/core';

function Coinflip() {
  const [bet, setBet] = useState(0);
  const [message, setMessage] = useState('');

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
        <h2>Coin Flip Game</h2>
        <br />
        <p>Enter an amount you would like to wager. </p>
        <p>If you win, you double your tickets. If you lose, you lose all your tickets you bet.</p>
        <img src="https://image.tutpad.com/tut/0/53/11_MONEDA.gif" alt="coinflip" className="coinflipgif" style={{ height: '200px', width: '400px' }} />
        <br />
        <p>Place a Bet in Number of Tickets:</p>
        <br />
        <input type="text" onChange={onChange} />
        <br />
        <br />
        <p>Choose heads or tails:</p>
        <br />
        <Button variant="contained" type="button" style={{ right: '10px' }} onClick={onHeads}>Heads</Button>
        <Button variant="contained" type="button" onClick={onTails}>Tails</Button>
        <br />
        <br />
        <p>{message}</p>
      </Paper>
    </div>
  );
}
export default Coinflip;
