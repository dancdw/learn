<?php
    class aboutModel{
        // 获取关于我们的内容
        public function aboutinfo() {
            return file_get_contents('data/about.txt');
        }
    }