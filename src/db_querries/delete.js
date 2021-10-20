const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'api_friends'
});

// Delete user
const deleteUser = (user_id, callback) => {
    if (!user_id) {
        callback('id is missed', undefined)
    } else {
        makeDelete();
    }

    function makeDelete() {
        const q = `DELETE FROM friends WHERE id = ${user_id};`;
        connection.query(q, (err, results) => {
            if (err) {
                callback('No connection to db', undefined);
            } else {
                callback(undefined, 'user was deleted');
            }
        });
    }
}

module.exports = deleteUser;

