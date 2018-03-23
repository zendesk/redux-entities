jest.mock('./../reducers/by-id')
const {default: createEntityReducer} = require('./create-by-id-reducer')
const {default: createById} = require('./../reducers/by-id')

describe('create-by-id-reducer', () => {

  createById.mockImplementation((actionPayloadLocation) => state => ({...state, actionPayloadLocation}))

  it('throws an error if not passed in an object', () => {
    expect(() => createEntityReducer(4)).toThrow()
  })

  it('returns a function', () => {
    expect(typeof createEntityReducer('entities', {})).toBe('function')
  })

  describe('reducer', () => {
    const initialState = {cat: 'cat-state', dog: 'dog-state'}
    const action = {type: 'SOME_ACTION'}
    const reducers = {
      cat: jest.fn().mockReturnValue('new-cat-state'),
      dog: jest.fn().mockReturnValue('new-dog-state')
    }
    let result

    beforeEach(() => {
      const reducer = createEntityReducer('entities', reducers)

      result = reducer(initialState, action)
    })

    it('calls each sub-state with its corresponding sub-reducer', () => {
      expect(reducers.cat).toHaveBeenCalledWith('cat-state', action)
      expect(reducers.dog).toHaveBeenCalledWith('dog-state', action)
    })

    it('returns the combined states', () => {
      expect(result).toEqual({
        actionPayloadLocation: 'entities',
        cat: 'new-cat-state',
        dog: 'new-dog-state'
      })
    })
  })
})