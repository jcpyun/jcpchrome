
    var xmltext =  "<h1><title>test</title></h1>",
	convertedXMLDoc = $.parseXML(xmltext),
	xml = $(convertedXMLDoc),
	titletag = xml.find("title");
	
console.log(titletag);

