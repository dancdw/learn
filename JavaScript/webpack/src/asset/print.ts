import * as _ from 'lodash' // 导入外部模块

export default function printMe() {
  // console.log('I get called from print.js!')
  console.error(_.join(['I', 'get ', 'called', 'from', 'print.js!'], ' '))
}
