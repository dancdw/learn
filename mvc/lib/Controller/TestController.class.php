<?php
    class TestController
    {
        public function show() {
            $data = M("test")->get();
            $smarty = ORG('smarty/', 'Smarty', Config("smartyConfig"));
            $smarty->assign('str', $data);
            $smarty->display("test.html");
        }
    }