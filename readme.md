# Redux Entities
A set of redux actions/selectors/reducers that helps you store and modify data.

## Docs
 - [Getting Started](#getting-started)
 - [Api](docs/api.md)

## Overview

## Getting Started
All that is required to use this library is redux 

### 1. Pre-requisites
**Required**
- redux

**Optional**
- normalizr The reducers for this library are based on the normalizr library

### 2. Install the library
```sh
npm install alexs-redux-entities
```

### 3. Add the reducer to your root reducer
Import `createEntitiesReducer` from the library and add it into your root reducer.

```js
// your root reducer
import createEntitiesReducer from 'alexs-redux-entities';

export default combineReducers({
  ..., // your other reducers,
  entities: createEntitiesReducer()
})
```

### 4. Add some entities
The concept of entities in this library is based on the [normalizr](https://github.com/paularmstrong/normalizr) library (it is even encouraged to use it), all entities are stored by their entity type and then their their id.

Please note though, this library does not offer any way to store lists of ids as is normal for the normalized pattern, this is up to you to implement for now.

To add entities into the store, dispatch any action with the payload `entities` (unless configured differently), where entities is the normalized data.

```js
// Without normalizr
dispatch({
  type: 'SOME_ACTION',
  payload: {
    entities: {
      todo: {
        1: {
          id: 1,
          title: 'Do stuff',
          completed: false
        }
      }
    }
  }
})

// With normalizr
dispatch({
  type: 'SOME_ACTION',
  payload: normalize({id: 2, title: 'Do other stuff', completed: false}, todoSchema)
})
```

### 6. Set up your selectors
To generate the selectors use `createEntitySelectors`, which takes the following arguments
- `entityName` The name of the entity to generate the selectors for
- `getState` Get the sub-state for where you place the entities store

```js
// wherever-you-keep-selectors.js
import { createEntitySelectors } from 'alexs-redux-entities';

export const todoSelectors = createEntitySelectors('todo', state => state.entities);
```
