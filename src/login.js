const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());
const router = new express.Router();

// Login with getting token
const loginUser = require('./db_querries/login');

router.post('/login_user', (req, res) => {
    loginUser(req.body.email, req.body.password, (err, result) => {
        try {
            if (err) {
                res.status(400).send(err);
            }
            else {
                jwt.sign({profile: result}, 'secretkey', {expiresIn: '24h'}, (err, token) => {
                    res.cookie('token',token, {
                        expires: new Date(Date.now() + 1000*60*60*24),secure: false,httpOnly: true,sameSite: 'Strict'
                    });
                    res.send({
                        token,
                        message: 'access is allowed'
                    });
                });  
            }
        } catch (e) {
            res.status(500).send({message: 'something went wrong'});
        }
    });    
});

module.exports = router;

