import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import AppShell from './AppShell';
import Home from './Home';
import Users from './Users';
import Notification from './Notification';

export default class App extends Component {
  render() {
    return (
      <Router>
        <AppShell>
          <Fragment>
            <Route exact path="/" component={Home}/>
            <Route exact path="/users" component={Users}/>
            <Route exact path="/notification" component={Notification}/>
          </Fragment>
        </AppShell>
      </Router>
    )
  }
}