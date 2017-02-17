import {GET_WAYBILLS_REQUEST,
        GET_WAYBILLS_SUCCESS,
        GET_WAYBILLS_FAILED} from '../constants/WaybillsConstants.js';
import {WAYBILLS_QUERY_STRING} from '../../global/constants/QueriesConstants.js';

import {getIndividualsData} from '../../main/actions/IndividualsActions.js';
import {getCarsData} from '../actions/CarsActions.js';

import {load} from '../../utils/synch-data.js';
import {getObjectFromId} from '../../utils/models.js';

export function getWaybills() {
  return (dispatch, getState) => {
    dispatch({
      type: GET_WAYBILLS_REQUEST
    });

    try {
        getWaybillsData().then((waybills) => {
          dispatch({
            type: GET_WAYBILLS_SUCCESS,
            payload: waybills
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

export function getWaybillsData() {
  return load(WAYBILLS_QUERY_STRING).then((waybills) => getWaybillsWithRelationShips(waybills));
}

function getWaybillsWithRelationShips(waybills) {
  return getCarsData().then((cars) =>
    getIndividualsData().then(
      (individuals) => {
        waybills.map((waybill) => {
          waybill['car'] = getObjectFromId(waybill.car_id, cars);
          waybill['driver'] = getObjectFromId(waybill.driver_id, individuals)
        });
        return waybills;
      }
    )
  )
}
