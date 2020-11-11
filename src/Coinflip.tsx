import React, { useState, useEffect } from 'react';
import './Coinflip.css';
// import OrderedList from '../OrderedList';
// import ListItem from '../ListItem';
// import mdx from './OrderedList.mdx';

function Coinflip() {
  // const [users, setUsers] = useState([]);
  const [bet, setBet] = useState(0);
  // const [tickets, setTickets] = useState(0);
  const [win, setWin] = useState('');
  // const [result, setResult] = useState('');
  const [side, setSide] = useState('');

  const onChange = (event) => {
    setBet(event.target.value);
  };

  function onHeads() {
    setSide('Heads');
  }

  function onTails() {
    setSide('Tails');
  }

  useEffect(() => {
    const data = { side, bet };
    fetch('/api/coinflip', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((dataResponse) => {
        setWin(dataResponse.result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [side]);

  // send over data with the head/tail, bet amount

  return (
    <div className="Coinflip">
      <h2>Coin Flip Game</h2>
      <p>Enter an amount you would like to wager. </p>
      <p>If you win, you double your tickets. If you lose, you lose all your tickets you bet.</p>
      <img src="https://image.tutpad.com/tut/0/53/11_MONEDA.gif" alt="coinflip" className="coinflipgif" style={{ height: '200px', width: '400px' }} />
      <br />
      <p>Place a Bet in Number of Tickets:</p>
      <input type="text" onChange={onChange} />
      <br />
      <p>Choose heads or tails:</p>
      <button type="button" onClick={onHeads}>Heads</button>
      <button type="button" onClick={onTails}>Tails</button>
      <p>{win}</p>
    </div>
  );
}
export default Coinflip;
