import React from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';

import { Box } from '@material-ui/core';

import './App.css';
import AppHeader from './AppHeader';
import Leaderboard from './Leaderboard';
import Profileview from './Profileview';
import Login from './Login';
import Coinflip from './Coinflip';
import Signup from './Signup';
import Blackjack from './Blackjack';
import Home from './Home';
import Skiball from './Skiball';
import Store from './Store';

import { useLocalStorage } from './utils/hooks';

function App() {
  const [userId, setUserId] = useLocalStorage('userId', '');
  const loggedIn = userId !== null;

  return (
    <Router>
      <div className="App">
        <AppHeader loggedIn={loggedIn} setUserId={setUserId} />
        <Box>
          <Switch>
            <Route path="/leaderboard">
              <Leaderboard />
            </Route>
            <Route path="/profile/:userId?" defaultParams={{ userId: '' }}>
              <Profileview />
            </Route>
            <Route path="/login">
              <Login setUserId={setUserId} />
            </Route>
            <Route path="/coinflip">
              <Coinflip />
            </Route>
            <Route path="/skiball">
              <Skiball />
            </Route>
            <Route path="/signup">
              <Signup setLoggedIn={setUserId} />
            </Route>
            <Route path="/blackjack">
              <Blackjack />
            </Route>
            <Route path="/store">
              <Store />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Box>
      </div>
    </Router>
  );
}

export default App;
