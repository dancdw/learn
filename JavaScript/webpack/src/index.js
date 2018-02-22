import _ from 'lodash' // 导入外部模块
import printMe from './asset/print.js'
import { cube } from './asset/math.js'


function component() {
  let element = document.createElement('div')
  let btn = document.createElement('button')

  // 使用脚本
  element.innerHTML = _.join(['Hello', 'webpack', '<br/>'], ' ')
  btn.innerHTML = _.join(['Click Me', '5 * 5 = ' + cube(5)], '，')
  btn.onclick = printMe

  element.appendChild(btn)

  return element;
}

document.body.appendChild(component())