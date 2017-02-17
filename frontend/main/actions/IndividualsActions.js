import {GET_INDIVIDUALS_REQUEST,
        GET_INDIVIDUALS_SUCCESS,
        GET_INDIVIDUALS_FAILED} from '../constants/IndividualsConstants.js';
import {INDIVIDUALS_QUERY_STRING} from '../../global/constants/QueriesConstants.js';

import {load} from '../../utils/synch-data.js';

export function getIndividuals() {
  return (dispatch, getState) => {
    dispatch({
      type: GET_INDIVIDUALS_REQUEST
    });

    try {
      getIndividualsData()
        .then( individuals => dispatch({
            type: GET_INDIVIDUALS_SUCCESS,
            payload: individuals
          }
        ));
    } catch(e) {
      dispatch({
          type: GET_INDIVIDUALS_FAILED,
          error: true,
          payload: new Error(e)
        });
    }
  };
}

export function getIndividualsData() {
  return load(INDIVIDUALS_QUERY_STRING);
}
