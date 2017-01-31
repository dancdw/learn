<?php
/* Smarty version 3.1.29, created on 2016-01-07 01:28:58
  from "D:\Program Files\wamp\www\learn\framework\tpl\admin\leftmenu.html" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_568dbf5ab78076_94459374',
  'file_dependency' => 
  array (
    'a16161c1a3c28ca16d2f4a68665866a0a87c9c0e' => 
    array (
      0 => 'D:\\Program Files\\wamp\\www\\learn\\framework\\tpl\\admin\\leftmenu.html',
      1 => 1452072322,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_568dbf5ab78076_94459374 ($_smarty_tpl) {
?>
<aside id="sidebar" class="column">
	<h3>新闻管理</h3>
	<ul class="toggle">
		<li class="icn_new_article"><a href="admin.php?controller=admin&method=newsadd">添加新闻</a></li>
		<li class="icn_categories"><a href="admin.php?controller=admin&method=newslist">管理新闻</a></li>
	</ul>
	<h3>管理员管理</h3>
	<ul class="toggle">
		<li class="icn_jump_back"><a href="admin.php?controller=admin&method=logout">退出登录</a></li>
	</ul>
	
	<footer>
		
	</footer>
</aside><!-- end of sidebar --><?php }
}
