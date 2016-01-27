<?php
    class adminController{
        public $auth;
        
        public function __construct(){
            $this->auth = M('auth')->getAuth();
            if(empty($this->auth) && PC::$method != 'login') {
                $this->showMessage("请先登录！", 'admin.php?controller=admin&method=login');
            }
        }
        
        // 取出所有新闻
        public function newsList() {
            $data = M('news')->findAllOrderByDateline();
            VIEW::assign(array('data' => $data));
            VIEW::display('admin/newslist.html');
        }
        
        // 删除新闻
        public function newsDel() {
            if(isset($_GET['id'])) {
                $this->delById($_GET['id']);
            }
        }
        
        // 新闻添加与更新
        public function newsAdd() {
            if(!empty($_POST)) {
                $this->newsSubmit($_POST);
            } else {
                if(isset($_GET["id"])) {
                    $data = M('news')->getNewsInfo($_GET["id"]);
                } else {
                    $data = array();
                }
                VIEW::assign(array("data" => $data));
                VIEW::display("admin/newsadd.html");
            }
        }
        
        // 后台首页
        public function index() {
            $newsNum = M("news")->count();
            VIEW::assign(array('newsNum' => $newsNum));
            VIEW::display("admin/index.html");
        }
        
        // 退出登录
        public function logout() {
            M('auth')->logout();
            $this->showMessage("退出成功！", 'admin.php?controller=admin&method=login');
        }
        
        // 登录
        public function login() {
            if($_POST) {
                $this->checkLogin();
            } else {
                VIEW::assign(array('str' => "我是登录页，我要登录！"));
                VIEW::display("admin/login.html");
            }
        }

        // 添加与更新的处理过程
        private function newsSubmit($data) {
            $result = M('news')->newsSubmit($data);
            if($result == 0) {
                $this->showMessage('操作失败！', 'admin.php?controller=admin&method=newsAdd&id=' . $_GET['id']);
            } elseif ($result == 1) {
                $this->showMessage('添加成功！', 'admin.php?controller=admin&method=newsList');
            } elseif ($result == 2) {
                $this->showMessage('更新成功！', 'admin.php?controller=admin&method=newsList');
            }
        }
        
        // 用户登录验证
        private function checkLogin() {
            if(M('auth')->loginSubmit()){
                $this->showMessage("登录成功！", 'admin.php?controller=admin&method=index');
            } else {
                $this->showMessage("登录失败！", 'admin.php?controller=admin&method=login');
            }
        }

        // 提示内容，并跳转
        private function showMessage($info, $url){
			echo "<script>alert('$info');window.location.href='$url'</script>";
			exit;
		}
        
        // 删除新闻过程
        private function delById($id) {
            $result = M('news')->delById(intval($_GET['id']));
            if($result){
                $this->showMessage("删除成功！", 'admin.php?controller=admin&method=newsList');
            } else {
                $this->showMessage("删除失败！", 'admin.php?controller=admin&method=newsList');
            }
        }
    }