import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';

export default class Home extends Component {
  render() {
    return (
      <Card>
        <CardTitle title="Hello! World"/>
        <CardText>
          <ul>
            <li>Web Manifest for installing</li>
            <li>service worker for caching and offline</li>
            <li>application shell powered by</li>
            <li>PRPL pattern by code splitting</li>
            <li>Opt in ES2015</li>
          </ul>
        </CardText>
      </Card>
    );
  }
}