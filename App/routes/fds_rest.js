/* ------ Compulsory Header ----- */
var express = require('express');
/* A router to handle requests of corressponding page with same name*/
var router = express.Router();
/*for page authentication.*/
const passport = require('passport');
/*Modules for database interaction*/
const sql = require('../db/dbsql');
const caller = require('../db/dbcaller');

var areaInfo = {};
var queryYear = 0;
var queryMonth = 0;

function fdsAllRestInfo(req, res, next) {

	if (req.query.selecteddate !== undefined) {
		queryYear = parseInt(req.query.selecteddate.slice(0, 4));
		queryMonth = parseInt(req.query.selecteddate.slice(5));
		console.log(queryYear);
		console.log(queryMonth);

	} else if (queryMonth == 0 || queryYear == 0) {
		req.fdsAllRestInfo = {};
		//next();
	}
	console.log(queryYear);
	console.log(queryMonth);
	caller.query(sql.query.fds_allRestInfo, [queryYear, queryMonth], (err, data) => {
		if (err) {
			return next(err);
		}

		req.fdsAllRestInfo = data.rows;
		return next();
	});
}

function fdsEachRestInfo(req, res, next) {

	if (queryMonth == 0 || queryYear == 0) {
		req.fdsEachRestInfo = {};
		return next();
	} else {
		caller.query(sql.query.fds_eachRestInfo, [queryYear, queryMonth], (err, data) => {
			if (err) {
				return next(err);
			}
			req.fdsEachRestInfo = data.rows;
			return next();
		});
	}
}

function catInfo(req, res, next) {
	caller.query(sql.query.viewCat, (err, data) => {
        if(err){
            return next(err);
        }
		req.catInfo = data.rows;
        return next();
	});
}



function loadPage(req, res, next) {
	res.render('fds_rest', {
		username: req.user.username,
		name: req.user.name,
		fdsAllRestInfo: req.fdsAllRestInfo,
		fdsEachRestInfo: req.fdsEachRestInfo,
		//areaInfo: areaInfo,
		catInfo: req.catInfo
	});
}

// router.post('/selectArea', function (req, res, next) {
// 	var area = req.body.area;
// 	caller.query(sql.query.viewArea, [area], (err, data) => {
// 		if (err){
// 			next(err);
// 		}
// 		if (data.rows[0] == null) {
// 			console.log("area: null");
// 			areaInfo = {};
// 		} else {
// 			console.log("area: " + data.rows[0].area);
// 			areaInfo = data.rows;
// 		}
// 	});
// 	res.redirect('/fds_rest');
// });

router.post('/add_cat', function (req, res, next) {
	var newCat = req.body.category;

	caller.query(sql.query.insertCat, [newCat], (err, data) => {
		if (err){
			next(err);
		}
	});
	res.redirect('/fds_rest');
});

router.get('/', passport.authMiddleware(), fdsAllRestInfo, fdsEachRestInfo, catInfo, loadPage);

router.post('/selectdate', function (req, res, next) {

	res.redirect('/fds_rest?selecteddate=' + encodeURIComponent(req.body.date));

});

module.exports = router;