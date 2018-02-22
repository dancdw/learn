import _ from 'lodash'
import './style.css'
import Img from './img.jpg'
import Package from './test.json'


function component() {
  let element = document.createElement('div');

  // 现在由此脚本导入
  element.innerHTML = _.join(['Hello', 'webpack', JSON.stringify(Package)], ' ')
  element.classList.add('hello')

  // 将图像添加到我们现有的 div
  var myImg = new Image()
  myImg.src = Img
  // element.appendChild(myImg)

  return element;
}

document.body.appendChild(component())