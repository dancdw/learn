<?php
// 命名空间
// 1.解决命名冲突导致的致命错误
// 1.1.使用spl_autoload_register('函数名');
// 1.2.自动载入替换include,require.__autoload被废弃，因为工程使用多个框架定义会提示函数重复定义。
require 'test1.php';
require 'test2.php';

// 2.调用不同命名空间的函数或类
Test1\test();
Test2\test();