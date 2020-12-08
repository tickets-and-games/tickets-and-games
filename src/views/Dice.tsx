import React, { useState } from 'react';
import './Styles.css';
import {
  Box, Button, Paper, Typography,
} from '@material-ui/core';
import DiceImage from '../assets/image/dice1.gif';

function Dice() {
  const [bet, setBet] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  const onChange = (event) => {
    setMessage('');
    if (event.target.name === 'quantity') {
      setQuantity(event.target.value);
    } else {
      setBet(event.target.value);
    }
  };

  const play = () => {
    const data = { bet, quantity };
    fetch('/api/dice', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          response.json()
            .then((dataResponse) => {
              const { amount, won, value } = dataResponse;
              const winText = won ? 'won' : 'lost';
              setMessage(`The side drawn is ${value} and you have ${winText} ${amount} tickets because you selected ${bet}`);
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

  function onTails() {
    play();
  }
  // send over data with the head/tail, bet amount
  return (
    <div className="Coinflip">
      <Paper className="gradient-border" style={{ background: '#310000', color: 'white' }}>
        <Typography variant="h3">
          Dice
        </Typography>
        <br />
        <Typography variant="h5"> Enter the amount of Ticket and the side you want. </Typography>
        <Typography variant="h5"> If you win you will take 4 times the amount wagered. </Typography>
        <img src={DiceImage} alt="coinflip" className="coinflipgif" style={{ height: '200px' }} />
        <br />
        <Typography variant="h6">Entry number of tickets and select a side of dice:</Typography>
        <br />
        <input name="quantity" value={quantity} type="text" onChange={onChange} style={{ fontSize: '20px' }} />
        <br />
        <br />
        <select name="bet" value={bet} onChange={onChange} style={{ fontSize: '25px' }}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        <br />
        <br />
        <Box>
          <Button variant="contained" type="button" onClick={onTails}>Bet Now</Button>
        </Box>
        <br />
        <br />
        <p>{message}</p>
      </Paper>
    </div>
  );
}
export default Dice;
