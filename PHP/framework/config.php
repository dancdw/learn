<?php
    $config = array(
        "allowController" => array("Test,Admin"),
        "defaultController" => "Test",
        "allowMethod" => array("show"),
        "defaultMethod" => "show",
        "view" => "Smarty",
        "viewConfig" => array("left_delimiter" => "{", "right_delimiter" => "}", "template_dir" => "tpl", "compile_dir" => "template_c"),
        "db" => "Mysql",
        "dbConfig" => array("dbhost" => "localhost", "dbuser" => "root", "dbpsw" => "", "dbname" => "test", "dbcharset" => "utf8"),
    );