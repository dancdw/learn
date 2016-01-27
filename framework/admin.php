<?php
    header("Content-Type:text/html; charset=utf-8;");
    session_start();
    include_once 'config.php';
    include_once 'PC.php';
    PC::run($config);