const express = require('express');
const app = express();
app.use(express.json());
const router = new express.Router();

const updateUser = require('./db_querries/update');

// Update a friend
// Should be filled from body
const tempUpdateUser = {
    old_user_id: 20,
    user_name: 'Tim',
    user_age: 48,
    user_hobby: 'movies'
}

router.put('/update_user', (req, res) => {
    try {
        updateUser(tempUpdateUser.old_user_id, tempUpdateUser.user_name, tempUpdateUser.user_age, tempUpdateUser.user_hobby, (err, data) => {
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