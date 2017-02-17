import {GET_CARS_REQUEST,
        GET_CARS_SUCCESS,
        GET_CARS_FAILED,
        GET_CAR_TYPES_REQUEST,
        GET_CAR_TYPES_SUCCESS,
        GET_CAR_TYPES_FAILED,
        APPEND_RELATIONSHIPS_IN_CARS} from '../constants/CarsConstants.js';
import {CARS_QUERY_STRING, CAR_TYPES_QUERY_STRING} from '../../global/constants/QueriesConstants.js';

import {load} from '../../utils/synch-data.js';
import {getObjectFromId} from '../../utils/models.js';

export function getCars() {
  return (dispatch) => {
    dispatch({
      type: GET_CARS_REQUEST
    });
    try {
      getCarsData(dispatch).then(
        (cars) => dispatch({
                      type: GET_CARS_SUCCESS,
                      payload: cars
                    })
      );
    } catch(e) {
      dispatch({
        type: GET_CARS_FAILED,
        error: true,
        payload: new Error(e)
      });
    }
  };
}

export function getCarsData(dispatch) {
  return load(CARS_QUERY_STRING)
          .then((cars) => getCarsWithRelationships(cars));
}

function getCarsWithRelationships(cars) {
  return getCarTypesData().then((carTypes) => cars.map((car) => {
            car['car_type'] = getObjectFromId(car.car_type_id, carTypes);
            return car;
          }));
}

export function getCarTypesData() {
  return load(CAR_TYPES_QUERY_STRING);
}
