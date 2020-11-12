import React from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';

import { Content } from 'carbon-components-react';

import './app.scss';
import AppHeader from './AppHeader';
import Leaderboard from './Leaderboard';
import Profileview from './Profileview';

function App() {
  return (
    <Router>
      <div className="App">
        <AppHeader />
        <Content>
          <Switch>
            <Route path="/">
              <Leaderboard />
            </Route>
            <Route path="/leaderboard">
              <Leaderboard />
            </Route>
            <Route path="/profile">
              <Profileview />
            </Route>
          </Switch>
        </Content>
      </div>
    </Router>
  );
}

export default App;
