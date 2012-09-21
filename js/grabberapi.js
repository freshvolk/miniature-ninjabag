function loadFromAPI(offset) {
	console.log(offset);
	var jsonReq = new Request.JSON({
		url: 'http://www.ifixit.com/api/0.1/devices?',
		onComplete: function(dat){
			//Temp data...JSON req still failing for unknown reason
			var data = [{"device":" Game Boy colour","areas":[]},{"device":"04 1994 jeep grand cherokee install ign key cyl","areas":[]},{"device":"1959 Vespa 150","areas":[]},{"device":"1977 Columbia Commuter","areas":["Motorcycle"]},{"device":"1982-1988 Volvo 740","areas":[]},{"device":"1984-1988 Toyota Pickup","areas":["Toyota Automobile"]},{"device":"1984-1989 Toyota Pickup","areas":[]},{"device":"1984-1991 BMW 3-Series","areas":["BMW Automobile"]},{"device":"1985-1988 Volvo 740","areas":["Volvo Automobile"]},{"device":"1986-1993 Volvo 240","areas":["Volvo Automobile"]},{"device":"1987-1993 Kawasaki Ninja 500","areas":["Motorcycle"]},{"device":"1988-1991 Honda Civic","areas":["Honda Automobile"]},{"device":"1988-1994 Toyota Pickup","areas":[]},{"device":"1988-1998 Chevrolet Pickup","areas":["Chevrolet Automobile"]},{"device":"1988-1998 Chevy Pickup","areas":[]},{"device":"1988-1998 Chevy Silverado","areas":[]},{"device":"1989-1994 Mazda Protege","areas":[]},{"device":"1989-1994 Subaru Legacy","areas":["Subaru Automobile"]},{"device":"1989-1994 Toyota Pickup","areas":["Toyota Automobile"]},{"device":"1990 BMW 325i","areas":[]}]
			
			for (var i = 0; i < data.length; i++) {
				addTo(data[i].device,pictureRetrieve(data[i].device));
			};
		} 
	});
	jsonReq.get({'offset' : offset, 'limit' : 25});
	//Add Event to Load More button with correct new offset
}

function pictureRetrieve(device){
	var rsonReq = new Request.JSON({
		url: 'http://ifixit.com/api/0.1/device/' + device,

		onSuccess: function(){
			console.log('Success?');
		},

		onFailure: function(){
			console.log('Failure');
		}
	}).get();
}