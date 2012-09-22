function loadFromAPI(offset) {
	console.log(offset);
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

function proccessAPI(data){
	console.log(data);
	for (var i = 0; i < data.length; i++) {
				
				pictureRetrieve(data[i]);
	};
	$('jsonReq').destroy();
}

function pictureRetrieve(device){
	var myJSONP = new Request.JSONP({
    	url: 'http://www.ifixit.com/api/0.1/device/' + device.device,
    	callbackKey: 'jsonp',
    	onRequest: function(url){
        	// a script tag is created with a src attribute equal to url
        	console.log(url);
    	},
    	onComplete: function(data){
    	    // the request was completed.
    	    console.log(data);
    	    console.log(data.image.text);
    	    if (data.image.text !== undefined){
    	    	addTo(device.device,data.image.text);
    		} else {
    			addTo(device.device,'http://www.ifixit.com/Misc/fist.png');
    		}
    	}
	}).send();
	/*var jsonIMGReq = new Element('script',{
		id : 'jsonIMG',
		src : 'http://ifixit.com/api/0.1/device/' + device + '?jsonp=imageURL'
	});

	$$(document.getElementsByTagName('head')).adopt(jsonIMGReq);*/
}