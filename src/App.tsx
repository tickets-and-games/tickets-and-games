import React from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';

import { Content } from 'carbon-components-react';

import './App.css';
import AppHeader from './AppHeader';
import Leaderboard from './Leaderboard';
import Profileview from './Profileview';
import Coinflip from './Coinflip';
import Signup from './Signup';

function App() {
  return (
    <Router>
      <div className="App">
        <AppHeader />
        <Content>
          <Switch>
            <Route path="/leaderboard">
              <Leaderboard />
            </Route>
            <Route path="/profile/:userId">
              <Profileview />
            </Route>
            <Route path="/coinflip">
              <Coinflip />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
          </Switch>
        </Content>
      </div>
    </Router>
  );
}

export default App;
