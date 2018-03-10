import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters, DEL_TODO, GET_TODO } from './actions';
const { SHOW_ALL } = VisibilityFilters;

// 每个 state 对应每个 reducer
const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: []
};

let index = 1
const auth = false

function todos(state = initialState.todos, action) {
  switch (action.type) {
    case GET_TODO:
      return action.todos
    case ADD_TODO:
      let data = {
        title: action.text,
        clicked: false,
        id: index++
      }
      return [
        ...state,
        {data}
      ]
    case DEL_TODO:
      let newState = [...state]
      newState.splice(action.index, 1)
      return newState;
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          let data = Object.assign({}, todo.data, {
            clicked: !todo.data.clicked
          })
          return Object.assign({}, todo, {
            data
          })
        }
        return todo
      })
    default:
      return state
  }
}

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos,
  router: routerReducer
})

export default todoApp

// export default function todoApp(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     todos: todos(state.todos, action)
//   }
// }