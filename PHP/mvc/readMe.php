<?php
// MVC-框架（架构）模式的学习
    // 1.解释：模型、视图、控制器
    // 2.目的：主流框架，适应公司web系统，了解web系统架构知识，成为系统架构准备
    // 3.数据库->数组->拼接html->输出
    // 4.优势：各司其职，互不干涉，分工，重用如模版
    
// MVC-定义
    // 1.视图-web界面，浏览器-html，flash，XML
    // 2.控制器-遥控器，向系统发出指令的工具和帮手
    // 3.模型-按要求从数据库取数据，重要部件。各扫门前雪，最熟悉的陌生人。业务逻辑层Model，数据库、运算、第三方、本地文件；整套业务处理流程。
    // 4.工作流程-浏览者调用控制器发出指令，控制器取模型，模型取数据，控制器选取视图，控制器将数据给视图显示给用户
    
// 控制器
    // 1.原则规范统一：命名，testController.class.php
    // 2.show方法，控制器发出指令。
    
// 模型
    // 1.testModel.class.php
    // 2.get方法，数据库接口获取数据源的部件
    
// 视图
    // 1.testView.class.php
    // 2.display方法，参数$data，echo操作。
    
// 简单演示
    // 1.第一步：浏览者调用控制器发出指令，第二步：控制器选取模型，第三步：模型取数据，第四步：控制器取视图，视图将数据显示。
    // 2.include警告（不报错），require严重错误（报错），require_once防止重复引用。
    // 3.$testController = new testController();$testController->show();
    // 4.控制器-实例化模型，调用get方法。
    // 5.控制器-实例化视图，调用display方法传递$data。组织美化并输出
    
// 入口程序简介
    // 1.单一入口机制，所有请求指向一个脚本文件如index.php?xxxx。所有对程序访问都是通过这个入口。
    // 2.单个文件访问限制，维护方便
    // 3.目录架构libs类目录（Controller，Model，ORG，View），config.php，index.php
    
// 调用实例化控制器，模型，视图
    // 1.创建function.php。
    // 2.建立控制器调用函数C，参数$name控制器名, $method方法名，require_once，实例化并调用方法。方法不允许带有自己参数
    // 3.建立模型调用函数M，参数$name，方法带有参数所以不传递$method，require_once，实例化并return。
    // 4.建立视图调用函数V，参数$name，视图文件引入require_once，实例化并return。
    
// index.php入口文件改造与功能总结
    // 1.统一入口文件为首的url格式
    // 2.使用安全方法接收传递控制器和方法名
    // 3.index.php?controller=控制器名&method=方法名
    // 4.$_GET接收url参数，允许访问的控制器名和方法名。in_array();
    // 5.存在则过滤参数，!get_magic_quotes_gpc(); addslasshes();// 特殊字符串转义
    // 6.require_once引入function，调用C函数。
    
// 视图引擎
    // 1.好的视图引擎，贴近标准的html，语法简单易懂，良好的缓存机制，良好扩展，网络资源帮助文档多，上手快。
    // 2.常见好用，smarty，phpLib，未出现PHP面向对象前，逻辑与html分离
    
// smarty
    // 1.smarty引入与实例化，require_once('Smarty.class.php');$smarty = new Smarty();
    // 2.smarty五配置两方法，左右定界符，html模版地址dir（tpl），编译文件dir（template_c），缓存dir（ceche）
    // 3.assign方法，参数1-模版变量，参数2-值。display方法，参数1模版地址
    
// 基本语法
    // 1.注释{*注释语句*}
    // 2.变量调节器，变量1|调节器:变量2:变量3，谨记变量顺序
    // 3.原则使用PHP函数，少用smarty调节器
    // 4.条件判断语句if eq elseif eq(neq gt lt) else /if，修饰符和变量使用空格隔开
    // 5.循环语句 section name=变量 loop=变量，与PHP相差甚多，只需要照葫芦画瓢
    // foreach item=每次赋值于变量 form=数据源，foreachelse
    // 6.文件引入：include引入模版，属性file=文件路径，自定义属性仅在所包含模版中使用
    // 7.类与对象赋值和使用：assign把类的对象赋值到模版里使用，调用对象方法与php调用相同。
    // 8.模版使用PHP内置函数（与调节器使用相同）和自定义函数registerPlugin注册到模版里，模版中使用自定义函数会将属性打包成数组（下标）传入。
    
//smarty插件
    // 1.遵循原系统主体接口编写规范，调用主系统数据和函数库，可移植性重用性大。
    // 2.常用类型：functions函数插件，modifiers修饰插件，blockfunctions区块函数插件
    // 3.制作php函数（命名不能重复）：（1）registerPlugin注册，（2）放入lib目录下的plugins目录，（3）PHP函数自动以修饰插件在模版使用
    // 3-1.funcion.test.php - smarty_function_test插件名（参数），模版调用插件test与函数相同
    // 3-2.modifier.test.php - smarty_modifier_test（参数1，参数2...），调用与调节器相同
    // 3-3.block.test.php - smarty_block_test（属性arr，作用变量），调用与闭合标签相同
    
// smarty实例
    // 1.第三方类是指第三方厂家生产并发行
    
// PHP操作Mysql类的封装

// 工厂模式
    // 1.统一管理对象的实例化，便于扩展维护，传递对象名称，对象的创建
    // 2.类是全局变量，可在任意处直接调用属性和方法（方便）
