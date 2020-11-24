import React, { useState } from 'react';
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

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <Router>
      <div className="App">
        <AppHeader loggedIn={loggedIn} />
        <Box>
          <Switch>
            <Route path="/leaderboard">
              <Leaderboard />
            </Route>
            <Route path="/profile/:userId?" defaultParams={{ userId: '' }}>
              <Profileview />
            </Route>
            <Route path="/login">
              <Login setLoggedIn={setLoggedIn} />
            </Route>
            <Route path="/coinflip">
              <Coinflip />
            </Route>
            <Route path="/skiball">
              <Skiball />
            </Route>
            <Route path="/signup">
              <Signup setLoggedIn={setLoggedIn} />
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
