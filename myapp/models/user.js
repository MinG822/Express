const db = require('./db')


const User = function (user) {
  this.no = user.no;
  this.email = user.email;
  this.password = user.password;
}

// User.getUserById = async function (userId) {
//   return await new Promise(async (resolve, reject) => {
//     try {
//       const results = await db.query("select * from user_table where no = ?", userId) 
//       resolve(results)
//     } catch (error) {
//       reject(error)
//     }
//   })
// }

User.getUserById = function (userId) {
  return new Promise((resolve, reject) => {
    db.query("select * from user_table where no = ?", userId, (error, results, fields) => {
      if (error) {
        reject(error)
      } else {
        resolve({results, fields})
      }
    })
  })
}

User.getAllUser = function () {
  return new Promise((resolve, reject) => {
    db.query("select * from user_table", (error, results, fields) => {
      if (error) {
        reject(error)
      } else {
        resolve({results, fields})
      }
    })
  })
}

User.createUser = function (newUser) {
  try {
    db.query("insert into user_table set ?", newUser)
  } catch (err) {
    console.log('error happens in creating query', err)
    throw err
  }
}

User.updateById = function (userId, user) {
  try {
    db.query("update user_table set ? where no = ?", [user, userId])
  } catch (err) {
    console.log('error happens in updating user by id', err)
    throw err
  }
} 

User.removeById = function (userId) {
  try {
    db.query("delete from user_table where no = ?", userId)
  } catch (err) {
    console.log('error happens in removing user by id', err)
    throw err
  }
}


module.exports = User;