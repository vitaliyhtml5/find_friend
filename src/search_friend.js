const express = require('express');
const app = express();
app.use(express.json());
const router = new express.Router();

const searchFriends = require('./db_querries/search');

// Search friend by name, age, hobby
router.get('/search_user', (req, res) => {
    try {
        searchFriends(req.query.value, (err, data) => {
            res.send(data);
        });
    } catch {
        res.status(500).send({message: 'something went wrong'});
    }
});

module.exports = router;