var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Posts',
		heading2: 'Events',
		loggedIn: req.session.loggedIn,
		currentuser: req.session.username});
});

router.get('/p/:postid', function(req, res) {
	res.render('post', { title: 'Post',
		postid: req.params.postid,
		loggedIn: req.session.loggedIn,
		currentuser: req.session.username});
});

router.get('/u/:username', function(req, res) {
	res.render('user', { title: 'User', heading2: 'Posts',
		heading3: 'Events',
		username: req.params.username,
		loggedIn: req.session.loggedIn,
		currentuser: req.session.username});
});

router.get('/e/:eventname', function(req, res) {
	res.render('event', { title: 'Event', heading2: 'Posts',
		heading3: 'Users',
		eventname: req.params.eventname,
		loggedIn: req.session.loggedIn,
		currentuser: req.session.username});
});

router.get('/login', function(req, res) {
	res.render('login', {title: 'Login'});
});

router.get('/signup', function(req, res) {
	res.render('signup', {title: 'Sign Up'});
});

module.exports = router;
