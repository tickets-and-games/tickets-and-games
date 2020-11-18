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
  },
  button: {
    textAlign: 'left',
    margin: 'auto',
  },
}));

function AppHeader() {
  const classes = useStyles();
  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Tickets & Games
          <Button className={classes.button} color="inherit" component={RouterLink} to="/">Home</Button>
          <Button className={classes.button} color="inherit" component={RouterLink} to="/profile">Profile</Button>
          <Button className={classes.button} color="inherit" component={RouterLink} to="/leaderboard">Leaderboard</Button>
          <Button className={classes.button} color="inherit" component={RouterLink} to="/coinflip">Coinflip</Button>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
