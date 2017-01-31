<?php
    class VIEW
    {
        public static $view;
        
        // 初始化模版引擎
        public static function init($viewType, $config) {
            self::$view = new $viewType;
            foreach($config as $k => $v) {
                self::$view->$k = $v;
            }
        }
        
        // 模版变量赋值
        public static function assign($arr) {
            foreach($arr as $k => $v) {
                self::$view->assign($k, $v);
            }
        }
        
        // 显示模版
        public static function display($template) {
            self::$view->display($template);
        }
    }