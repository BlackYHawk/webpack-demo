import Temp from 'npmDemo'
import {utils, request, tools} from 'tools'
import "../css/public.css"

var app = document.getElementById("app");
var tmp = new Temp();

app.insertInnerTML('down', tmp.dom);


utils();

var params = {
    url:'',
    data:''
}
request(params);

tools.$('down');