import React from 'react';
import {
  useHistory,
} from 'react-router-dom';
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
} from 'carbon-components-react';

function AppHeader() {
  const history = useHistory();

  return (
    <Header aria-label="Tickets and Games">
      <HeaderName prefix="">Tickets and Games</HeaderName>
      <HeaderNavigation aria-label="Tickets and Games">
        <HeaderMenuItem onClick={() => history.push('/')}>
          Home
        </HeaderMenuItem>
        <HeaderMenuItem onClick={() => history.push('/profile')}>
          Profile
        </HeaderMenuItem>
        <HeaderMenuItem onClick={() => history.push('/leaderboard')}>
          Leaderboard
        </HeaderMenuItem>
        <HeaderMenuItem onClick={() => history.push('/coinflip')}>
          Coinflip Game
        </HeaderMenuItem>
      </HeaderNavigation>
    </Header>
  );
}

export default AppHeader;
