const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'api_friends'
});

// Check if email is unique

const checkEmail = (email, callback) => {
    if (!email) {
        callback({message: 'data is missed'}, undefined);
    } else {
        const q = `SELECT email FROM user_profile WHERE email = '${email}';`;
        connection.query(q, (err, result) => {
            if (err) {
                callback('No connection to db', undefined);
            } else if (result.length === 0) {
                callback(undefined, {message: 'email is not used'});
            } else {
                callback(undefined, {message: 'email is used'});
            }
        });
    }
}

module.exports = checkEmail;