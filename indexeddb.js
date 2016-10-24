function IndexedDB(database, table, fields, fieldTypes) {
	var db;

	var config = {
		database : database,
		table : table,
		fields : fields, 
		fieldTypes: fieldTypes
	}

	var indexeddb = {
		init : function (completeCallback, errorCallback) {
	        // In the following line, you should include the prefixes of implementations you want to test.
	        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	        // DON'T use "var indexedDB = ..." if you're not in a function.
	        // Moreover, you may need references to some window.IDB* objects:
	        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
	        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
	        // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

	        if (!window.indexedDB) {
	        	errorCallback("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
	        	return;
	        }

	        request = window.indexedDB.open(config.database, 1);
	        request.onerror = function(event) {
	        	errorCallback('open database failed');
	        };

	        request.onupgradeneeded = function() {
            	db = request.result;
            	var pk = fields[0];
            	var store = db.createObjectStore(config.table, {keyPath: pk});
	        }

        	request.onsuccess = function() {
				if (!db) {
					db = request.result;
				}
        		completeCallback();
        	}
		},
		fetch : function (completeCallback, errorCallback) {
	        var tx = db.transaction(config.table, 'readwrite');
	        var store = tx.objectStore(config.table);

	        var cursorRequest = store.openCursor();
	        cursorRequest.onerror = function(error) {
	            errorCallback(error);
	        };

	        cursorRequest.onsuccess = function(evt) { 
	            completeCallback(evt.target.result);
	        };	        
		},
		insert : function (row, completeCallback, errorCallback) {
	        var tx = db.transaction(config.table, 'readwrite');
	        tx.onerror = function(event) {
	            errorCallback(event);
            };

            var store = tx.objectStore(config.table);
            var request = store.add(row);

            request.onsuccess = function(event) {
                completeCallback();
            };
		},
		delete : function (primaryValue, completeCallback, errorCallback) {
	        var tx = db.transaction(config.table, 'readwrite');
	        tx.onerror = function(event) {
	            errorCallback(event);
            };

            var store = tx.objectStore(config.table);
            var request = store.delete(primaryValue);

            request.onsuccess = function(event) {
                completeCallback();
            };
		},
		update : function (row, completeCallback, errorCallback) {
	        var tx = db.transaction(config.table, 'readwrite');
	        tx.onerror = function(event) {
	            errorCallback(event);
            };

            var store = tx.objectStore(config.table);
            var request = store.put(row);

            request.onsuccess = function(event) {
                completeCallback();
            };
		}
	}
	return indexeddb;
}