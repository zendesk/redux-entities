import createEntitySelectors from './create-entity-selectors';

jest.mock('./../reducers', () => ({
  selectors: {
    some: jest.fn()
  }
}));
const { selectors } = require('./../reducers');

describe('create-entity-selectors', () => {

  describe('when no selectors provided', () => {
    it('defaults to the selectors from this library', () => {
      expect(Object.keys(createEntitySelectors('cat'))).toEqual(['some'])
    })
  })

  describe('selectors', () => {
    let result

    beforeEach(() => {
      result = createEntitySelectors('cat')
      result.some('state', 'parameter')
    })

    it('calls the generated selector with the entityName as the second argument', () => {
      expect(selectors.some).toHaveBeenCalledWith('state', 'cat', 'parameter')
    })
  })
})
