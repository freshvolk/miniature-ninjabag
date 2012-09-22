var dude = 12;

window.addEvent('domready', function(){

	loadFromDB();

});

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

function addToDeviceList(data){
	//Somehow this is always the last object in the data array....wtf mate
	$('devices').adopt(createDevice(data));

}

function addToBag(el){
	console.log(el);
	$('bag').adopt(el);
	if (bag.contains($('deleteMe'))){
		$('deleteMe').dispose();
	}

}

function createList(data){
	return new Element('div',{
		'class' : 'item',
		html : "<img class='item' id='" + data.device_id + "' src='" + data.device_pic + "'/><span>" + data.device + "</span>",
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
		html : "<img class='device' id='" + data.device_id + "' src='" + data.device_pic + "'/><span>" + data.device + "</span>",
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

