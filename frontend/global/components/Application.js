import React, {Component} from 'react';
import ReacrDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import ApplicationBar from './ApplicationBar'

const muiTheme = getMuiTheme();

export default class Application extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <ApplicationBar />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}
