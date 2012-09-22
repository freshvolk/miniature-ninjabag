//Function takes in the number of items already loaded and loads the next 25
function loadFromAPI(offset) {
	var jsonReq = new Element('script',{
		id : 'jsonReq',
		src : 'http://www.ifixit.com/api/0.1/devices?offset=' + offset + '&limit=25&jsonp=proccessAPI'
	})
	$$(document.getElementsByTagName('head')).adopt(jsonReq);
	//Add Event to Load More button with correct new offset
	$('load').removeEvents();
	$('load').addEvent('click',function(){
		loadFromAPI(offset+25);
	})
}

//Callback function for JSONP request in loadFromAPI
function proccessAPI(data){
	for (var i = 0; i < data.length; i++) {
				//Go to pictureRetrieve next to get image
				pictureRetrieve(data[i]);
	};
	$('jsonReq').destroy();
}

//Retrieves the url to the picture based on the device name
function pictureRetrieve(device){
	var myJSONP = new Request.JSONP({
    	url: 'http://www.ifixit.com/api/0.1/device/' + device.device,
    	callbackKey: 'jsonp',
    	// onRequest: function(url){
     	//  // a script tag is created with a src attribute equal to url
     	//  console.log(url);
    	// },
    	onComplete: function(data){
    	    // the request was completed.
    	    //Check if image exists, if not placeholder
    	    if (data.image.text !== undefined){
    	    	addTo(device.device,data.image.text);
    		} else {
    			addTo(device.device,'http://www.ifixit.com/Misc/fist.png');
    		}
    	}
	}).send();
}