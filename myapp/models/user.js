const db = require('./db')


const User = function(user) {
  this.no = user.no;
  this.email = user.email;
  this.password = user.password; 
}

User.createUser = function (newUser) {
  try {
    db.query("insert into user_table set ?", newUser)
  } catch (err) {
    console.log('error happens in creating query', err)
    throw err
  }  
}

// User.getUserById = async function (userId) {
//   try {
//     const user = await db.query("select * from user_table where no = ?", userId)
//     console.log(user)
//     console.log('왜...', user._results)
//     return user._results
//   } catch (err) {
//     console.log('error happens in getting user by id query', err)
//     throw err
//   }
// }

// User.getUserById = async function (userId) {
//   let user;
//   await runDB();
//   try {
//     user = await db.query("select * from user_table where no = ?", userId)
//     console.log('1', user)
//   } catch (err) {
//     console.log('error happens in getting user by id query', err)
//     throw err
//   }
//   console.log(user._results, '2')
//   return Object.assign({}, user._results[0])
// }

User.getAllUser = async function () {
  try {
    const allUser = await db.query("select * from user_table")
    return allUser
  } catch (err) {
    console.log('error happens in getting all user query', err)
    throw err
  }
}

User.updateById = function (userId, user) {
  try {
    db.query("update user_table set = ? where no = ?", [user, userId])
  } catch (err) {
    console.log('error happens in updating user by id', err)
    throw err
  }
} 

User.remove = function (userId) {
  try {
    db.query("delete from user_table where no = ?", userId)
  } catch (err) {
    console.log('error happens in removing user by id', err)
    throw err
  }
}


module.exports = User;