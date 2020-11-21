import React, { useEffect, useState } from 'react';

function HandleResult(bust, blackjack) {
  if (bust) {
    return 'Bust!';
  }
  // dealer players
  // find way to combine blackjack/tied
  if (blackjack) {
    return 'Blackjack!';
  }
  return 'Tied!';
}

function BlackjackGame() {
  const [playerHand, setPlayerHand] = useState<Array<number|String>>([]);
  const [dealerHand, setDealerHand] = useState<Array<number|String>>([]);
  const [endScreen, setEndScreen] = useState<Boolean>(false);
  const [pool, setPool] = useState<string>('500');
  const [errorMessage, setErrorMessage] = useState<String>('');
  const [result, setResult] = useState<String>('');

  function HandlePool(event) {
    const { value: NewValue } = event.target;
    setPool(NewValue);
  }
  function HandleHit() {
    fetch('/api/blackjack/hit')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          if (data.bust || data.blackjack) {
            setResult(HandleResult(data.bust, data.blackjack));
            setEndScreen(true);
          }
          setPlayerHand(data.player);
        }
      });
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
              setResult(HandleResult(false, data.blackjack));
            }
          }
        });
      setEndScreen(false);
    }
  }
  function HandleStand() {
  }
  useEffect(() => {
    fetch('/api/blackjack/start')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDealerHand(data.dealer);
          setPlayerHand(data.player);
          if (data.blackjack) {
            setResult(HandleResult(false, data.blackjack));
          }
        }
      });
  }, []);
  return (
    <div className="player-ui">
      <div className="dealer-hand">{dealerHand}</div>
      <div className="client-ui">
        <div className="blackjack-result">{result}</div>
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
              <button type="button" onClick={HandleStand} className="blackjack-button-hit">Hold</button>
            </div>
          )}
      </div>
    </div>
  );
}

export default BlackjackGame;
