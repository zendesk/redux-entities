import editable, { selectors } from './editable'
import { beginEditing, update, stopEditing } from '../actions'

describe('editable', () => {
  describe('reducer creator', () => {
    it('returns a function', () => {
      expect(typeof editable('entities'))
        .toBe('function')
    })

    it('returns existing state when action is for different entity group', () => {
      const reducer = editable('entities')
      const initialState = {}
      const action = beginEditing('not entities', 'cat', 1337, {some: 'thing'})

      expect(reducer(initialState, action))
        .toBe(initialState)
    })

    it('handles actions for the given entity group', () => {
      const reducer = editable('entities')
      const initialState = {}
      const action = beginEditing('entities', 'cat', 1337, {some: 'thing'})

      expect(reducer(initialState, action))
        .not.toBe(initialState)
    })
  })

  describe('reducer', () => {
    const entityGroup = 'entities'
    let reducer

    beforeEach(() => {
      reducer = editable(entityGroup)
    })

    it('has a empty initial state', () => {
      expect(reducer())
        .toEqual({})
    })

    it('sets the entity with the given properties when beginning editing', () => {
      const initialState = {}
      const action = beginEditing(entityGroup, 'cat', 1337, {some: 'thing'})

      expect(reducer(initialState, action))
        .toEqual({
          cat: {
            1337: {
              some: 'thing'
            }
          }
        })
    })

    it('updates the entity with the given properties when updating', () => {
      const initialState = {
        cat: {
          1337: {
            some: 'thing',
            another: 'attribute'
          }
        }
      }
      const action = update(entityGroup, 'cat', 1337, {some: 'other thing'})

      expect(reducer(initialState, action))
        .toEqual({
          'cat': {
            1337: {
              some: 'other thing',
              another: 'attribute'
            }
          }
        })
    })

    it('sets entity to null when stop editing', () => {
      const initialState = {
        cat: {
          1337: {
            some: 'thing'
          },
          2000: {
            another: 'cat'
          }
        }
      }
      const action = stopEditing(entityGroup, 'cat', 1337)

      expect(reducer(initialState, action))
        .toEqual({
          cat: {
            1337: null,
            2000: {
              another: 'cat',
            }
          }
        })
    })
  })

  describe('selectors', () => {
    describe('getEditable', () => {
      const state = {
        cat: {
          1337: 'awesome cat'
        }
      }

      it('returns the editable entity', () => {
        const result = selectors.getEditable(state, 'cat', 1337)

        expect(result)
          .toBe('awesome cat')
      })
    })
  })
})
