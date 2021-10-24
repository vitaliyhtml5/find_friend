const express = require('express');
const app = express();
app.use(express.json());
const router = new express.Router();

const deleteUser = require('./db_querries/delete');

// Delete a friend

router.delete('/delete_user', (req, res) => {
    deleteUser(req.query.id, req.query.user_owner_id, (err, result) => {
        try {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send(result);
            }
        } catch (e) {
            res.status(500).send({message: 'something went wrong'});
        }
    });
});

module.exports = router;