var express = require('express');
var router = express.Router();

router.get('/recent', function(req, res) {
	var con = req.con;
	con.query('SELECT * FROM posts;', function(err, results) {
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

router.get('/u/:username/recent', function(req, res) {
	var con = req.con;
	con.query('SELECT * FROM posts WHERE username = ?',
		[req.params.username], function(err, results) {
		req.posts = results;
		console.log("JSON: ", req.posts);
		res.json(req.posts);
	});
});

module.exports = router;
