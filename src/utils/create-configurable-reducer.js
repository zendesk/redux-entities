import isObject from './is-object';

const createReducer = (reducer, reducers) => {
  if (!isObject(reducers)) {
    throw new Error(`configureReducer expects first argument to be an object, received type ${typeof reducers}}`);
  }

  return (state, action) => Object.keys(reducers).reduce(
    (newState, key) => ({
      ...newState,
      [key]: reducers[key](newState[key], action)
    }),
    reducer(state, action)
  )
}

export default createReducer;