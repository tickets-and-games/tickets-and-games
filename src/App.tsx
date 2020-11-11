import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import './App.css';
import Leaderboard from './Leaderboard';
import Profileview from './Profileview';

function App() {
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/leaderboard">
            <Leaderboard />
          </Route>
          <Route path="/profile">
            <Profileview />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
