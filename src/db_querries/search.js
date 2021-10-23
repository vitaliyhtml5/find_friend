const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'api_friends'
});

const search = (searchValue, userId, callback) => {
    const q = `SELECT id, name, age, hobby FROM friends WHERE (name LIKE '%${searchValue}%' OR age LIKE '%${searchValue}%' OR hobby LIKE '%${searchValue}%') AND user_profile_id = ${userId};`;
    connection.query(q, (err, result) => {
        if (err) {
            callback('No connection to db', undefined);
        } else if (searchValue == '') {
            callback('seacrh value is empty', undefined);
        } else {
            callback(undefined, result);
        }
    });
}

module.exports = search;