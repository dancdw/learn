(function(golbal) {
  var WEEK_MAX = 7; // 最大星期几
  var MODULE_NAME = 'm-timecontrol';
  var counter = 0; // 计数器
  var TOTAL_DAYS = 42; // 总天数
  

  function TimeControl(elem) {
  	this.$reference = elem; // 参照物
  	this.$datepicker; // 日期选择器
  	this._currDate;
  	this._currYear;
  	this._currMonth;
  	this._currDay;
  	
  	this._generateId(); // 为对象生成唯一标识
  	this._render(); // 生成 DOM
  	this._setReference(); // 插入 DOM
  	this._addEvents(); // 添加事件
  }


  TimeControl.prototype = {
  	/**
  	 * 生成唯一标识
  	 * @return {[type]} [description]
  	 */
  	_generateId: function() {
  	  this._id = 'm-timecontrol-' + this.$reference.id + '-' + counter++;
  	},

  	/**
  	 * 生成视图
  	 * @param {[type]} date [description]
  	 */
  	_setDate: function(date) {
  	  var time = this._getDate(date);
  	  var dayArr = []; // 数据容器

  	  // 当前视图日期
  	  this._currYear = time.getFullYear();
  	  this._currMonth = time.getMonth();
  	  this._currDay = time.getDate();

  	  // 上个月
  	  var prevTime = new Date(this._currYear, this._currMonth, 0);
  	  var prevDayMax = prevTime.getDate(); // 上个月最后一天
  	  var prevWeekMax = prevTime.getDay(); // 上个月最后一天是星期几
  	  for (var i = 0; i <= prevWeekMax; i++) {
  	  	dayArr.unshift({type: 'prev-month', day: prevDayMax - i});
  	  }

  	  // 当月
  	  var lastTime = new Date(this._currYear, this._currMonth + 1, 0);
  	  var lastDay = lastTime.getDate(); // 当月最后一天
  	  for (var j = 1; j <= lastDay; j++) {
  	  	var temp = this._currYear + '-' + padding(this._currMonth + 1) + '-' + padding(j); // 创建日期用于对比
  	  	var type = temp === this._currDate ? 'current current-month' : 'current-month';
  	  	dayArr.push({type: type, day: j});
  	  }

  	  // 下个月
  	  var nextTime = new Date(this._currYear, this._currMonth + 1, 1);
  	  for (var k = 1, len = TOTAL_DAYS - dayArr.length; k <= len; k++) {
  	  	dayArr.push({type: 'next-month', day: k});
  	  }
      
      // 生成数据
  	  var html = '';
  	  for (var l = 0; l < dayArr.length; l++) {
  	  	if(l % WEEK_MAX === 0) html += '<tr>';
  	  	html += '<td class="' + dayArr[l]['type'] + '">' + dayArr[l]['day'] + '</td>'
  	  	if(l % WEEK_MAX === 6) html += '</tr>';
  	  }

  	  // 将数据放入视图
  	  this.$datepicker.getElementsByClassName('header')[0].innerHTML = this._setHeader(this._currYear, this._currMonth);
  	  this.$datepicker.getElementsByTagName('tbody')[0].innerHTML = html;
  	},

  	/**
  	 * 添加事件
  	 */
  	_addEvents: function() {
  	  var _this = this;

  	  // 时间控件
  	  addEvent(this.$datepicker, 'click', function(e) {
  	  	var e = e || window.event;
	  	var target = e.target || e.srcElement;
	  	    if(lookupClass(target, 'current-month')) {
		      _this.$reference.value = _this._currYear + '-' + padding(_this._currMonth + 1) + '-' + padding(target.textContent);
		      removeClass(_this.$datepicker, 'm-timecontrol-dis');
		  	} else if(lookupClass(target, 'prev')) {
		  	  _this._setDate(_this._currYear + '-' + _this._currMonth + '-' + _this._currDay);
		  	} else if(lookupClass(target, 'next')) {
		  	  _this._setDate(_this._currYear + '-' + (_this._currMonth + 2) + '-' + _this._currDay);
		  	} 
	  	e.stopPropagation();
  	  });

  	  // 参照物
  	  addEvent(this.$reference, 'click', function(e) {
  	  	var e = e || window.event;
	  	var target = e.target || e.srcElement;
	  	_this._setCurrDate(target.value);
	  	_this._setDate(target.value);
	  	addClass(_this.$datepicker, 'm-timecontrol-dis');
	  	e.stopPropagation();
  	  });

  	  // 点击其它地方隐藏控件
  	  addEvent(document, 'click', function() {
	  	  removeClass(_this.$datepicker, 'm-timecontrol-dis');
  	  });
  	},

  	/**
  	 * 将日期转换为 Date对象
  	 * @param  {[type]} date [description]
  	 * @return {[type]}      [description]
  	 */
  	_getDate: function(date) {
  	  var dates = date.split('-');
  	  return dates.length === 3 ? new Date(dates[0], dates[1] - 1, dates[2]) : new Date();
  	},

  	/**
  	 * 设置当天数据
  	 * @param {[type]} date [description]
  	 */
  	_setCurrDate: function(date) {
      var date = this._getDate(date);
  	  this._currDate = this._format(date);
  	},

  	/**
  	 * 日期格式化
  	 * @param  {[type]} date [description]
  	 * @return {[type]}      [description]
  	 */
	  _format: function(date) {
	    return date.getFullYear() + '-' +
	    padding(date.getMonth() + 1) + '-' +
	    padding(date.getDate());
	  },

 	/**
 	 * 设置头部信息
 	 * @param {[type]} year  [description]
 	 * @param {[type]} month [description]
 	 */
  	_setHeader: function(year, month) {
  	  var res;
      switch(month) {
      	case 1:
      	  res = '二月';
      	  break;
      	case 2:
      	  res = '三月';
      	  break;
      	case 3:
      	  res = '四月';
      	  break;
      	case 4:
      	  res = '五月';
      	  break;
      	case 5:
      	  res = '六月';
      	  break;
      	case 6:
      	  res = '七月';
      	  break;
      	case 7:
      	  res = '八月';
      	  break;
      	case 8:
      	  res = '九月';
      	  break;
      	case 9:
      	  res = '十月';
      	  break;
      	case 10:
      	  res = '十一月';
      	  break;
      	case 11:
      	  res = '十二月';
      	  break;
      	default:
      	  res = '一月';
      }
      return res + year;
  	},

  	/**
  	 * 生成 DOM 树
  	 * @return {[type]} [description]
  	 */
  	_render: function() {
  	  var tpl = '<div class="m-timecontrol">\
			    	<div class="icon"></div>\
			    	<h2><span class="prev"></span><span class="header">九月2016</span><span class="next"></span></h2>\
			    	<table>\
				    	<thead><tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr></thead>\
				    	<tbody></tbody>\
			    	</table>\
			    </div>';
	  var div = document.createElement('div');
	  div.innerHTML = tpl;
	  div.children[0].id = this._id;
	  this.$datepicker = div.children[0];
  	},

  	/**
  	 * 时间控件插入 DOM 树
  	 */
  	_setReference: function() {
  	  this.$reference.className = 'm-timecontrol-text';
  	  this.$datepicker.style.left = this.$reference.offsetLeft + 'px';
  	  this.$datepicker.style.top = this.$reference.offsetTop + this.$reference.offsetHeight + parseFloat(getStyle(this.$datepicker.children[0], 'height')) + 'px';
  	  this.$reference.parentNode.insertBefore(this.$datepicker, this.$reference);
  	}
  }
  
  /**
   * 日期控件工厂
   * @type {Object}
   */
  golbal.TimeControlCenter = {
  	init: function(elem) {
  	  if(lookupClass(elem, MODULE_NAME + '-text')) {
  		return;
  	  }
      return  new TimeControl(elem);
    }
  };
})(this)