window.addEvent('domready', function(){

	loadFromDB();

});

// Load existing devices from DB
function loadFromDB(){
	gearDB.exec("SELECT * FROM 'gear' ORDER BY device DESC",addDevices);
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

//Add a device into the main list
function addToDeviceList(data){
	$('devices').adopt(createDevice(data));

}

//Add a device to gear bag
function addToBag(el){
	console.log(el);
	$('bag').adopt(el);
	if (bag.contains($('deleteMe'))){
		$('deleteMe').dispose();
	}

}

//Create and return a new Element to display in Bag
function createList(data){
	return new Element('div',{
		'class' : 'item',
		html : "<img class='item' id='" + data.device_id + "' src='" + data.device_pic + "'/><span>" + data.device + "</span>",
		events: {
			mousedown: function(event){
				event.stop();

				var devic = this;
				// On mousedown, create element that is properly draggable
				var clone = devic.clone().setStyles(devic.getCoordinates()).setStyles({
					opacity: .7,
					position : 'absolute'
				}).inject($('app'));

				var drag = new Drag.Move(clone, {
					droppables: $('trash'),

					onDrop: function(dragging,bag,event){
						if (!bag) {
							//console.log(dragging + " dropped on nada");
							dragging.destroy();
						} else {
							bag.set('background-color' , '#FFF');
							dragging.destroy();
							gearDB.update('gear',{'in_bag':false},data, function(tr,res){
								alert(data.device + " deleted from bag");
								addToDeviceList(data);
								devic.destroy();
							});
						}
					},

					onEnter: function(dragging,target){
						//Change Bag bkgd when ok to drop
						target.set('background-color' , '#AFA');
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

//Creates a new Device element for the device list
function createDevice(data){
	return new Element('div',{
		'class' : 'device',
		html : "<img class='device' id='" + data.device_id + "' src='" + data.device_pic + "'/><span>" + data.device + "</span>",
		events: {
			mousedown: function(event){
				console.log('mousedown')
				event.stop();

				var devic = this;
				// On mousedown, create a draggable version of the element
				var clone = devic.clone().setStyles(devic.getCoordinates()).setStyles({
					opacity: .7,
					position : 'absolute'
				}).inject($('app'));

				//give the clone the power of drag
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
							devic.destroy();
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

