const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'api_friends'
});

// Show user profile
const selectProfile = (user_id, callback) => {
    if (!user_id) {
        callback('user is not exist', undefined);
    } else {
        const q = `SELECT name, age, hobby, avatar FROM user_profile WHERE id = ${user_id};`;
        connection.query(q, (err, data) => {
            if (err) {
                callback('No connection to db', undefined);
            } else {
                callback(undefined, data);
            }
        });
    }
}

// Update profile

const updateProfile = (user_id, user_name, user_age, user_hobby, callback) => {
    if (!user_id) {
        callback('user is not exist', undefined);
    } else if (!user_name || !user_age || !user_hobby) {
        callback('all fields should be filled', undefined);
    } else {
        const q = `UPDATE user_profile SET name = '${user_name}', age = ${user_age}, hobby = '${user_hobby}' WHERE id = ${user_id};`;
        connection.query(q, (err, result) => {
            if (err) {
                callback(err, undefined);
            } else {
                callback(undefined, 'profile was updated');
            }
        })
    }
}

// Update avatar

const updateAvatar = (user_id, user_avatar, callback) => {
    if (!user_id || !user_avatar) {
        callback('incorrect data', undefined);
    } else {
        const q = `UPDATE user_profile SET avatar = '${user_avatar}' WHERE id = ${user_id};`;
        connection.query(q, (err, result) => {
            if (err) {
                callback(err, undefined);
            } else {
                callback(undefined, {message: 'avatar was changed'});
            }
        })
    }
}


module.exports = {
    selectProfile,
    updateProfile,
    updateAvatar
}