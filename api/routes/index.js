var express = require('express');
r();

var router = express.Router();
module.exports = app;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

modules.exports = router;