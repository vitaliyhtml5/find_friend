const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'api_friends'
});

// Get data of user in case of login
const checkLogin = (email, password, callback) => {
    if (!email || !password) {
        callback({message: 'data is missed'}, undefined);
    } else {
        const q = `SELECT id, name, age, hobby, avatar FROM user_profile WHERE email = '${email}' AND password = '${password}';`;
        connection.query(q, (err, result) => {
            if (err) {
                callback('No connection to db', undefined);
            } else if (result.length === 0) {
                callback({message: 'incorrect credentials'}, undefined);
            } else {
                callback(undefined, result);
            }
        });
    }
}

module.exports = checkLogin;