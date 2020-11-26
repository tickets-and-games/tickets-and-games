import React, { useState } from 'react';
import {
  Link as RouterLink,
  useHistory,
} from 'react-router-dom';
import {
  Toolbar,
  AppBar,
  Button,
  makeStyles,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  ClickAwayListener,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useGoogleLogout } from 'react-google-login';

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
  setUserId: (isLoggedIn: string | null) => void;
}

function AppHeader(props: Props) {
  const { loggedIn, setUserId } = props;
  const classes = useStyles();
  const history = useHistory();
  const { signOut } = useGoogleLogout({
    clientId: '154638215001-5tdj4ttljsh2c3m5uojmq7nrruock21s.apps.googleusercontent.com',
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    signOut();
    fetch('/api/user/logout').then((response) => {
      if (response.status === 200) {
        setUserId(null);
        localStorage.removeItem('userId');
        history.push('/');
      }
    });
  };

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
          <Button className={classes.button} component={RouterLink} to="/store">Store</Button>
          <Button className={classes.button} component={RouterLink} to="/coinflip">Coinflip</Button>
          <Button className={classes.button} component={RouterLink} to="/skiball">Skiball</Button>
          <Button className={classes.button} component={RouterLink} to="/blackjack">BlackJack</Button>
          <ClickAwayListener onClickAway={handleClose}>
            <IconButton
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </ClickAwayListener>
          <Menu
            id="menu-appbar"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            anchorEl={anchorEl}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={isOpen}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
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
        <Button className={classes.button} component={RouterLink} to="/leaderboard">Leaderboard</Button>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
