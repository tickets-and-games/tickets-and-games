import React, { useState, useEffect } from 'react';

function BlackJack() {
  const [message, setMessage] = useState<String>('');
  const [ready, setReady] = useState<Boolean>(false);
  useEffect(() => {
    fetch('/api/blackjack/play')
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          setReady(true);
        }
        setMessage(data.message);
      });
  }, []);
  if (ready) {
    return (
      <div className="blackjack-page">
        <div className="message-box">{message}</div>
        <button type="button" className="blackjack-play">Play</button>
      </div>
    );
  }
  return (
    <div className="blackjack-page">
      <div className="message-box">{message}</div>
    </div>
  );
}

export default BlackJack;
