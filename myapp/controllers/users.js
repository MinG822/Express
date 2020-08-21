const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('GET requests for /users/');
  next()
});

module.exports = router;
