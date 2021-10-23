const express = require('express');
const app = express();
app.use(express.json());
const router = new express.Router();

const addFriend = require('./db_querries/create');

// Add a new friend
router.post('/add_user', (req, res) => {
    try {
        addFriend(req.body.name, req.body.age, req.body.hobby, (err, data) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send(data);
            }
        });
    } catch(e) {
        res.status(500).send({message: 'something went wrong'});
    }
});

module.exports = router;