<?php
    class indexController{
        
        // 关于我们的数据
        private function _about() {
            $data = M('about')->aboutInfo();
            VIEW::assign(array('data' => $data));
        }
        
        // 首页
        public function index() {
            $this->_about();
            $data = M('news')->getNewsList();
            VIEW::assign(array('data' => $data));
            VIEW::display('index/index.html');
        }
        
        // 新闻详情页
        public function show() {
            $this->_about();
            $data = M('news')->getNewsInfo($_GET['id']);
            VIEW::assign(array('data' => $data));
            VIEW::display('index/show.html');
        }
    }