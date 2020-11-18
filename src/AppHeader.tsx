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

interface Props {
  loggedIn: boolean;
}

function AppHeader(props: Props) {
  const { loggedIn } = props;

  if (loggedIn) {
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
          {/* @ts-ignore */}
          <HeaderMenuItem element={Link} to="/coinflip">
            Coinflip
          </HeaderMenuItem>
        </HeaderNavigation>
      </Header>
    );
  }
  return (
    <Header aria-label="Tickets and Games">
      <HeaderName prefix="">Tickets and Games</HeaderName>
      <HeaderNavigation aria-label="Tickets and Games">
        {/* @ts-ignore component type not declared well */}
        <HeaderMenuItem element={Link} to="/">
          Home
        </HeaderMenuItem>
        {/* @ts-ignore */}
        <HeaderMenuItem element={Link} to="/aboutus">
          About us
        </HeaderMenuItem>
        {/* @ts-ignore */}
        <HeaderMenuItem element={Link} to="/login">
          Login
        </HeaderMenuItem>
      </HeaderNavigation>
    </Header>
  );
}

export default AppHeader;
