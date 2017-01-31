! function() {
	'use strict';

	// CMD 写法
	// var loadImage = require('./imageLoader');
	// var timeLine = require('./timeLine');

	// 初始化状态
	var STATE_INITIAL = 0;

	// 开始状态
	var STATE_START = 1;

	// 停止状态
	var STATE_STOP = 2;

	// 同步任务
	var TASK_SYNC = 0;

	// 异步任务
	var TASK_ASYNC = 1;

	/**
	 * 简单的函数封装，执行callback
	 * @param  {Function} callback [执行函数]
	 * @return {Function}          [description]
	 */
	function next(callback) {
		callback && callback();
	}

	/**
	 * 帧动画库类
	 */
	function Animation() {
		this.taskQueue = []; // 任务链
		this.index = 0; // 当前任务索引
		this.timeLine = new TimeLine();
		this.state = STATE_INITIAL; // 播放状态
	}

	/**
	 * 添加一个同步任务，预加载图片
	 * @param  {[type]} imgList [图片数组]
	 * @return {[type]}         [description]
	 */
	Animation.prototype.loadImage = function(imgList) {
		var taskFn = function(next) {
			loadImage(imgList.slice(), next); // 数组深拷贝，保证不修改原数组
		};

		var type = TASK_SYNC;

		return this._add(taskFn, type);
	};


	/**
	 * 添加一个异步定时任务，通过定时改变图片背景位置实现帧动画
	 * @param  {[type]} elem      [DOM 对象]
	 * @param  {[type]} positions [背景维位置数组]
	 * @param  {[type]} imgUrl    [图片路径]
	 * @return {[type]}           [description]
	 */
	Animation.prototype.changePosition = function(elem, positions, imgUrl) {
		var len = positions.length;
		var taskFn;
		var type;

		if (len) { // 真正的异步定时任务
			var _this = this;

			taskFn = function(next, time) {
				if (imgUrl) {
					elem.style.backgroundImage = 'url(' + imgUrl + ')';
				}
				// 当前时间除于间隔（执行第几个），0 相当于调用 Math.floor，长度不能超过边界 len-1 
				var index = Math.min(time / _this.interval | 0, len - 1);
				// 获取当前背景图片位置索引
				var position = positions[index].split(' ');
				// 改变 DOM 对象的背景图片位置
				elem.style.backgroundPosition = position[0] + 'px ' + position[1] + 'px';

				if (index === len - 1) {
					next();
				}
			};

			type = TASK_ASYNC;

		} else {
			taskFn = next;
			type = TASK_SYNC;
		}

		return this._add(taskFn, type); // 异步任务添加到任务链上
	};

	/**
	 * 添加一个异步定时任务，通过定时改变img标签的src属性实现帧动画
	 * @param  {[type]} elem    [img 对象]
	 * @param  {[type]} imgList [图片数组]
	 * @return {[type]}         [description]
	 */
	Animation.prototype.changeSrc = function(elem, imgList) {
		var len = imgList.length;
		var taskFn;
		var type;

		if (len) {
			var _this = this;
			taskFn = function(next, time) {
				// 获取当前图片索引
				var index = Math.min(time / _this.interval | 0, len - 1);
				// 改变 image 对象的图片地址
				elem.src = imgList[index];
				// 当前任务执行完毕
				if (index === len - 1) {
					next();
				}
			}

			type = TASK_ASYNC;
		} else {
			taskFn = next;
			type = TASK_SYNC;
		}

		return this._add(taskFn, type);
	};

	/**
	 * 添加一个异步定时任务，自定义动画每帧执行的任务函数
	 * @param  {[type]} taskFn [自定义每帧执行的任务函数]
	 * @return {[type]}        [description]
	 */
	Animation.prototype.enterFrame = function(taskFn) {
		return this._add(taskFn, TASK_ASYNC);
	};

	/**
	 * 添加一个同步任务，可以在上一个任务完成后执行回调
	 * @param  {[type]} callback [回调函数]
	 * @return {[type]} 		 [description]
	 */
	Animation.prototype.then = function(callback) {
		var taskFn = function(next) {
			callback();
			next();
		}
		var type = TASK_SYNC;

		return this._add(taskFn, type);
	};

	/**
	 * 开始执行任务
	 * @param  {[type]} interval [异步执行任务的间隔]
	 * @return {[type]}          [description]
	 */
	Animation.prototype.start = function(interval) {

		// 保持链式调用
		if (this.state === STATE_START) {
			return this;
		}

		// 如果任务链中没有任务则返回
		if (!this.taskQueue.length) {
			return this;
		}

		this.state = STATE_START;
		this.interval = interval;
		this._runTask();
		return this;
	};

	/**
	 * 执行任务
	 * @return {[type]} [description]
	 */
	Animation.prototype._runTask = function() {
		if (!this.taskQueue || this.state !== STATE_START) {
			return;
		}

		// 任务执行完毕
		if (this.index === this.taskQueue.length) {
			this.dispose();
			return;
		}

		// 获取任务链上的当前任务
		var task = this.taskQueue[this.index];

		if (task.type === TASK_SYNC) {
			this._syncTask(task);
		} else {
			this._asyncTask(task);
		}
	};


	/**
	 * 添加一个同步任务，回退到上一个任务实现重复上一个任务
	 * @param  {[type]} times [重复次数]
	 * @return {[type]} 	  [description]
	 */
	Animation.prototype.repeat = function(times) {
		var _this = this;
		var taskFn = function() {
			if (typeof times === 'undefined') {
				// 无限回退到上一个任务
				_this.index--;
				_this._runTask();
				return;
			}
			if (times) {
				times--;
				// 回退到上一个任务
				_this.index--;
				_this._runTask();
			} else {
				// 达到重复次数，跳转到下一个任务
				var task = _this.taskQueue[_this.index];
				_this._next(task);
			}
		}
		var type = TASK_SYNC;

		return this._add(taskFn, type);
	};

	/**
	 * 添加一个同步任务，无限循环上一次任务
	 * @return {[type]} [description]
	 */
	Animation.prototype.repeatForver = function() {
		return this.repeat();
	};

	/**
	 * 设置当前任务结束后到下一次任务前的等待时间
	 * @param  {[type]} time [等待时间]
	 * @return {[type]}      [description]
	 */
	Animation.prototype.wait = function(time) {
		if (this.taskQueue && this.taskQueue.length > 0) {
			this.taskQueue[this.taskQueue.length - 1].wait = time;
		}

		return this;
	};

	/**
	 * 暂停当前异步定时任务
	 * @return {[type]} [description]
	 */
	Animation.prototype.pause = function() {
		if (this.state === STATE_START) {
			this.state = STATE_STOP;
			this.timeLine.stop();
			return this;
		}
		return this;
	};

	/**
	 * 重新执行上一次暂停的异步任务
	 * @return {[type]} [description]
	 */
	Animation.prototype.restart = function() {
		if (this.state === STATE_STOP) {
			this.state = STATE_START;
			this.timeLine.restart();
			return this;
		}
		return this;
	};

	/**
	 * 释放资源
	 * @return {[type]} [description]
	 */
	Animation.prototype.dispose = function() {
		if (this.state !== STATE_INITIAL) {
			this.state = STATE_INITIAL;
			this.taskQueue = null;
			this.timeLine.stop();
			this.timeLine = null;
			return this;
		}
		return this;
	};



	/**
	 * 添加一个任务到任务队列中
	 * @param {[type]} taskFn [任务方法]
	 * @param {[type]} type   [任务类型]
	 */
	Animation.prototype._add = function(taskFn, type) { // _开头命名表示类内部使用
		this.taskQueue.push({
			taskFn: taskFn,
			type: type
		});

		return this; // 达到链式调用
	}

	/**
	 * 同步任务
	 * @param  {[type]} task [执行的任务对象]
	 * @return {[type]}      [description]
	 */
	Animation.prototype._syncTask = function(task) {
		var _this = this;
		var next = function() {
			// 切换到下一个任务
			_this._next(task);
		}
		
		var taskFn = task.taskFn;
		taskFn(next);
	};

	/**
	 * 异步任务
	 * @param  {[type]} task [执行的任务对象]
	 * @return {[type]}      [description]
	 */
	Animation.prototype._asyncTask = function(task) {
		var _this = this;
		// 定义每一帧执行的回调函数
		var enterFrame = function(time) { // 从动画开始到当前的时间差
			var taskFn = task.taskFn;
			var next = function() {
				// 停止当前任务
				_this.timeLine.stop();

				// 执行下一个任务
				_this._next(task);
			}
			taskFn(next, time);
		}

		this.timeLine.onenterFrame = enterFrame;
		this.timeLine.start(this.interval);
	};

	/**
	 * 切换到下一个任务，支持如果当前任务需要等待则延迟执行
	 * @param  {[type]} task [当前任务]
	 * @return {[type]}      [description]
	 */
	Animation.prototype._next = function(task) {
		this.index++;
		var _this = this;
		task.wait ? setTimeout(function() {
			_this._runTask();
		}, task.wait) : this._runTask();
	}

	/*module.exports = function() {
		// 工厂创建
		return new Animation();
	}*/

	window.animation = function() {
		// 工厂创建
		return new Animation();
	}

}();