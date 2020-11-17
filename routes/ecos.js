const express = require('express');
const router = express.Router();
const Eco = require('../models/Eco');

router.get('/ecos', (req,res) => {
    res.send('We are on home');
});

module.exports = router;