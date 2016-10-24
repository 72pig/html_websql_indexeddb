function WebSQL(database, table, fields, fieldTypes) {
	var db;

	var config = {
		database : database,
		table : table,
		fields : fields, 
		fieldTypes: fieldTypes
	}

	var websql = {
		init : function (completeCallback, errorCallback) {
			db = window.openDatabase(config.database, '', config.table, 15 * 1024 * 1024);
			if (!db) {
				var error = {
					db:db,
					errorMessage: 'Database not found DB'
				}
				errorCallback(error);
            	return;
        	}

	        db.transaction(function(tx) {
				var fields = config.fields;
				var fieldTypes = config.fieldTypes;
				var size = config.fields.length;

				var shema = '';
				for (var i = 0; i < size; ++i) {
					if ( i == 0) {
						shema = fields[i] + ' ' + fieldTypes[i];
					} else {
						shema = shema + ' , ' + fields[i] + ' ' + fieldTypes[i];
					}
				}

	        	var sql = 'CREATE TABLE IF NOT EXISTS ' + config.table + '(' + shema + ')';
    	        tx.executeSql(sql, []);
        	});

        	completeCallback({result:'ok'});
		},
		fetch : function (completeCallback) {
	        db.transaction(function(tx) {
	        	var sql = 'SELECT * FROM ' + config.table;
	            tx.executeSql(sql, [], 
	            	function(tx, rs){completeCallback(tx, rs)});
	        });
		},
		insert : function (values, completeCallback) {
			var fields = config.fields;
			var size = config.fields.length;

			var fieldsText = '';
			var parameters = '';
			for (var i = 0; i < size; ++i) {
				fieldsText = ( i == 0?  fields[0]: fieldsText + ',' + fields[i]);
				parameters = (i == 0? '?': parameters + ',?');
			}
			
			db.transaction(function(tx) {
				var sql = 'INSERT INTO ' + config.table + ' (' + fieldsText + ') VALUES (' + parameters + ')';
				tx.executeSql(sql, values, completeCallback);
            });
		},
		delete : function (primaryKey, value, completeCallback) {
			db.transaction(function(tx) {
				var sql = 'delete from ' + config.table + ' where ' + primaryKey + ' = ?';
                tx.executeSql(sql, [value], completeCallback);
            });
		},
		update : function (fields, values, completeCallback) {
            db.transaction(function(tx) {
            	var sqlValues = [];
            	var size = fields.length;

            	var setParameters = '';
				for (var i = 1; i < size; ++i) {
					setParameters = (i == 1? fields[i] + ' = ?': setParameters + ',' + fields[i] + ' = ?');
					sqlValues.push(values[i]);
				}

            	var whereParameters = fields[0] + ' = ?';
				sqlValues.push(values[0]);
				
				var sql = 'update ' + config.table + ' set ' + setParameters+ ' where ' + whereParameters;
				console.log(sql);
                tx.executeSql(sql, sqlValues, completeCallback);
            });
		}
	}
	return websql;
}