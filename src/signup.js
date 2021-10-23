const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());
const router = new express.Router();

// Check if email is unique
const checkUniqueEmail = require('./db_querries/get_email');

router.post('/check_email', (req, res) => {
    checkUniqueEmail(req.body.email, (err, result) => {
        try {
            if (err) {
                res.status(400).send(err);
            } else {
                if (result.message === 'email is used') res.status(400).send(result);
                else res.send(result);
            }
        } catch (e) {
            res.status(500).send({message: 'something went wrong'});
        }
    });
});

// Create a new account
const createAccount = require('./db_querries/create_account');

router.post('/create_account', (req, res) => {
    createAccount(req.body.name, req.body.age, req.body.hobby, req.body.avatar, req.body.email, req.body.password, (err, result) => {
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