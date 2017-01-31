! function() {
	'use strict';

	var DEFAULT_INTERVAL = 1000 / 60;

	// 初始化状态
	var STATE_INITIAL = 0;

	// 开始状态
	var STATE_START = 1;

	// 停止状态
	var STATE_STOP = 2;

	/**
	 * requestAnimationFrame 特征检测
	 * @param  {[type]} ) {	return     window.requestAnimationFrame || 			window.webkitRequestAnimationFrame ||			window.mozRequestAnimationFrame ||			window.oRequestAnimationFrame ||			function(callback) {				return window.setTimeout(callback, callback.interval || DEFAULT_INTERVAL);			}})( [description]
	 * @return {[type]}   [description]
	 */
	var requestAnimationFrame = (function() {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			function(callback) {
				return window.setTimeout(callback, callback.interval || DEFAULT_INTERVAL);
			}
	})();

	/**
	 * 清除定时器
	 * @param  {[type]} ) {	return     window.cancelAnimationFrame ||		window.webkitCancelAnimationFrame ||		window.mozCancelAnimationFrame ||		window.oCancelAnimationFrame ||		function(id) {			return window.clearTimeout(id);		};})( [description]
	 * @return {[type]}   [description]
	 */
	var cancelAnimationFrame = (function() {
		return window.cancelAnimationFrame ||
			window.webkitCancelAnimationFrame ||
			window.mozCancelAnimationFrame ||
			window.oCancelAnimationFrame ||
			function(id) {
				return window.clearTimeout(id);
			};
	})();

	/**
	 * 时间轴类
	 */
	function TimeLine() {
		this.animationHandler = 0;
		this.state = STATE_INITIAL;
	}

	/**
	 * 时间轴上每一次回调执行的函数
	 * @param  {[type]} time [从动画开始到当前执行的时间]
	 * @return {[type]}      [description]
	 */
	TimeLine.prototype.onenterFrame = function(time) {};

	/**
	 * 动画开始
	 * @param  {[type]} interval [每一次回调的间隔时间]
	 * @return {[type]}          [description]
	 */
	TimeLine.prototype.start = function(interval) {
		if (this.state === STATE_START) return;
		this.state = STATE_START;

		this.interval = interval || DEFAULT_INTERVAL;
		startTimeLine(this, +new Date());
	};

	/**
	 * 动画停止
	 * @return {[type]} [description]
	 */
	TimeLine.prototype.stop = function() {
		if (this.state !== STATE_START) {
			return;
		}

		this.state = STATE_STOP;

		// 如果动画开始过则记录动画从开始到现在所经历的时间
		if (this.startTime) {
			this.dur = +new Date() - this.startTime;
		}

		cancelAnimationFrame(this.animationHandler);
	};

	/**
	 * 重新开始动画
	 * @return {[type]} [description]
	 */
	TimeLine.prototype.restart = function() {
		if (this.state === STATE_START) {
			return;
		}
		if (!this.dur || !this.interval) {
			return;
		}

		this.state = STATE_START;

		// 无缝连接动画
		startTimeLine(this, +new Date - this.dur);
	};

	/**
	 * 时间轴动画启动函数
	 * @param  {[type]} timeLine  [时间轴实例]
	 * @param  {[type]} startTime [动画开始时间戳]
	 * @return {[type]}           [description]
	 */
	function startTimeLine(timeLine, startTime) {

		timeLine.startTime = startTime;

		nextTick.interval = timeLine.interval;

		// 记录上一次回调的时间戳
		var lastTick = +new Date();
		nextTick();

		/**
		 * 每一帧执行的函数
		 * @return {[type]} [description]
		 */
		function nextTick() {
			var now = +new Date();

			timeLine.animationHandler = requestAnimationFrame(nextTick);

			// 当前时间和上一次时间的时间差大于等于设置的时间间隔，
			// 表示这一次可以执行回调函数
			if (now - lastTick >= timeLine.interval) {
				timeLine.onenterFrame(now - startTime);
				lastTick = now;
			}
		}
	}

	// module.exports = TimeLine;
	window.TimeLine = TimeLine;
}()