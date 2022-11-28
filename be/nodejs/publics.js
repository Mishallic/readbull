const express = require('express');
const router = express.Router();


router.get('/PING', (req, res) => {
    res.send('PONG')
})

module.exports = router