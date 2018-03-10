import * as React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
import { getTodo } from '../actions'


class TodoList extends React.Component {
  constructor(props) {
    super(props)
    // this.handleChange = this.handleChange.bind(this)
    // this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }
  // 'reactjs', 'frontend'
  componentDidMount() {
    const { onTodoGet } = this.props
    onTodoGet('reactjs')
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
  //     const { dispatch, selectedSubreddit } = nextProps
  //     dispatch(fetchPostsIfNeeded(selectedSubreddit))
  //   }
  // }

  // handleChange(nextSubreddit) {
  //   this.props.dispatch(selectSubreddit(nextSubreddit))
  // }

  render() {
    const { todos, onTodoClick, onTodoDel } = this.props
    return (
      <ul>
        {todos.map((todo, index) => (
          <Todo key={index} {...todo.data} onClick={() => onTodoClick(index)} onDel={() => onTodoDel(index)} />
        ))}
      </ul>
    )
  }
}

export default TodoList