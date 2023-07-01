// runCscript(path, opath)
// This is a wrapper to be run in the Yahoo1 Widget Engine on Windows.
// Its function is to run JSCRIPTs using the Windows cscript command, such as:
// cscript //Nologo C:/Users/g6auc/Desktop/updateOHM.js >C:/Users/g6auc/Desktop/output.txt

/*property
    platform, substring
*/

"use strict";

function runJscript(path, opath) {
    // path: full path to a JSCRIPT file.
    // opath: full path to an output file (optional).
    // paths may start with an initial "~" to indicate the users HOME directory.
    var $HOME = "";
    var result;
    
    if (system.platform === "macintosh") {
        return "JSCRIPTs do not work on the Macintosh!";
    }
    
    if (path[0] === "~") {
        $HOME = runCommand("echo %userprofile%");	// was %systemdrive%%homepath%
        path = $HOME + path.substring(1);
    }
    path = "\"" + convertPathToPlatform(path) + "\"";
    
    if (opath) {
        if (opath[0] === "~") {
            opath = ($HOME || runCommand("echo %userprofile%")) + opath.substring(1);
        }
        opath = "\"" + convertPathToPlatform(opath) + "\"";
        result = runCommand("cscript //Nologo " + path + " >" + opath);
    } else {
        result = runCommand("cscript //Nologo " + path);
    }
    
    return result;
}

/*
// Test program follows
// var extPath = widget.extractFile("getTemps.js");
var eprint;
var output = runJscript("~/Desktop/getTemps.js", "~/Desktop/temps.json");
print("\"" + output + "\"");
*/
