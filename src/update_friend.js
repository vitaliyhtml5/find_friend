const express = require('express');
const app = express();
app.use(express.json());
const router = new express.Router();

const updateUser = require('./db_querries/update');

// Update a friend

router.put('/update_user', (req, res) => {
    try {
        updateUser(req.body.id, req.body.name, req.body.age, req.body.hobby, req.body.user_owner_id, (err, data) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send(data);
            }
        });
    } catch (e) {
        res.status(500).send({message: 'something went wrong'});
    }
});

module.exports = router;