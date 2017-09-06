import timestampReducer, { selectors } from './timestamp';

describe('timestamp', () => {
  describe('reducer', () => {
    let reducer

    beforeEach(() => {
      reducer = timestampReducer('entities')
    })

    const initialState = {
      dog: {
        123: 123123123,
        456: 123123123
      }
    }

    describe('initial state', () => {
      let result

      beforeEach(() => {
        result = reducer(undefined, { type: 'SOME_ACTION' });
      })

      it('is an empty object', () => {
        expect(result).toEqual({});
      })
    })

    describe('when an action has entities', () => {
      const action = {
        type: 'SOME_ACTION',
        payload: {
          entities: {
            cat: {
              12: {
                name: 'Mr. Cat'
              }
            },
            dog: {
              456: {
                name: 'Mr. Dog'
              }
            }
          }
        }
      }
      let result

      beforeEach(() => {
        Date.now = jest.fn().mockReturnValue('some timestamp');
        result = reducer(initialState, action);
      })

      it('update each entity with the same timestamp', () => {
        expect(result).toEqual({
          cat: {
            12: 'some timestamp'
          },
          dog: {
            123: 123123123,
            456: 'some timestamp'
          }
        })
      })
    })

    describe('when an action does not have entities', () => {
      it('returns the old state', () => {
        expect(reducer(initialState, { type: 'SOME_ACTION' })).toEqual(initialState);
      })
    })
  })

  describe('selectors', () => {
    describe('getTimestamp', () => {
      const state = {
        dog: {
          123: 123123123
        }
      }

      describe('when timestamp exists', () => {
        it('returns the timestamp', () => {
          expect(selectors.getTimestamp(state, 'dog', 123)).toEqual(123123123)
        })
      })

      describe('when timestamp does not', () => {
        it('returns undefined', () => {
          expect(selectors.getTimestamp(state, 'cat', 123)).toEqual(undefined)
        })
      })
    })
  })
})