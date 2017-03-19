[TOC]
## AngularJS

### 快速开始

**helloworld**

1. `ng-app` 告诉 AngularJS 处理整个 HTML 页并引导应用。
2. `{{}}` 绑定的表达式。

```html
<!doctype html>
<html ng-app>
    <head>
        <script src="http://code.angularjs.org/angular-1.0.1.min.js"></script>
    </head>
    <body>
        Hello {{'world'}}!
    </body>
</html>
```
> 


**双向数据绑定**

1. `ng-model` 模型变量
2. `{{}}` 模型变量 yourname 添加到模板中

```html
<!doctype html>
<html ng-app>
    <head>
        <script src="http://code.angularjs.org/angular-1.0.1.min.js"></script>
    </head>
    <body>
        Your name: <input type="text" ng-model="yourname" placeholder="World">
        <hr>
        Hello {{yourname || 'World'}}!
    </body>
</html>
```

**组成部分**

* 模板
	- 视图，html + css，可添加和构建新的元素和属性，作为 AngularJS 编译器的指令。
* 逻辑
	- 控制器，不需要编写侦听器和DOM 控制器，专注逻辑代码。
* 模型
	- 定义的数据都归属于 AngularJS 作用域对象，保持数据模型和视图双向同步。

> 提供其它服务包括：依赖注入、XHR、缓存、URL路由和浏览器抽象服务。扩展和添加自己特定的应用服务。

### 导言和准备

1. “数据绑定”+“依赖注入”响应视图。
2. 创建侦听器，不进行 DOM 操作。
3. 更好测试应用。
4. 更方便地将数据引入应用。
5. 学习更多的 API。

#### 搭建环境

* 安装 nodeJS 和 git。
* 安装 testacular 单元测试程序。
* 下载项目源代码。
* 进入项目目录。
* 重置工作目录的任何更改。
* 启动服务器。

```nodeJS
npm install -g testacular
git clone git://github.com/angular/angular-phonecat.git
cd angular-phonecat
git checkout -f step-0
// node scripts/web-server.js
npm start
```

#### 引导程序

* `ng-app` 指令标记整个`<html>`都是 AngularJS 脚本的作用域，可以标记局部。
* `<script>` 寻找含有 `ng-app`的标签并定义 AngularJS 作用域。
* `{{}}` 和表达式 `'yet' + '!'`实现绑定实时更新，表达式仅在 AngularJS 作用域中运行而不是整个 DOM。

app/index.html

```html
<!doctype html>
<html lang="en" ng-app>
<head>
    <meta charset="utf-8">
    <title>My HTML File</title>
    <link rel="stylesheet" href="css/app.css">
    <link rel="stylesheet" href="css/bootstrap.css">
    <script src="lib/angular/angular.js"></script>
</head>
<body>
<p>Nothing here {{'yet' + '!'}}</p>
<p>1 + 2 = {{ 1 + 2 }}</p>
</body>
</html>
```
> 该模板包含一个指令和一个静态绑定，模型是空的。

#### 引导 AngularJS 应用

* 注入器（injector）创建应用的依赖注入。
* 注入器创建根作用域为模型的范围。
* AngularJS 链接根作用域的 DOM，从`ng-app`标记的标签开始逐步处理 DOM 中的指令和绑定。
* 引导完毕后，继续侦听浏览器的 HTML 事件，自动检测并做出相应的处理及更新。

### 静态模板

* 重置工作目录到步骤一。

```nodejs
git checkout -f step-1
```

```html
<ul>
    <li>
        <span>Nexus S</span>
        <p>
        Fast just got faster with Nexus S.
        </p>
    </li>
    <li>
        <span>Motorola XOOM™ with Wi-Fi</span>
        <p>
        The Next, Next Generation tablet.
        </p>
    </li>
</ul>
<p>Total number of phones: 2</p>
```

### AngularJS 模板

* 重置工作目录到步骤二。

```nodejs
git checkout -f step-2
```

1.视图

通过 HTML 模板渲染后的映射，模型发生变化，视图更新。

```html
<html ng-app>
<head>
  ...
  <script src="lib/angular/angular.js"></script>
  <script src="js/controllers.js"></script>
</head>
<body ng-controller="PhoneListCtrl">

  <ul>
    <li ng-repeat="phone in phones">
      {{phone.name}}
    <p>{{phone.snippet}}</p>
    </li>
  </ul>
</body>
</html>
```

> 使用`ng-repeat`和两个`{{}}`表达式实现相同效果。
> 这里的表达式是应用的一个数据模型引用，`PhoneListController`控制器里都设置好了。


2.模型和控制器

* 控制器里初始化数据模型（包含数组的函数）。
* 控制器（数据模型语境）允许我们建立模型和视图的数据绑定（表现 + 数据 + 逻辑）。
* 模型与视图分离，同时双向绑定。

```js
var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListController', function PhoneListController($scope) {
  $scope.phones = [
    {
      name: 'Nexus S',
      snippet: 'Fast just got faster with Nexus S.'
    }, {
      name: 'Motorola XOOM™ with Wi-Fi',
      snippet: 'The Next, Next Generation tablet.'
    }, {
      name: 'MOTOROLA XOOM™',
      snippet: 'The Next, Next Generation tablet.'
    }
  ];
});
```
> 控制器的名字与 `ng-controller` 指令的值一致，数据对应绑定。
> 数据已经注入控制器函数的作用域中，控制器的作用域是根作用域的后继。

3.测试

```js
describe('PhoneListController', function() {

  beforeEach(module('phonecatApp'));

  it('should create a `phones` model with 3 phones', inject(function($controller) {
    var scope = {};
    var ctrl = $controller('PhoneListController', {$scope: scope});

    expect(scope.phones.length).toBe(3);
  }));

});
```

> npm test

4.练习

```html
<table>
  <tr><th>row number</th></tr>
  <tr ng-repeat="i in [0, 1, 2, 3, 4, 5, 6, 7]"><td>{{i}}</td></tr>
</table>
<table>
  <tr><th>row number</th></tr>
  <tr ng-repeat="i in [0, 1, 2, 3, 4, 5, 6, 7]"><td>{{i+1}}</td></tr>
</table>
```

### 组件

* 组件：模板 + 控制器（可忽略）。
* 组件实例隔离范围：没有原型继承，不影响应用的其他部分。
* 可能是指令的别名。
* CDO：组件名称和定义对象。

例子：

```html
angular.
  module('myApp').
  component('greetUser', {
    template: 'Hello, {{$ctrl.user}}!',
    controller: function GreetUserController() {
      this.user = 'world';
    }
  });
```

`<greet-user></greet-user>`在视图中包含会扩展成一个 DOM 子树。