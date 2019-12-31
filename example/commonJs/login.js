
window.addNotification("UMPush", function(data){
	window.open("remoteNotification/remoteNotification.tml", "80%", "80%")
})




function login() {

var request=new Request();
request.url='http://中文111.75.223.93:7007/jxemmp/rmi北京.do?class中文Name=AppPortsServices&methodName=getCustDetial&params=[{custId:"36233019541119877010",Flag:"0"}]';
request.method="post";
request.success=function(data){
    alert(data);
}
request.error=function(data){
    alert(data);
}
request.send();
	
	return 
  var request = new Request();
 request.url = "http://10.25.0.56:8080/web1/login";
 request.method = "post";
 //request.addHeader("Content-Type", "application/json; charset=UTF-8");
 //request.addHeader("Accept", "application/json, text/javascript, */*; q=0.01");
 request.data = "{'info':'项 方    票'}";
 request.success = function(data){
    alert(data);
 };
 request.error = function(e){
    alert(e);
 };
 request.send();

/*	var a = document.createElement("input")
	a.setAttribute("value", "1234")
	a.setAttribute("class", "l")
	
	var content = document.getElementById('content');
	content.appendChild(a);*/
	
	//checkbox.setAttribute("value", "0")
}


function register() {
	goto("login.tml")
}
