import React, { useState } from 'react';
import {
  Button, Typography,
} from '@material-ui/core';

type Color = {
  item_type: number,
  name: string,
};

interface Props {
  colors: Array<Color>,
}

function Colors(props: Props) {
  const { colors } = props;
  const [curColor, setCurColor] = useState('');
  const [message, setMessage] = useState('');

  function HandleColorChange(event) {
    setCurColor(event.target.value);
    setMessage('');
  }

  function SubmitColor() {
    fetch('/api/settings/textcolor', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      mode: 'no-cors',
      body: JSON.stringify({
        item_type: curColor,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      });
  }

  return (
    <div style={{ textAlign: 'center' }}>
      { colors.length !== 0
        ? (
          <div>
            <Typography variant="h6">Change Text Color</Typography>
            <select
              value={curColor}
              onChange={HandleColorChange}
            >
              {colors.map((color) => (
                <option key={color.item_type} value={color.item_type}>{color.name}</option>
              ))}
            </select>
            <Button color="primary" variant="contained" onClick={SubmitColor}>Confirm</Button>
            <div>{message}</div>
          </div>
        )
        : (
          <div />
        )}
    </div>
  );
}

export default Colors;
