//Import modules
const mongoose = require('mongoose');
const express = require('express');
const conn = require('../database');
const router = express.Router();
const Estacion = require('../models/Estacion');


router.get('/,', (req,res) => {
    res.send();
});

router.post('/,', (req,res) => {
    console.log(req.body);
});

module.exports = router;