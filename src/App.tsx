import React, { Dispatch } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Box, Container } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { AppState } from './reducers';
import { MessageActions, DELETE_MESSAGE } from './actions/messageActions';

import './App.css';
import AppHeader from './AppHeader';
import Leaderboard from './views/Leaderboard';
import Profileview from './views/Profileview';
import Login from './views/Login';
import Coinflip from './views/Coinflip';
import Signup from './views/Signup';
import Blackjack from './views/Blackjack';
import Home from './views/Home';
import Skiball from './views/Skiball';
import Store from './views/Store';
import TicketPurchase from './views/TicketPurchase';
import AuthRequired from './components/AuthRequired';
import NewUser from './views/NewUser';
import DailyReward from './views/DailyReward';

import { useLocalStorage } from './utils/hooks';
import Settings from './views/Settings';
import Dice from './views/Dice';

function App() {
  const [userId, setUserId] = useLocalStorage('userId', '');
  const messages = useSelector((state: AppState) => state.messages);
  const messagesDispatch = useDispatch<Dispatch<MessageActions>>();

  const loggedIn = Boolean(userId);

  return (
    <Router>
      <AppHeader loggedIn={loggedIn} setUserId={setUserId} />
      <Container>
        <Box>
          {messages.map((error) => (
            <Alert
              severity={error.type}
              onClose={() => messagesDispatch({
                type: DELETE_MESSAGE,
                payload: {
                  id: error.id,
                },
              })}
            >
              {error.message}
            </Alert>
          ))}
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
            <Route path="/dice">
              <AuthRequired loggedIn={loggedIn}>
                <Dice />
              </AuthRequired>
            </Route>
            <Route path="/skiball">
              <AuthRequired loggedIn={loggedIn}>
                <Skiball />
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
            <Route path="/purchase">
              <AuthRequired loggedIn={loggedIn}>
                <TicketPurchase />
              </AuthRequired>
            </Route>
            <Route path="/settings">
              <AuthRequired loggedIn={loggedIn}>
                <Settings />
              </AuthRequired>
            </Route>
            <Route path="/daily">
              <AuthRequired loggedIn={loggedIn}>
                <DailyReward />
              </AuthRequired>
            </Route>

            {/* Public routes that don't require login */}
            <Route path="/leaderboard">
              <Leaderboard />
            </Route>
            <Route path="/login">
              <Login setUserId={setUserId} />
            </Route>
            <Route path="/signup">
              <Signup setLoggedIn={setUserId} />
            </Route>
            <Route path="/newuser">
              <NewUser setUserId={setUserId} />
            </Route>
            <Route path="/">
              <Home />
            </Route>

          </Switch>
        </Box>
      </Container>
    </Router>
  );
}

export default App;
