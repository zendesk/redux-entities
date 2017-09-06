import byIdReducer from './../reducers/by-id';
import isObject from './is-object';

const createByIdReducer = (actionPayloadLocation, reducers) => {
  if (typeof actionPayloadLocation !== 'string') {
    throw new Error(`createEntityReducer expects first argument to be a string, received type ${typeof actionPayloadLocation}}`);
  }

  if (!isObject(reducers)) {
    throw new Error(`createEntityReducer expects second argument to be an object, received type ${typeof reducers}}`);
  }

  const reducer = byIdReducer(actionPayloadLocation);

  return (state, action) => Object.keys(reducers).reduce(
    (newState, key) => ({
      ...newState,
      [key]: reducers[key](newState[key], action)
    }),
    reducer(state, action)
  )
}

export default createByIdReducer;