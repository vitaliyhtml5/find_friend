const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'api_friends'
});

// Create account

const createAccount = (name, age, hobby, avatar, email, password, callback) => {
    if (!name || !age || !hobby || !avatar || !email || !password) {
        callback({message: 'data is missed'}, undefined);
    } else {
        const q = `INSERT INTO user_profile (name, age, hobby, avatar, email, password) VALUES ('${name}', ${age}, '${hobby}', '${avatar}', '${email}', SHA('${password}'))`;
        connection.query(q, (err, result) => {
            if (err) {
                callback('No connection to db', undefined);
            } else {
                callback(undefined, {message: 'account was created'});
            }
        });
    }
}

module.exports = createAccount;