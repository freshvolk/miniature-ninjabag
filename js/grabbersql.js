window.addEvent('domready', function(){
	
	console.log('SQL stuff should occur...now');
	
	//Start new instance
	var gearDB = new MooSQL({
		dbName: 'gear_bag',
		
		dbVersion: '3.0',
		
		dbDesc: 'A db to hold info refrenced for the gear_bag',
		
		dbSize: 40
	});
	
	gearDB.addEvent('databaseCreated',function(){
		// Create table
		// gearDB.exec("CREATE TABLE gear(device TEXT NOT NULL, device_id UNIQUE INTEGER NOT NULL, device_pic BLOB)");
		console.log('New DB');
	})
	
	gearDB.addEvent('databaseReady', function(){
		//Random INSERT then SELECT
		//gearDB.exec("INSERT INTO gear VALUES ('iMac',0)");
		//gearDB.exec("SELECT * FROM 'gear'");
		console.log('DB Ready');
	});
	
	gearDB.addEvent('notSupported', function(ex){
		console.log('no Support');
	});
	
});