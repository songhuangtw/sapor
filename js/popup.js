function click() {
	var cmd  = document.getElementById("cmd").value;
	var sign;
	var mode = "currtab";
	var sapurl;
	var tabId = 0;

	sign = cmd.substr(0,2);
	if(sign == "/o" || sign == "/O") {
		mode   = "newtab";
		sapurl = cmd.substr(2, 5);
		if(sapurl != "http:" && sapurl != "https") {
			sapurl = "http://" + cmd.substr(2, 100);
		}
		else {
			sapurl = cmd.substr(2, 100);
		}
	}
	else if(sign == "/n" || sign == "/N") {
		sapurl = cmd.substr(2, 5);
		if(sapurl != "http:" && sapurl != "https") {
			sapurl = "http://" + cmd.substr(2, 100);
		}
		else {
			sapurl = cmd.substr(2,100);
		}
	}
	else if(sign == "/h" || sign == "/H") {
		mode   = "newtab";
		searchterm = cmd.substr(2, 100);
		if(isNaN(searchterm)) {
			origurl = "https://websmp103.sap-ag.de/~form/handler?_APP=01100107900000000342&_EVENT=REDIR&_NUM=&00200682500000004914=E" + 
				 "&00200682500000004876=" + searchterm + "&00200682500000004915=AND&00200682500000004916=ALL&00200682500000005447=L" + 
				 "&SEARCH_AREA=&00200682500000005040=NO_RESTRICTION&00200682500000004918=10&_APP=00200682500000001952" + 
				 "&_EVENT=RESULT&00200682500000004875=&00200682500000004932=1&00200682500000004919=0&00200682500000005464=TRUE" + 
				 "&00200682500000005466=TRUE&00200682500000005465=TRUE&00200682500000005467=FALSE&00200682500000005468=FALSE" + 
				 "&00200682500000005462=&00200682500000005463=&00200682500000002804=&00200682500000002805=&00200682500000002076=" + 
				 "&00200682500000000719=OW2&00200682500000002070=&00200682500000004920=&00200682500000004877=" + 
				 "&00200682500000004878=00&00200682500000004879=&00200682500000005448=NO&00200682500000001280=" + 
				 "&00200682500000001274=&00200682500000001276=&01100107900000000030=&00200682500000005063=NO_RES&TEMP_SEARCH=" + 
				 "&NAMESPACE_SEARCH=NO_SEA&DEFAULT_SEARCH=";
		}
		else {
//			origurl = "https://websmp130.sap-ag.de/~form/handler?_APP=01100107900000000342&_EVENT=REDIR&_NNUM=" + searchterm;
			origurl = "https://websmp130.sap-ag.de/sap(bD16aCZjPTAwMQ==)/bc/bsp/spn/sapnotes/index2.htm?numm=" + searchterm;
		}
		sapor_id = localStorage["SAPorPrefs_sapor_id"];
		sapor_pw = localStorage["SAPorPrefs_sapor_pw"];
		if(sapor_id != "undifined") { 
			sapurl = origurl.substr(0, 8) + sapor_id + ":" + sapor_pw + "@" + origurl.substr(8, 1500);
		}
		else {
			sapurl = origurl;
		}
	}
	else {
		sapurl = cmd.substr(2, 5);
		if(sapurl != "http:" && sapurl != "https") {
			sapurl = "http://" + cmd;
		}
		else {
			sapurl = cmd;
		}
	}
	if(mode == "currtab") {
		chrome.extension.sendRequest({value:"currtab",url:sapurl});
	}
	else {
		chrome.extension.sendRequest({value:"newtab",url:sapurl});
	}
	addcmd(cmd);
	window.close();
}

function addcmd(cmd) {
	if(cmd != "") {
		for(var i = 20; i > 0; i--) {
			if( i == 1 ) { 
				localStorage["cmd1"] = cmd;
			}
			else {
				localStorage["cmd" + i] = localStorage["cmd" + ( i - 1 )];
			};
		}
	}
}

function cmdhistory() {
	var data = new Array();
	for(var i = 1; i < 21; i++) {
		data.push(localStorage["cmd" + i]);
	}
	$("#cmd").autocomplete(data, {matchContains: true});
}

function cmdlist() {
	var data = new Array();
	for(var i = 1; i < 21; i++) {
		data.push(localStorage["cmd" + i]);
	}
	$("#cmd").result(function(event, data, formatted) {
		$("#result").html( !data ? "No match!" : "Selected: " + formatted);
	});
}

function handler () {
	redirurl = this.getAllResponseHeaders();
}
		

