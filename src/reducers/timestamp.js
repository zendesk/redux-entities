import { hasEntities, getAllEntities } from './../utils/reducer-helpers';

const reducer = entityGroup => (state = {}, action) => {
  if (!hasEntities(action, entityGroup)) {
    return state;
  }
  const time = Date.now();

  const entities = getAllEntities(action, entityGroup);

  return Object.keys(entities).reduce(
    (newState, type) => ({
      ...newState,
      [type]: Object.keys(entities[type]).reduce(
        (ids, id) => ({
          ...ids,
          [id]: time
        }), newState[type]
      )
    }), state
  )
}

export default reducer;

export const getTimestamp = (state, type, id) => state[type] && state[type][id];

export const selectors = {
  getTimestamp
};
