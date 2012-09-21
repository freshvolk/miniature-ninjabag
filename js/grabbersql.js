//Start new instance
var gearDB = new MooSQL({
		dbName: 'gear_bag',
		dbVersion: '3.0',
		dbDesc: 'A db to hold info refrenced for the gear_bag',
		dbSize: 40
});

//This isn't firing for some reason
gearDB.addEvent('databaseCreated',function(){
	// Create table
	gearDB.exec("CREATE TABLE gear(device TEXT NOT NULL, device_id INTEGER PRIMARY KEY, device_pic TEXT, in_bag BOOLEAN DEFAULT false)",callback.bindWithEvent());
	console.log('New DB');
});

function callback(transaction, result){
	console.log(transaction + " and the result ");
	console.log(result);

};

function callbackRows(transaction, result){
	console.log(transaction + " and the result ");
	console.log(result.rows.item(0));
	//refreshGearBag();
};

function addTo(device){
	var picture = 'http://guide-images.ifixit.net/igi/JJx6Cg1ePt6vAoDn';
	var values = {'device' : device, 'device_pic' : picture};
	gearDB.insert('gear',values,callback);
	gearDB.exec("SELECT * FROM 'gear' WHERE device = '" + device + "'",function (transaction,result) {
		console.log(result.rows.item(0));
	});
};

/*function addToDB(device){

}*/