/*
    Panzer OHM Widget

    Created by Dean Beedell

    Visuals added to and enhanced by Dean Beedell
    Sorted by Harry Whitfield

    email: dean.beedell@lightquick.co.uk
    http//lightquick.co.uk
*/

/*jslint for, multivar, this */

/*property
    MouseWheelPref, actionSwitchPref, alertPref, busy, charAt, clockSize,
    ctrlKey, data, duration, ease, endAngle, extractFile, floor, forEach,
    hOffset, hRegistrationPoint, hardwareMonitorLocationPref, height,
    identifier, indexOf, interval, isNaN, itemExists, kEaseOut, keyCode,
    length, max, maxLength, milliseconds, minLength, name, onKeyDown,
    onMouseDown, onMouseUp, onMouseWheel, onPreferencesChanged, onTimerFired,
    onWakeFromSleep, onload, opacity, parse, platform, random, readFile,
    rotation, round, sampleIntervalPref, scaleSwitchPref, scrollDelta, size,
    soundPref, src, srcHeight, srcWidth, start, startAngle, startTime, ticking,
    ticks, tooltip, vOffset, vRegistrationPoint, value, visible, width
*/

"use strict";

var mainWindow, background, surround, switchFacesButton, temperatureScaleText,
        tempDigitalMaxText, tempDigitalCurrText,
        hourHand, hourShadow, minuteHand, minuteShadow, pointer, pointerShadow,
        bigReflection, windowReflection,
        startButton, stopButton, pin, prefs, tankHelp, helpbutton, actionSwitch,
        createLicence, setmenu, theDLSdelta, lprint, smallMinuteHand,
        helpButton, showFace, mainScreen, settooltip, checkLockWidget,
        dangerLamp, OHMLamp, letterBack, sensorNumber, sensorNumberText, buildVitality,
        helpWindow, changePrefs, temperatureScaleTextArea, tempDigitalMaxTextArea,
        tempDigitalCurrTextArea, engineIdentifier, runJscript, getMacTemps;

var sensorNumberVar;
var windowx = 785, windowy = 622;
var backxo = 0, backyo = 0, backgroundxo = 7, backgroundyo = 0;
var surroundxo = 0, surroundyo = 0;
var switchFacesButtonxo = 710, switchFacesButtonyo = 267;
var dangerLampxo = 261, dangerLampyo = 295;
var OHMLampxo = 347, OHMLampyo = 295;
var letterBackxo = 385, letterBackyo = 120;
var sensorNumberxo = 395, sensorNumberyo = 120;

var sensorNumberTextxo = 425, sensorNumberTextyo = 177;
var engineIdentifierxo = 350, engineIdentifieryo = 270;

var startButtonxo = 710, startButtonyo = 135;
var stopButtonxo = 710, stopButtonyo = 395;
var secondxo = 416, secondyo = 313, secondxr = 11.5, secondyr = 245.5;
var pointerShadowxo = 416, pointerShadowyo = 313, pointerShadowxr = 22.5, pointerShadowyr = 260.5;

// macintosh
var tempDigitalCurrTextAreaxo = 486, tempDigitalCurrTextAreayo = 190;   // was 463, 190
var tempDigitalMaxTextAreaxo = 346, tempDigitalMaxTextAreayo = 190;     // was 323, 190
var temperatureScaleTextAreaxo = 536, temperatureScaleTextAreayo = 383; // was 513, 383

// windows
var tempDigitalCurrTextxo = 486, tempDigitalCurrTextyo = 210;           // was 473, 210
var tempDigitalMaxTextxo = 346, tempDigitalMaxTextyo = 210;             // was 333, 210
var temperatureScaleTextxo = 538, temperatureScaleTextyo = 403;         // was 523, 403

var shadowOffset = 0;
var bigReflectionxo = 169, bigReflectionyo = 69;
var windowReflectionxo = 511, windowReflectionyo = 210;
var pinxo = 162, pinyo = 60;
var prefsxo = 161, prefsyo = 516;
var helpButtonxo = 625, helpButtonyo = 516;
var actionSwitchxo = 625, actionSwitchyo = 59;
var vols = 0;
var volsCnt = 0;


var currIcon = "Resources/images/dock.png";
var widgetName = "Panzer OHM gauge Ywidget.widget";

var counter = "Resources/sounds/counter.mp3";
var lock = "Resources/sounds/lock.mp3";
var till = "Resources/sounds/till01.mp3";
var ting = "Resources/sounds/ting.mp3";
var mistake = "Resources/sounds/mistake.wav";
var thhhh = "Resources/sounds/thhhh.mp3";
var winding = "Resources/sounds/winding.mp3";
var konPath2 = "";
var OHM = false;
var cpuTemp = [], cpuName = [], cpuMax = [], cpuIdent = [];
var sensorCounter = 1;
var sensorCount = 0;

include("getMacTemps.js");
include("runJscript.js");
include("json2.js");
include("functions.js");
include("Resources/Licence/licence.js");

Number.isNaN = Number.isNaN || function (value) {       // polyfill
    return value !== value;
};

//===============================================================
// this function does the actual resizing
//===============================================================
function sizeClock() {
    var scale = Number(preferences.clockSize.value) / 100;

    function sc(img, hOffset, vOffset, hReg, vReg) {
        img.hOffset = Math.round(hOffset * scale);
        img.vOffset = Math.round(vOffset * scale);
        img.width = Math.round(img.srcWidth * scale);
        img.height = Math.round(img.srcHeight * scale);
        if (hReg !== undefined) {
            img.hRegistrationPoint = Math.round(hReg * scale);
        }
        if (vReg !== undefined) {
            img.vRegistrationPoint = Math.round(vReg * scale);
        }
    }

    mainWindow.width = Math.round(windowx * scale);
    mainWindow.height = Math.round(windowy * scale);

    sc(background, backgroundxo, backgroundyo);
    sc(surround, surroundxo, surroundyo);
    sc(switchFacesButton, switchFacesButtonxo, switchFacesButtonyo);
    sc(dangerLamp, dangerLampxo, dangerLampyo);
    sc(OHMLamp, OHMLampxo, OHMLampyo);
    sc(letterBack, letterBackxo, letterBackyo);
    sc(sensorNumber, sensorNumberxo, sensorNumberyo);
    sc(startButton, startButtonxo, startButtonyo);
    sc(stopButton, stopButtonxo, stopButtonyo);
    sc(pointer, secondxo, secondyo, secondxr, secondyr);
    sc(pointerShadow, pointerShadowxo + shadowOffset, pointerShadowyo + shadowOffset, pointerShadowxr, pointerShadowyr);

    sc(bigReflection, bigReflectionxo, bigReflectionyo);
    sc(windowReflection, windowReflectionxo, windowReflectionyo);
    sc(pin, pinxo, pinyo);
    sc(prefs, prefsxo, prefsyo);

    sc(helpButton, helpButtonxo, helpButtonyo);
    sc(actionSwitch, actionSwitchxo, actionSwitchyo);

    temperatureScaleTextArea.size = Math.round(23 * scale);
    temperatureScaleTextArea.hOffset = Math.round(temperatureScaleTextAreaxo * scale);
    temperatureScaleTextArea.vOffset = Math.round(temperatureScaleTextAreayo * scale);
    tempDigitalMaxTextArea.size = Math.round(23 * scale);
    tempDigitalMaxTextArea.hOffset = Math.round(tempDigitalMaxTextAreaxo * scale);
    tempDigitalMaxTextArea.vOffset = Math.round(tempDigitalMaxTextAreayo * scale);
    tempDigitalCurrTextArea.size = Math.round(23 * scale);
    tempDigitalCurrTextArea.hOffset = Math.round(tempDigitalCurrTextAreaxo * scale);
    tempDigitalCurrTextArea.vOffset = Math.round(tempDigitalCurrTextAreayo * scale);

    temperatureScaleText.size = Math.round(23 * scale);
    temperatureScaleText.hOffset = Math.round(temperatureScaleTextxo * scale);
    temperatureScaleText.vOffset = Math.round(temperatureScaleTextyo * scale);
    tempDigitalMaxText.size = Math.round(23 * scale);
    tempDigitalMaxText.hOffset = Math.round(tempDigitalMaxTextxo * scale);
    tempDigitalMaxText.vOffset = Math.round(tempDigitalMaxTextyo * scale);
    tempDigitalCurrText.size = Math.round(23 * scale);
    tempDigitalCurrText.hOffset = Math.round(tempDigitalCurrTextxo * scale);
    tempDigitalCurrText.vOffset = Math.round(tempDigitalCurrTextyo * scale);

    sensorNumberText.size = Math.round(9 * scale);
    sensorNumberText.hOffset = Math.round(sensorNumberTextxo * scale);
    sensorNumberText.vOffset = Math.round(sensorNumberTextyo * scale);

    engineIdentifier.size = Math.round(9 * scale);
    engineIdentifier.hOffset = Math.round(engineIdentifierxo * scale);
    engineIdentifier.vOffset = Math.round(engineIdentifieryo * scale);
}
//=====================
//End function
//=====================

//=====================
// ths function
//=====================
function isExeRunning(appname) {
    var result = runCommand("tasklist /FI \"IMAGENAME eq " + appname + "\"");
    return result.indexOf(appname) !== -1;
}
//=====================
//End function
//=====================


//=====================
// ths function
//=====================
function convert(t) {
    // convert temps from C to F values here to match scale setting
    if (preferences.scaleSwitchPref.value === "fahrenheit") {
        return Math.round(1.8 * t + 32);
    }
    return t;
}
//=====================
//End function
//=====================

//=====================
//
//=====================
function showDigitalValues() {
    tempDigitalCurrTextArea.data = convert(cpuTemp[sensorCounter]);
    tempDigitalMaxTextArea.data = convert(cpuMax[sensorCounter]) || "00";
    tempDigitalCurrText.data = convert(cpuTemp[sensorCounter]);
    tempDigitalMaxText.data = convert(cpuMax[sensorCounter]) || "00";
}
//=====================
//End function
//=====================

//===============================================================
// this function is called by the main timer and does the gauge work
//===============================================================
function updateTemperature() {
    var path, opath, data, temps, a = 0;

    rotateObject = function (obj, value) {
        var animationDuration,
            animationInterval = 60,

            updateMe = function () {    // called during rotateAnimation
                var now = animator.milliseconds, fraction, angle;

                if (now >= (this.startTime + this.duration)) {
                    obj.rotation = this.endAngle;
                    obj.busy = false;
                    return false;
                }
                fraction = (now - this.startTime) / this.duration;
                angle = animator.ease(this.startAngle, this.endAngle, fraction, animator.kEaseOut);
                obj.rotation = angle;
                return true;
            },

            rotateAnimation = function (startAngle, endAngle) {
                var rotate = new CustomAnimation(animationInterval, updateMe);
                rotate.duration = animationDuration;
                rotate.startAngle = startAngle;
                rotate.endAngle = endAngle;
                animator.start(rotate);
            };

        obj.busy = true;
        animationDuration = animationInterval * Math.floor(900 / animationInterval - 1);
        rotateAnimation(obj.rotation, value);
    };

    suppressUpdates;
    
    if (system.platform === "windows") {
        // we have to clarify the path and eventually extract them from the widget to the widget data folder
        path = widget.extractFile("getTemps.js");
        opath = widget.extractFile("temps.json");

        // development folder
        //path = "E:/dean/steampunk theme/Panzer OHM gauge Ywidget/Contents/getTemps.js";
        //opath = "E:/dean/steampunk theme/Panzer OHM gauge Ywidget/Contents/temps.json";
        //system.widgetDataFolder

        //at this point we run the Jscript to extract WMI data and enumerate it as only Jscript can do...
        //The Jscript contains specific code that will not run in javascript due to the absence of the Enumerator object
        runJscript(path, opath);

        //now we read the output from the Jscript output
        data = filesystem.readFile(opath);
        print(">>>>>>" + data);
    } else {
        data = getMacTemps();
    }

    temps = JSON.parse(data);
    temps.forEach(function (ele) {
        //print(ele.name + ", " + ele.value + ", " + ele.max);
        a = a + 1;
        cpuTemp[a] = ele.value;
        cpuName[a] = ele.name;
        cpuMax[a] = ele.max;
        cpuIdent[a] = ele.identifier;
        //print(">> "+ cpuName[a] + " " +cpuTemp[a]);
    });

    resumeUpdates;

    sensorCount = a;
    showDigitalValues();
    sensorNumberText.data = String(sensorCounter);  // 0,1,2,3 etc

    sensorNumber.opacity = 255;     // hw

    if (preferences.actionSwitchPref.value === "tick") {
        pointer.rotation = (cpuTemp[sensorCounter] * 3) + 30;
        pointerShadow.rotation = pointer.rotation;
    } else {
        // zero pointer smoothly
        rotateObject(pointer, (cpuTemp[sensorCounter] * 3) + 30);
        rotateObject(pointerShadow, (cpuTemp[sensorCounter] * 3) + 30);
    }

    if (cpuTemp[sensorCounter] > 90) {
        dangerLamp.src = "Resources/images/red-lamptrue.png";
    } else {
        dangerLamp.src = "Resources/images/green-lamptrue.png";
    }
   
    buildVitality(currIcon, String(convert(cpuTemp[sensorCounter])), preferences.scaleSwitchPref.value); // build the dock vitality
}
//=====================
//End function
//=====================


//======================================================================================
// Function to make text areas visible rather than text objects
//======================================================================================
function setTextAreas() {
    if (system.platform === "macintosh") {
        temperatureScaleTextArea.visible = true;
        tempDigitalMaxTextArea.visible = true;
        tempDigitalCurrTextArea.visible = true;
    } else {
        temperatureScaleText.visible = true;
        tempDigitalMaxText.visible = true;
        tempDigitalCurrText.visible = true;
    }
}
//=====================
//End function
//=====================

//=================================
// initialise the main timer loop
//=================================
var temperatureTimer = new Timer();
temperatureTimer.ticking = true;
temperatureTimer.interval = preferences.sampleIntervalPref.value;
//=================================
// timer ends
//=================================

//=================================
// initialise the main timer loop
//=================================
var OHMTimer = new Timer();
OHMTimer.ticking = true;
OHMTimer.interval = preferences.sampleIntervalPref.value;
//=================================
// timer ends
//=================================

//===============================================================
// general utility functions on graphic objects
//===============================================================
startButton.onMouseUp = function () {
    this.opacity = 255;
    reloadWidget();
};

prefs.onMouseDown = function () {
    prefs.src = "Resources/images/prefs02.png";
};


prefs.onMouseUp = function () {
    prefs.src = "Resources/images/prefs01.png";
    if (preferences.soundPref.value !== "disabled") {
        play(winding, false);
    }
    showWidgetPreferences();
};

helpButton.onMouseDown = function () {
    helpButton.opacity = 255;
};

function tankHelpShow() {
    helpWindow.visible = true;
    if (preferences.soundPref.value !== "disabled") {
        play(till, false);
    }
}

helpButton.onMouseUp = function () {
    helpButton.opacity = 1;
    tankHelpShow();
};

tankHelp.onMouseDown = function () {
    helpWindow.visible = false;
    if (preferences.soundPref.value !== "disabled") {
        play(ting, false);
    }
};


stopButton.onMouseDown = function () {
    this.opacity = 10;
    temperatureTimer.ticking = false;
    pointer.visible = false;
    pointerShadow.visible = false;
};

stopButton.onMouseUp = function () {
    this.opacity = 255;
};
//=====================
//End functions
//=====================

//=================================
// resizing on mouse scroll wheel combined with a CTRL key just as browsers
//=================================
background.onMouseWheel = function (event) {
    var size = Number(preferences.clockSize.value),
        maxLength = Number(preferences.clockSize.maxLength),
        minLength = Number(preferences.clockSize.minLength),
        ticks = Number(preferences.clockSize.ticks),
        step = Math.round((maxLength - minLength) / (ticks - 1));

    if (event.ctrlKey) {
        if (event.scrollDelta > 0) {
            if (preferences.MouseWheelPref.value === "up") {
                size -= step;
                if (size < minLength) {
                    size = minLength;
                }
            } else {
                size += step;
                if (size > maxLength) {
                    size = maxLength;
                }
            }
        } else if (event.scrollDelta < 0) {
            if (preferences.MouseWheelPref.value === "up") {
                size += step;
                if (size > maxLength) {
                    size = maxLength;
                }
            } else {
                size -= step;
                if (size < minLength) {
                    size = minLength;
                }
            }
        }
        preferences.clockSize.value = String(size);
        sizeClock();
    }
};
//=====================
//End function
//=====================

//=================================
// main timer loop
//=================================
temperatureTimer.onTimerFired = function () {  
    temperatureTimer.interval=preferences.sampleIntervalPref.value;
    updateTemperature();
};
//=====================
//End function
//=====================

//=================================
// OHM timer checks
//=================================
function checkBinary() {
      // OHM present or not
    if (preferences.hardwareMonitorLocationPref.value === "") {
        alert("Please open the preferences (right click) and enter the location of the Hardware Monitor.");
    }
}
//=====================
//End function
//=====================

//=================================
// OHM software checks
//=================================
function checkOHM() {
    var OHM2;

      // OHM working or not
    if (system.platform === "windows") {
        //I have found both to be unreliable returning spurious absence
        OHM = isExeRunning("OpenHardwareMonitor.exe");  // returns true or false
        OHM2 = isApplicationRunning("OpenHardwareMonitor.exe");  // returns true or false
    } else {
        OHM = filesystem.itemExists("/Applications/HardwareMonitor.app/Contents/MacOS/hwmonitor");
    }

    if (OHM) {
        OHMLamp.src = "Resources/images/green-lamptrue.png";
    } else {
        OHMLamp.src = "Resources/images/red-lamptrue.png";
        if (!OHM && !OHM2 && preferences.alertPref.value === "alert") {  //check the results of both tests before an alert
            play(mistake, false);
            if (system.platform === "windows") {
                alert("Please start the Open Hardware Monitor.");
            } else {
                alert("Please install the Hardware Monitor application.");
            }
        }
    }


}
//=====================
//End function
//=====================

//=================================
// OHM timer loop
//=================================
OHMTimer.onTimerFired = function () {
    checkOHM();
};
//=====================
//End function
//=====================

//===============================================================
// this function captures a sensor letter click
//===============================================================
function checkScale() {
    if (preferences.scaleSwitchPref.value === "fahrenheit") {
        background.src = "Resources/images/background-fahrenheit.png";
        temperatureScaleTextArea.data = "F";
        temperatureScaleText.data = "F";
    } else {
        background.src = "Resources/images/background-centigrade.png";
        temperatureScaleTextArea.data = "C";
        temperatureScaleText.data = "C";
    }
//  updateTemperature();
    buildVitality(currIcon, String(convert(cpuTemp[sensorCounter])), preferences.scaleSwitchPref.value); // build the dock vitality
}
//=====================
//End function
//=====================

//=====================
//
//=====================
function setValTooltips() {
    sensorNumber.tooltip = "Sensor no. " + sensorCounter + " (" + cpuName[sensorCounter];
    if (cpuName[sensorCounter] === "Temperature") {
        sensorNumber.tooltip += cpuIdent[sensorCounter];
    }
    sensorNumber.tooltip += ") - click to select next";
    letterBack.tooltip = sensorNumber.tooltip;
    tempDigitalMaxTextArea.tooltip = cpuName[sensorCounter];
    tempDigitalMaxText.tooltip = cpuName[sensorCounter];

    sensorNumber.tooltip = sensorNumber.tooltip;
}
//=====================
//End function
//=====================

//===============================================================
// this function is the main start point
//===============================================================
function startup() {
    debugFlg = preferences.debugflgPref.value;
    if (debugFlg === "1") {
		preferences.imageEditPref.hidden=false;
		preferences.imageCmdPref.hidden=false;
	} else {
		preferences.imageEditPref.hidden=true;		
		preferences.imageCmdPref.hidden=true;
	}
    checkBinary();
    sizeClock();
    setTextAreas();
    mainScreen();
    checkScale();
    createLicence(mainWindow);
    checkOHM();
    temperatureTimer.interval = 2;
    //updateTemperature();
    setValTooltips();
    setmenu();
    settooltip();
    checkLockWidget();
    buildVitality(currIcon, String(convert(cpuTemp[sensorCounter])), preferences.scaleSwitchPref.value); // build the dock vitality
}
//=====================
//End function
//=====================

//===============================================================
// this function is called when the widget loads
//===============================================================
widget.onload = function () {
    startup();
};
//=====================
//End function
//=====================

//===============================================================
// this function is called when the widget prefs are changed
//===============================================================
widget.onPreferencesChanged = function () {
    changePrefs();
    startup();
};
//=====================
//End function
//=====================

//===============================================================
// this function is called when the widget wakes up
//===============================================================
widget.onWakeFromSleep = function () {
    updateTemperature();
};
//=====================
//End function
//=====================

//===============================================================
// this function defines the keyboard events captured
//===============================================================
mainWindow.onKeyDown = function (event) {
    if (event.keyCode === 116) {        //F5
        print("pressing " + event.keyCode);
        reloadWidget();
    }
};
//=====================
//End function
//=====================

//===============================================================
// this function matches the Xwidget's middle button drive selection
//===============================================================
switchFacesButton.onMouseDown = function () {
    if (preferences.scaleSwitchPref.value === "fahrenheit") {
        preferences.scaleSwitchPref.value = "centigrade";
        background.src = "Resources/images/background-centigrade.png";
        temperatureScaleTextArea.data = "C";
        temperatureScaleText.data = "C";
    } else {
        preferences.scaleSwitchPref.value = "fahrenheit";
        background.src = "Resources/images/background-fahrenheit.png";
        temperatureScaleTextArea.data = "F";
        temperatureScaleText.data = "F";
    }
    if (preferences.soundPref.value !== "disabled") {
        play(ting, false);
    }
    showDigitalValues();
    //updateTemperature();

    buildVitality(currIcon, String(convert(cpuTemp[sensorCounter])), preferences.scaleSwitchPref.value); // build the dock vitality
};
//=====================
//End function
//=====================

//===============================================================
// this function captures a drive letter click
//===============================================================
letterBack.onMouseDown = function () {
    //print("sensorCounter "+ sensorCounter);
    sensorCounter = sensorCounter + 1;
    if (sensorCounter > sensorCount) {
        sensorCounter = 1;
    }

    if (filesystem.itemExists("Resources/images/" + sensorCounter + "-image.png")) {
        sensorNumber.src = "Resources/images/" + sensorCounter + "-image.png";      // hw
    } else {
        sensorNumber.src = "Resources/images/mark-image.png";      // hw
    }

    if (preferences.soundPref.value !== "disabled") {
        play(till, false);
    }
    setValTooltips();
    temperatureTimer.interval = 2;
    //updateTemperature();
};
//=====================
//End function
//=====================


//=====================
// ths function reacts to a mouse wheel on the drive selecter
//=====================
letterBack.onMouseWheel = function (event) {
    if (event.ctrlKey) {
        return;      // if the ctrl key is pressed then assume the user is trying to resize
    }
      
    if ((system.platform === "windows") && (preferences.soundPref.value !== "disabled")) {
        play(till, false);
    }
    print("sensorCounter " + sensorCounter);
      
    if (event.scrollDelta > 0) {
        sensorCounter = sensorCounter + 1;
        if (sensorCounter > sensorCount) {
            sensorCounter = 1;
        }
        //updateTemperature();
    } else if (event.scrollDelta < 0) {
        sensorCounter = sensorCounter - 1;
        if (sensorCounter < 1) {
            sensorCounter = sensorCount;
        }
        //updateTemperature();
    }
    if (filesystem.itemExists("Resources/images/" + sensorCounter + "-image.png")) {
        sensorNumber.src = "Resources/images/" + sensorCounter + "-image.png";
    } else {
        sensorNumber.src = "Resources/images/mark-image.png";
    }
    setValTooltips();
};
//=====================
//End function
//=====================




//===============================================================
// this function fires the main event on a double click
//===============================================================
background.onMultiClick = function() {
	if (preferences.soundPref.value !== "disabled") {
		play(ting, false);
	}
	temperatureTimer.interval = 1;
        //updateTemperature();
};
//=====================
//End function
//=====================


//===============================================================
// this function fires the main event on a double click
//===============================================================
background.onMultiClick = function(event) {
	if (preferences.soundPref.value !== "disabled") {
		play(ting, false);
	}
	
	if (event.ctrlKey) {
        print("updating the display");
        updateTemperature();
    } else {
        if (preferences.imageCmdPref.value === "" && system.platform === "macintosh") {
        	preferences.imageCmdPref.value = "/Applications/Utilities/Activity Monitor.app";
        }
        if (preferences.imageCmdPref.value === "" && system.platform === "windows") {
        	preferences.imageCmdPref.value = "%SystemRoot%/system32/perfmon.exe";
        }
    	performCommand("click");
    }
};
//=====================
//End function
//=====================