const fs = require('fs');
const path = require('path');
var xml2js = require("xml2js");

function analyst(path, callback) {
    var mytml = fs.readFileSync(path);
    xml2js.parseString(mytml, function (err, result) {
        console.log(JSON.stringify(result));
        var json = result;
        var src = "";
        var head = json.tml.head;

        if (head !== undefined && head.length > 0) {
            if (head[0].script !== undefined) {
                var script = head[0].script;
                var attr = script[0];

                if (attr.$ !== undefined) {
                    src = attr.$.src;
                }
                script.splice(0, 1);
            }
        }
        console.log("script:%s", src);
        // create a new builder object and then convert
        // our json back to xml.
        var builder = new xml2js.Builder({headless:'true'});
        var xml = builder.buildObject(json);
        xml = xml.replace('<head/>', '<head></head>');
        var temppath = path + ".temp";

        fs.writeFile(temppath, xml, function(err, data) {
            if ((callback != null) && typeof callback === "function") {
                callback(err, temppath, src);
            }
        });
    });
}

const cwd = process.cwd();
const pwd = `${cwd}/example`;

analyst(path.join(pwd, 'input/main.tml'), function (err, data) {

});
