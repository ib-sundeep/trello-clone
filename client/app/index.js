import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import App from "./components/App";

import BoardPage from "./pages/board";
import HomePage from "./pages/home";
import store from "./stores";

import "./styles/styles.scss";

render(
  <Provider store={store}>
    <Router>
      <App>
        <Switch>
          <Redirect exact from="/" to="/boards" />

          <Redirect exact from="/home" to="/boards" />

          <Route exact path="/boards" component={HomePage} />

          <Route exact path="/boards/:slug" component={BoardPage} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById("root")
);
