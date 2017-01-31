<?php
    class DB    // 工厂类
    {
        public static $db; // 数据库类
        
        // 实例化数据库类
        public static function init($dbtype, $config) {
            self::$db = new $dbtype;
            self::$db->connect($config);
        }
        
        // 获取最后一条sql语句
        public static function getLastSql() {
            return self::$db->getLastSql();
        }
        
        // 执行sql语句
        public static function query($sql) {
            return self::$db->query($sql);
        }
        
        // 获取数据列表
        public static function findAll($sql) {
            $result = self::$db->query($sql);
            return self::$db->findAll($result);
        }
        
        // 获取一条数据
        public static function findOne($sql) {
            $result = self::$db->query($sql);
            return self::$db->findOne($result);
        }
        
        // 获取指定字段值
        public static function findResult($sql, $row = 0, $field = 0) {
            $result = self::$db->query($sql);
            return self::$db->findResult($result, $row, $field);
        }
        
        // 添加一条数据
        public static function insert($table, $arr) {
            return self::$db->insert($table, $arr);
        }
        
        // 更新一条数据
        public static function update($table, $arr, $where) {
            return self::$db->update($table, $arr, $where);
        }
        
        // 删除一条数据
        public static function del($table, $where) {
            return self::$db->del($table, $where);
        }
    }