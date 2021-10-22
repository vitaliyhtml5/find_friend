const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
const router = new express.Router();

router.get('/get_access', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.status(401).send({message: 'Unauthorized'});
        } else {
            res.send({message: 'access is allowed', user: authData});
        }
    });
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['cookie'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split('=');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.status(401).send({message: 'Unauthorized'});
    }
}

module.exports = router;