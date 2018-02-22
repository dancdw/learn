import * as _  from 'lodash' // 导入外部模块
import printMe from './asset/print'
import { cube } from './asset/math'
import './asset/style.css' // 导入 css 文件
import Img from './asset/img.jpg' // 导入 image 文件
import Package from './asset/test.json' // 导入 json 文件

function component() {
  let element = document.createElement('div')
  let btn = document.createElement('button')

  // 使用脚本
  element.innerHTML = _.join(['Hello', 'webpack', JSON.stringify(Package), '<br/>'], ' ')  
  element.classList.add('hello')

  btn.innerHTML = _.join(['Click Me', '5 * 5 = ' + cube(5)], '，')
  btn.onclick = printMe

  // 使用图片
  var myImg = new Image()
  myImg.src = Img
  element.appendChild(myImg)
  element.appendChild(btn)

  return element;
}

document.body.appendChild(component())