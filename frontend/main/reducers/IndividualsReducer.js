import {GET_INDIVIDUALS_REQUEST,
        GET_INDIVIDUALS_SUCCESS,
        GET_INDIVIDUALS_FAILED} from '../constants/IndividualsConstants.js';

const individualsInitialState = {
  individuals: [],
  fetching: false,
  error: ''
}

export default (state = individualsInitialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_INDIVIDUALS_REQUEST:
      newState = {
          fetching: true,
          error: ''
      };
      break;
    case GET_INDIVIDUALS_SUCCESS:
      newState = {
        individuals: action.payload,
        fetching: false,
        error: ''
      };
      break;
    case GET_INDIVIDUALS_FAILED:
      newState = {
        fetching: false,
        error: action.payload.errorMessage
      };
      break;
  }
  return {
    ...state,
    ...newState
  };
}
