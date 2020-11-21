import React, { useEffect, useState } from 'react';

function BlackjackGame() {
  const [playerHand, setPlayerHand] = useState<Array<number|String>>([]);
  const [dealerHand, setDealerHand] = useState<Array<number|String>>([]);
  const [status, setStatus] = useState<String>('');
  useEffect(() => {
    fetch('/api/blackjack/start')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDealerHand(data.dealer);
          setPlayerHand(data.player);
          if (data.blackjack) {
            setStatus('Blackjack!');
          }
        }
      });
  }, []);
  return (
    <div className="player-ui">
      <div className="dealer-hand">{dealerHand}</div>
      <div className="client-ui">
        <div className="black-result">{status}</div>
        <div className="player-hand">{playerHand}</div>
        <button type="button" className="blackjack-button-hit">Hit</button>
        <button type="button" className="blackjack-button-hit">Hold</button>
      </div>
    </div>
  );
}

export default BlackjackGame;
