import React, { useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function TicketTransfer() {
  const classes = useStyles();

  const [amount, setAmount] = useState<number>();
  const [recipientId, setRecipientId] = useState<number>();
  const [message, setMessage] = useState<string>();

  const transferTicket = () => {
    fetch('/api/ticket/transfer', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ to: recipientId, amount }),
    }).then((response) => {
      response.json().then((data) => {
        if (response.status === 200) {
          setMessage(`Sent ${data.amount} to user id ${data.user_id}`);
        } else {
          setMessage(`Error: ${data.error}`);
        }
      });
    });
  };

  const amountOnChange = (e) => {
    setAmount(Number(e.target.value));
  };

  const recipientOnChange = (e) => {
    setRecipientId(Number(e.target.value));
  };

  return (
    <div>
      <Typography variant="h4" component="h4">
        Transfer points
      </Typography>
      <form className={classes.root} autoComplete="off">
        <TextField id="transfer-recipient" label="Recipient ID" type="number" onChange={recipientOnChange} variant="filled" />
        <TextField
          id="transfer-amount"
          label="Amount"
          type="number"
          value={amount}
          onChange={amountOnChange}
          variant="filled"
        />
        <Button size="large" variant="contained" color="primary" onClick={transferTicket}>
          Transfer
        </Button>
      </form>
      <div>
        {message}
      </div>
    </div>
  );
}

export default TicketTransfer;
