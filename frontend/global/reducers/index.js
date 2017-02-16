import {combineReducers} from 'redux';

import individuals from '../../main/reducers/IndividualsReducer.js';
import cars from '../../waybills/reducers/CarsReducers.js';

export default combineReducers({individuals, cars});
