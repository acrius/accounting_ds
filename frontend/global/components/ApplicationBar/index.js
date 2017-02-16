import React, {Component} from 'react';
import {Link} from 'react-router';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';


class Navigation extends Component {
  render() {
    return (
      <Drawer open={this.props.open} docked={false} onRequestChange={this.props.changeNavigationState}>
        <MenuItem>Главная</MenuItem>
        <Divider />
        <Subheader inset={true}>Справочники</Subheader>
        <Link to='/directories/individuals'><MenuItem>Сотрудники</MenuItem></Link>
        <Link to='/directories/cars'><MenuItem>Машины</MenuItem></Link>
        <Divider />
        <Subheader inset={true}>Документы</Subheader>
        <MenuItem>Путевые листы</MenuItem>
      </Drawer>
    );
  }
}


export default class ApplicationBar extends Component {
  constructor(props) {
      super(props);
      this.state = {
        open: false
      }
  }

  changeNavigationState = () => {
    this.setState({open: !this.state.open});
  }

  render() {
    return (
      <header>
        <AppBar title='Учёт. Верхний склад'
          onLeftIconButtonTouchTap={this.changeNavigationState} />
        <Navigation open={this.state.open} changeNavigationState={this.changeNavigationState}/>
      </header>
    );
  }
}
