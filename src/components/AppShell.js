import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import { AppBar, Drawer, MenuItem } from 'material-ui';

class SidebarDrawer extends Component {
  componentDidMount() {
    let frameCount = 0;
    debugger
    const mount = () => (frameCount++ > 0) ?
      this.props.onMounted() : requestAnimationFrame(mount);

    requestAnimationFrame(mount);
  }
  render() {
  	return (
  		<Fragment>
        <Drawer
          open={this.props.open}
          docked={false}
          onRequestChange={this.props.onRequestChange}
        >
          <MenuItem
            primaryText="Home"
            containerElement={<Link to="/" />}
            onClick={this.props.onClick}
          />
          <MenuItem
            primaryText="Users"
            containerElement={<Link to="/users" />}
            onClick={this.props.onClick}
          />
          <MenuItem
            primaryText="Notification"
            containerElement={<Link to="/notification" />}
            onClick={this.props.onClick}
          />
        </Drawer>
      </Fragment>
  	);
  }

}

export default class AppShell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      drawer: false,
    };
  }

  handleDrawerToggle = (e) => {
    if (this.state.drawer) {
      this.setState(() => ({ open: !this.state.open}))
    } else {
      this.setState({drawer: true});
      e.preventDefault();
    }
  }

  handleRequestChange = (open) => () => this.setState(() => ({ open }))

  handleLinkclick = () => this.setState(() => ({ open: false }))

  render() {
    const LasySidebarDrawer = this.state.drawer &&
      <SidebarDrawer
        open={this.state.open}
        onMounted={this.handleRequestChange(true)}
        onClick={this.handleRequestChange(false)}
        onRequestChange={this.handleRequestChange(true)}
      />
    return (
      <Fragment>
        <MuiThemeProvider>
          <div>
            <AppBar onLeftIconButtonClick={this.handleDrawerToggle}/>
            {LasySidebarDrawer}
            <div id="content" style={{width:"90%", margin: 'auto', marginTop: '30px'}}>
              { React.cloneElement(this.props.children) }
            </div>
          </div>
        </MuiThemeProvider>
      </Fragment>
    )
  }
}