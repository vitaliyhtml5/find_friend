const path = require('path');
const express = require('express');
const app = express();
const router = new express.Router();

const publicDirectoryPath = path.join(__dirname,'../public');
router.use(express.static(publicDirectoryPath));

// 403 error
router.get('/admin', (req, res) => {
    res.status(403).sendFile(`${publicDirectoryPath}/error_pages/403.html`);
});

// 500 error
router.get('/500', (req, res) => {
    res.status(500).sendFile(`${publicDirectoryPath}/error_pages/500.html`);
});

// 404 error
router.get('*', (req, res) => {
    res.status(404).sendFile(`${publicDirectoryPath}/error_pages/404.html`);
});

module.exports = router;