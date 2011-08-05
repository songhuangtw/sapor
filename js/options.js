// Saves options to clientside DB
function save_options(close_tab) {
	//SAPor-ID
	var sapor_id   = document.getElementById("SAPor_ID");
	localStorage["SAPorPrefs_sapor_id"] = sapor_id.value;
	//SAPor-PW
	var sapor_pw   = document.getElementById("SAPor_PW");
	localStorage["SAPorPrefs_sapor_pw"] = sapor_pw.value;

	if (close_tab) {
		closeOptions(close_tab);
	}
}

// Restores select box state to saved value from DB
function restore_options() {
	//getting SAPor ID
	var sapor_id = document.getElementById("SAPor_ID");
	var value_id = localStorage["SAPorPrefs_sapor_id"];
	if(value_id != "undefined") {
		sapor_id.value = value_id;
	}
	//getting SAPor PW
	var sapor_pw = document.getElementById("SAPor_PW");
	var value_pw = localStorage["SAPorPrefs_sapor_pw"];
	if(value_pw != "undefined") {
		sapor_pw.value = value_pw;
	}
}

function closeOptions(text){
	chrome.tabs.getSelected(null, function(tab){
		chrome.tabs.remove(tab.id, function(){});
	});
}


