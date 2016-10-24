I write Simple WebSQL Library & Simple IndexedDB Library

And implement demo html to use the library. 

# Simple WebSQL Library
### How to Use
	// fields is array of schema; fieldTypes is array 
	var websql = WebSQL(database, table, fields, fieldTypes);
	
	// Call init() before calling insert(), update(), delete(), fetch()
	websql.init(completeCallback, errorCallback)
	
	// values is array correspond to fields
	websql.insert(values, completeCallback)
	
	// get all row
	websql.fetch(completeCallback)
	
	// delete data
	websql.delete(primaryKey, value, completeCallback)
	
	// put primaryKey & its value in first element
	websql.update(fields, values, completeCallback)
	
	See detail in index_websql.html
-------------------
# Simple IndexedDB Library
### How to Use
	// fields is array of schema; fieldTypes is array 
	var db = IndexedDB(database, table, fields, fieldTypes);
	
	// Call init() before calling insert(), update(), delete(), fetch()
	db.init(completeCallback, errorCallback)
	
	// row is json, key is field
	db.insert(row, completeCallback, errorCallbackk)
	
	// values is array correspond to fields
	db.fetch(completeCallback, errorCallback)
	
	// delete data
	db.delete(primaryValue, completeCallback, errorCallback) {
	
	// row is json, key is field
	db.update(row, completeCallback, errorCallbackk)
	
	See detail in index_indexeddb.html

