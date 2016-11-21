import React from 'react';
import { render } from 'react-dom';

import Route from 'react-router/lib/Route';
import Router from 'react-router/lib/Router';
import IndexRoute from 'react-router/lib/IndexRoute';
import browserHistory from 'react-router/lib/browserHistory';

import App from './components/App/App';
import NotFound from './components/App/NotFound';

import Home from './components/Home/Home';

import HelloWorld from './components/HelloWorld/HelloWorld';

import './styles/styles.scss';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />

      <Route path="helloworld" component={HelloWorld} />

      <Route path="*" component={NotFound} />
    </Route>
  </Router>
), document.getElementById('app'));
