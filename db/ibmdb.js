const Promise = require('bluebird');
const ibmdb = Promise.promisifyAll(require('ibm_db'));
const pool = new ibmdb.Pool();
const config = require('../db/db-config');
const logger=require('../logger').logger();

let dbString = 'DRIVER={DB2};DATABASE=' + config.db + ';UID=' + config.username + ';PWD=' + config.password + ';HOSTNAME=' + config.hostname + ';port=' + config.port;
console.log(dbString);
module.exports = {
	open() {
		return pool.openAsync(dbString);
	},

	prepareAndExecute(conn, sql, bindingParameters) {
		console.log("H SQL :- "+sql+" : "+bindingParameters);
		return conn.prepareAsync(sql)
			.then(stmt => stmt.executeAsync(bindingParameters)
			.then(result => {
				const data = result.fetchAllSync();
				result.closeSync();
				stmt.closeSync();
				return data;
			}));
},

	prepareAndExecuteNonQuery(conn, sql, bindingParameters) {
		logger.debug("H Insert SQL :- "+sql+" : "+bindingParameters);
		return conn.prepareAsync(sql)
			.then(stmt => stmt.executeNonQueryAsync(bindingParameters));
	}
};
