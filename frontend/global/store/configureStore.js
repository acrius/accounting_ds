import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import rootReducer from '../reducers'

const logger = createLogger();

export default (initialState) => {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk, logger));
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
    return store;
  }
}
