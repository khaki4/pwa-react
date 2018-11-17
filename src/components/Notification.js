import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/messaging';
import { Card, CardHeader, Snackbar } from 'material-ui';

const config = {
  apiKey: "AIzaSyCkSzadKeQPBoyhXiYEnxI8ZktVfrhw8Is",
  authDomain: "react-pwa-1e7cf.firebaseapp.com",
  databaseURL: "https://react-pwa-1e7cf.firebaseio.com",
  projectId: "react-pwa-1e7cf",
  storageBucket: "react-pwa-1e7cf.appspot.com",
  messagingSenderId: "232333505269"
};

export default class Notification extends Component {
  static firebaseApp;

  constructor(props) {
    super(props);

    if(!Notification.firebaseApp) {
      Notification.firebaseApp = firebase.initializeApp(config);
    }

    this.state = {
      token: '',
      toast: false,
      message: '',
    };
  }

  handleMessage = ({ notification: {title = 'Title', body = 'Body'} = {}}) => {
    this.setState({
      toast: true,
      message: `${title}: ${body}`
    });
  }

  componentDidMount() {
    const messaging = firebase.messaging();
    messaging.onMessage(this.handleMessage);

    messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return messaging.getToken();
      })
      .then(token => this.setState({ token }))
      .catch(function(err) {
        console.log('Unable to get permission to notify.', err);
      });
  }

  render() {
    const subtitleStyle = {
      wordWrap: 'break=word',
      wordBreak: 'break-all',
      hyphens: 'auto',
      padding: '10px',
    };

    return (
      <div>
        <Card>
          <CardHeader title="token" subtitle={this.state.token} subtitleStyle={subtitleStyle}/>
        </Card>
        <Snackbar
          open={this.state.toast}
          message={this.state.message}
          autoHideDuration={4000}
          onRequestClose={() => this.setState({toast: false})}
        />
      </div>
    );
  }
}