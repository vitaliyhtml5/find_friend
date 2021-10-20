const express = require('express');
const app = express();
app.use(express.json());
const router = new express.Router();

const addFriend = require('./db_querries/create');

// Add a new friend
// Need to add from body
const tempnewUser = {
    name: 'Jake',
    age: 22,
    hobby: 'spiders'
}

router.post('/add_user', (req, res) => {
    try {
        addFriend(tempnewUser.name, tempnewUser.age, tempnewUser.hobby, (err, data) => {
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