"use strict";
var eprint;

var data = filesystem.readFile("/Users/nhw/Desktop/temps.json");
eprint(data);

/*
[
{"name":"GPU Core","value":0,"max":51},
{"name":"CPU Core #1","value":41,"max":60},
{"name":"CPU Core #2","value":43,"max":68},
{"name":"CPU Core #3","value":39,"max":58},
{"name":"CPU Core #4","value":41,"max":65},
{"name":"CPU Package","value":45,"max":68}
]
*/

var temps = JSON.parse(data);

temps.forEach(function (ele) {
	eprint(ele.name + ", " + ele.value + ", " + ele.max);
});


