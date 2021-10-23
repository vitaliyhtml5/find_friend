const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'api_friends'
});

// Add a new user
const insertUser = (user_name, user_age, user_hobby, callback) => {
    if (!user_name || !user_age || !user_hobby) {
        callback('Data is empty', undefined);
    } else {
        addUser();
    }

    function addUser() {
        const q = `INSERT INTO friends (name,age,hobby) VALUES ('${user_name}', ${user_age}, '${user_hobby}');`
        connection.query(q, (err, results) => {
            if (err) {
                callback('No connection to db', undefined);
            } else {
                callback(undefined, {message: 'user was added'});
            }
        });
    }
}

module.exports = insertUser;