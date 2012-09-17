window.addEvent('domready', function(){

	var offset = 20;
	var devices = [];
	var apiCall = 'http://www.ifixit.com/api/0.1/guides?offset=' + offset + 'limit=20'
	
	new Request.JSON({url: apiCall , onFailure: function(ob,txt) {
		alert('hi');
	
	Array.each(ob, function(device, index){
		alert(device);
	});
	
	}});
	
	
	//var devices = new Element(deviceList);
	//$('devices').adopt(devices);
	
});

