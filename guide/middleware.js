const express = require('express')
const app = express()

// const myLogger = function (req, res, next) {
//     console.log('Logged')
//     next('1')
// }

// const testNext = function (req, res, next) {
//     console.log('It should not be seen')
// }

// app.use(myLogger)
// app.use(testNext)

const myLogger = function (req, res, next) {
    res.send('hey it is logger!')
    next()
}

const testNext = function (req, res, next) {
    console.log('It should be seen')
}

app.use(myLogger)
app.use(testNext)

app.get('/', function (req, res) {
    res.send('Hello World')
})

// error handler
app.use(function (err, req, res, next) {
    res.status(400).send(err.message)
  })

app.listen(3000)