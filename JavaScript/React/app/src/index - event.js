import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 06. 事件 => 

class Toggle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    
    // 这个绑定是必要的，使`this`在回调中起作用
    // this.handleClick = this.handleClick.bind(this);
  }


  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={(e) => this.handleClick(e)}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);