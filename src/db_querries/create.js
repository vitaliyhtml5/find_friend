const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'api_friends'
});

// Add a new user
const insertUser = (user_name, user_age, user_hobby, user_owner_id, callback) => {
    if (!user_name || !user_age || !user_hobby || !user_owner_id) {
        callback('Data is empty', undefined);
    } else {
        addUser();
    }

    function addUser() {
        const q = `INSERT INTO friends (name, age, hobby, user_profile_id) VALUES ('${user_name}', ${user_age}, '${user_hobby}', ${user_owner_id});`
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