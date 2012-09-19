var devices = [{"device":" Game Boy colour","areas":[]},{"device":"04 1994 jeep grand cherokee install ign key cyl","areas":[]},{"device":"1959 Vespa 150","areas":[]},{"device":"1977 Columbia Commuter","areas":["Motorcycle"]},{"device":"1982-1988 Volvo 740","areas":[]},{"device":"1984-1988 Toyota Pickup","areas":["Toyota Automobile"]},{"device":"1984-1989 Toyota Pickup","areas":[]},{"device":"1984-1991 BMW 3-Series","areas":["BMW Automobile"]},{"device":"1985-1988 Volvo 740","areas":["Volvo Automobile"]},{"device":"1986-1993 Volvo 240","areas":["Volvo Automobile"]},{"device":"1987-1993 Kawasaki Ninja 500","areas":["Motorcycle"]},{"device":"1988-1991 Honda Civic","areas":["Honda Automobile"]},{"device":"1988-1994 Toyota Pickup","areas":[]},{"device":"1988-1998 Chevrolet Pickup","areas":["Chevrolet Automobile"]},{"device":"1988-1998 Chevy Pickup","areas":[]},{"device":"1988-1998 Chevy Silverado","areas":[]},{"device":"1989-1994 Mazda Protege","areas":[]},{"device":"1989-1994 Subaru Legacy","areas":["Subaru Automobile"]},{"device":"1989-1994 Toyota Pickup","areas":["Toyota Automobile"]},{"device":"1990 BMW 325i","areas":[]}];

var gear_bag = [];
var elements = 0;

window.addEvent('domready', function(){

	var page = 0
	var offset = 20*page;
	var apiCall = 'http://ifixit.com/api/0.1/devices?';
	var apiOpt = 'offset=' + offset + '&limit=20';
	
	/*
	var jsonreq = new Request.HTML({
		url: apiCall,
		onRequest: function(){
			console.log('Requesting page: ' + page);
		},
		onSuccess: function(tree, ele, html, js){
			console.log('Success');
			console.log(text);
	
			
		},
		onError: function(test, error) {
			console.log(error);
		},
		onFailure: function(xhr){
			console.log('Failed');
			console.log(xhr);
		}
	});
	
	jsonreq.post(apiOpt);
	*/
	loadMore(0);

});

function populate(list) {
	
	var deviceList = [];
	Array.each(list, function(dev){
		var temp = new Element('div', { 
		
			'class': 'device',
			
			html: dev.device
		})
		
		var tempFx = new Fx.Tween(temp);
		// temp.addEvent('mouseDown', function(){
			// tempFx.set('position','absolute');
			// });
		
		var drag = new Drag.Move(temp, {
		
			droppables: '#grab',
			
			onDrop: function(element, droppable, event){
				if (!droppable) console.log(element, ' dropped on nothing');
				else {
					console.log(element, 'dropped on', droppable);
					saveToHTML(element);
				}
			},
 
		    onEnter: function(element, droppable){
		        console.log(element, 'entered', droppable);
    		},
 
    		onLeave: function(element, droppable){
        		console.log(element, 'left', droppable);
    		}
		});
		deviceList.append([temp]);
	});
	//console.log(deviceList);
	$('devices').adopt(deviceList);
	
}

function loadMore(page) {
	//$('loadem').fade('out');
	//$('more').dispose();
	populate(devices);
	// $('devices').adopt(new Element('div', {
		// id: 'more',
		// html: 'Click me!',
		// events: {
			// click: loadMore(++page)
		// }
	// }));
}

function saveToHTML(element) {
	gear_bag.append([element.tween('height',25)]);
	element.destroy();
	$('grab').adopt(element.tween('width','90%'));
}