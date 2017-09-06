# Reducer

## createEntityReducer(entityGroup, byIdReducers, editableReducers)

Arguments
- `entityGroup` The attribute where the entities will be stored in the action's payload
- `byIdReducers` Your custom reducers to modify entities
- `editableReducers` Your custom reducers to modify the editable entities

### Example

```js
import { combineReducers } from 'redux';
import createEntityReducer from 'alexs-redux-entities';

const nukeStore = (state, action) => {
  if (action.type === 'NUKE_ALL_THE_THINGS') {
    return {}
  };
  
  return state;
};

const editableUser = (state, action) => {
  switch(action.type) {
    case 'INCREMENT_USER_CLICK_COUNT':
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          clickCount: action.payload.clickCount + 1
        }
      }
    default:
      return state;
  }
}

export default combineReducers({
  entities:  createEntityReducer(
    'entities',
    { todos: nukeStore, users: nukeStore() },
    { users: editableUser }
  )
})

/* ... */

store.dispatch({
  entities: {
    todos: {
      1: { title: 'Do something' }
    },
    users: {
      5: { name: 'Someone' }
    }
  }
});

store.dispatch({ type: 'NUKE_ALL_THE_THINGS' });
```  

# Actions

## Editing Entities

### beginEditing(entityGroup, entityName, id, fields)
Assigns the fields to the editable entity

```js
import { beginEditing } from 'alexs-redux-fetch/entities/actions';

beginEditing('entities', 'todo', {id: '123', title: 'Do stuff'})
```

### update(entityGroup, entityName, id, fields)
Merges the fields into the editable entity

```js
import { update } from 'alexs-redux-fetch/entities/actions';

update('entities', 'todo', {title: 'Do other stuff'})
```

### stopEditing(entityGroup, entityName, id)
Sets the editable entity to null

```js
import { stopEditing } from 'alexs-redux-fetch/entities/actions';

stopEditing('entities', 'todo')
```

### createEditActions(entityGroup, entityName)
Generates functions for all of the above editable functions so that passing in the entityName is not required for each call.

```js
import { createEditActions } from 'alexs-redux-fetch/entities/actions';

const editTodoActions = createEditActions('entities', 'todo')

editTodoActions.beginEditing({id: 1, title: 'Do stuff', completed: true});
editTodoActions.update({completed: false});
editTodoActions.stopEditing();
```

# Selectors

## getById(state, entityName, id)
Returns the entity for the given type and id.

## getAll(state, entityName)
Returns all entities currently stored for the given entityName.

Using this function isn't recommended, as it just does an Object.values(), it is probably better to keep a list of ids stored to loop through rather than getting all items*

For now you will need to create these lists of ids.

## getEditable(state, entityName, id)
Returns the editable entity for the given entityType and id.

## getTimestamp(state, entityName, id)
Returns the timestamp of when the entity was last written into.

*Note: This doesn't take into account your reducers passed into createReducer*

## createEntitySelectors(entityName, getState)
All of the above selectors are in the format (state, entityName, ...params). So to avoid passing in entityName each time, you can use createEntitySelectors to generate entity specific selectors.

You can also pass in your own selectors as the third parameter if you have added onto the provided entity selectors, your custom selectors must be in the same format as (state, entityName, ...params).
 
```js
import { createEntitySelectors, entitySelectors } from 'alexs-redux-fetch';

// Todo selectors
const todoSelectors = createEntitySelectors('todo')
todoSelectors.getById(state, 123) // getById(state, 'todo', 123)

// User selectors
const getUsername = (state, entityName, id) => {
  const user = entitySelectors.getById(state, entityName, id);
  
  if (!user) {
    return undefined;
  }
  
  return user.username;
}

const userSelectors = createEntitySelectors('user', undefined, {
  ...entitySelectors,
  getUsername
});
userSelectors.getUsername(state, 1)
```

## Helpers

### hasEntities (action, entityGroup) -> Bool
Returns true if the given action contains entities.

```js
import { hasEntities } from 'alexs-redux-fetch/entities/helpers';

const action = {
  type: 'SOME_ACTION',
  payload: {
    entities: {
      todo: {
        1: {
          id: 1,
          title: 'Do something'
        }
      }
    }
  }
}

hasEntities(action, 'entities'); // true
hasEntities(action, 'other-entities'); // false
hasEntities({type: 'cat'}); // false
```

### getAllEntities (action, entityGroup) -> {}
Returns all of the entities in the given action. If no entities in action it will return an empty object.

```js
import { getAllEntities } from 'alexs-redux-fetch/entities/helpers';

const action = {
  type: 'SOME_ACTION',
  payload: {
    entities: {
      todo: {
        1: {
          id: 1,
          title: 'Do something'
        }
      },
      user: {
        1: {
          id: 1,
          name: 'Someone'
        }
      }
    }
  }
}

getAllEntities(action, 'entities'); // { todo: { ... }, user: { ... } }
getAllEntities(action, 'other-entities'); // {}
getAllEntities({type: 'cat'}); // {}
```

### getEntities (action, entityGroup, entityName) -> {}
Returns the entities for the entityName from the given action. If no entities of that type exist in the action it will return an empty object.

```js
import { getEntities } from 'alexs-redux-fetch/entities/helpers';

const action = {
  type: 'SOME_ACTION',
  payload: {
    entities: {
      todo: {
        1: {
          id: 1,
          title: 'Do something'
        }
      },
      user: {
        1: {
          id: 1,
          name: 'Someone'
        }
      }
    }
  }
}

getEntities(action, 'entities', 'todo'); // { 1: { ... } }
getEntities(action, 'other-entities', 'todo'); // {}
getEntities(action, 'entities', 'cat'); // {}
```

### updateEntity (state, id, (entity) -> updatedEntity) -> {}
A simple utility function to assist in the sub-reducers you create to handle custom actions for the entity store (see `createReducer` docs).

```js
import { updateEntity } from 'alexs-redux-fetch/entities/helpers';

const todoState = {
  1: {
    id: 1,
    title: 'Do something',
    completed: false
  }
}

const newState = updateEntity(todoState, 1, entity => ({ ...entity, completed: true}))

/*
newState = {
  1: {
    id: 1,
    title: 'Do something',
    completed: true
  }
}
*/
```
