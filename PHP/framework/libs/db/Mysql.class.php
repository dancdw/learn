<?php
    class Mysql
    {
        private $sql;
        
        
        /**
         * 获取最后一条sql语句
         */
        public function getLastSql() {
            return $this->sql;
        }
        
        /**
         * 报错误提示
         * @param string $error 错误内容
         */
        public function err($error) {
            die("对不起，您的操作有误，错误原因为：" . $error);
        }
        
        /**
         * 连接数据库
         * @param array $config 配置信息
         */
        public function connect($config) {
            extract($config);
            if(!$con = mysql_connect($dbhost, $dbuser, $dbpsw))
                $this->err(mysql_error());
            if(!mysql_select_db($dbname, $con))
                $this->err(mysql_error());
            mysql_query("set names " . $dbcharset);
        }
        
        /**
         * 执行sql语句
         * @param string $sql sql语句
         * @return resource 资源标识
         */
        public function query($sql) {
            $this->sql = $sql;
            if(!$result = mysql_query($sql))
                $this->err($sql . "<br/>" . mysql_error());
            else 
                return $result;
        }
        
        /**
         * 获取数据列表
         * @param resource $result 资源标识
         * @return array|string
         */
        public function findAll($result) {
            while ($res = mysql_fetch_array($result, MYSQL_ASSOC))
                $list[] = $res;
            return isset($list) ? $list : '';
        }
        
        /**
         * 获取一条数据
         * @param resource $result 资源标识
         * @return array|string
         */
        public function findOne($result) {
            return mysql_fetch_array($result, MYSQL_ASSOC);
        }
        
        /**
         * 获取字段值
         * @param resource $result 资源标识
         * @param number $row 行号
         * @param number $field 字段（偏移量|字段名|dbname.fieldname）
         * @return string
         */
        public function findResult($result, $row = 0, $field = 0) {
            return mysql_result($result, $row, $field);
        }
        
        /**
         * 插入数据
         * @param string $table 数据表
         * @param array $arr 字段名对应值的数组
         * @return number
         */
        public function insert($table, $arr) {
            foreach($arr as $k => $v) {
                $keyArr[] = '`' . $k . '`';
                $valueArr[] = '"' . mysql_real_escape_string($v) . '"';
            }
            $keys = implode(',', $keyArr);
            $values = implode(',', $valueArr);
            $sql = "insert into " . $table . "(" .$keys. ")" . "values(".$values.")";
            $this->query($sql);
            return mysql_insert_id();
        }
        
        /**
         * 更新一条记录
         * @param string $table 数据表
         * @param array $arr 字段名对应值的数组
         * @param string $where where条件
         */
        public function update($table, $arr, $where) {
            foreach($arr as $k => $v) {
                $kAndv[] = '`' . $k . '`=' .'"' . mysql_real_escape_string($v) . '"';
            }
            $kAndv = implode(",", $kAndv);
            $sql = "update " . $table . " set " . $kAndv . " where " . $where;
            $this->query($sql);
            return mysql_affected_rows();
        }
        
        /**
         * 删除一条记录
         * @param string $table 表名
         * @param string $where where条件
         */
        public function del($table, $where) {
            $sql = "delete from " . $table . " where " . $where;
            $this->query($sql);
            return mysql_affected_rows();
        }
    }