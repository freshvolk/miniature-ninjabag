var dude = 12;

window.addEvent('domready', function(){

	loadFromDB();

});

function loadFromDB(){
	gearDB.findA('gear',addDevices);
}

/*  This function adds devices from the intially loaded DB,
	and places them in the correct section, either the devicelist
	or the bag */	
function addDevices(transaction,result){
	var toAdd = []
	var bag = $('bag');
	if (result === undefined) {
		loadFromAPI(0);
	} else {
		for (var i = result.rows.length - 1; i >= 0; i--){

				//deleteMe is a 
				if (result.rows.item(i).in_bag === 'true'){
					if (bag.contains($('deleteMe'))){
						$('deleteMe').dispose();
					}
					bag.adopt(createList(result.rows.item(i)));
				} else {
					toAdd.append([createDevice(result.rows.item(i))]);
				}
		}
		$('devices').adopt(toAdd);
		loadFromAPI(result.rows.length);
	}
}

function loadFromAPI(offset) {
	console.log(offset);
	var jsonReq = new Request.JSON({
		url: 'http://www.ifixit.com/api/0.1/devices?',
		onComplete: function(dat){
			//Temp data...JSON req still failing for unknown reason
			var data = [{"device":" Game Boy colour","areas":[]},{"device":"04 1994 jeep grand cherokee install ign key cyl","areas":[]},{"device":"1959 Vespa 150","areas":[]},{"device":"1977 Columbia Commuter","areas":["Motorcycle"]},{"device":"1982-1988 Volvo 740","areas":[]},{"device":"1984-1988 Toyota Pickup","areas":["Toyota Automobile"]},{"device":"1984-1989 Toyota Pickup","areas":[]},{"device":"1984-1991 BMW 3-Series","areas":["BMW Automobile"]},{"device":"1985-1988 Volvo 740","areas":["Volvo Automobile"]},{"device":"1986-1993 Volvo 240","areas":["Volvo Automobile"]},{"device":"1987-1993 Kawasaki Ninja 500","areas":["Motorcycle"]},{"device":"1988-1991 Honda Civic","areas":["Honda Automobile"]},{"device":"1988-1994 Toyota Pickup","areas":[]},{"device":"1988-1998 Chevrolet Pickup","areas":["Chevrolet Automobile"]},{"device":"1988-1998 Chevy Pickup","areas":[]},{"device":"1988-1998 Chevy Silverado","areas":[]},{"device":"1989-1994 Mazda Protege","areas":[]},{"device":"1989-1994 Subaru Legacy","areas":["Subaru Automobile"]},{"device":"1989-1994 Toyota Pickup","areas":["Toyota Automobile"]},{"device":"1990 BMW 325i","areas":[]}]
			
			for (var i = 0; i < data.length; i++) {
				addTo(data[i].device);
			};
		} 
	});
	jsonReq.get({'offset' : offset, 'limit' : 25});
	//Add Event to Load More button with correct new offset
}

function addToDeviceList(data){
	//Somehow this is always the last object in the data array....wtf mate
	$('devices').adopt(createDevice(data));

}

function addToBag(el){
	console.log(el);\
	$('bag').adopt(el);
	if (bag.contains($('deleteMe'))){
		$('deleteMe').dispose();
	}

}

function createList(data){
	return new Element('div',{
		'class' : 'item',
		html : "<img class='item' src='" + data.device_pic + "'/><span>" + data.device + "</span>",
		events: {
			mousedown: function(event){
				console.log('mousedown')
				event.stop();

				var devic = this;

				var clone = devic.clone().setStyles(devic.getCoordinates()).setStyles({
					opacity: .7,
					position : 'absolute'
				}).inject($('app'));

				var drag = new Drag.Move(clone, {
					droppables: $('trash'),

					onDrop: function(dragging,bag,event){
						if (!bag) {
							console.log(dragging + " dropped on nada");
							dragging.destroy();
						} else {
							dragging.destroy();
							gearDB.update('gear',{'in_bag':false},data, function(tr,res){
								alert(data.device + " deleted from bag");
								devic.destroy();
							});
						}
					},

					onEnter: function(dragging,target){
						//Meh

					},

					onCancel: function(dragging){
						dragging.destroy();
					}
				});
				drag.start(event);
			}
		}
	});
}

function createDevice(data){
	return new Element('div',{
		'class' : 'device',
		html : "<img class='device' src='" + data.device_pic + "'/><span>" + data.device + "</span>",
		events: {
			mousedown: function(event){
				console.log('mousedown')
				event.stop();

				var devic = this;

				var clone = devic.clone().setStyles(devic.getCoordinates()).setStyles({
					opacity: .7,
					position : 'absolute'
				}).inject($('app'));

				var drag = new Drag.Move(clone, {
					droppables: $('bag'),

					onDrop: function(dragging,bag,event){
						if (!bag) {
							console.log(dragging + " dropped on nada");
							dragging.destroy();
						} else {
							dragging.destroy();
							gearDB.update('gear',{'in_bag':true},data, function(tr,res){
								addToBag(createList(data));
							});
						}
					},

					onCancel: function(dragging){
						dragging.destroy();
					}
				});
				drag.start(event);
			}
		}
	});
}