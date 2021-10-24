const express = require('express');
const app = express();
app.use(express.json());
const router = new express.Router();

const showFriends = require('./db_querries/show_all');

// Get all friends
router.get('/show_all', (req, res) => {
    try {
        showFriends.selectAll(req.query.user_id, (err, data) => {
            if (data !== null) {
                res.send(data);
            } else {
                res.status(400).send({message: 'data is empty'});
            }
        });
    } catch(e) {
        res.status(500).send({message: 'something went wrong'});
    }
});

// Get a friend by id
const tempIdValue = 1;      
// Temp id, it should be req.query  
router.get('/show_friend', (req, res) => {
    try {
        showFriends.selectById(tempIdValue, (err, data) => {
            res.send(data);
        });
    } catch(e) {
        res.status(500).send({message: 'something went wrong'});
    }
});

// Sort friends in ASC order
router.get('/sort_friend_asc', (req, res) => {
    try {
        showFriends.sortAsc(req.query.column, req.query.user_id, (err, data) => {
            res.send(data);
        });
    } catch(e) {
        res.status(500).send({message: 'something went wrong'});
    }
});

// Sort friends in DESC order
router.get('/sort_friend_desc', (req, res) => {
    try {
        showFriends.sortDesc(req.query.column, req.query.user_id, (err, data) => {
            res.send(data);
        });
    } catch(e) {
        res.status(500).send({message: 'something went wrong'});
    }
});

module.exports = router;
