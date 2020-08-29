const express = require('express');
const router = express.Router();
const Post = require('../models/post')
const { validateForm } = require('../utils/index')

/* GET users listing. */
router.get('/', function (req, res) {
  return res.status(200).send('get request for /posts/')
});

router.get('/all', async function (req, res) {
  try {
    const posts = await Post.getAll()
    return res.status(200).json(posts)
  } catch (err) {
    console.log('error in posts/all')
    return res.status(400).send(err)
  }
})

router.get('/:userId/all', async function (req, res) {
  try {
    const posts = await Post.getByUserId(req.params.userId)
    return res.status(200).json(posts)
  } catch (err) {
    console.log('error get in /userId/all')
    return res.status(400).send(err)
  }
})

router.get('/:postId', async function (req, res) {
  try {
    const post = await Post.getByPostId(req.params.postId)
    return res.status(200).json(post)
  } catch (err) {
    console.log('error get in /userId/postId')
    return res.status(400).send(err)
  }
})

router.post('/', async function (req, res) {
  const newPost = new Post(req.body)
  try {
    validateForm(newPost)
  } catch (err) {
    return res.status(400).send(err)
  }

  try {
    await Post.createPost(newPost)
    return res.status(200).end()
  } catch (err) {
    console.log('error in post /')
    return res.status(400).send(err)
  }
})

router.put('/:postId', async function (req, res) {
  const newPost = new Post(req.body, req.params.postId)
  try {
    validateForm(newPost)
  } catch (err) {
    console.log('error in validation')
    return res.send(400).send(err)
  }
  
  try {
    await Post.updatePost(newPost, req.params.postId)
    return res.status(200).end()
  } catch (err) {
    console.log('error put in /userId/postId')
    return res.status(400).send(err)
  }
})

router.delete('/:postId', async function (req, res) {
  try {
    await Post.deletePost(req.params.postId)
    return res.status(200).end()
  } catch (err) {
    console.log('error delete in /userId/postId')
    return res.status(400).send(err)
  }
})

module.exports = router;
