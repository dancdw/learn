<?php
/**
 * 处理接口公共业务
 * 1.数据库存在两张表：app客户端表，版本升级表
 * 2.客户端打开首页时请求地址，传递客户端信息：appid-客户端id，version_id-大版本，version_mini-小版本，did-设备号，encrypt_did-加密设备号
 * 3.首次请求接口appid和encrypt_did为空，当不存在时生成客户端表和版本升级表记录，插入最新版本号。否则验证权限，encrypt_did与客户端表中的key进行加密验证
 * 4.当前版本小于版本升级表版本，并且要求升级则返回升级数据。
 */
require_once('./response.php');
require_once('./db.php');
class Common {
	public $params;
	public $app;
	public function check() {
		$this->params['app_id'] = $appId = isset($_POST['app_id']) ? $_POST['app_id'] : '';
		$this->params['version_id'] = $versionId = isset($_POST['version_id']) ? $_POST['version_id'] : '';
		$this->params['version_mini'] = $versionMini = isset($_POST['version_mini']) ? $_POST['version_mini'] : '';
		$this->params['did'] = $did = isset($_POST['did']) ? $_POST['did'] : '';
		$this->params['encrypt_did'] = $encryptDid = isset($_POST['encrypt_did']) ? $_POST['encrypt_did'] : '';
		
		if(!is_numeric($appId) || !is_numeric($versionId)) {
			return Response::show(401, '参数不合法');
		}
		// 判断APP是否需要加密
		$this->app = $this->getApp($appId);
		if(!$this->app) {
			return Response::show(402, 'app_id不存在');
		}
		if($this->app['is_encryption'] && $encryptDid != md5($did . $this->app['key'])) {
			return Response::show(403, '没有该权限');
		}
	}
	
	public function getApp($id) {
		$sql = "select *
				from `app`
				where id = " . $id ."
				and status = 1 
				limit 1";
		$connect = Db::getInstance()->connect();
		$result = mysql_query($sql, $connect);
		return mysql_fetch_assoc($result);
	}
	
	public function getversionUpgrade($appId) {
		$sql = "select *
				from `version_upgrade`
				where app_id = " . $appId ."
				and status = 1 
				limit 1";
		$connect = Db::getInstance()->connect();
		$result = mysql_query($sql, $connect);
		return mysql_fetch_assoc($result);
	}
	
	/**
	 * 根据图片大小组装相应图片
	 * @param string $imageUrl
	 * @param string $size
	 */
	public function setImage($imageUrl, $size) {
		if(!$imageUrl) {
			return '';
		}
		if(!$size) {
			return $imageUrl;
		}
		
		$type = substr($imageUrl, strrpos($imageUrl, '.'));
		if(!$type) {
			return '';
		}
		$path = substr($imageUrl, 0, strrpos($imageUrl, '.'));
		
		return $path . '_' . $size . $type;
	}
}