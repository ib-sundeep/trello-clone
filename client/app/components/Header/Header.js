import React from 'react';
import { IndexLink, Link } from 'react-router';

const Header = () => (
  <header>
    <IndexLink to="/">Home</IndexLink>

    <nav>
      <Link to="/helloworld">Hello World</Link>
    </nav>
  </header>
);

export default Header;
