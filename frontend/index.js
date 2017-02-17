import React, {Component} from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Application from './global/components/Application.js';

import IndividualsList from './main/containers/Individuals.js';
import CarsList from './waybills/containers/Cars.js';
import WaybillsWorkspace from './waybills/components/WaybillsWorkspace.js'

import configureStore from './global/store/configureStore.js';

const store = configureStore();

injectTapEventPlugin();

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Application}>
        <Route path='/directories/individuals' component={IndividualsList} />
        <Route path='/directories/cars' component={CarsList} />
        <Route path='/active-directories/waybills' component={WaybillsWorkspace} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('application'));
