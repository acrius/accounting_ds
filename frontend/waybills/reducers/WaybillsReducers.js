import {GET_WAYBILLS_REQUEST,
        GET_WAYBILLS_SUCCESS,
        GET_WAYBILLS_FAILED} from '../constants/WaybillsConstants.js';

const carsInitialState = {
  individuals: [],
  cars: [],
  waybills: [],
  fetching: false,
  error: ''
}

export default (state = carsInitialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_WAYBILLS_REQUEST:
      newState = {
        fetching: true,
        error: ''
      };
      break;
    case GET_WAYBILLS_SUCCESS:
      newState = {
        waybills: action.payload,
        fetching: false,
        error: ''
      };
      break;
    case GET_WAYBILLS_FAILED:
      newState = {
        fetching: false,
        error: action.payload.errorMessage
      }
      break;
  }
  return {
    ...state,
    ...newState
  };
}
