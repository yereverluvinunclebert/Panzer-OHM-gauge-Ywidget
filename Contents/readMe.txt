
If the widget does not get the temperatures run OHM, double click on the systray
icon and see if it is reporting any temperatures. If you can see temperatures
then it is doing its job.

If it still isn't getting the temperatures from OHM run this from an elevated 
powershell box:

Get-WmiObject -Query "SELECT * FROM __Namespace WHERE Name = 'OpenHardwareMonitor'" -Namespace "root" | Remove-WmiObject

Then reboot. It should then be able to talk to OHM via WMI.

This occurs as Windows performs dodgy upgrades and alters the permissions which
prevents OHM from writing to its own WMI namespace.