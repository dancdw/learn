import * as React from 'react'
import Footer from '../components/Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import { Route, NavLink, Redirect, Switch } from 'react-router-dom'

class PageOne extends React.Component {
  constructor(props) {
    super(props)
    // this.handleChange = this.handleChange.bind(this)
    // this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }
  // 'reactjs', 'frontend'
  // componentDidMount() {
  //   const { onTodoGet } = this.props
  //   onTodoGet('reactjs')
  // }

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
    const { match } = this.props
    return (
      // <Redirect to="/pageTwo"/>
      <div>
        <AddTodo />
        <VisibleTodoList filter={match.params.filter} />
        <Footer match={match} />
      </div>
    )
  }
}

export default PageOne