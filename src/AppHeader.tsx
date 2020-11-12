import React from 'react';
import {
  Link,
} from 'react-router-dom';
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
} from 'carbon-components-react';

function AppHeader() {
  return (
    <Header aria-label="Tickets and Games">
      <HeaderName prefix="">Tickets and Games</HeaderName>
      <HeaderNavigation aria-label="Tickets and Games">
        {/* @ts-ignore component type not declared well */}
        <HeaderMenuItem element={Link} to="/">
          Home
        </HeaderMenuItem>
        {/* @ts-ignore */}
        <HeaderMenuItem element={Link} to="/profile">
          Profile
        </HeaderMenuItem>
        {/* @ts-ignore */}
        <HeaderMenuItem element={Link} to="/leaderboard">
          Leaderboard
        </HeaderMenuItem>
        <HeaderMenuItem element={Link} to='/coinflip'>
          Coinflip Game
        </HeaderMenuItem>
      </HeaderNavigation>
    </Header>
  );
}

export default AppHeader;
