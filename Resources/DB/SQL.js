
/**
 * @author nishi
 *
 *
 */

var sql = Titanium.Database.open('database');

exports.getBookMark = function() {
	try {
		var result = sql.execute('SELECT * FROM BOOKMARK');

		return result;
	} catch(err) {

		alert('データの参照に失敗しました::'+JSON.stringify(err));

		return null;
	}
}

exports.CreateTable = function() {
	try {
		sql.execute('CREATE TABLE IF NOT EXISTS BOOKMARK(_ID INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT,BOOK_ID TEXT NOT NULL ,TITLE TEXT,TYPE TEXT NOT NULL)');

		return true;
	} catch(err) {
		Titanium.API.info('ERR::Database::'+JSON.stringify(err));
		return false;
	}
}

exports.InsertRow = function(ID,TITLE,TYPE) {
	try {
			sql.execute('INSERT INTO BOOKMARK VALUES(NULL,?,?,?)', ID,TITLE,TYPE);
			
		return true;
	} catch(err) {
		alert('err:'+err.message);
		return false;
	}
}



exports.DeleteRow = function(_id) {
	try {
		sql.execute('DELETE FROM MAINDB WHERE _ID = ?', _id);
		return true;
	} catch(err) {
		return false;
	}
}

exports.getDB = function() {
	return sql;
}
exports.Closedatabase = function() {
	try {
		sql.close();
		return true;
	} catch(err) {
		return false;
	}
}
