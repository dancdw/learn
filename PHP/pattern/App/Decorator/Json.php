<?php
namespace App\Decorator;

class Json
{
    function beforeRequest($controller)
    {

    }

    function afterRequest($return_value)
    {
        $app = isset($_GET['app']) ? $_GET['app'] : '';
        if ($app == 'json')
        {
            echo json_encode($return_value);
        }
    }
}