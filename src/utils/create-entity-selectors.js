import { selectors } from './../reducers';

const createEntitySelector = (type, getState = state => state, baseSelectors = selectors) => Object.keys(baseSelectors).reduce(
  (entitySelectors, selector) => ({
    ...entitySelectors,
    [selector]: (state, ...params) => baseSelectors[selector](getState(state), type, ...params)
  }), baseSelectors
);

export default createEntitySelector