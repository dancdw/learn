#markdown入门基础

* [标题](#bt)
* [段落](#dl)
* [字体](#zt)
* [引用](#yy)
* [列表](#lb)
* [链接](#lj)
* [图片](#tp)
* [代码](#dm)
* [补充](#bc)
    * [特殊字符自动互相转换](#tszf)
    * [区块引用](#qkyy)
    * [分割线](#fgx)

##<font id='bt'>标题</font>
Markdown标题分：Setext和Atx两种语法格式。
1.文本下面`=`表示高级标题，`-`表示第二级标题
2.行首插入1到6个`#`分别表示1到6级标题。

##<font id='dl'>段落</font>
1.Markdown中使用空白行来分割段落。
2.使用星号`*`或下划线`_`闭合表示斜体。
3.使用双`**`或下划线`__`表示加粗。

##<font id='zt'>字体</font>
1.Markdown基本语法不支持任意更改颜色的功能。
2.支持css与html嵌套，字体、字号轻松解决。

##<font id='yy'>引用</font>
1.首行使用右尖括号`>`后面的内容为引用。

>我是引用内容。哈哈。
>别告诉我原来就是这么简单。

>>我还可以嵌套
>>我还可以嵌套2

>Markdown太容易学了。

##<font id='lb'>列表</font>
1.Markdown使用星号`* `、加号`+ `、和减号`- `表示无序列表。

- Apple
- Orange
* Peach
* Banana

<ul><li>我是第一个</li><li>我是第二个</li><li>我是第三个</li></ul>

2.使用数字加一个英文句号为项目标记。
3.也可以嵌套列表。

 1.颜色

 * 红色
  * 白色
   * 黑色

 2.电脑品牌

 - 华硕
  - 惠普
   - 神舟

>我是故意在这里出现的，我要嵌套引用.

4.也可以嵌套引用。

>haha,我是嵌套引用

5.最多可以缩进3个空格。
##<font id='lj'>链接</font>
1.Markdown支持行内和参考形式的链接语法，使用中括号把文字转成链接。
[我是链接，请点击我](http://www.baidu.com/ "还可以加titile")

2.参考形式：`[`链接名称`]`:空白符 URL `"`title`"`。
[1]: http://www.sina.com "sina"
点击[sina][1]即可跳转。

3.使用`<>`包含的url或邮箱会自动转换成超链接。
<http://www.163.com/>

##<font id='tp'>图片</font>
1.与链接相似，分成行内形式和参考形式。

* 行内形式语法：
    !`[`alt text`](`URL title`)`，alt text和title可以选择性加入。
    ![图片效果就是这样](http://money.golditfin.cn/Public/Web/images/logo.png)

##<font id='dm'>代码</font>
1.使用反引号`标记代码区段。
2.代码块使用行首3个反引号和编程语言标记代码开始，代码块尾行同样使用3个反引号闭合代码。
```php
// 找回密码第一步
public function stepOne() {
    if($_POST) {
        $serv = new \Share\Controller\ServController();
        $member = new \Share\Controller\MemberController();
        $sms = new \Share\Controller\SmsController();
        $username = I("username");
        $smsCode = I("smsCode");
        $smsInfo = $sms->readSms($username);
        if(!$serv->notEmpty($username)) { setError("username", "请输入注册手机号码！"); }
        elseif(!$member->memberInfo($username)) { setError("username", "会员不存在或已注销！"); }
        elseif($smsInfo["code"] != $smsCode){ setError("code", "短信验证码不正确！"); }
        elseif(!$sms->checkSms($username, $smsCode)) { setError("code", "短信验证码失效，请重新点击发送验证码！"); }
        else { $_SESSION["web_forget_username"] = $username; $this->redirect("stepTwo"); }
    }
    $this->display("forget_password");
}
```

##<font id='buchong'>补充</font>
###<font id='tszf'>特殊字符自动互相转换</font>
1.`<`需要使用`&lt;`，`&`使用`&amp;`
###<font id='qkyy'>区块引用</font>
1.Markdown允许引用区块中使用其他的Markdown语法，包括标题，列表，代码区等。
>* 我是无序列表1
>* 我是无序列表2
># 我是大标题
>## 我是大标题
>### 我是大标题
>#### 我是大标题
>##### 我是大标题
>###### 我是大标题
>
```php
function app() {}
function app() {}
function app() {}
```

###<font id='fgx'>分割线</font>

```php
***
* * *
******
- - -
--------------------
```

--------------------



