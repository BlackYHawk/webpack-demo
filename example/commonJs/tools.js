
function $(id) {
    var element = document.getElementById(id);
    return element;
}

/**
 *  可以获取当前页面指定元素的值。
 *
 *  @param id 页面元素ID
 *
 *  @return
 */
function getValue(id) {
    var element = document.getElementById(id);
    var value = element.attributeForName('value');
    return value;
}

/**
 *  设置当前页面指定元素的值
 *
 *  @param id    要设置的元素的id值。
 *  @param value 要设置的元素值。
 *
 *  @return
 */
function setValue(id, value) {
    var element = document.getElementById(id);
    if(isNull(value)){
    	value='';
    }
    element.setAttribute("value", value);
}

function getAttribute(id, attributeName) {
    var element = document.getElementById(id);
    var value = element.attributeForName(attributeName);
    return value;
}

/**
 *  设置当前页面指定元素的指定属性值
 *
 *  @param id             要设置的元素的id值。
 *  @param attributeName  要设置的属性名
 *  @param attributeValue 要设置的属性值。
 *
 *  @return
 */
function setAttribute(id, attributeName, attributeValue) {
    var element = document.getElementById(id);
    element.setAttribute(attributeName, attributeValue);
}


/**
 *  设置当前页面指定元素的样式。
 *
 *  @param id         要设置的元素的id值。
 *  @param styleName  要设置的样式名。
 *  @param styleValue 要设置的样式值。
 *
 *  @return
 */
function setStyle(id, styleName, styleValue) {
    var element = document.getElementById(id);
    element.setStyle(styleName, styleValue);
}



/**
 *  可以删除当前页面的指定元素。
 *
 *  @param pid 要删除的元素的父级的id值。
 *  @param id  要删除的元素id值。
 *
 *  @return
 */
function removeChild(pid, id) {
    var element = document.getElementById(pid);
    element.removeChild(id);
}


/**
 *  可以清空当前页面的指定元素的子节点
 *
 *  @return 
 */
function removeChildren(id) {
    var element = document.getElementById(id);
    element.removeChild(id);
}

/**
 *  可以向当前页面的指定元素插入子节点。
 *
 *  @param id        要插入的元素id值。
 *  @param direction 要插入HSML的方向，向下增长或者向上增长，up：向上增长，其他参数都向下增长
 *  @param TMLString 要插入的TML字符串。
 *
 *  @return
 */
function insertInnerTML(id, direction, TMLString) {
    var element = document.getElementById(id);
    element.insertInnerTML(direction, TMLString);
}

/**
 *  可以页面跳转到指定的url。
 *
 *  @param url 要跳转的url
 *
 *  @return
 */
function goto(url) {
    var page = new Page();
    page.url = url;
    page.hidesStatusBar=false;

    
     var opts = {"page":page ,"animate":"slideFromRight"};
    
    page.hidesTabBar = true;
    window.page.navigator.push(opts);
}

/**
 *  可以页面跳转到指定的url。
 *
 *  @param url 要跳转的url
 *  @param type 跳转之前需要做的验证  1:验证是否登陆    2:验证是否实名认证   3:既要验证登陆也要验证实名认证  其他值:直接跳转
 *
 *  @return
 */
function gotoType(url,type) {
	var page = new Page();
	page.url = url;

    if(url=='tradingRecord.tml' || url=='personalManagement.tml' || url=='personalManagementLogin.tml'|| url=='F_tradingRecord.tml' || url=='F_personalManagement.tml' || url=='F_personalManagementLogin.tml'){
        page.setStyle("background-color", "#3e3d4c");
    }
    else{
        page.setStyle("background-color", "#3b3a48");
    }
    page.hidesStatusBar=false;
    page.hidesTabBar = true;
	var opts = {"page":page ,"animate":"slideFromRight"};
	if(type=='1'){
		if(isLogin()){
			window.page.navigator.push(opts);
		}else{
			toLoginPage();
		}
	}else if(type=='2'){
		if(isRealName()){
			window.page.navigator.push(opts);
		}else{
			saveValue('verifyReal','1',false);
			toRealNamePage();
		}
	}else if(type=='3'){
		if(isLogin()){
			if(isRealName()){
				window.page.navigator.push(opts);
			}else{
				saveValue('verifyReal','1',false);
				toRealNamePage();
			}
		}else{
			toLoginPage();
		}
	}else{
		window.page.navigator.push(opts);
	}
}

/**
 * 验证是否登陆 (登陆成功后，需要在缓存中保存一个标识位isLogin,值为'true')
 * @returns
 */
function isLogin(){
	var loginFlag=loadValue('isLogin',false);
	if(loginFlag == 'true'){
		return true;
	}else{
		return false;
	}
}
/**
 * 验证是否实名认证 (实名认证通过后，需要在缓存中保存一个标识位isRealName,值为'true')
 * @returns
 */
function isRealName(){
	var realNameFlag=loadValue('isRealName',false);
	var isauth=loadValue('isauth',false); ///// 2表示已认证
	if(realNameFlag == 'true' || isauth=='2'){
		return true;
	}else{
		return false;
	}
}
/**
 * 登录重定向用的
 * @param url
 * @param reURL
 * @param tabIndex
 * @returns
 */
function reLoginGoto(url,reURL,tabIndex){
	saveValue("tabIndex", tabIndex, "false");
	saveValue("reURL", reURL, "false");
	window.assign(url);
}
function keygoto(url,paramValue){
	saveValue("id", paramValue, true);
	window.assign(url);
}
function staticGoto(url,fieldId1,fieldId2,fieldId3){
	var fieldValue1=getValue(fieldId1);
	var filedValue2=getValue(fieldId2);
	var filedValue3=getValue(fieldId3);
	saveValue("id", fieldValue1, "true");

	saveValue("param1", fieldValue2, "true");
	saveValue("param2", fieldValue3, "true");


	window.assign(url);
}

function keygotoByTwoValue(url,paramValue1,paramValue2){
	saveValue("id", paramValue1, "true");
	saveValue("param1", paramValue2, "true");

	window.assign(url);
}
function keygotoByThreeValue(url,paramValue1,paramValue2,paramValue3){
	saveValue("id", paramValue1, "true");
	saveValue("param1", paramValue2, "true");
	saveValue("param2", paramValue3, "true");
	window.assign(url);
}
function staticGotoByTwoId(url,fieldId1,fieldId2){
	var fieldValue1=getValue(fieldId1);
	var filedValue2=getValue(fieldId2);

	saveValue("id", fieldValue1, "true");
	saveValue("param1",filedValue2, "true");
	window.assign(url);
}
/**
 *  页面返回
 *
 *  @return
 */
function back() {
    var opts = {"animate":"default"};
    window.page.navigator.pop(opts);
}

/*返回到该navigator下的某个页面*/
function backById(id) {
	var verifyReal=loadValue('verifyReal',false);
	if(verifyReal=='1'){
    	removeValue('verifyReal',false);
    	outPage();
    }else{
    	if(id==undefined) {
        	var opts = {"animate":"default"};
        	window.page.navigator.pop(opts);
    	} else {
            var opts = {"id":id,"animate":"default"};
      	    window.page.navigator.popToPage(opts);
    	}
    }
}
/*返回到该navigator下的第一页*/
function toTopPage() {
	var opts = {"animate":"default"};
	window.page.navigator.popToTop(opts);
}
/**
 *  打开一个子窗口并跳转到指定url
 *
 *  @param url    url
 *  @param width  窗体宽度
 *  @param height 窗体高度
 *
 *  @return
 */
function open(url, width, height) {
    window.open(url, width, height);
}


/**
 *  函数可以提交指定表单。
 *
 *  @param formid form表单ID
 *
 *  @return
 */
function submit(formid) {
    var element = document.getElementById(formid);
    element.submit();
}

/**
 *  发送网络请求
 *
 *  @param url url地址
 *
 *  @return
 */
function sendRequest(url) {
    var request = new Request();
    request.url = url;
    request.method = "get";
    window.lock();
    request.success = function (data) {
        window.unlock();

        alert(data);

//        var dic = jsonParser(data);
//        var result = dic['result']
//        var msg = dic['msg']
//        if(result == 'Y') {
//            alert(msg)
//        }

    }
    request.error = function (error) {
        alert("js error:" + error);
        window.unlock();

    }
    request.send();
}

function setFocus(id) {
    var element = document.getElementById(id);
    element.focus();
}

function closeKeyBoard() {
    window.closeKeyBoard();
}

/**
 *  保存数据到客户端的内存中/本地
 *
 *  @param key 要保存的key值
 *  @param value 要保存的value值。
 *  @param bFlag true为保存到本地，false为保存到内存中。
 *
 *  @return
 */
function saveValue(key, value, bFlag)
{
    window.saveValue(key, value, bFlag);
}

/**
 *  保存数据到客户端的内存中/本地
 *
 *  @param key 要保存的key值
 *  @param value 要保存的value值。
 *  @param bFlag true为保存到本地，false为保存到内存中。
 *
 *  @return
 */
function loadValue(key, bFlag)
{
    return window.loadValue(key, bFlag);
}

function mapNavigation(latitude, longitude, name)
{
    return window.mapNavigation(latitude, longitude, name);

}

function tel(phone)
{
    return window.tel(phone);
}

function alert(msg)
{
	var showFlag=loadValue('showFlag',false);
	if(isNull(showFlag)){
		if(isAndroidVersion()){
			return window.info(msg);
		}else{
			return window.alert(msg);
		}
	}else{
		removeValue('showFlag',false);
		showMsg=msg;
	}
}

function getfunction()
{

}
/**
 * 判断当前设备是否是Android系统
 * @returns
 */
function isAndroidVersion(){
	var version=system.version();
	if(version.indexOf('android')>-1 || version.indexOf('Android')>-1){
		return true;
	}else{
		return false;
	}
}
function openTradePwd(){
	open('tradePwd.tml','272','162');//'420','680'  '100%','100%' '272','122'
}
function openTradePwd2(){
//	open('tradePwd2.tml','272','162');//'420','680'  '100%','100%' '272','122'
    window.open('tradePwd3.tml','100%','100%','slideFromBottom');

}
/**
 * 被动登录页面
 * @returns
 */
function toOpenPage(){
	open('F_login2.tml','100%','100%');//'420','680'  '100%','100%'
}
function toLoginPage(){
	var opts = {"url":"login.xml", "animate":"default"}
    window.page.present(opts);
}

function present(url){
	var opts = {"url":url, "animate":"default"}
    window.page.present(opts);
}

function toRealNamePage(){
	var opts = {"url":"addBankcard.xml", "animate":"default"}
	window.page.present(opts);
}
/**
 * 让弹出的框架页面消失
 * @returns
 */
function outPage(){
	var opts = {"animate":"default"};
    window.page.dismiss(opts);
}
/**
 * 带两个按钮的弹出对话框 example： <button class="" onclick="confirm('确定退出吗','取消','确定','0','confirm')"/>
 * @param question	对话框提示内容
 * @param btn1Value	左下角按钮的值
 * @param btn2Value	右下角按钮的值
 * @param notification1	左下角按钮点击所发送的通知名(当通知名为0时仅关闭窗口)
 * @param notification2	右下角按钮点击所发送的通知名(当通知名为0时仅关闭窗口)
 * @returns
 */
//function confirm(question,btn1Value,btn2Value,notification1,notification2){
//	saveValue('question',question,false);
//	saveValue('btn1Value',btn1Value,false);
//	saveValue('btn2Value',btn2Value,false);
//	saveValue('notification1',notification1,false);
//	saveValue('notification2',notification2,false);
////	open('F_dialogue.tml','265','165');
//	open('dialogue.tml','272','122');
//}

//页面没有数据时插入背景图及文字方法
function insertFreePic(element,turn){
	var data='<div class="nodata0">'+
	'<div class="nodata2">'+
		'<button class="nodata_btn"/>'+
		'<label class="nodata_lab" value="页面没有数据"/>'+
	'</div>'+

'</div>';
	insertInnerTML(element,turn,data);
}
/**
 * 判断数值是否为空
 * @param str	判断的值
 * @returns
 */
function isNull(str) {
	if (str == "null" || str == null || typeof (str) == "undefined" || str == "undefined" || str == "") {
		return true;
	}
	return false;
}

/**
 * 移除saveValue存下的东西
 * @param key	关键字
 * @param bFlag	true或者false
 * @returns
 */
function removeValue(key, bFlag)
{
    return window.removeValue(key, bFlag);
}

/**
 * 中心展示所有界面的back方法
 * ‘centerTML’ 中心展示第一层界面存在，则back到中心展示界面
 * 不存在  back到home页
 * 也即 中心展示进入回到中心展示，首页进入回到首页
 */
function backToFirst(){
	if(loadValue('backPage',false) == 'home'){
		goto('F_home.tml');
	}
	else {
		window.backById('centerTML');
	}
}

function log(msg){
     console.print(msg);
}


/**
 * //禁用按钮 禁用时间2500毫秒
 * @param   id   按钮的id
 * @param
 * @return
 */
function forbdBtn(id){
    setAttribute(id,'disable','true');
    window.setTimeout(function(){
        setAttribute(id,'disable','false');
    },2500);
}

/**
 * //禁用按钮 禁用时间1000毫秒
 * @param   id   按钮的id
 * @param
 * @return
 */
function forbdButton(id){
    setAttribute(id,'disable','true');
    window.setTimeout(function(){
                      setAttribute(id,'disable','false');
                      },1000);
}

