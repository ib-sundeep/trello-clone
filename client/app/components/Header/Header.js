import React from 'react';

import Link from 'react-router/lib/Link';
import IndexLink from 'react-router/lib/IndexLink';

const Header = () => (
  <header>
    <IndexLink to="/">Home</IndexLink>

    <nav>
      <Link to="/helloworld">Hello World</Link>
    </nav>

    <hr />
  </header>
);

export default Header;
