import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import { AppBar, Drawer, MenuItem } from 'material-ui';

export default class AppShell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleDrawerToggle = () => this.setState(() => ({ open: !this.state.open}))

  handleRequestChange = (open) => this.setState(() => ({ open }))

  handleLinkclick = () => this.setState(() => ({ open: false }))

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar onLeftIconButtonClick={this.handleDrawerToggle}/>
            <Drawer open={this.state.open} docked={false}
              onRequestChange={this.handleRequestChange}
            >
              <MenuItem
                primaryText="Home"
                containerElement={<Link to="/" />}
                onClick={this.handleLinkclick}
              />
              <MenuItem
                primaryText="Users"
                containerElement={<Link to="/users" />}
                onClick={this.handleLinkclick}
              />
              <MenuItem
                primaryText="Notification"
                containerElement={<Link to="/notification" />}
                onClick={this.handleLinkclick}
              />
            </Drawer>
            <div id="content" style={{width:"90%", margin: 'auto', marginTop: '30px'}}>
              { React.cloneElement(this.props.children) }
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}