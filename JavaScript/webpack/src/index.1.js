import _ from 'lodash' // 导入外部模块
import './style.css' // 导入 css 文件
import Img from './img.jpg' // 导入 image 文件
import Package from './test.json' // 导入 json 文件


function component() {
  let element = document.createElement('div');

  // 使用脚本
  element.innerHTML = _.join(['Hello', 'webpack', JSON.stringify(Package)], ' ')
  element.classList.add('hello')

  // 使用图片
  var myImg = new Image()
  myImg.src = Img
  // element.appendChild(myImg)

  return element;
}

document.body.appendChild(component())