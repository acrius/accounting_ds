const HOST_API = 'http://accounting.com:8000/api/models';
const DIRECTORIES = '/directories/';
const ACTIVE_DIRECTORIES = '/active_directories/';

const get_query_string = (modelType, modelName, filter_field = '') => {
  return HOST_API + modelType + modelName + (filter_field ? ('/?' + filter_field + "=") : '/');
}

export const INDIVIDUALS_QUERY_STRING = get_query_string(DIRECTORIES, 'Individual');
export const INDIVIDUAL_QUERY_STRING = get_query_string(DIRECTORIES, 'Individual', 'id');
export const CARS_QUERY_STRING = get_query_string(DIRECTORIES, 'Car');
export const CAR_QUERY_STRING = get_query_string(DIRECTORIES, 'Car', 'id');
export const CAR_TYPES_QUERY_STRING = get_query_string(DIRECTORIES, 'CarType');
export const CAR_TYPE_QUERY_STRING = get_query_string(DIRECTORIES, 'CarType', 'id');
export const WAYBILLS_QUERY_STRING = get_query_string(ACTIVE_DIRECTORIES, 'Waybill');
export const WAYBILL_QUERY_STRING = get_query_string(ACTIVE_DIRECTORIES, 'Waybill', 'id');
