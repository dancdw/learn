<?php
namespace App\Decorator;

class Login
{
    function beforeRequest($controller)
    {
        session_start();
        if (empty($_SESSION['isLogin']))
        {
            /*header('Location: /login/index/');*/
            $url = $_SERVER['SCRIPT_NAME'];
            header("Location: ".$url."?controller=login&action=index");
            exit;
        }
    }

    function afterRequest($return_value)
    {

    }
}