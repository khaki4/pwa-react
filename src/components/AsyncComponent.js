import React from 'react';

// code from [Quick and dirty code splitting with React Router v4](https://goo.gl/lEYp6q)
export default (getComponent) => (
  class AsyncComponent extends React.Component {
    static Component = null;

    state = {Component: AsyncComponent.Component};

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component
          this.setState({ Component })
        })
      }
    }

    render() {
      const { Component } = this.state
      if (Component) {
        return <Component {...this.props} />
      }
      return null
    }
  }
);