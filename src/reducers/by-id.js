import { mergeWith } from 'lodash/object';
import { hasEntities, getAllEntities } from './../utils/reducer-helpers';

function customizer(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return srcValue;
  }
}

const reducer = actionPayloadLocation => (state = {}, action) => {
  if (!hasEntities(action, actionPayloadLocation)) {
    return state
  }

  return mergeWith({}, state, getAllEntities(action, actionPayloadLocation), customizer)
}

export default reducer;

export const getById = (state, type, id) => state[type] && state[type][id];
export const getAll = (state, type, id) => Object.values(state[type] || {});

export const selectors = {
  getById,
  getAll
};
