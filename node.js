const fs = require("fs");
const path = require('path');

//获取后缀名
function getdirAppendix(url){
    var arr = url.split('.');
    var len = arr.length;
    return arr[len-1];
}

//获取文件名
function getdirname(url){
    var arr = url.split('/');
    var len = arr.length;
    return arr[len-1];
}

//获取文件数组
function readFile(dirpath, fileArr){
    var files = fs.readdirSync(dirpath);

    files.forEach(function(filename){
        var filepath = path.join(dirpath, filename);
        var stats = fs.statSync(filepath);

        //文件
        if(stats.isFile()){
            if(getdirAppendix(filename) === 'tml'){
                fileArr.push(filepath);
            }
        } else if(stats.isDirectory()){
            readFile(filepath, fileArr);
        }
    });
}

function loadTmlPath(projectdir) {
    //读取文件存储数组
    var fileArr = [];

    readFile(projectdir, fileArr);

    fileArr.forEach(function (file) {
        var filedir = path.resolve(file, "..");
        var filename = getdirname(file);
        console.log("file dir:%s, name:%s", filedir, filename);
    });
}

const cwd = process.cwd();
const pwd = `${cwd}/example`;

loadTmlPath(pwd);
