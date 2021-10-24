const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'api_friends'
});

const selectAll = (userId, callback) => {
    const q = `SELECT id, name, age, hobby FROM friends WHERE user_profile_id = ${userId};`;
    makeQuery(q,callback);
}

const selectById = (id, callback) => {
    const q = `SELECT * FROM friends WHERE id = ${id};`;
    makeQuery(q,callback);
}

const sortAsc = (column, userId, callback) => {
    const q = `SELECT id, name, age, hobby FROM friends WHERE user_profile_id = ${userId} ORDER BY ${column} ASC;`;
    makeQuery(q,callback);
}

const sortDesc = (column, userId, callback) => {
    const q = `SELECT id, name, age, hobby FROM friends WHERE user_profile_id = ${userId} ORDER BY ${column} DESC;`;
    makeQuery(q,callback);
}

function makeQuery(q, callback) {
    connection.query(q, (err, results) => {
        if (err) {
            callback('No connection to db', undefined);
        } else {
            callback(undefined, results);
        }
    });
}

module.exports = {
    selectAll, 
    selectById,
    sortAsc,
    sortDesc
};