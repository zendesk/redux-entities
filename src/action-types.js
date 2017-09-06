export const beginEditingRef = (entityGroup = 'entities', entityName, id) => `BEGIN_EDITING/${entityGroup}/${entityName}/${id}`;
export const updateEditableRef = (entityGroup = 'entities', entityName, id) => `UPDATE_EDITABLE/${entityGroup}/${entityName}/${id}`;
export const stopEditingRef = (entityGroup = 'entities', entityName, id) => `STOP_EDITING/${entityGroup}/${entityName}/${id}`;

export const BEGIN_EDITING = 'BEGIN_EDITING';
export const UPDATE_EDITABLE = 'UPDATE_EDITABLE';
export const STOP_EDITING = 'STOP_EDITING';

export const OPTIMISTIC_UPDATE = (entityGroup = 'entities') => `OPTIMISTIC_UPDATE/${entityGroup}`;
export const RESOLVE_OPTIMISTIC_UPDATE = (entityGroup = 'entities') => `RESOLVE_OPTIMISTIC_UPDATE/${entityGroup}`;
