import React from 'react';
import {
  Link as RouterLink,
} from 'react-router-dom';
import {
  MemoryRouter as Router,
} from 'react-router';
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
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
  },
  button: {
    textAlign: 'left',
  },
}));

function AppHeader() {
  const classes = useStyles();
  return (
    <Router>
      <AppBar position="static">
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
    </Router>
  );
}

export default AppHeader;
