const express = require('express');
const app = express();
app.use(express.json());
const router = new express.Router();

// Update profile
const profile = require('./db_querries/profile');

router.put('/update_profile', (req, res) => {
    profile.updateProfile(req.body.user_id, req.body.user_name, req.body.user_age, req.body.user_hobby, (err, result) => {
        try {
            if (err) {
                res.status(400).send('incorrect data');
            }
            else {
                res.send(result);
            }
        } catch (e) {
            res.status(500).send({message: 'something went wrong'});
        }
    });
});

// Update avatar
router.put('/change_avatar', (req, res) => {
    profile.updateAvatar(req.body.user_id, req.body.user_avatar, (err, result) => {
        try {
            if (err) {
                res.status(400).send('incorrect data');
            }
            else {
                res.send(result);
            }
        } catch (e) {
            res.status(500).send({message: 'something went wrong'});
        }
    });
});

module.exports = router;