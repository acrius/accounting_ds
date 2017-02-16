import {GET_CARS_REQUEST,
        GET_CARS_SUCCESS,
        GET_CARS_FAILED,
        GET_CAR_TYPES_REQUEST,
        GET_CAR_TYPES_SUCCESS,
        GET_CAR_TYPES_FAILED,
        APPEND_RELATIONSHIPS_IN_CARS} from '../constants/CarsConstants.js';
import {CARS_QUERY_STRING, CAR_TYPES_QUERY_STRING} from '../../global/constants/QueriesConstants.js';

import {load} from '../../utils/synch-data.js';

export function getCars() {
  return (dispatch, getState) => {

    const getCarsTypesStatus = getCarTypesData(dispatch);
    if (getCarsTypesStatus) {
      getCarsData(dispatch, getState);
    }
  };
}

export function getCarTypesData(dispatch) {
  let getStatus = false;
  dispatch({
    type: GET_CAR_TYPES_REQUEST
  });

  try {
    load(CAR_TYPES_QUERY_STRING)
      .then( data => dispatch({
          type: GET_CAR_TYPES_SUCCESS,
          payload: data
        }));
        getStatus = true;
  } catch(e) {
    dispatch({
      type: GET_CAR_TYPES_FAILED,
      error: true,
      payload: new Error(e)
    });
    getStatus = false;
  }
  return getStatus;
}

export function getCarsData(dispatch, getState) {
  let getStatus = false;
  dispatch({
    type: GET_CARS_REQUEST
  });

  try {
    load(CARS_QUERY_STRING)
      .then( data => {
        dispatch({
          type: GET_CARS_SUCCESS,
          payload: getCarsWithRelationships(dispatch, getState, data)
        });});
    getStatus = true;
  } catch(e) {
    dispatch({
      type: GET_CARS_FAILED,
      error: true,
      payload: new Error(e)
    });
    getStatus = false;
  }
  return getStatus;
}

function getCarsWithRelationships(dispatch, getState, cars) {
  return cars.map((car) => {
            car['car_type'] = getCarTypeFromId(car.car_type_id, getState().cars.carTypes);
            return car;
          });
}

function getCarTypeFromId(carTypeId, carTypes) {
    const findedCarTypes = carTypes.filter((carTypeItem) => carTypeItem.id == carTypeId);
    return findedCarTypes ? findedCarTypes[0] : {id: carTypeId};
}
