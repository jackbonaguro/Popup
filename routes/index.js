var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Home',
		heading2: 'Events',
		loggedIn: req.session.loggedIn,
		currentuser: req.session.user});
});

router.get('/p/:postid', function(req, res) {
	res.render('post', { title: 'Post',
		postid: req.params.postid,
		loggedIn: req.session.loggedIn,
		currentuser: req.session.user});
});

router.get('/u/:username', function(req, res) {
	res.render('user', { title: 'User', heading2: 'Posts',
		heading3: 'Events',
		username: req.params.username,
		loggedIn: req.session.loggedIn,
		currentuser: req.session.user});
});

router.get('/e/:eventname', function(req, res) {
	res.render('event', { title: 'Event', heading2: 'Posts',
		heading3: 'Users',
		eventname: req.params.eventname,
		loggedIn: req.session.loggedIn,
		currentuser: req.session.user});
});

router.get('/login', function(req, res) {
	res.render('login', {title: 'Login',
		loggedIn: req.session.loggedIn,
		currentuser: req.session.user});
});
router.get('/signup', function(req, res) {
	res.render('signup', {title: 'Sign Up',
		loggedIn: req.session.loggedIn,
		currentuser: req.session.user});
});


router.get('/account', function(req, res) {
	res.render('account', {title: 'Account',
		heading2: 'Your Posts',
		heading3: 'Your Events',
		loggedIn: req.session.loggedIn,
		currentuser: req.session.user});
});

router.get('/edit', function(req, res) {
	console.log(req.session.user);
	res.render('accountedit', {title: 'Edit Profile',
		loggedIn: req.session.loggedIn,
		currentuser: req.session.user});
});

router.get('/newpost', function(req, res) {
	res.render('newpost', {title: 'New Post',
		loggedIn: req.session.loggedIn,
		currentuser: req.session.user});
});

router.get('/newevent', function(req, res) {
	res.render('newevent', {title: 'New Event',
		loggedIn: req.session.loggedIn,
		currentuser: req.session.user});
});

module.exports = router;