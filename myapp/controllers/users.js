const express = require('express');
const router = express.Router();
const User = require('../models/user')

const validateForm = function (form) {
  for (const key in form) {
    if (!form[key]) throw Error('Please provide correct Info');
  }
}
router.get('/', function(req, res, next) {
  res.status(200).send('GET requests for /users/')
});

router.post('/', function(req, res, next) {
  const new_user = new User(req.body)

  try {
    validateForm(new_user)
  } catch (err) {
    console.log('error in validating form')
    return res.status(400).send(err.message)
  }

  try {
    User.createUser(new_user)
    res.status(200).json(new_user)
  } catch (err) {
    console.log('error in saving form', err)
    return res.status(400).send(err)
  }
})


router.get('/:userId', async function(req, res, next) {
  try {
    const user = await User.getUserById(req.params.userId)
    res.status(200).json(user)
  } catch (err) {
    console.log('error before sending form', err)
    res.status(400).send(err)
  }
})


module.exports = router;
