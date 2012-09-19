window.addEvent('domready', function(){
	
	console.log('SQL stuff should occur...now');
	test('iMac',9,'Bleh');
	
});

//Start new instance
var gearDB = new MooSQL({
		dbName: 'gear_bag',
		dbVersion: '3.0',
		dbDesc: 'A db to hold info refrenced for the gear_bag',
		dbSize: 40
});

gearDB.addEvent('databaseCreated',function(){
	// Create table
	gearDB.exec("CREATE TABLE gear(device TEXT NOT NULL, device_id UNIQUE INTEGER NOT NULL, device_pic BLOB)");
	console.log('New DB');
})
	
gearDB.addEvent('notSupported', function(ex){
	console.log('no Support');
});
	
function callback(transaction, result){
	console.log(transaction + " and the result " + result);
};

function test(device,id,picture){
	gearDB.exec("INSERT INTO gear (device, device_id) VALUES ('iMac',3)",callback.bindWithEvent());
	gearDB.exec("SELECT * FROM 'gear'",callback.bindWithEvent());
	
}
	