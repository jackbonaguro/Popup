var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Recent Posts' });
});

router.param('postid', function(req, res, next, postid) {
	req.postid = postid;
	next();
});
router.get('/p/:postid', function(req, res) {
	res.render('post', { title: 'Post', postid: req.postid});
});

router.param('username', function(req, res, next, username) {
	req.username = username;
	next();
});
router.get('/u/:username', function(req, res) {
	res.render('user', { title: 'User', heading2: 'Recent Posts',
		username: req.username});
});

module.exports = router;
