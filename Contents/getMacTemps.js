// This is a JS file to be run in the Yahoo! Widget Engine on MacOS.

/*jslint multivar */

/*property
    forEach, length, match
*/

"use strict";

function getMacTemps() {
	var data = runCommand("/Applications/HardwareMonitor.app/Contents/MacOS/hwmonitor -c -q");
    var out = "[\r\n";

	var lookFor = [
		/^SMART\u0020Disk\u0020([\s\S]+?)\u0020\[TEMPERATURE\]\:\u0020(\d+)\u0020C$/m,
		/^SMC\u0020(CPU\u0020A\u0020PROXIMITY)\u0020\[TEMPERATURE\]\:\u0020(\d+)\u0020C$/m,
		/^SMC\u0020(GPU\u0020CHIP)\u0020TEMPERATURE\u0020\[TEMPERATURE\]\:\u0020(\d+)\u0020C$/m,
		/^SMC\u0020(MEMORY\u0020SLOTS)\u0020\[TEMPERATURE\]\:\u0020(\d+)\u0020C$/m,
		/^SMC\u0020(MLB\u0020TEMPERATURE)\u0020\[TEMPERATURE\]\:\u0020(\d+)\u0020C$/m,
		/^SMC\u0020(POWER\u0020SUPPLY\u0020T2\u0020HEATSINK)\u0020TEMPERATURE\u0020\[TEMPERATURE\]\:\u0020(\d+)\u0020C$/m
	];

    function q(s) {
    	return "\"" + s + "\"";
    }

    function jsonObj(key0, val0, key1, val1) {
    //function jsonObj(key0, val0, key1, val1, key2, val2) {
     	var s = "{";
     	s += q(key0) + ":" + val0 + ",";
    	s += q(key1) + ":" + val1;
     	s += "}";
    	return s;
    }

	lookFor.forEach(function (ele) {
    	var found, name, value;
    	
		found = data.match(ele);
		if (found !== null) {
    		if (out.length > 3) {
    			out += ",\r\n";
    		}
			name = found[1];
			value = found[2];
			out += jsonObj("name", q(name), "value", value);
		}
    });
    
    out += "\r\n]\r\n";
    return out;
}

/*	sample output
[
{"name":"APPLE HDD WDC WD10EALX-408EA0 (WD-WCATRA730311)","value":46},
{"name":"CPU A PROXIMITY","value":53},
{"name":"GPU CHIP","value":46},
{"name":"MEMORY SLOTS","value":46},
{"name":"MLB TEMPERATURE","value":41},
{"name":"POWER SUPPLY T2 HEATSINK","value":39}
]
*/
