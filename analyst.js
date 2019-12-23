var fs = require('fs');
const path = require('path');
var libxmljs = require("libxmljs");

function analyst(path) {
    var mytml = fs.readFileSync(path);
    var xmlDoc = libxmljs.parseXml(mytml);

    var head = xmlDoc.get('head');
    var children = head.childNodes();


}

const cwd = process.cwd();
const pwd = `${cwd}/example`;

analyst(path.join(pwd, 'input/main.tml'));
