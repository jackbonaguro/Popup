var express = require('express');
var router = express.Router();

/* GET userlist */
router.get('/userlist', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{},function(err, docs) {
		res.json(docs);
	});
});

router.post('/adduser', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.insert(req.body, function(err, result) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
	});
});

router.delete('/deleteuser/:id', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	var userToDelete = req.params.id;
	collection.remove({'_id': userToDelete}, function(err) {
		res.send((err === null) ? { msg: '' } : {msg:'error: ' + err });
	});
});

module.exports = router;
