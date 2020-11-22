import React, { useEffect, useState } from 'react';

function BlackjackGame() {
  const [playerHand, setPlayerHand] = useState<Array<number|String>>([]);
  const [dealerHand, setDealerHand] = useState<Array<number|String>>([]);
  const [endScreen, setEndScreen] = useState<Boolean>(false);
  const [pool, setPool] = useState<string>('500');
  const [errorMessage, setErrorMessage] = useState<String>('');
  const [effect, seteffect] = useState<String>('');
  const [result, setResult] = useState<string>('');

  function HandleResult(bust, blackjack, winner) {
    if (bust) {
      seteffect('bust!');
      setResult('Dealer!');
    } else if (blackjack) {
      seteffect('Blackjack!');
      if (winner === 'player') {
        setResult('Player!');
      } else {
        setResult('Tied!');
      }
    } else {
      seteffect('');
      setResult(winner);
    }
    setEndScreen(true);
  }
  function HandleStand(bust, blackjack) {
    fetch('/api/blackjack/stand')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDealerHand(data.dealer);
          setPlayerHand(data.player);
          HandleResult(bust, blackjack, data.winner);
          setEndScreen(true);
        }
      });
  }
  function HandlePool(event) {
    const { value: NewValue } = event.target;
    setPool(NewValue);
  }
  function HandlePlayAgain() {
    const num = Number(pool);
    if (/^\d*$/.test(pool) === false || Number.isNaN(num)) {
      setErrorMessage('Invalid Input');
    } else if (num < 500) {
      setPool('500');
      setErrorMessage('Minimum pool required is 500 tickets');
    } else {
      fetch('/api/blackjack/playagain')
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setDealerHand(data.dealer);
            setPlayerHand(data.player);
            if (data.blackjack) {
              HandleStand(false, data.blackjack);
            }
          }
        });
      setResult('');
      seteffect('');
      setEndScreen(false);
    }
  }
  function HandleHit() {
    fetch('/api/blackjack/hit')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          if (data.bust) {
            HandleResult(data.bust, data.blackjack, data.winner);
          } else if (data.blackjack) {
            HandleStand(false, data.blackjack);
          }
          setPlayerHand(data.player);
        }
      });
  }
  function HandleButtonStand() {
    HandleStand(false, false);
  }
  useEffect(() => {
    fetch('/api/blackjack/start')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDealerHand(data.dealer);
          setPlayerHand(data.player);
          if (data.blackjack) {
            HandleStand(false, data.blackjack);
          }
        }
      });
  }, []);
  return (
    <div className="player-ui">
      <div className="dealer-hand">{dealerHand}</div>
      <div className="blackjack-result">{result}</div>
      <div className="client-ui">
        <div className="blackjack-effect">{effect}</div>
        <div className="player-hand">{playerHand}</div>
        { endScreen
          ? (
            <div className="blackjack-end">
              <input type="text" defaultValue={pool} onChange={HandlePool} />
              <div className="error-box">{errorMessage}</div>
              <button type="button" onClick={HandlePlayAgain} className="blackjack-button-hit">Play Again</button>
            </div>
          )
          : (
            <div className="blackjack-play">
              <button type="button" onClick={HandleHit} className="blackjack-button-hit">Hit</button>
              <button type="button" onClick={HandleButtonStand} className="blackjack-button-hit">Hold</button>
            </div>
          )}
      </div>
    </div>
  );
}

export default BlackjackGame;
