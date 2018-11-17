import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import AppShell from './AppShell';
import asyncComponent from './AsyncComponent';
// import Home from './Home';
// import Users from './Users';
// import Notification from './Notification';

const Home = asyncComponent(() => {
  debugger;
  return import(/* webpackChunkName: "home" */ './Home').then(module => module.default || module);
});
const Users = asyncComponent(() => {
  debugger;
  return import(/* webpackChunkName: "users" */ './Users').then(module => module.default || module);
});
const Notification = asyncComponent(() => {
  debugger;
  return import(/* webpackChunkName: "notification" */ './Notification').then(module => module.default || module);
});

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