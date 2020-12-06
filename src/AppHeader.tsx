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
  const [anchorE2, setAnchorE2] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorE2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose2 = () => {
    setAnchorE2(null);
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
          <Button className={classes.button} component={RouterLink} to="/leaderboard">Leaderboard</Button>
          <Button className={classes.button} component={RouterLink} to="/store">Store</Button>
          <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" className={classes.button} onClick={handleClick}>
              Games
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorE2}
              keepMounted
              open={Boolean(anchorE2)}
              onClose={handleClose2}
            >
              <MenuItem component={RouterLink} to="/coinflip">Coinflip</MenuItem>
              <MenuItem component={RouterLink} to="/dice">Dice</MenuItem>
              <MenuItem component={RouterLink} to="/skiball">Skiball</MenuItem>
              <MenuItem component={RouterLink} to="/blackjack">BlackJack</MenuItem>
            </Menu>
          </div>
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
              vertical: 'bottom',
              horizontal: 'right',
            }}
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={isOpen}
          >
            <MenuItem component={RouterLink} to="/profile">Profile</MenuItem>
            <MenuItem component={RouterLink} to="/settings">Settings</MenuItem>
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
