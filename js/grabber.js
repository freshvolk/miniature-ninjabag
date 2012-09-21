var dude = 12;

window.addEvent('domready', function(){

	loadFromDB();

});

function loadFromDB(){
	gearDB.findA('gear',addDevices);
}

function addDevices(transaction,result){
	var toAdd = []
	var bag = $('bag');
	if (result.rows.length === 0) {
		loadFromAPI(0);
	} else {
		for (var i = result.rows.length - 1; i >= 0; i--){
				if (result.rows.item(i).in_bag === true){
					if (bag.contains($('deleteMe'))){
						$('deleteMe').dispose();
					}
					bag.adopt(new Element('div',{
						'class' : 'item',
						html : result.rows.item(i).device + ' ' + result.rows.item(i).device_id
					}));
				} else {
					toAdd.append([new Element('div',{
						'class' : 'device',
						html : "<img class='device' src='" + result.rows.item(i).device_pic + "'/><p>" + result.rows.item(i).device + "</p>"
					})]);
				}
		}
		$('devices').adopt(toAdd);
		loadFromAPI(result.rows.length);
	}
}

function loadFromAPI(offset) {
	var jsonReq = new Request.JSON({
		url: 'http://www.ifixit.com/api/0.1/devices?',
		onComplete: function(datum){
			//Temp data...JSON req still failing for unknown reason
			var data = [{"device":" Game Boy colour","areas":[]},{"device":"04 1994 jeep grand cherokee install ign key cyl","areas":[]},{"device":"1959 Vespa 150","areas":[]},{"device":"1977 Columbia Commuter","areas":["Motorcycle"]},{"device":"1982-1988 Volvo 740","areas":[]},{"device":"1984-1988 Toyota Pickup","areas":["Toyota Automobile"]},{"device":"1984-1989 Toyota Pickup","areas":[]},{"device":"1984-1991 BMW 3-Series","areas":["BMW Automobile"]},{"device":"1985-1988 Volvo 740","areas":["Volvo Automobile"]},{"device":"1986-1993 Volvo 240","areas":["Volvo Automobile"]},{"device":"1987-1993 Kawasaki Ninja 500","areas":["Motorcycle"]},{"device":"1988-1991 Honda Civic","areas":["Honda Automobile"]},{"device":"1988-1994 Toyota Pickup","areas":[]},{"device":"1988-1998 Chevrolet Pickup","areas":["Chevrolet Automobile"]},{"device":"1988-1998 Chevy Pickup","areas":[]},{"device":"1988-1998 Chevy Silverado","areas":[]},{"device":"1989-1994 Mazda Protege","areas":[]},{"device":"1989-1994 Subaru Legacy","areas":["Subaru Automobile"]},{"device":"1989-1994 Toyota Pickup","areas":["Toyota Automobile"]},{"device":"1990 BMW 325i","areas":[]}]
			

			for (var i = data.length - 1; i >= 0; i--) {
				//Will be replaced by function that gets image from API
				var picture = 'http://guide-images.ifixit.net/igi/JJx6Cg1ePt6vAoDn';
				
				var values = {'device' : data[i].device, 'device_pic' : picture, 'in_bag' : false};
				gearDB.insert('gear',values,callback);
			};
		} 
	});
	jsonReq.get({'offset' : offset, 'limit' : 25});
}

function addToDeviceList(transaction,result){
	$('devices').adopt(new Element('div',{
		'class' : 'device',
		'id' : result.insertId,
		html : "<img class='device' src='" + values['device_pic'] + "'/><p>" + data[i].device + "</p>",
		events: {
			mousedown: function(event){
				event.stop();

				var dragged = this.clone().setStyles(clone.getCoordinates()).setStyles({
					opacity: .7,
					position : 'absolute'
				}).inject($('app'));

				var drag = new Drag.Move(dragged, {
					droppables: $('bag'),

					onDrop: function(dragging,bag){
						dragging.destroy();
						gearDB("UPDATE 'gear' SET in_bag = true WHERE device_id = " + result.insertId, addToBag.bindWithEvent());
						
					},

					onCancel: function(dragging){
						dragging.destroy();
					}
				});
				drag.start(event);
			}
		}
	}));

}

function addToBag(transaction,result){
	$('bag').adopt(new Element('div',{
		'class' : 'item',
		html : result.rows.item(i).device + ' ' + result.rows.item(i).device_id
	}));
}