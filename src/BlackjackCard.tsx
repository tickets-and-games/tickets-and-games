import React from 'react';
import {
  Paper, makeStyles, Typography,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    float: 'left',
    flexGrow: 1,
    position: 'relative',
    backgroundColor: '#f8f8ff',
    height: '150px',
    width: '100px',
    margin: 'auto',
  },
  botRight: {
    display: 'block',
    position: 'absolute',
    textAlign: 'right',
    bottom: 0,
    right: '5px',
  },
  topLeft: {
    display: 'block',
    position: 'absolute',
    textAlign: 'left',
    left: '5px',
  },
}));

function DetectSuit(suit) {
  switch (suit) {
    case ('Diamond'):
      return 'D';
    case ('Hearts'):
      return 'H';
    case ('Clover'):
      return 'C';
    case ('Spades'):
      return 'S';
    default:
      return 'Invalid';
  }
}

function DetectValue(value) {
  switch (value) {
    case ('Ace'):
      return 'A';
    case ('Two'):
      return '2';
    case ('Three'):
      return '3';
    case ('Four'):
      return '4';
    case ('Five'):
      return '5';
    case ('Six'):
      return '6';
    case ('Seven'):
      return '7';
    case ('Eight'):
      return '8';
    case ('Nine'):
      return '9';
    case ('Ten'):
      return '10';
    case ('Jack'):
      return 'J';
    case ('Queen'):
      return 'Q';
    case ('King'):
      return 'K';
    default:
      return 'Invalid';
  }
}

interface Props {
  suit: String,
  value: String,
}

function BlackjackCard(props: Props) {
  const { suit, value } = props;
  const cardSuit = DetectSuit(suit);
  const cardValue = DetectValue(value);
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      { cardSuit === 'H' || cardSuit === 'D'
        ? (
          <div>
            <Typography variant="h6" className={classes.topLeft} style={{ color: 'red' }}>
              {cardValue}
              <br />
              {cardSuit}
            </Typography>
            <Typography variant="h6" className={classes.botRight} style={{ color: 'red' }}>
              {cardSuit}
              <br />
              {cardValue}
            </Typography>
          </div>
        )
        : (
          <div>
            <Typography variant="h6" className={classes.topLeft}>
              {cardValue}
              <br />
              {cardSuit}
            </Typography>
            <Typography variant="h6" className={classes.botRight}>
              {cardSuit}
              <br />
              {cardValue}
            </Typography>
          </div>
        )}
    </Paper>
  );
}

export default BlackjackCard;
