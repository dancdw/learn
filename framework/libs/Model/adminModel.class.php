<?php
    class adminModel{
        private $_tableName = 'admin';
        
        // 根据用户名获取信息
        public function findOneByUsername($username) {
            $sql = "select * from ".$this->_tableName." where username='".$username."'";
            return DB::findOne($sql);
        }
    }