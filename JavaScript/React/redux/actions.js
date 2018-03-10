import {get} from './fetchs.js'

/*
 * action 类型
 */

export const ADD_TODO = 'ADD_TODO';
export const GET_TODO = 'GET_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const DEL_TODO = 'DEL_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/*
 * 其它的常量
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

/*
 * action 创建函数
 */

export function addTodo(text) {
  return { type: ADD_TODO, text };
}

export function receivePosts(subreddit, todos) {
  return { type: GET_TODO, subreddit, todos, }
}

export function getTodo(subreddit) {
  return dispatch => {
    return get(subreddit)
      .then(json => dispatch(receivePosts(subreddit, json.data.children)))
      // .then(json => dispatch(getTodo(subreddit)))
  }
}

export function toggleTodo(index) {
  return { type: TOGGLE_TODO, index };
}

export function delTodo(index) {
  return { type: DEL_TODO, index };
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}