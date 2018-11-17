import React, { Component, Fragment } from 'react';
import { Card, CardHeader } from 'material-ui/Card';
import { FloatingActionButton, Dialog, FlatButton, TextField } from 'material-ui';
import { ContentAdd } from 'material-ui/svg-icons';

const fabStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
};
export default class Users extends Component {
  constructor() {
    super();

    this.state = {
      users: {},
      dialog: false,
    };
  }
  _get = () => {
    const databaseURL = 'https://react-pwa-1e7cf.firebaseio.com/';
    fetch(`${databaseURL}/users.json`).then(res => {
      if (res.status !== 200) {
        throw new Error(res.statusText);
      }

      return res.json();
    }).then(users => this.setState({ users }));
  }

  _post = (user) => {
    const databaseURL = 'https://react-pwa-1e7cf.firebaseio.com/';
    return fetch(`${databaseURL}/users.json`, {
      method: 'POST',
      body: JSON.stringify(user)
    }).then(res=> {
      if (res.status !== 200) {
        throw new Error(res.statusText);
      }

      return res.json();
    }).then(data => {
      this.state.users[data.name] = user;
    });
  }

  componentDidMount() {
    this._get();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.users !== this.state.users ||
      nextState.dialog !== this.state.dialog;
  }

  handleDialogToggle = () => this.setState({dialog: !this.state.dialog})

  handleDialogClose = () => this.setState({dialog: false})

  handleSubmit = () => {
    const user = {
      name: this.nameText.getValue(),
    };

    if (!user.name) {
      this.handleDialogToggle();
      return;
    }

    this._post(user).then(this.handleDialogToggle);
  }

  render() {
    const users = () => {
      return Object.keys(this.state.users).map(id => {
        const user = this.state.users[id];
        return (
          <Card key={id}>
            <CardHeader title={user.name} style={{marginBottom: '0.3em'}}/>
          </Card>
        );
      });
    };
    return (
      <Fragment>
        {users()}
        <FloatingActionButton style={fabStyle} onTouchEnd={this.handleDialogToggle}>
          <ContentAdd/>
        </FloatingActionButton>
        <Dialog
          title={"Adding New User"}
          actions={<FlatButton label="Submit" primary onTouchEnd={this.handleSubmit} />}
          label="Submit"
          primary
          modal={false}
          open={this.state.dialog}
          onClose={this.handleDialogClose}
        >
          <div>Input Your Name</div>
          <TextField hintText="Name" name="name" ref={ref => this.nameText = ref} />
        </Dialog>
      </Fragment>
    );
  }
}