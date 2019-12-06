import Temp from 'npmDemo'
import "./public.css"

var app = document.getElementById("app");
var tmp = new Temp();

app.insertInnerTML('down', tmp.dom);