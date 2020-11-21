import React, { useState } from 'react';
import './Coinflip.css';
import {
  Button, Paper, makeStyles, Typography,
} from '@material-ui/core';

function Skiball() {
  const [message, setMessage] = useState('');

  function play() {
    fetch('/api/skiball')
      .then((response) => {
        if (response.status === 200) {
          response.json()
            .then((dataResponse) => {
              const { amount } = dataResponse;
              setMessage(`You won ${amount} tickets!`);
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
  }

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
  // send over data with the head/tail, bet amount
  const classes = useStyles();
  return (
    <div className="Skiball">
      <Paper className={classes.root} style={{ position: 'relative', top: '20px' }} elevation={3}>
        <Typography variant="h3">
          Skiball
        </Typography>
        <br />
        <Typography variant="h5"> Click on roll ball and see where it lands! You win as many tickets as the point amount on the hole. </Typography>
        <Typography variant="h5">Takes 30 tickets to play!</Typography>
        <br />
        <img src="https://media0.giphy.com/media/26gsqnn8rZOSiVFfy/200.gif" alt="coinflip" className="coinflipgif" style={{ height: '250px', width: '300px' }} />
        <br />
        <br />
        <Typography variant="h6">Go ahead and roll:</Typography>
        <br />
        <Button variant="contained" type="button" onClick={play}>Roll!</Button>
        <br />
        <p>{message}</p>
        <br />
      </Paper>
    </div>
  );
}
export default Skiball;
