import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 01. 介绍 JSX

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez',
  avatarUrl: ''
};

// JSX 中嵌入表达式{}
const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

// JSX 使用分支语句
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}

// 指定属性
const element = <div tabIndex="0"></div>;
const element = <img src={user.avatarUrl}></img>;

// 元素嵌套
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);