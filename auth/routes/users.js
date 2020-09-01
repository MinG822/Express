const express = require('express');
const router = express.Router();

// dummy database
const users = {
  tj : {name: "tj"}
}


// Authenticate using our plain-object database of doom!
function authenticate(name, pass, fn) {
  const user = users[name];
  if (!user) return fn(new Error('cannot find user'))
  hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
    if (err) return fn(err);
    if (hash === user.hash) return fn(null, user)
    fn(new Error('invalid password'))
  })
}

function restrict(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    req.session.error = 'Access denied!'
    res.redirect('/login')
  }
}


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/users/login')
});

router.get('/restricted', restrict, function(req, res) {
  res.send('restricted area, click to <a href="/logout">logout</a>')
})

router.get('/logout', function(req, res) {
  res.session.destroy(function() {
    res.redirect('/')
  })
})

router.get('/login', function(req, res) {
  res.render('login')
})

router.post('/login', function(req, res) {
  authenticate(req.body.username, req.body.password, function(err, user) {
    if (user) {
      // regenerate session when signing in to prevent fixation
      req.session.regenerate(function() {
        // store the user's primary key
        // in the session stroe to be retrieved,
        // or in this case the entire user object
        req.session.user = user;
        req.session.success = 'Authenticated as' + user.name
          + ' click to <a href="/logout">logout</a>. '
          + ' You may now access <a href="/restricted">/restricted</a>.';
        res.redirect('back')
      })
    } else {
      req.session.error = 'Authentication failed, please check your '
        + ' username and password.'
        + ' (use "tj" and "foobar")';
      res.redirect('/login');
    }
  })
})

module.exports = router;
