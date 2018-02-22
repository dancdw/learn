import _ from 'lodash' // 导入外部模块
import printMe from './print.js'


function component() {
  let element = document.createElement('div')
  let btn = document.createElement('button')

  // 使用脚本
  element.innerHTML = _.join(['Hello', 'webpack', '<br/>'], ' ')
  btn.innerHTML = _.join(['Click me', 'and check the console,test!'])
  btn.onclick = printMe

  element.appendChild(btn)

  return element;
}

document.body.appendChild(component())