import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 02. 渲染元素

const element = <h1>Hello, world</h1>;

// 将元素渲染到 DOM 中
ReactDOM.render(
  element,
  document.getElementById('root')
);

// 更新渲染元素
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);