var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/posts', function(req, res) {
	var con = req.con;
	con.query('SELECT * FROM posts;', function(err, results) {
		console.log("JSON: ",results);
		res.json(results);
	});
});

router.get('/events', function(req, res) {
	var con = req.con;
	con.query('SELECT * FROM events;', function(err, results) {
		console.log("JSON: ",results);
		res.json(results);
	});
});

router.get('/p/:postid', function(req, res) {
	var con = req.con;
	con.query('SELECT * FROM posts WHERE id = ?;',
		[req.params.postid], function(err, results) {
		req.post = results[0];
		console.log("JSON: ", req.post);
		res.json(req.post);
	});
});

router.get('/u/:username', function(req, res) {
	var con = req.con;
	con.query('SELECT * FROM users WHERE username = ?',
		[req.params.username], function(err, results) {
		req.user = results[0];
		console.log("JSON: ", req.user);
		res.json(req.user);
	});
});

router.get('/u/:username/posts', function(req, res) {
	var con = req.con;
	con.query('SELECT id FROM users WHERE username = ?',
		[req.params.username], function(err, results) {
		req.userid = results[0].id;
		con.query('SELECT postid FROM userposts WHERE userid = ?',
			req.userid, function(err, results) {
			req.userposts = results;
			req.postids = [];
			for (var i = 0; i < req.userposts.length; i++) {
				req.postids.push(req.userposts[i].postid);
			}
			var query = 'SELECT * FROM posts WHERE id IN ' + mysql.escape([req.postids]);
			con.query(query,
			function(err, results) {
					req.posts = results;
					console.log("JSON: ", req.posts);
					res.json(req.posts);
			});
		});
	});
});

router.get('/u/:username/events', function(req, res) {
	var con = req.con;
	con.query('SELECT id FROM users WHERE username = ?',
		[req.params.username], function(err, results) {
		req.userid = results[0].id;
		con.query('SELECT eventid FROM eventusers WHERE userid = ?',
			req.userid, function(err, results) {
			req.userevents = results;
			req.eventids = [];
			for (var i = 0; i < req.userevents.length; i++) {
				req.eventids.push(req.userevents[i].eventid);
			}
			var query = 'SELECT * FROM events WHERE id IN ' + mysql.escape([req.eventids]);
			con.query(query,
			function(err, results) {
					req.events = results;
					console.log("JSON: ", req.events);
					res.json(req.events);
			});
		});
	});
});

router.get('/e/:eventname', function(req, res) {
	var con = req.con;
	con.query('SELECT * FROM events WHERE eventname = ?',
		[req.params.eventname], function(err, results) {
		req['event'] = results[0];
		console.log("JSON: ", req['event']);
		res.json(req['event']);
	});
});

router.get('/e/:eventname/posts', function(req, res) {
	var con = req.con;
	con.query('SELECT id FROM events WHERE eventname = ?',
		[req.params.eventname], function(err, results) {
		req.eventid = results[0].id;
		con.query('SELECT postid FROM eventposts WHERE eventid = ?',
			req.eventid, function(err, results) {
			req.eventposts = results;
			req.postids = [];
			for (var i = 0; i < req.eventposts.length; i++) {
				req.postids.push(req.eventposts[i].postid);
			}
			var query = 'SELECT * FROM posts WHERE id IN ' + mysql.escape([req.postids]);
			con.query(query,
			function(err, results) {
					req.posts = results;
					console.log("JSON: ", req.posts);
					res.json(req.posts);
			});
		});
	});
});

router.get('/e/:eventname/users', function(req, res) {
	var con = req.con;
	con.query('SELECT id FROM events WHERE eventname = ?',
		[req.params.eventname], function(err, results) {
		req.eventid = results[0].id;
		con.query('SELECT userid FROM eventusers WHERE eventid = ?',
			req.eventid, function(err, results) {
			req.eventusers = results;
			req.userids = [];
			for (var i = 0; i < req.eventusers.length; i++) {
				req.userids.push(req.eventusers[i].userid);
			}
			var query = 'SELECT * FROM users WHERE id IN ' + mysql.escape([req.userids]);
			con.query(query,
			function(err, results) {
					req.users = results;
					console.log("JSON: ", req.users);
					res.json(req.users);
			});
		});
	});
});

module.exports = router;
