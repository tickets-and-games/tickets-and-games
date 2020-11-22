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

interface Props {
  suit: String,
  value: String,
}

function BlackjackCard(props: Props) {
  const { suit, value } = props;
  const cardSuit = suit;
  const cardValue = value;
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
