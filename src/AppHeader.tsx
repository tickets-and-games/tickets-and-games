import React from 'react';
import {
  Link,
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
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Tickets & Games
        </Typography>
        {/* @ts-ignore component type not declared well */}
        <Button className={classes.button} color="inherit" element={Link} to="/">Home</Button>
        {/* @ts-ignore */}
        <Button className={classes.button} color="inherit" element={Link} to="/profile">Profile</Button>
        {/* @ts-ignore */}
        <Button className={classes.button} color="inherit" element={Link} to="/leaderboard">Leaderboard</Button>
        {/* @ts-ignore */}
        <Button className={classes.button} color="inherit" element={Link} to="/coinflip">Coinflip</Button>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
