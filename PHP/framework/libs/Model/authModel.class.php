<?php
    class authModel{
        private $auth; // 当前用户
        
        public function __construct() {
            if(isset($_SESSION['auth']) && !empty($_SESSION['auth'])) {
                $this->auth = $_SESSION['auth'];
            }
        }
        
        // 退出登录
        public function logout() {
            unset($_SESSION['auth']);
            $this->auth = '';
        }
        
        // 登录操作
        public function loginSubmit() {
            if(empty($_POST['username']) || empty($_POST['password'])){ return false; }
            $username = addslasshe($_POST['username']);
            $password = addslasshe($_POST['password']);
            if(!$this->auth = $this->checkUser($username, $password)){ 
                return false;
            } else { 
                $_SESSION['auth'] = $this->auth;
                return true;
            }
        }
        
        // 获取用户信息
        public function getAuth() {
            return $this->auth;
        }

        // 用户验证
        private function checkUser($username, $password) {
            $adminObj = M('admin');
            $auth = $adminObj->findOneByUsername($username);
            if($password == $auth['password'] && !empty($auth)){
                return $auth;
            } else {
                return false;
            }
        }
    }