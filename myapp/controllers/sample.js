const express = require('express');
const app = require('../app');
const router = express.Router();

// 마운팅할 path 가 없는 미들웨어 함수. 앱이 요청을 받을 때마다 실행된다.
router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

router.use('/', function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
//   next()
// });

// 연속적인 미들웨어

router.use('/', function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})

// if 문을 사용한 미들웨어

router.get('/', function (req, res, next) {
  if (req.method === 'GET') next('route')
  else next()
}, function (req, res, next) {
  console.log('it should not be seen')
  next()
})

// 배열과 미들웨어 함수
function logOriginalUrl (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}

function logMethod (req, res, next) {
  console.log('Request Type:', req.method)
  next()
}

const logStuff = [logOriginalUrl, logMethod]
router.get('/', logStuff, function(req, res, next) {
  res.send('User Info')
})

module.exports = router;
