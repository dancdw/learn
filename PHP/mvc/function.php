<?php
    /**
     * 实例化控制器
     * @param string $name 控制器名
     * @param string $method 方法名
     * @return string 返回数据
     */
    function C($name, $method) {
        require_once 'lib/Controller/' . $name . "Controller.class.php";
        $name .= "Controller";
        $obj = new $name();
        return $obj->$method();
    }
    
    /**
     * 实例化模型
     * @param string $name 模型名
     * @return object 返回对象
     */
    function M($name) {
        require_once 'lib/Model/' . $name . "Model.class.php";
        $name .= "Model";
        return new $name();
    }
    
    /**
     * 实例化视图
     * @param string $name 视图名
     * @return object 返回对象
     */
    function V($name) {
        require_once 'lib/View/' . $name . "View.class.php";
        $name .= "View";
        return new $name();
    }
    
    /**
     * 实例化第三方类库
     * @param string $path 路径
     * @param string $name 类名
     * @param array $parames 参数数组
     * @return object 返回对象
     */
    function ORG($path, $name, $parames) {
        require_once 'lib/ORG/' . $path . $name . ".class.php";
        $obj = new $name();
        if(!empty($parames)) {
            foreach($parames as $k => $v) {
                $obj->$k = $v;
            }
        }
        return $obj;
    }
    
    /**
     * 获取配置参数
     * @param string $key 下标
     * @return string|array
     */
    function Config($key) {
        global $config;
        return $config[$key];
    }
    
    /**
     * 转义url参数
     * @param string $data 参数
     * @return string
     */
    function addslasshe($data) {
        if(!get_magic_quotes_gpc()) return addslashes($data);
    }
    
    /**
     * url控制器名过滤
     * @param string $controller 控制器名
     * @return string
     */
    function controllerFilter($controller) {
        $controller = addslasshe($controller);
        if(in_array($controller, Config("allowController")))
            return $controller;
        else
            return Config("defaultController");
    }
    
    /**
     * url方法名过滤
     * @param string $method 方法名
     * @return string
     */
    function methodFilter($method) {
        $method = addslasshe($method);
        if(in_array($method, Config("allowMethod")))
            return $method;
        else
            return Config("defaultMethod");
    }