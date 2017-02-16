import {GET_WAYBILLS_REQUEST,
        GET_WAYBILLS_SUCCESS,
        GET_WAYBILLS_FAILED} from '../constants/WaybillsConstants.js';
import {WAYBILLS_QUERY_STRING} from '../../global/constants/QueriesConstants.js';

import {load} from '../../utils/synch-data.js';

export function getWaybills() {
  return (dispatch, getState) => {
    dispatch({
      type: GET_WAYBILLS_REQUEST
    });

    try {
        load(WAYBILLS_QUERY_STRING).then((data) => {
          dispatch({
            type: GET_WAYBILLS_SUCCESS,
            payload: data
          });
        });
    } catch (e) {
      dispatch({
        type: GET_WAYBILLS_FAILED,
        payload: new Error(e)
      });
    }
  };
}
