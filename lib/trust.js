function setTrustedSites(ip) {
	var HKEY_CURRENT_USER = "HKCU";
	var HKEY_LOCAL_MACHINE = "HKLM";
	
	var ZonesValue_0 = 0, ZonesValue_1 = 1, ZonesValue_3 = 3;
	var regEdit;
	try 
	{
		regEdit = new ActiveXObject("WScript.Shell");
	} 
	catch (e) {
		return;
	}
	
	try 
	{
		setting();
		window.close();
	} 
	catch (e) 
	{
	}
	
	function setting() 
	{
		var REG_DWORD = "REG_DWORD", REG_SZ = "REG_SZ";
		
		var strFlags = "Flags";
		var Hkey_zones = "Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\Zones\\2";
		var ZonesFlagsValue = 67;
		regEdit.RegWrite(HKEY_CURRENT_USER + "\\" + Hkey_zones + "\\" + strFlags, ZonesFlagsValue, REG_DWORD);
		
		
		var Hkey_ranges = "Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Ranges\\Range";
		var RangeValue = 2;
		var strRange = ":Range";
		var strHttp = "http";
		if (location.href.indexOf("https") >= 0)
		{
			strHttp = "https";
		}
		var num = 1;
		
		var str = isOk(HKEY_CURRENT_USER + "\\" + Hkey_ranges);
		while(true)
		{
			var value = isOk(HKEY_CURRENT_USER + "\\" + Hkey_ranges + num + "\\" + strRange);
			if (!value || value == false)
			{
				regEdit.RegWrite(HKEY_CURRENT_USER + "\\" + Hkey_ranges + num + "\\", "", REG_SZ);
				regEdit.RegWrite(HKEY_CURRENT_USER + "\\" + Hkey_ranges + num + "\\" + strRange, ip, REG_SZ);
				regEdit.RegWrite(HKEY_CURRENT_USER + "\\" + Hkey_ranges + num + "\\" + strHttp, RangeValue, REG_DWORD);
				break;
			}
			else
			{
				var httpVal = isOk(HKEY_CURRENT_USER + "\\" + Hkey_ranges + num + "\\" + strHttp);
				if (value == ip)
				{
					if (!httpVal || httpVal == false)
					{
						regEdit.RegWrite(HKEY_CURRENT_USER + "\\" + Hkey_ranges + num + "\\" + strHttp, RangeValue, REG_DWORD);
						break;
					}
					else
					{
						break;
					}
				}
				num++;
			}
		}
		
	}
	
	function isOk(addr, strRange) 
	{
		try 
		{
			return regEdit.RegRead(addr);
		} 
		catch(e) 
		{
			return false;
		}
	}
}