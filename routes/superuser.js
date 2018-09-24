var express = require('express');
var router = express.Router();
var express = require('express');
var router = express.Router();

var config = require('../config').config();
const ibmdb = require('../db/ibmdb');
const logger=require('../logger').logger();

router.get('/api/v1/getsuperusers', function(req, res, next) {
	const sql = "select * from "+config.schema+"."+config.table;
	ibmdb.open().then(conn => {
		return ibmdb.prepareAndExecute(conn, sql, [empid])
		.catch(err => {
			conn.closeSync();
			logger.error(err.message);
			throw err;
		})
		.then(data => {
            conn.closeSync();
            var response={super_user:"",manager_list:""};
            response.super_user=data;
            res.send(response);
			
		});
	});
});
module.exports = router;