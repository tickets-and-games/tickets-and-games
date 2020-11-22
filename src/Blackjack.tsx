import React, { useState, useEffect } from 'react';
import BlackjackGame from './BlackjackGame';

const rules = (
  <ul>
    <p>Rules:</p>
    <p>1. Goal of blackjack is to beat the dealer&apos;s hand without going over 21</p>
    <p>2. Jack, Queen and King are worth 10 points</p>
    <p>3. Aces are worth 1 or 11 points. Which every makes the hand better</p>
    <p>4. Other cards are worth its repective value</p>
    <p>5. Player and dealer are dealt 2 cards each</p>
    <p>6. Both player cards are shown and only once dealer card is shown</p>
    <p>7. &apos;Hit&apos; is to ask for another card.</p>
    <p>8. &apos;Stand&apos; is to keep your total and end asking for cards</p>
    <p>9. If player goes over 21 that is a bust and player loses regardless of dealer</p>
    <p>10. If player is dealt 21 at the start, that is a blackjack</p>
    <p>11. Dealer must hit until total is above 17</p>
    <p>
      11. &apos;Double&apos; is to double current bet and draw one card
      but the player can no longer draw anymore cards
    </p>
    <p>12. The reward is 1.5 worth of your total bet rounded up</p>
    <p>13. Bust or lost is to lose your total pooled</p>
  </ul>
);

function Blackjack() {
  const [message, setMessage] = useState<String>('');
  const [errorMessage, setErrorMessage] = useState<String>('');
  const [gameState, setGameState] = useState<number>(0);
  const [pool, setPool] = useState<string>('500');
  function HandlePool(event) {
    const { value: NewValue } = event.target;
    setPool(NewValue);
  }
  function PlayBlackJack() {
    const num = Number(pool);
    if (/^\d*$/.test(pool) === false || Number.isNaN(num)) {
      setErrorMessage('Invalid Input');
    } else if (num < 500) {
      setPool('500');
      setErrorMessage('Minimum pool required is 500 tickets');
    } else {
      setGameState(2);
    }
  }
  useEffect(() => {
    fetch('/api/blackjack/play')
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          setMessage(data.message);
          setGameState(1);
        } else {
          setErrorMessage(data.message);
        }
      });
  }, []);
  if (gameState === 1) {
    return (
      <div className="blackjack-page">
        <div className="message-box">{message}</div>
        {rules}
        <input type="text" defaultValue={pool} onChange={HandlePool} />
        <button type="button" onClick={PlayBlackJack} className="blackjack-play">Play</button>
        <div className="error-box">{errorMessage}</div>
      </div>
    );
  }
  if (gameState === 2) {
    return (
      <div className="blackjack-page">
        <BlackjackGame />
      </div>
    );
  }
  return (
    <div className="blackjack-page">
      <div className="error-box">{errorMessage}</div>
      {rules}
    </div>
  );
}

export default Blackjack;
