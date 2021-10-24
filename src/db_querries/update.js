const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'api_friends'
});

// Update friend
const updateUser = (user_id, user_name, user_age, user_hobby, user_owner_id, callback) => {
    if (!user_id || !user_name || !user_age || !user_hobby || !user_owner_id) {
        callback('all fields should be filled', undefined);
    } else {
        makeUpdate();
    }

    function makeUpdate() {
        const q = `UPDATE friends SET name = '${user_name}', age = ${user_age}, hobby = '${user_hobby}' WHERE user_profile_id = ${user_owner_id} AND id = ${user_id};`
        connection.query(q, (err, result) => {
            if (err) {
                callback('No connection to db', undefined);
            } else {
                callback(undefined, {message: 'user was updated'});
            }
        });
    }
}

module.exports = updateUser;
