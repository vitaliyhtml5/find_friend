const express = require('express');
const app = express();
app.use(express.json());
const router = new express.Router();

const profile = require('./db_querries/profile');

// Get profile
router.get('/getProfileData', (req, res) => {
    profile.selectProfile(req.query.id, (err, result) => {
        try {
            if (err) {
                res.status(400).send(err);
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