/**
 * 注册事件
 * @param {[type]}   obj [元素节点 obj.elem]
 * @param {[type]}   type [事件类型]
 * @param {Function} fn   [事件函数]
 * @param {[type]}   capture [是否冒泡]
 */
function addEvent(obj, type, fn, capture) {
	if (window.addEventListener) {
		obj.addEventListener(type, fn, capture);
	} else {
		obj.attachEvent('on' + type, fn);
	}
}

/**
 * 取消事件注册
 * @param {[type]}   obj [元素节点 obj.elem]
 * @param {[type]}   type [事件类型]
 * @param {Function} fn   [事件函数]
 * @param {[type]}   capture [是否冒泡]
 */
function removeEvent(obj, type, fn, capture) {
	if (window.removeEventListener) {
		obj.removeEventListener(type, fn, capture);
	} else {
		obj.detachEvent('on' + type, fn);
	}
}


/**
 * 判断是否是一个空对象
 * @param  {[type]}  o [对象]
 * @return {Boolean}   [description]
 */
function isEmptyObject(obj) {
	for (var i in obj) {
		return 0;
	}
	return 1;
}

/**
 * 对象属性复制
 * @param  {[type]} toObj    [原对象]
 * @param  {[type]} frommObj [来源对象]
 * @param  {[type]} deep     [是否深拷贝]
 * @return {[type]}          [原对象]
 */
function extend(toObj, frommObj, deep) {
	for (var k in frommObj) {
		if (!toObj.hasOwnProperty(k))
			if (deep == true) { // 深拷贝
				toObj[k] = (typeof frommObj[k] == 'object' && frommObj[k] !== null) ? arguments.callee({}, frommObj[k], deep) : (frommObj[k] ? frommObj[k] : '');
			} else { // 浅拷贝
				toObj[k] = frommObj[k] ? frommObj[k] : '';
			}
	}
	return toObj;
}

/**
 * 获取元素真实的样式
 * @param  {[type]} elem [description]
 * @param  {[type]} attr [description]
 * @return {[type]}      [description]
 */
function getStyle(elem, attr) {
	if (elem.currentStyle) {
		return elem.currentStyle[attr];
	} else {
		return window.getComputedStyle(elem)[attr];
	}
}

/**
 * 根据 id 获取节点
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
function $(id) {
  return document.getElementById(id);
}

/**
 * 零填充
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
function padding(num) {
  return num < 10 ? '0' + num : num;
}

/**
 * 移除节点class
 * @param  {[type]} elem  [description]
 * @param  {[type]} class [description]
 * @return {[type]}       [description]
 */
function removeClass(elem, classn) {
  if((elem.className += ' ').indexOf(' ' + classn + ' ') !== -1) if(!elem.className.charAt(0)) {
    elem.className = elem.className.replace(' ' + classn, '');
  } else {
    elem.className = elem.className.replace(classn, '');
  }
}

/**
 * 添加节点class
 * @param {[type]} elem   [description]
 * @param {[type]} classn [description]
 */
function addClass(elem, classn) {
  if((elem.className += ' ').indexOf(' ' + classn + ' ') === -1) if(!elem.className.charAt(0)) {
    elem.className = classn;
  } else {
    elem.className += ' ' + classn;
  }
}

/**
 * 查找节点class是否存在
 * @param  {[type]} elem   [description]
 * @param  {[type]} classn [description]
 * @return {[type]}        [description]
 */
function lookupClass(elem, classn) {
  var name = elem.className + ' '; // 获取当前元素 class 属性
  return new RegExp(classn + ' ', 'g').test(name);
}


var emitter = {
	// var handled;
}