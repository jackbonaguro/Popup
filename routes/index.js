var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Posts',
		heading2: 'Events'});
});

/*router.param('postid', function(req, res, next, postid) {
	req.postid = postid;
	next();
});*/
router.get('/p/:postid', function(req, res) {
	res.render('post', { title: 'Post', postid: req.params.postid});
});

/*router.param('username', function(req, res, next, username) {
	req.username = username;
	next();
});*/
router.get('/u/:username', function(req, res) {
	res.render('user', { title: 'User', heading2: 'Posts',
		heading3: 'Events',
		username: req.params.username});
});

router.get('/e/:eventname', function(req, res) {
	res.render('event', { title: 'Event', heading2: 'Posts',
		heading3: 'Users',
		eventname: req.params.eventname});
})

module.exports = router;
