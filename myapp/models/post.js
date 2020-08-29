const db = require('./db');

const Post = function (post) {
  this.no = post.no;
  this.title = post.title; 
  this.content = post.content;
  this.user_no = post.user_no
}

Post.getAll = function () {
  return new Promise ((resolve, reject) => {
    db.query('select * from post_table', (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve({results})
      }
    })
  })
}

Post.getByUserId = function (userId) {
  return new Promise ((resolve, reject) => {
    db.query('select * from post_table where user_no = ?', userId, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve({results})
      }
    })
  })
}

Post.getByPostId = function (postId) {
  return new Promise ((resolve, reject) => {
    db.query('select * from post_table where no = ?', postId, (error, results) => {
      if (error) reject(error)
      else resolve({results})
    })
  })
}


Post.createPost = function (newPost) {
  try {
    db.query("insert into post_table set ?", newPost)
  } catch (err) {
    console.log('error in creating', err)
    throw err
  }
}

Post.updatePost = function (newPost, postId) {
  try {
    db.query("update post_table set ? where no = ?", [newPost, postId])
  } catch (err) {
    console.log('error in updating', err)
    throw err
  }
}

Post.deletePost = function (postId) {
  try {
    db.query("delete from post_table where no = ?", postId)
  } catch (err) {
    console.log('error in removing', err)
    throw err
  }
}

module.exports = Post