<?php
    header("Content-Type:text/html; charset=utf-8;");
    date_default_timezone_set('Asia/Shanghai');
    include_once 'config.php';
    include_once 'PC.php';
    PC::run($config);