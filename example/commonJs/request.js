/*
 * param.url:url
 * param.data:data
 * param.success:成功回调
 * param.error:失败回调
 * param.header:header头部
 * param.timeout:超时时间
 * param.ssl:ssl
 */
Request.post = function(param) {
    var request = new Request();
    request.method = 'post'
    request.url = param.url;

    if (param.timeout != undefined) {
        request.timeout = param.timeout;
    } else {
        request.timeout = 30 * 1000;
    }
    if (param.data != undefined) {
        request.data = param.data;
    }

    if (param.ssl != undefined) {
        request.ssl = param.ssl;
    }

    request.addHeader("Content-Type", "application/json; charset=UTF-8");
    request.addHeader("Accept", "application/json, text/javascript, */*; q=0.01");
    request.addHeader("Content-Encoding", "gzip");

    if (param.header != undefined) {
        for (var key in param.header) {
            var item = param.header[key];
            request.addHeader(key, item);
        }
    }

    request.success = function(data) {
        if (param.success != undefined) {
            var obj = eval('(' + data + ')');
            param.success(obj);
        }
    }
    request.error = function(error) {
        if (param.error != undefined) {
            param.error(error);
        }
    }

    request.send();
}