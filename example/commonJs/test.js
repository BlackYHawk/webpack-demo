  var location = new Location();
   location.success = function(latitude, longitude) {
   	     
   }
   location.start();

var map = $("mapview")

var t = "<div class=\"marker\"><label value=\"#title\" class=\"title\"></label><label class=\"detail\" value=\"#detail\"></label></div>"
map.setParam("marker",t);


var markers=[{"longitude":"120.177226","latitude":"30.277813","id":"1","type":"custom","data":{"title":"开源名都","detail":"￥1477起"}}, {"longitude":"120.178216","latitude":"30.277823","id":"2","type":"custom","data":{"title":"7天连锁","detail":"￥77起"}}, {"longitude":"120.179217","latitude":"30.277816","id":"3","type":"custom","data":{"title":"如家快捷","detail":"￥160起"}}]
map.setParam("data",markers);


map.addEventListener("markerClick",function(opt){
                     log(opt.latitude);
                     log(opt.longitude);
                     log(opt.address);
                     log(opt.id);
                     log(opt.address);
                     });