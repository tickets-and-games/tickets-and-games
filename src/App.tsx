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
import AuthRequired from './components/AuthRequired';

import { useLocalStorage } from './utils/hooks';

function App() {
  const [userId, setUserId] = useLocalStorage('userId', '');
  const loggedIn = Boolean(userId);

  return (
    <Router>
      <div className="App">
        <AppHeader loggedIn={loggedIn} setUserId={setUserId} />
        <Box>
          <Switch>
            {/* Private routes that do require login */}
            <Route path="/profile/:userId?" defaultParams={{ userId: '' }}>
              <AuthRequired loggedIn={loggedIn}>
                <Profileview />
              </AuthRequired>
            </Route>
            <Route path="/coinflip">
              <AuthRequired loggedIn={loggedIn}>
                <Coinflip />
              </AuthRequired>
            </Route>
            <Route path="/skiball">
              <AuthRequired loggedIn={loggedIn}>
                <Skiball />
              </AuthRequired>
            </Route>
            <Route path="/signup">
              <AuthRequired loggedIn={loggedIn}>
                <Signup setLoggedIn={setUserId} />
              </AuthRequired>
            </Route>
            <Route path="/blackjack">
              <AuthRequired loggedIn={loggedIn}>
                <Blackjack />
              </AuthRequired>
            </Route>
            <Route path="/store">
              <AuthRequired loggedIn={loggedIn}>
                <Store />
              </AuthRequired>
            </Route>

            {/* Public routes that don't require login */}
            <Route path="/leaderboard">
              <Leaderboard />
            </Route>
            <Route path="/login">
              <Login setUserId={setUserId} />
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
