import { combineReducers } from 'redux';
import nestSelectors from 'alexs-redux-helpers/selectors/nest-selectors';
import byId, { selectors as byIdSelectors } from './by-id';
import timestamp, { selectors as timestampSelectors } from './timestamp';
import editable, { selectors as editableSelectors } from './editable';
import createConfigurableReducer from './../utils/create-configurable-reducer';
import optimistic, { selectors as optimisticSelectors } from './optimistic';

export default (entityGroup = 'entities', byIdReducers = {}, editableReducers = {}) => combineReducers({
  byId: createConfigurableReducer(byId(entityGroup), byIdReducers),
  timestamp: timestamp(entityGroup),
  editable: createConfigurableReducer(editable(entityGroup), editableReducers)
});

export const selectors = {
  ...nestSelectors(byIdSelectors, state => state.byId),
  ...nestSelectors(timestampSelectors, state => state.timestamp),
  ...nestSelectors(editableSelectors, state => state.editable)
};
