const express = require('express');
const router = express.Router();
const User = require('../models/user')
const { validateForm } = require('../utils/index')

router.get('/', function(req, res) {
  return res.status(200).send('GET requests for /users/')
});

router.get('/all', async function(req, res) {
  try {
    const users = await User.getAllUser()
    return res.status(200).json(users)
  } catch (err) {
    console.log('error before sending form', err)
    return res.status(400).send(err)
  }
})

router.get('/:userId', async function(req, res) {
  try {
    const user = await User.getUserById(req.params.userId)
    return res.status(200).json(user)
  } catch (err) {
    console.log('error before sending form', err)
    return res.status(400).send(err)
  }
})

router.post('/', async function(req, res) {
  const new_user = new User(req.body)

  try {
    validateForm(new_user)
  } catch (err) {
    console.log('error in validating form')
    return res.status(400).send(err.message)
  }

  try {
    await User.createUser(new_user)
    return res.status(200).json(new_user)
  } catch (err) {
    console.log('error in saving form', err)
    return res.status(400).send(err)
  }
})


router.put('/:userId', async function(req, res) {
  try {
    const userId = parseInt(req.params.userId)
    const new_user = new User(req.body)
    await User.updateById(userId, new_user)
    return res.status(200).json(new_user)
  } catch (err) {
    console.log('error in saving form', err)
    return res.status(400).send(err)
  }
})

router.delete('/:userId', async function(req, res) {
  try {
    const userId = parseInt(req.params.userId)
    await User.removeById(userId)
    return res.status(200).send(`${userId} is deleted`)
  } catch (err) {
    console.log('error in saving form', err)
    return res.status(400).send(err)
  }
})


module.exports = router;
