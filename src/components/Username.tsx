import React, { useState } from 'react';

interface Props {
  valid: boolean,
}

function Username(props: Props) {
  const { valid } = props;
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  function HandleUsername(event) {
    setUsername(event.target.value);
  }
  function SubmitUsername() {
    const tusername = username;
    fetch('/api/settings/username', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      mode: 'no-cors',
      body: JSON.stringify({
        username: tusername,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      });
  }
  if (valid) {
    return (
      <div>
        <input
          type="text"
          defaultValue={username}
          onChange={HandleUsername}
        />
        <button type="button" value="Confirm" onClick={SubmitUsername}>Confirm</button>
        <div>{message}</div>
      </div>
    );
  }
  return <div />;
}

export default Username;
