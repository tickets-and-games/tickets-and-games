import React, { useEffect, useState } from 'react';
import BlackjackCard from './BlackjackCard';

interface Props {
  pool: string;
}

function BlackjackGame(props: Props) {
  const { pool } = props;
  const [playerHand, setPlayerHand] = useState<Array<number|String>>([]);
  const [dealerHand, setDealerHand] = useState<Array<number|String>>([]);
  const [endScreen, setEndScreen] = useState<Boolean>(false);
  const [newPool, setNewPool] = useState<string>('500');
  const [errorMessage, setErrorMessage] = useState<String>('');
  const [effect, seteffect] = useState<String>('');
  const [result, setResult] = useState<string>('');
  const [tie, setTie] = useState<Boolean>(false);

  function MakeCards(hand) {
    const displayHand : JSX.Element[] = [];
    for (let i = 0; i < hand.length; i += 2) {
      displayHand.push(
        <BlackjackCard suit={hand[i + 1]} value={hand[i]} />,
      );
    }
    return displayHand;
  }

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
        setTie(true);
      }
    } else if (winner === 'none') {
      seteffect('Tied!');
      setTie(true);
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
  function HandleNewPool(event) {
    const { value: NewValue } = event.target;
    setNewPool(NewValue);
  }
  function HandlePlayAgain() {
    const num = Number(newPool);
    if (/^\d*$/.test(newPool) === false || Number.isNaN(num)) {
      setErrorMessage('Invalid Input');
    } else if (num < 500) {
      setNewPool('500');
      setErrorMessage('Minimum pool required is 500 tickets');
    } else {
      fetch('/api/blackjack/playagain', {
        method: 'POST',
        body: JSON.stringify({
          amount: Number(newPool),
        }),
      })
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
  function HandleTie() {
    fetch('/api/blackjack/tiebreaker')
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
    setTie(false);
  }
  useEffect(() => {
    fetch('/api/blackjack/start', {
      method: 'POST',
      body: JSON.stringify({
        amount: Number(pool),
      }),
    })
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
      <div className="dealer-hand">{MakeCards(dealerHand)}</div>
      <div className="blackjack-result">{result}</div>
      <div className="client-ui">
        <div className="blackjack-effect">{effect}</div>
        <div className="player-hand">{MakeCards(playerHand)}</div>
        { endScreen
          ? (
            <div className="blackjack-end">
              { tie
                ? (
                  <div className="blackjack-tie">
                    <button type="button" onClick={HandleTie} className="blackjack-button-hit">Another Round</button>
                  </div>
                )
                : (
                  <div className="blackjack-playagain">
                    <input type="text" defaultValue={newPool} onChange={HandleNewPool} />
                    <div className="error-box">{errorMessage}</div>
                    <button type="button" onClick={HandlePlayAgain} className="blackjack-button-hit">Play Again</button>
                  </div>
                )}
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
