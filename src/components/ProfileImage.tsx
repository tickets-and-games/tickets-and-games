import React, { useState } from 'react';
import './ProfileImage.css';

interface Props {
  valid: boolean,
}

function ProfileImage(props: Props) {
  const { valid } = props;
  const [imageURL, setImageURL] = useState('');
  const [message, setMessage] = useState('');
  const [imageMessage, setImageMessage] = useState('');
  function HandleFileChange(event) {
    setImageURL(event.target.value);
  }

  function HandleError() {
    setImageMessage('Bad Image');
  }

  function HandleLoad() {
    setImageMessage('');
  }

  function SubmitFile() {
    fetch('/api/settings/profilepic', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      mode: 'no-cors',
      body: JSON.stringify({
        image_url: imageURL,
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
        <input type="text" onChange={HandleFileChange} />
        { imageURL !== ''
          ? (
            <div className="preview">
              <img id="preview" onError={HandleError} onLoad={HandleLoad} src={imageURL} alt="preview" />
              <div>{imageMessage}</div>
            </div>
          )
          : (
            null
          )}
        <button type="button" value="Confirm" onClick={SubmitFile}>Confirm</button>
        <div>{message}</div>
      </div>
    );
  }
  return <div />;
}

export default ProfileImage;
