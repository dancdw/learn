<?php
    include_once 'include.list.php';
    $path = dirname(__FILE__);
    foreach($paths as $v) {
        include_once $path . '/' . $v;
    }
    
    class PC{
        public static $controller;
        public static $method;
        private static $config;
        
        // 启动db引擎
        private static function init_db() {
            DB::init(self::$config['db'], self::$config['dbConfig']);
        }
        
        // 启动视图引擎
        private static function init_view() {
            VIEW::init(self::$config['view'], self::$config['viewConfig']);
        }
        
        // 获取控制器
        private static function init_controller() {
            self::$controller = isset($_GET['controller']) ? addslasshe($_GET['controller']) : "Index";
        }
        
        // 获取方法
        private static function init_method() {
            self::$method = isset($_GET['method']) ? addslasshe($_GET['method']) : "index";
        }
        
        // 开始启动引擎程序，完成处理数据和输出
        public static function run($config) {
            self::$config = $config;
            self::init_db();
            self::init_view();
            self::init_controller();
            self::init_method();
            C(self::$controller, self::$method);
        }
    }