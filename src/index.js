import createEntityReducer, { selectors } from './reducers';
import createEntitySelectors from './utils/create-entity-selectors';

export default createEntityReducer;

export {
  createEntityReducer,
  selectors,
  createEntitySelectors
}