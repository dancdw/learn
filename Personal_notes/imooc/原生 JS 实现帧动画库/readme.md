[TOC]
##第一章 认识帧动画
###1-1 初识帧动画

**帧动画**

在连续的关键帧中分解动画动作，也就是在时间轴的每帧上逐帧绘制不同的内容，使其连续播放而成动画，由于是一帧一帧的动画，所以几乎可以表现任何想表现的内容。

**常见的帧动画方式**

*   GIF
*   CSS3 animation
*   Javascript

注：GIF 和 CSS3 animation 不能灵活的控制动画的**暂停**和**播放**。

**JS实现帧动画原理**

1. img标签，多张帧图片定时改变 src 属性（不推荐）。
2. backgound-position属性，所有帧图片绘制在一张图片里，定时改变元素背景图定位。

简单帧动画代码如下：
```JS
var imgUrl = 'backgound.jpg';
var positions = ['0 -854', '-174 -852', '-349 -852',
'-524 -852', '-698 -852', '-873 -848',];

var elem = document.getElementById('frameAni');

animation(elem, positions, imgUrl);

function animation(elem, positions, imgUrl) {
    
    elem.style.backgroundImage = 'url(' + imgUrl + ')';
    elem.style.backgroundRepeate = 'no-repeate';

    var index = 0; // 初始帧

    function run() {
        var position = positions[index].split(' ');
        elem.style.backgroundPosition = position[0] + 'px ' + position[1] + 'px';

        index++; // 帧变化
        if(index === positions.length){ // 无限循环
            index = 0;
        }
        setTimeout(arguments.callee, 80);
    }
    
    run();
}
```

###1-2 设计通用帧动画库

####需求分析

想象设计一个通用的帧动画库需要有哪些功能？

1. 支持图片 **预加载** （保证执行动画时图片已下载）。
2. 支持 **两种** 动画播放方式，及 **自定义** 每帧动画（自定义每帧回调）。
3. 支持 **单组** 动画控制循环次数（可支持无限次）。
4. 支持 **一组** 动画完成，进行下一组动画。
5. 支持每个动画完成后有 **等待时间** （不同组动画之前等待时间）。
6. 支持动画 **暂停** 和 **继续** 播放。
7. 支持 **动画完成** 后执行回调函数。

####编程接口

`loadImage(imgList)` 预加载图片。

`changePosition(elem, positions, imgageUrl)` 

通过改变元素的 background-position 实现动画。

*   `elem` 元素节点。
*   `positions` 传入是一个数组，保存所有定位信息。
*   `imageUrl` 图片路径。

`changeSrc(elem, imgList)` 通过改变 img 元素的 src。

`enterFrame(callback)` 每一帧动画执行的函数，用户可以自定义每帧动画的 callback。

`repeat(times)` 动画重复执行的次数（默认为无限）。

`repeatForever()` 无限重复上一次动画。

`wait(time)` 每个动画执行后等待的时间。

`then(callback)` 动画执行完成后的回调函数。

`start(interval)` 动画开始执行，`interval` 为动画执行间隔。

`pause()` 动画暂停。

`restart()` 动画从上一次暂停处重新执行。

`dispose()` 释放资源。

####调用方式

希望别人越用越想用的基本思想。

**链式调用**

期望一种以 **动词** 的方式描述接口，这样不仅代码量少而且结构清晰，使用者清楚动画做了哪些操作，完成哪些事情。

调用方式如下：

```JS
var animation = require('animation');
var demoAnimation = animation().loadImage(images).changePosition(elem, positions).repeate(2).then(function() {
    // TODO
});

demoAnimation.start(80);
```

####代码设计

**任务链**

把一系列操作（同步任务和异步任务）看成一个整体（数组），需要记录当前任务的索引，每次任务执行完毕后，执行下一次任务时更新任务链的索引。

*   **同步执行任务**，如图片预加载。
*   **异步定时执行任务**，帧与帧之间的间隔任务。

```JS
// 同步任务
var TASK_SYNC = 0;

// 异步任务
var TASK_ASYNC = 1;
```

##第二章 设计帧动画库

###2-1 接口定义

将所有源代码放在一个 src 目录中。

animation.js 代码如下：

```JS
'use strict';

// 帧动画库类
function Animation() {}

// 添加一个同步任务，预加载图片
Animation.prototype.loadImage = function(imgList) {};

// 添加一个同步任务，可以在上一个任务完成后执行回调
Animation.prototype.then = function(callback) {};

// 添加一个同步任务，回退到上一个任务实现重复上一个任务
Animation.prototype.repeate = function(times) {};

// 添加一个同步任务，无限循环上一次任务
Animation.prototype.repeateForver = function() {};

// 添加一个异步定时任务，通过定时改变图片背景位置实现帧动画
Animation.prototype.changePosition = function(elem, positions, imgUrl) {};

// 添加一个异步定时任务，通过定时改变 img 标签的 src 属性实现帧动画
Animation.prototype.changeSrc = function(elem, imgList) {};

// 添加一个异步定时任务，自定义动画每帧执行的任务函数
Animation.prototype.enterFrame = function(taskFn) {};

// 开始执行任务
Animation.prototype.start = function(interval) {};

// 设置当前任务结束后到下一次任务前的等待时间
Animation.prototype.wait = function(time) {};

// 暂停当前异步定时任务
Animation.prototype.pause = function() {};

// 重新执行上一次暂停的异步任务
Animation.prototype.restart = function() {};

// 释放资源
Animation.prototype.dispose = function() {};

module.exports = function() {
    // 工厂创建
    return new Animation();
}
```

###2-2 图片预加载实现

####播放状态

帧动画播放具有状态，需要通过常量进行记录，这样每个接口就知道在当前状态应该如何工作。

```JS
// 初始化状态
var STATE_INITIAL = 0;

// 开始状态
var STATE_START = 1;

// 停止状态
var STATE_STOP = 2;

function Animation() {
    this.taskQueue = []; // 任务链
    this.index = 0; // 当前任务索引
    this.state = STATE_INITIAL; // 播放状态
}
```

####imageLoader

`loadImage(imagesArr, callback, timeout)`

图片预加载是独立的功能，需要添加一个图片预加载模块。

*   `imagesArr` 图片数组。
*   `callback` 加载完毕后执行回调函数。
*   `timeout` 加载超时时长。

imageLoader.js 代码如下：

```JS
'use strict';

// 预加载图片函数
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

        // 设置图片元素的img，它是一个Image对象
        item.img = window[item.id] = new Image();

        doLoad(item);
    }

    // 遍历完成如果计数为0，则直接调用 callback
    if (!count) {
        callback(success);
    }else if (timeout) {
        timeoutId = setTimeout(onTimeout, timeout);
    }

    // 真正进行图片加载的函数
    function doLoad(item) {
        item.status = 'loading'; // 外部拿到对象时，可以清楚知道对象状态

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

        // 每张图片加载完成的回调函数
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

    // 超时函数
    function onTimeout() {
        isTimeout = true;
        callback(false);
    }
}

var __id = 0;
function getId() {
    return ++__id;
}

module.exports = loadImage;
```

####图片预加载应用

传递图片数组进行预加载，加载完毕后执行回调函数告知。

```JS
// 添加一个同步任务，预加载图片
Animation.prototype.loadImage = function(imgList) {
    var taskFn = function(next) {
        loadImage(imgList.slice(), next); // 数组深拷贝，保证不修改原数组
    };

    var type = TASK_SYNC;

    return this._add(taskFn, type);
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
```

###2-3 入口方法

先实现start方法，有助于理解任务链实现原理。

```JS
// 开始执行任务
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

// 执行任务
Animation.prototype._runTask() {
    if(!this.taskQueue || this.state !== STATE_START) {
        return;
    }

    // 任务执行完毕
    if(this.index === this.taskQueue.length) {
        this.dispose();
        return;
    }

    // 获取任务链上的当前任务
    var task = this.taskQueue[this.index];
    if(task.type === TASK_SYNC) {
        this._syncTask(task);
    } else {
        this._asyncTask(task);
    }
};

// 同步任务
Animation.prototype._syncTask = function(task) {
    var _this = this;
    var next = function() {
        // 切换到下一个任务
        _this._next();
    }
    var taskFn = task.taskFn;
    taskFn(next);
};

// 切换到下一个任务
Animation.prototype._next = function() {
    this.index++;
    this._runTask();
}
```

###2-4 时间轴实现

####timeLine

主要用于管理动画多长时间回调，通过时间轴传入回调函数，在这个回调函数中拿到当前动画运行了多长时间，这样就能将这帧的动画绘制出来。

*   异步任务其实是一种在当前任务上通过定时方式不断执行，完成帧动画。
*   Javascirpt 中使用 `setTimeout()` 触发时间与浏览器环境有关，不能确保准确性导致动画的不连贯。
*   **动画** 就是动画开始到某个时间点运行多长时间，在这个时间点应该有什么状态，我们将它绘制出来，这样整个动画就流畅了，哪怕运行环境不好也可以保持动画匀速播放。

timeLine.js 代码如下：

```JS
'use strict';

var DEFAULT_INTERVAL = 1000 / 60;

// 初始化状态
var STATE_INITIAL = 0;

// 开始状态
var STATE_START = 1;

// 停止状态
var STATE_STOP = 2;

// 特征检测
var requestAnimationFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function(callback) {
            return window.setTimeout(callback, callback.interval || DEFAULT_INTERVAL);
        }
})();

// 清除定时器
var cancelAnimationFrame = (function() {
    return window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        function(id) {
            return window.clearTimeout(id);
        };
})();

// 时间轴类
function TimeLine() {}

// 时间轴上每一次回调执行的函数
TimeLine.prototype.onenterFrame = function(time) {};

// 动画开始
TimeLine.prototype.start = function(interval) {};

// 动画停止
TimeLine.prototype.stop = function(){};

// 重新开始动画
TimeLine.prototype.restart = function() {};

module.exports = TimeLine;
```

####TimeLine.prototype.onenterFrame

`timeLine` 会在合适的时机自动调用，外部用户不用关心内部实现（什么时候该去做回调，什么时候处理定时器），调用回调时可以拿到当前动画运行了多久时间。

####startTimeLine

我们知道 `requestAnimationFrame` 每隔17毫秒回调一次，而我们希望回调函数执行是每 **间隔时间**，这个时间可能会大于17毫秒，所以这个方法相当于对 `requestAnimationFrame` 再做一次封装。

```JS
// 时间轴类
function TimeLine() {
    this.animationHandler = 0;
    this.state = STATE_INITIAL;
}

// 时间轴动画启动函数
function startTimeLine(timeLine, startTime) {

    timeLine.startTime = startTime;

    nextTick.interval = timeLine.interval;

    // 记录上一次回调的时间戳
    var lastTick = +new Date();
    nextTick();

    // 每一帧执行的函数
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
```

####TimeLine.prototype.start

动画开始

*   `interval` 每一次回调的间隔时间

```JS
TimeLine.prototype.start = function(interval) {
    if (this.state === STATE_START) return;
    this.state = STATE_START;

    this.interval = interval || DEFAULT_INTERVAL;
    startTimeLine(this, +new Date());
};
```

####TimeLine.prototype.stop

动画停止

```JS
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
```


####TimeLine.prototype.restart

重新开始动画

```JS
TimeLine.prototype.restart = function() {
    if(this.state === STATE_START) {
        return;
    }
    if(!this.dur || !this.interval){
        return;
    }

    this.state = STATE_START;

    // 无缝连接动画
    startTimeLine(this, +new Date - this.dur);
};
```

####时间轴应用

```JS
var timeLine = require('./timeLine');

// 帧动画库类
function Animation() {
    this.timeLine = new TimeLine();
}

// 异步任务
Animation.prototype._asyncTask = function(task) {
    var _this = this;
    // 定义每一帧执行的回调函数
    var enterFrame = function(time) { // 从动画开始到当前的时间差
        var taskFn = task.taskFn;
        var next = function() {
            // 停止当前任务
            _this.timeLine.stop();

            // 执行下一个任务
            _this._next();
        }
        taskFn(next, time);
    }

    this.timeLine.onenterFrame = enterFrame;
    this.timeLine.start(this.interval);
};
```

###2-5 背景图位置实现帧动画

```JS
// 简单的函数封装，执行callback
function next(callback) {
    callback && callback();
}

// 添加一个异步定时任务，通过定时改变图片背景位置实现帧动画
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
            // 当前时间除于间隔（执行第几个），0 相当于使用 Math.floor()，
            // 长度不能超过边界 len-1 
            var index = Math.min(time / _this.interval | 0, len - 1);
            // 获取当前背景图片位置索引
            var position = positions[index].split(' ');
            // 改变 DOM 对象的背景图片位置
            elem.style.backgroundPosition = position[0] + 'px ' + position[1] + 'px';
            // 当前任务执行完毕
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
```

###2-6 src属性实现帧动画

```JS
// 添加一个异步定时任务，通过定时改变img标签的src属性实现帧动画
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
            if(index === len-1) {
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
```

###2-7 Animation.prototype._next重构

```JS
// 切换到下一个任务，支持如果当前任务需要等待则延迟执行
Animation.prototype._next = function(task) {
    this.index++;
    var _this = this;
    task.wait ? setTimeout(function() {
        _this._runTask();
    }, task.wait) : this._runTask();
}

// 异步任务
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

// 同步任务
Animation.prototype._syncTask = function(task) {
    var _this = this;
    var next = function() {
        // 切换到下一个任务
        _this._next(task);
    }
    var taskFn = task.taskFn;
    taskFn(next);
};
```

###2-8 任务链相关函数

```JS
// 添加一个异步定时任务，自定义动画每帧执行的任务函数
Animation.prototype.enterFrame = function(taskFn) {
    return this._add(taskFn, TASK_ASYNC);
};

// 添加一个同步任务，可以在上一个任务完成后执行回调
Animation.prototype.then = function(callback) {
    var taskFn = function(next) {
        callback();
        next();
    }
    var type = TASK_SYNC;

    return this._add(taskFn, type);
};

// 添加一个同步任务，回退到上一个任务实现重复上一个任务
Animation.prototype.repeat = function(times) {
    var _this = this;
    var taskFn = function() {
        if(typeof times === 'undefined'){
            // 无限回退到上一个任务
            _this.index--;
            _this._runTask();
            return;
        }
        if (times) {
            times--;
            // 回退
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

// 添加一个同步任务，无限循环上一次任务
Animation.prototype.repeatForver = function() {
    return this.repeat();
};

// 设置当前任务结束后到下一次任务前的等待时间
Animation.prototype.wait = function(time) {
    if (this.taskQueue && this.taskQueue.length > 0) {
        this.taskQueue[this.taskQueue.length - 1].wait = time;
    }

    return this;
};

// 暂停当前异步定时任务
Animation.prototype.pause = function() {
    if(this.state === STATE_START) {
        this.state = STATE_STOP;
        this.timeLine.stop();
        return this;
    }
    return this;
};

// 重新执行上一次暂停的异步任务
Animation.prototype.restart = function() {
    if(this.state === STATE_STOP) {
        this.state = STATE_START;
        this.timeLine.restart();
        return this;
    }
    return this;
};

// 释放资源
Animation.prototype.dispose = function() {
    if(this.state !== STATE_INITIAL) {
        this.state = STATE_INITIAL;
        this.taskQueue = null;
        this.timeLine.stop();
        this.timeLine = null;
        return this;
    }
    return this;
};
```

##第三章 webpack打包及帧动画库演示

###webpack打包

把 JS，HTML，CSS，图片等资源当成一个模块，分析它们的依赖关系，通过 webpack 编译打包，最后生成单个的文件资源。在node.js中可以使用 require 去依赖一个模块，而在浏览器环境中并没有这个关键字。

package.json 代码如下：

```JS
{
    "name": "application-name",
    "version": "0.0.1",
    "devDependencies": {
        "webpack": "^1.12.11"
    }
}
```

注：首次使用 webpack 需要全局安装：`sudo npm install -g webpack`。

webpack.config.js 代码如下：

```JS
module.exports = {
    entry: {
        animation: './src/animation.js'
    },
    output: {
        path: __dirname + '/build',
        filename: '[name].js',
        library: 'animation',
        libraryTarget: 'umd'
    }
}
```

###demo演示

```JS
var elem = document.getElementById('frameAni');
var imgUrl = 'backgound.jpg';
var positions = ['0 -854', '-174 -852', '-349 -852', '-524 -852', '-698 -852', '-873 -848',];
var animation = window.animation;

var repeatAnimation = animation().loadImage([imgUrl]).changePosition(elem, positions, imgUrl).repeatForver();

repeateAnimation.start(80);
```

###完整演示

demo.html 代码如下：

```JS
<div class="rabbit" id="rabbit1"></div>
<div class="rabbit" id="rabbit2"></div>
<div class="rabbit" id="rabbit3"></div>
<div class="rabbit" id="rabbit4"></div>
```

core.css 代码如下：

```JS
.rabbit{
    position: absolute;
    left: 100px;
    width: 102px;
    height: 80px;
    background-repeat: no-repeat;
}

#rabbit1{
    top: 50px;
}

#rabbit2{
    top: 200px;
}

#rabbit3{
    top: 350px;
}

#rabbit4{
    top: 500px;
}
```

core.js 代码如下：

```JS
function $(id) {
    return document.getElementById(id);
}

var $rabbit1 = $('rabbit1');
var $rabbit2 = $('rabbit2');
var $rabbit3 = $('rabbit3');
var $rabbit4 = $('rabbit4');

var images = ['rabbit-big.png', 'rabbit-lose.png', 'rabbit-win.png'];

var rightRunningMap = ["0 -854", "-174 -852", "-349 -852", "-524 -852", "-698 -851", "-873 -848"];
var leftRunningMap = ["0 -373", "-175 -376", "-350 -377", "-524 -377", "-699 -377", "-873 -379"];
var rabbitWinMap = ["0 0", "-198 0", "-401 0", "-609 0", "-816 0", "0 -96",
"-208 -97", "-415 -97", "-623 -97", "-831 -97", "0 -203", "-207 -203",
"-415 -203", "-623 -203", "-831 -203", "0 -307", "-206 -307", "-414 -307", "-623 -307"];
var rabbitLoseMap = ["0 0", "-163 0", "-327 0", "-491 0", "-655 0", "-819 0",
"0 -135", "-166 -135", "-333 -135", "-500 -135", "-668 -135", "-835 -135",
"0 -262"];

function repeat() {
    var repeatAnimation = animation().loadImage(images).changePosition($rabbit1, rightRunningMap, images[0])
    .repeatForver();

    repeatAnimation.start(80);
}

repeat();

function win(){
    var winAnimation = animation().loadImage(images).changePosition($rabbit3, rabbitWinMap, images[2])
    .repeat(3).then(function() {
        console.log('win animation repeat 3 times and finished!');    
    });
    winAnimation.start(200);
}

win();

function lose() {
    var loseAnimation = animation().loadImage(images).changePosition($rabbit4, rabbitLoseMap, images[1])
    .wait(3000).repeat(1).then(function() {
        console.log('lose animation repeat 3 time and finished!');    
    });
    loseAnimation.start(200);
}

lose();

function run() {
    var speed = 6; // 速度
    var initLeft = 100; // 位置
    var finalLeft = 400;
    var frameLength = 6;
    var frame = 4;
    var right = true;
    var interval = 50;
    var runAnimation = animation().loadImage(images).enterFrame(function(success, time) {
        var ratio = time / interval; // 比率（当前时间 / interval = 间隔时间）
        var position;
        var left;
        
        if(right){ // 向右跑动画
            position = rightRunningMap[frame].split(' ');
            var offset = speed * ratio; // 步长
            left = Math.min(initLeft + offset, finalLeft);
            
            if(left === finalLeft) {
                right = false;
                frame = 4;
                success();
                return;
            }
        } else { // 向左跑动画
            position = leftRunningMap[frame].split(' ');
            var offset = speed * ratio; // 步长
            left = Math.max(finalLeft - offset, initLeft);

            if(left === initLeft) {
                right = true;
                frame = 4;
                success();
                return;
            }
        }
        $rabbit2.style.backgroundImage = 'url(' + images[0] + ')';
        $rabbit2.style.backgroundPosition = position[0] + 'px ' + position[1] + 'px';
        $rabbit2.style.left = left + 'px';
        frame++;
        if(frame === frameLength) {
            frame = 0;
        }
    }).repeat(4).wait(1000).changePosition($rabbit2, rabbitWinMap, images[2]).then(function() {
        console.log('finished!');
    });
    runAnimation.start(interval);
}

run();
```























