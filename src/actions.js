import action from 'alexs-redux-helpers/actions';
import {
  beginEditingRef,
  updateEditableRef,
  stopEditingRef,
  BEGIN_EDITING,
  UPDATE_EDITABLE,
  STOP_EDITING
} from './action-types';

/**
 * Editable
 */
export const beginEditing = (entityGroup, entityName, id, fields) => action(
  beginEditingRef(entityGroup, entityName, id),
  { entityName, id, fields },
  { editable: { type: BEGIN_EDITING, entityGroup } }
);

export const update = (entityGroup, entityName, id, fields = {}) => action(
  updateEditableRef(entityGroup, entityName, id),
  { entityName, id, fields },
  { editable: { type: UPDATE_EDITABLE, entityGroup } }
);

export const stopEditing = (entityGroup, entityName, id) => action(
  stopEditingRef(entityGroup, entityName, id),
  { entityName, id },
  { editable: { type: STOP_EDITING, entityGroup } }
);

const editActions = ({
  beginEditing,
  update,
  stopEditing
});

export const createEditActions = (entityGroup, entityName) => Object.keys(editActions).reduce(
  (actions, actionName) => ({
    ...actions,
    [actionName]: (...params) => editActions[actionName](entityGroup, entityName, ...params)
  }), {}
);
