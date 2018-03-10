import * as React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import createHistory from 'history/createBrowserHistory'
import { Router, Route } from 'react-router-dom'

import todoApp from './reducers'
import App from './App'

const history = createHistory()

const store = createStore(
  todoApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    thunkMiddleware
  ),
)
// store.dispatch(push('/foo'))

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route exact component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
)