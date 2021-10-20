const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'api_friends'
});

// Update friend
const updateUser = (old_user_id, user_name, user_age, user_hobby, callback) => {
    if (old_user_id === '' || user_name === '' || user_age === '' || user_hobby === '') {
        callback('all fields should be filled', undefined);
    } else {
        makeUpdate();
    }

    function makeUpdate() {
        const q = `UPDATE friends SET name = '${user_name}', age = ${user_age}, hobby = '${user_hobby}' WHERE id = ${old_user_id};`
        connection.query(q, (err, results) => {
            if (err) {
                callback('No connection to db', undefined);
            } else {
                callback(undefined, 'user was updated');
            }
        });
    }
}

module.exports = updateUser;
