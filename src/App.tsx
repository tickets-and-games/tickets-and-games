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

function App() {
  return (
    <Router>
      <div className="App">
        <AppHeader />
        <Box>
          <Switch>
            <Route path="/leaderboard">
              <Leaderboard />
            </Route>
            <Route path="/profile/:userId?" defaultParams={{ userId: '' }}>
              <Profileview />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/coinflip">
              <Coinflip />
            </Route>
          </Switch>
        </Box>
      </div>
    </Router>
  );
}

export default App;
