import {GET_CARS_REQUEST,
        GET_CARS_SUCCESS,
        GET_CARS_FAILED,
        GET_CAR_TYPES_REQUEST,
        GET_CAR_TYPES_SUCCESS,
        GET_CAR_TYPES_FAILED,
        APPEND_RELATIONSHIPS_IN_CARS} from '../constants/CarsConstants.js';

const carsInitialState = {
  cars: [],
  carTypes: [],
  fetching: false,
  error: ''
}

export default (state = carsInitialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_CAR_TYPES_REQUEST:
      newState = {
        fetching: true,
        error: ''
      };
      break;
    case GET_CAR_TYPES_SUCCESS:
      newState = {
        carTypes: action.payload,
        fetching: false,
        error: ''
      };
      break;
    case GET_CAR_TYPES_FAILED:
      newState = {
        fetching: false,
        error: action.payload.errorMessage
      };
      break;
    case GET_CARS_REQUEST:
      newState = {
        fetching: true,
        error: ''
      };
      break;
    case GET_CARS_SUCCESS:
      newState = {
        cars: action.payload,
        fetching: false,
        error: ''
      };
      break;
    case GET_CARS_FAILED:
      newState = {
        fetching: false,
        error: action.payload.errorMessage
      }
      break;
    case APPEND_RELATIONSHIPS_IN_CARS:
      newState = {
        cars: action.payload,
        fetching: false,
        error: ''
      }
      break;
  }
  return {
    ...state,
    ...newState
  };
}
