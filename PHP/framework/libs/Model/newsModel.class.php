<?php
    class newsModel{
        private $_tableName = 'news';
        
        // 前台获取新闻列表
        public function getNewsList() {
            $data = $this->findAllOrderByDateline();
            foreach($data as $k => $v) {
                $data[$k]['content'] = mb_substr(strip_tags($data[$k]['content']), 0, 200);
                $data[$k]['dateline'] = date('Y-m-d H:i:s', $data[$k]['dateline']);
            }
            return $data;
        }
        
        // 获取总新闻数量
        public function count() {
            $sql = "select count(*) from ".$this->_tableName;
            return DB::findResult($sql);
        }
        
        // 删除一条新闻
        public function delById($id) {
            if(empty($id)) { return false; }
            return DB::del($this->_tableName, 'id = ' . $id);
        }
        
        // 获取新闻列表（按时间排序）
        public function findAllOrderByDateline() {
            return DB::findAll('select * from ' . $this->_tableName . ' order by dateline desc');
        }
        
        // 获取单条新闻
        public function getNewsInfo($id) {
            if(empty($id)) {
                return array();
            } else {
                $id = intval($id);
                return DB::findOne('select * from ' . $this->_tableName . ' where id = ' . $id);
            }
        }
        
        // 新增或更新新闻
        public function newsSubmit($data) {
            
            extract($data);
            if(empty($title) || empty($content)) {
                return 0;
            }
            $data = array(
                'title' => addslasshe($title),
                'content' => addslasshe($content),
                'author' => addslasshe($author),
                'from' => addslasshe($from),
                'dateline' => time()
            );
            if(!empty($id)) {
                DB::update($this->_tableName, $data, 'id = ' . $id);
                return 2;
            } else {
                DB::insert($this->_tableName, $data);
                return 1;
            }
        }
    }