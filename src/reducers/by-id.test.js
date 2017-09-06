import byIdReducer, { selectors } from './by-id';

describe('by-id', () => {
  describe('reducer', () => {
    let reducer

    beforeEach(() => {
      reducer = byIdReducer('entities')
    })

    describe('when action has entities', () => {
      const action = {
        type: 'SOME_ACTION',
        payload: {
          entities: {
            cat: {
              1: {
                name: 'Mr. Cat'
              }
            },
            dog: {
              12: {
                name: 'Mr. Dog',
                likes: ['stuff']
              }
            }
          }
        }
      }
      const initialState = {
        dog: {
          12: {
            age: 10,
            likes: ['food']
          }
        }
      }
      let result

      beforeEach(() => {
        result = reducer(initialState, action)
      })

      it('merges in the entities', () => {
        expect(result).toEqual({
          cat: {
            1: {
              name: 'Mr. Cat'
            }
          },
          dog: {
            12: {
              name: 'Mr. Dog',
              age: 10,
              likes: ['stuff']
            }
          }
        })
      })
    })

    describe('when action does not have entities', () => {
      const action = {
        type: 'SOME_ACTION',
        payload: {
          notEntities: 'stuff'
        }
      }
      const initialState = {
        dog: {
          12: {
            age: 10,
            likes: ['food']
          }
        }
      }
      let result

      beforeEach(() => {
        result = reducer(initialState, action)
      })

      it('returns the state', () => {
        expect(result).toEqual(initialState)
      })
    })
  })

  describe('selectors', () => {
    const state = {
      cat: {
        1: {
          name: 'Mr. Cat'
        },
        2: {
          name: 'Ms. Cat'
        }
      }
    }

    describe('getById', () => {

      it('returns the item', () => {
        expect(selectors.getById(state, 'cat', 2)).toEqual({ name: 'Ms. Cat' })
      })
    })

    describe('getAll', () => {
      it('returns an array of all of the items', () => {
        expect(selectors.getAll(state, 'cat')).toEqual([{ name: 'Mr. Cat' }, { name: 'Ms. Cat' }])
      })
    })
  })
})