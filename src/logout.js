const express = require('express');

const app = express();
app.use(express.json());
const router = new express.Router();

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).send({code: 200, message: 'Cookie has been deleted'});
});

module.exports = router;