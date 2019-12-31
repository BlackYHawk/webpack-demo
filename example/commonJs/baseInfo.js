
 document.addEventListener("load",function(){
	 var request = new Request();
	 request.url = "http://192.168.88.148:8080/web1/Info";
	 request.method = "post";
	 request.success = function(data){
	    alert(data);
	     setValue("phone", data.phone)
	 };
	 request.error = function(e){
	    alert(e);
	 };
	 request.send();

 });