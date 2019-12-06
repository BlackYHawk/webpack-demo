
/**
 *  可以获取当前页面指定元素。
 *
 *  @param id 页面元素ID
 *
 *  @return
 */
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

/**
 *  获得当前页面指定元素的指定属性值
 *
 *  @param id             要设置的元素的id值
 *  @param attributeName  要设置的属性名
 *
 *  @return attributeValue 要设置的属性值
 */
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
 *  页面跳转
 *
 *  @return
 */
function segue(id) {
    window.segue(id);
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
 *  发送网络请求
 *
 *  @param url url地址
 *
 *  @return
 */
function sendRequest(url) {
    window.lock();

    var request = new Request();
    request.url = url;
    request.method = "post";
    request.success = function (data) {
        window.unlock();
        alert(data);
    }
    request.error = function (error) {
        window.unlock();
        alert("js error:" + error);
    }
    request.send();
}

/**
 *  关闭键盘
 *
 *  @return
 */
function closeKeyBoard() {
    window.closeKeyBoard();
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
 *  保存数据到客户端的内存中/本地
 *
 *  @param key 要保存的key值
 *  @param value 要保存的value值。
 *  @param bFlag true为保存到本地，false为保存到内存中。
 *
 *  @return
 */
function saveValue(key, value, bFlag) {
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
function loadValue(key, bFlag) {
    return window.loadValue(key, bFlag);
}

/**
 * 移除saveValue存下的东西
 * @param key	关键字
 * @param bFlag	true或者false
 * @returns
 */
function removeValue(key, bFlag) {
    return window.removeValue(key, bFlag);
}

/**
 *  弹提示
 *
 *  @return
 */
function alert(msg) {
	var showFlag=loadValue('showFlag',false);

	if(isNull(showFlag)){
		if(isAndroidVersion()){
			return window.info(msg);
		}else{
			return window.alert(msg);
		}
	}else{
		removeValue('showFlag',false);
	}
}

/**
 *  打印日志
 *
 *  @return
 */
function log(msg){
     console.print(msg);
}

/**
 * 判断当前设备是否是Android系统
 *
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

export {$, getValue, setValue, getAttribute, setAttribute, setStyle}