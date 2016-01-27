<?php
    if(isset($_GET["controller"]) && isset($_GET["method"])) {
        require_once 'function.php';
        require_once 'config.php';
        header("Content-Type:text/html;charset=utf-8;");
        $controller = controllerFilter($_GET["controller"]);
        $method = methodFilter($_GET["method"]);
        C($controller, $method);
    }