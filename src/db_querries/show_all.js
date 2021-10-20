const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'api_friends'
});

const selectAll = callback => {
    const q = 'SELECT * FROM friends;';
    makeQuery(q,callback);
}

const selectById = (id, callback) => {
    const q = `SELECT * FROM friends WHERE id = ${id};`;
    makeQuery(q,callback);
}

const sortAsc = (column, callback) => {
    const q = `SELECT * FROM friends ORDER BY ${column} ASC;`;
    makeQuery(q,callback);
}

const sortDesc = (column, callback) => {
    const q = `SELECT * FROM friends ORDER BY ${column} DESC;`;
    makeQuery(q,callback);
}

const filterValue = (arr, column, callback) => {
    let q = `SELECT * FROM friends WHERE ${column} = '${arr[0]}' `;
    for(let i = 1; i < arr.length; i++) {
        q += `OR ${column} = '${arr[i]}' `;
    }
    makeQuery(q,callback);
}

const distinctValue = (column, callback) => {
    const q = `SELECT DISTINCT ${column} FROM friends;`;
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
    sortDesc,
    distinctValue,
    filterValue
};