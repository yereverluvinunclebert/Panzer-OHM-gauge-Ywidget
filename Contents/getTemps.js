// This is a JSCRIPT file to be run in Windows.
// It cannot be run directly in the Yahoo! Widget Engine.
// Instead, it should be run using a cscript command in a Widget Engine runCommand.
// For example:
// runCommand("cscript //Nologo C:/Users/g6auc/Desktop/updateOHM.js >C:/Users/g6auc/Desktop/output.txt");

function getTemps(){
    var strComputer = "."; // localhost
    var loc = new ActiveXObject("WbemScripting.SWbemLocator");
    var svc = loc.ConnectServer(strComputer, "root\\OpenHardwareMonitor");

    //coll = svc.ExecQuery("SELECT * FROM Sensor WHERE Name LIKE '%CPU Core%' AND SensorType = 'Temperature'");
    var coll = svc.ExecQuery("SELECT * FROM Sensor WHERE SensorType = 'Temperature'"); // reports data in wbemtest
    //coll = svc.ExecQuery("SELECT * FROM Sensor WHERE Identifier = '/nvidiagpu/0/temperature/0'");

    var items = new Enumerator(coll);
    var out = "[\r\n";

    function q(s) {
    	return "\"" + s + "\"";
    }

    function jsonObj(key0, val0, key1, val1, key2, val2, key3, val3) {
    //function jsonObj(key0, val0, key1, val1, key2, val2) {
     	var s = "{";
     	s += q(key0) + ":" + val0 + ",";
    	s += q(key1) + ":" + val1 + ",";
    	//s += q(key2) + ":" + val2;
    	s += q(key2) + ":" + val2 + ",";
    	s += q(key3) + ":" + val3;
     	s += "}";
    	return s;
    }

    while (!items.atEnd()) {
    	if (out.length > 3) {
    		out += ",\r\n";
    	}
        //out += jsonObj("name", q(items.item().Name), "value", items.item().Value, "max", items.item().Max);
        //out += jsonObj("name", q(items.item().Name), "value", items.item().Value, "max", items.item().Max, "identifier", items.item().Identifier);
        out += jsonObj("name", q(items.item().Name), "value", items.item().Value, "max", items.item().Max, "identifier", q(items.item().Identifier));
        items.moveNext();
    }
    
    WScript.Echo(out + "\r\n]\r\n");
}

getTemps();
