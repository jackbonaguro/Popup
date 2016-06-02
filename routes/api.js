var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var crypto = require('crypto');
var multer = require('multer');
var path = require('path');

//Routes for the homepage - to be removed
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

//Post Routes
router.get('/p/:postid', function(req, res) {
	var con = req.con;
	con.query('SELECT * FROM posts WHERE id = ?;',
		[req.params.postid], function(err, results) {
		req.post = results[0];
		console.log("JSON: ", req.post);
		res.json(req.post);
	});
});

//User Routes
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

//Event Routes
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

//Kinda Event-y, Kinda session-y
router.put('/joinevent', function(req, res) {
	var query = 'SELECT id FROM events WHERE eventname=' + mysql.escape(req.body.eventname)
		+ ';';
	console.log(query);
	req.con.query(query, function(err, results) {
		console.log(results);
		if(err) throw err;
		var query2 = 'INSERT INTO eventusers(eventid, userid) VALUES ('
			+ mysql.escape(results[0].id) + ', ' + mysql.escape(req.session.user.id)
			+ ');';
		console.log(query2);
		req.con.query(query2, function(err) {
			if(err) throw err;
		});
	});
});

//Session Routes
router.post('/login', function(req, res) {
	var con = req.con;
	con.query('SELECT salt, hash FROM passwords WHERE username = ?',
		req.body.username, function(err, results) {
		if(err) throw err;
		req.salt = results[0].salt;
		req.realHash = results[0]['hash'];
		crypto.pbkdf2(req.body.password, req.salt, 10000, 512, function(err, hash) {
			if(err) throw err;
			if (hash.toString('hex') == req.realHash) {
				console.log('Login successful!');
				//Generate Session
				con.query('SELECT * FROM users WHERE username = ?',
					req.body.username, function(err, results) {
					var user = results[0];
					req.session.regenerate(function(err) {
						if(err) throw err;
						req.session.loggedIn = true;
						req.session.user = user;
						res.redirect('/');
					});
				});
			}else{
				console.log('Incorrect password!');
				res.redirect('/');
			}
		});
	});
});

router.get('/logout', function(req,res) {
	console.log('Logout!');
	req.session.destroy(function(err){
		if(err) throw err;
		res.redirect('/');
	});
});

router.post('/signup', function(req, res) {
	var salt = crypto.randomBytes(128).toString('hex');
	crypto.pbkdf2(req.body.password, salt, 10000, 512, function(err, hash) {
		var con = req.con;
		var query = 'INSERT INTO passwords (username, salt, hash) VALUES ('
			+ mysql.escape(req.body.username) + ','
			+ mysql.escape(salt.toString('hex')) + ','
			+ mysql.escape(hash.toString('hex')) + ');';
		con.query(query, function(err) {
			if(err) throw err;
			var query2 = 'INSERT INTO users (username, bio) VALUES ('
				+ mysql.escape(req.body.username) + ', '
				+ mysql.escape(req.body.bio) + ');';
			con.query(query2, function(err) {
				//Generate Session
				con.query('SELECT * FROM users WHERE username = ?',
					req.body.username, function(err, results) {
					var user = results[0];
					req.session.regenerate(function(err) {
						if(err) throw err;
						req.session.loggedIn = true;
						req.session.user = user;
						res.redirect('/');
					});
				});
			});
		});
	});
});

router.post('/edit', function(req, res) {
	var query = 'UPDATE users SET username=' + mysql.escape(req.body.username)
		+ ', bio=' + mysql.escape(req.body.bio) + ' WHERE id='
		+ mysql.escape(req.session.user.id) +';';
	req.con.query(query, function(err) {
		if(err) throw err;
		//Update the session data, otherwise user must re-login to see changes
		req.session.user.username = req.body.username;
		req.session.user.bio = req.body.bio;
		res.redirect('/account');
	}) 
});

//Content Creation Routes

//Using multer to store photo uploads,
//but post must enter db before filename is determined from its id.
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  	var dest = path.join(__dirname, '../public/images');
    cb(null, dest);
  },
  filename: function(req, file, cb) {
    var fname = "";
  	var insertId = 0;
  	//Create post in db, assing id to insertId
  	var query = 'INSERT INTO posts (username, imgsrc) VALUES ('
  		+ mysql.escape(req.session.user.username) + ', \'\');';
  	req.con.query(query, function(err, result){
  		if(err) throw err;
  		insertId = result.insertId;
  		fname = ("000" + insertId + ".jpg").slice(-8);

  		/*
  		 *Realistically at this point you could call the callback and
  		 *move the rest to the router.post method.
  		 */

  		//Now update table with fname using insertId
  		var query2 = 'UPDATE posts SET imgsrc=' + mysql.escape(fname)
  			+ ' WHERE id=' + mysql.escape(insertId) + ';';
  		req.con.query(query2, function(err){
  			if(err) throw err;
  			//Now add the post to userposts
  			query3 = 'INSERT INTO userposts (userid, postid) VALUES ('
  				+ mysql.escape(req.session.user.id) + ', '
  				+ mysql.escape(insertId) + ')';
  			req.con.query(query3, function(err){
  				if(err) throw err;
  				//Now add the post to eventposts
  				query4 = 'INSERT INTO  eventposts (eventid, postid) VALUES ('
  					+ mysql.escape(parseInt(req.body['event'])) + ', '
  					+ mysql.escape(insertId) + ');';
  				req.con.query(query4, function(err){
  					if(err) throw err;
	    			cb(null, fname);
  				});
  			});
  		});
  	});
  }
});
var upload = multer({ storage: storage });

router.post('/newpost', upload.single('image'), function(req, res) {
	res.redirect('/');
});

router.post('/newevent', function(req, res) {
	var query = 'INSERT INTO events(eventname, description, owner) VALUES ('
		+ mysql.escape(req.body.eventname) + ', ' + mysql.escape(req.body['description'])
		+ ', ' + mysql.escape(req.session.user.id) + ');';
	req.con.query(query, function(err, result){
		if(err) throw err;
		var query2 = 'INSERT INTO eventusers(eventid, userid) VALUES ('
			+ mysql.escape(result.insertId) + ', ' + mysql.escape(req.session.user.id)
			+ ');';
		req.con.query(query2, function(err){
			if(err) throw err;
			res.redirect('/');
		});
	});
});

//Content Deletion Routes
router.delete('/delpost', function(req, res) {
	var postid = mysql.escape(req.body.postid)
	var query = 'DELETE FROM posts WHERE id=' + postid + ';';
	req.con.query(query, function(err){
		if(err) throw err;
		var query2 = 'DELETE FROM userposts WHERE postid=' + postid + ';';
		req.con.query(query2, function(err){
			if(err) throw err;
			var query3 = 'DELETE FROM eventposts WHERE postid=' + postid + ';';
			req.con.query(query3, function(err){
				if(err) throw err;
				//res.redirect('/edit');
			});
		});
	});
});

router.delete('/delevent', function(req, res) {
	var eventid = mysql.escape(req.body.eventid)
	var query = 'DELETE FROM events WHERE id=' + eventid + ';';
	req.con.query(query, function(err){
		if(err) throw err;
		var query2 = 'DELETE FROM eventusers WHERE eventid=' + eventid + ';';
		req.con.query(query2, function(err){
			if(err) throw err;
		});
	});
});

module.exports = router;