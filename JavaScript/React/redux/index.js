import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import todoApp from './reducers'
import App from './components/App'
import thunkMiddleware from 'redux-thunk'

const store = createStore(
  todoApp,
  applyMiddleware(
    thunkMiddleware, // 允许我们 dispatch() 函数
  )
)
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)