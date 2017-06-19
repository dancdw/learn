import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 04. 状态和生命周期

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  tick() {
    // 更新状态
    this.setState({
      date: new Date()
    });
    // 异步更新
    this.setState((prevState, props) => {
      // console.log(prevState, props)
    });
  }

  // 初始化
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  // 卸载
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div>
        <h1>Hello wrold！</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);