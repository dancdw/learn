<?php
    class TestView
    {
        public function display($data) {
            header("Content-Type:text/html;charset=utf-8;");
            echo $data;
        }
    }