export const hasEntities = (action, entityGroup) => action.payload && action.payload && action.payload[entityGroup];

export const getAllEntities = (action, entityGroup) => (
  (action.payload && action.payload[entityGroup])
  || {}
);

export const getEntities = (action, entityGroup, entityName) => (
  (action.payload && action.payload[entityGroup] && action.payload[entityGroup][entityName])
  || {}
);


export const updateEntity = (state, id, callback) => {
  if (state && state[id]) {
    return {
      ...state,
      [id]: callback(state[id])
    }
  }

  return state
}