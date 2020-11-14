import React, { useState } from 'react';
import './Coinflip.css';
import { Button } from 'carbon-components-react';

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
      .then((response) => response.json())
      .then((dataResponse) => {
        const { amount, won } = dataResponse;
        const winText = won ? 'won' : 'lost';
        setMessage(`You ${winText} ${amount} tickets`);
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
      <Button type="button" style={{ right: '10px' }} onClick={onHeads}>Heads</Button>
      <Button type="button" onClick={onTails}>Tails</Button>
      <br />
      <br />
      <p>{message}</p>
    </div>
  );
}
export default Coinflip;
