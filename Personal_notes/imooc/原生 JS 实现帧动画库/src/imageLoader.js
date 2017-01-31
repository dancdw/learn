! function() {
	'use strict';

	/**
	 * 预加载图片函数
	 * @param  {[type]}   imagesArr    [图片数组或对象]
	 * @param  {Function} callback  [回调函数]
	 * @param  {[type]}   timeout   [加载超时时长]
	 * @return {[type]}             [description]
	 */
	function loadImage(imagesArr, callback, timeout) {
		var count = 0; // 加载完成的计数器

		var success = true; // 全部图片加载成功的标志位

		var timeoutId = 0; // 超时timer的id

		var isTimeout = false; // 是否加载超时的标志位

		// 对图片数组（或对象）进行遍历
		for (var i in imagesArr) {

			// 过滤 prototype 上的属性
			if (!imagesArr.hasOwnProperty(i)) {
				continue;
			}

			// 期望格式：{ src: xxx }
			var item = imagesArr[i];

			if (typeof item === 'string') {
				item = imagesArr[i] = {
					src: item
				}
			}

			// 如果格式不满足期望，则丢弃此条数据进行下一次遍历
			if (!item || !item.src) {
				continue;
			}

			// 计数+1
			count++;

			// 设置图片元素的id
			item.id = '__img__' + i + getId();

			// 设置图片元素的img，它是一个Images对象
			item.img = window[item.id] = new Image();

			doLoad(item);
		}
		
		// 遍历完成如果计数为0，则直接调用 callback
		if (!count) {
			callback(success);
		} else if (timeout) {
			timeoutId = setTimeout(onTimeout, timeout);
		}

		/**
		 * 真正进行图片加载的函数
		 * @param  {[type]} item [图片元素对象]
		 * @return {[type]}      [description]
		 */
		function doLoad(item) {
			item.status = 'loading'; // 外部拿到对象时，我们可以清楚知道对象状态

			var img = item.img;

			// 定义图片加载成功的回调函数
			img.onload = function() {
				success = success & true; // 每次都成功才会返回 true
				item.status = 'loaded';
				done();
			};

			// 定义图片加载失败的回调函数
			img.onerror = function() {
				success = false;
				item.status = 'error';
				done();
			};

			// 发起一个http(s)请求
			img.src = item.src;

			/**
			 * 每张图片加载完成的回调函数
			 * @return {Function} [description]
			 */
			function done() {
				img.onload = img.onerror = null; // 清理事件绑定

				// 低版本浏览器可能会报错进行兼容处理
				try {
					delete window[item.id];
				} catch (e) {

				}

				// 每张图片加载完成，计数器减一，当所有图片加载完成且没有超时的情况
				// 清除超时计时器，且执行回调函数
				if (!--count && !isTimeout) {
					clearTimeout(timeoutId);
					callback(success);
				}
			}
		}

		/**
		 * 超时函数
		 * @return {[type]} [description]
		 */
		function onTimeout() {
			isTimeout = true;
			callback(false);
		}
	}

	var __id = 0;

	function getId() {
		return ++__id;
	}

	// module.exports = loadImage;
	window.loadImage = loadImage;
}();