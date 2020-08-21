const mysql = require('mysql')

// const connect = mysql.createConnection({
//     host: 'localhost',
//     user: 'dbuser',
//     passowrd: '1234',
//     database: 'my_app'
// })

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'example.org',
    user: 'bob',
    passowrd: '1234',
    database: 'my_app'
})

pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});


pool.getConnection(function (err, connection) {
    if (err) throw err; // not connected!

    // Use the connection
    connection.query('SELECT something FROM sometable', function (error, results, fields) {
        // When done with the connection, release it.
        connection.release();

        // Handle error after the release.
        if (error) throw error;

        // Don't use the connection here, it has been returned to the pool.
    });
    // connection.query(sqlString, callback)
    connection.query('SELECT * FROM `books` WHERE `author` = "David"', function ( err, results, fields) {
        if (error) throw error;
        console.log(results)
    })
    // connection.query(sqlString, values, callback)
    connection.query('SELECT * FROM `books` WHERE `author` = ?', ['David'], function ( err, results, fields) {
        if (error) throw error;
        console.log(results)
    })
    // connection.query(options, callback)
    connection.query({
        sql: 'SELECT * FROM `book` WHERE `author` = ?',
        timeout: 40000, // 40s
        values: ['David']
    }, function (error, results, fields) {
        if (error) throw error;
        console.log(results)
    })
    // connection.query(options, values, callback)
    connection.query({
        sql: 'SELECT * FROM `book` WHERE `author` = ?',
        timeout: 40000, // 40s
    },
    ['David'],
    function (error, results, fields) {
        if (error) throw error;
        console.log(results)
    })
    connection.destroy()
});

pool.end(function (err) {

})

// connection.connect(function(err) {
//     if (err) {
//         console.error('error connecting: ',err.stack)
//         return
//     }

//     console.log('connected as id ', connection.threadId)
// })

connection.query()

// connection.end()
connection.destroy()