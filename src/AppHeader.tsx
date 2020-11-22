import React from 'react';
import {
  Link as RouterLink,
} from 'react-router-dom';

import {
  Toolbar,
  AppBar,
  Button,
  makeStyles,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    bottom: '50px',
    backgroundColor: '#000000',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    right: '50px',
    color: '#cf4431',
  },
  button: {
    textAlign: 'left',
    margin: 'auto',
    color: '#cf4431',
  },
}));

interface Props {
  loggedIn: boolean;
}

function AppHeader(props: Props) {
  const { loggedIn } = props;
  const classes = useStyles();

  if (loggedIn) {
    return (
      <AppBar className={classes.root} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Tickets & Games
          </Typography>
          <Button className={classes.button} component={RouterLink} to="/">Home</Button>
          <Button className={classes.button} component={RouterLink} to="/profile">Profile</Button>
          <Button className={classes.button} component={RouterLink} to="/leaderboard">Leaderboard</Button>
          <Button className={classes.button} component={RouterLink} to="/coinflip">Coinflip</Button>
          <Button className={classes.button} component={RouterLink} to="/skiball">Skiball</Button>
          <Button className={classes.button} component={RouterLink} to="/blackjack">BlackJack</Button>
        </Toolbar>
      </AppBar>
    );
  }
  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Tickets & Games
        </Typography>
        <Button className={classes.button} component={RouterLink} to="/home">Home</Button>
        <Button className={classes.button} component={RouterLink} to="/login">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
