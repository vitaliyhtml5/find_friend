const express = require('express');
const app = express();
app.use(express.json());
const router = new express.Router();

const deleteUser = require('./db_querries/delete');

// Delete a friend
const tempDeleteUser = {
    user_id: 17
}

router.delete('/delete_user', (req, res) => {
    deleteUser(tempDeleteUser.user_id, (err, data) => {
        try {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send(data);
            }
        } catch (e) {
            res.status(500).send({message: 'something went wrong'});
        }
    });
});

module.exports = router;