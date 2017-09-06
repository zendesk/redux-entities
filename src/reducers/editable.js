import { merge } from 'lodash/object'
import createDynamicReducer from 'alexs-redux-helpers/reducers/create-dynamic-reducer';
import createMetaReducer from 'alexs-redux-helpers/reducers/create-meta-reducer';
import {
  BEGIN_EDITING,
  UPDATE_EDITABLE,
  STOP_EDITING
} from './../action-types';

const initialState = null;

const editableReducer = createDynamicReducer({
  initial: initialState,
  [BEGIN_EDITING]: [
    action => action.payload.entityName,
    (state, action) => ({
      ...state,
      [action.payload.id]: action.payload.fields
    })
  ],
  [UPDATE_EDITABLE]: [
    action => action.payload.entityName,
    (state, action) => ({
      ...state,
      [action.payload.id]: ({
        ...(state[action.payload.id] || {}),
        ...action.payload.fields
      })
    })
  ],
  [STOP_EDITING]: [
    action => action.payload.entityName,
    (state, action) => ({
      ...state,
      [action.payload.id]: initialState
    })
  ]
});

const reducer = entityGroup => createMetaReducer('editable', (state, meta, action) => {
  if (meta.entityGroup !== entityGroup) {
    return state
  }

  return editableReducer(state, { ...action, type: meta.type });
})

export default reducer;


const getEditable = (state, entityName, id) => (state[entityName] || {})[id];

export const selectors = {
  getEditable
};
